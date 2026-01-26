import { prisma } from "./db";
import { runRecomputeNow } from "./recompute";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const WORKER_ID =
  process.env.RECOMPUTE_WORKER_ID || `worker-${process.pid}-${Math.random().toString(16).slice(2, 8)}`;

const POLL_MS = Math.min(Math.max(Number(process.env.RECOMPUTE_POLL_MS ?? 500), 100), 5000);
const STALE_LOCK_MS = Math.min(
  Math.max(Number(process.env.RECOMPUTE_STALE_LOCK_MS ?? 60000), 5000),
  10 * 60 * 1000
);
const BATCH = Math.min(Math.max(Number(process.env.RECOMPUTE_BATCH ?? 5), 1), 20);

async function tick() {
  const now = new Date();
  const stale = new Date(Date.now() - STALE_LOCK_MS);

  const jobs = await prisma.recomputeQueue.findMany({
    where: {
      nextRunAt: { lte: now },
      OR: [{ lockedAt: null }, { lockedAt: { lt: stale } }]
    },
    orderBy: { nextRunAt: "asc" },
    take: BATCH,
    select: { id: true, projectId: true, workspaceId: true, reason: true, attempts: true }
  });

  for (const job of jobs) {
    const lockTime = new Date();

    const claimed = await prisma.recomputeQueue.updateMany({
      where: {
        id: job.id,
        nextRunAt: { lte: now },
        OR: [{ lockedAt: null }, { lockedAt: { lt: stale } }]
      },
      data: {
        lockedAt: lockTime,
        lockedBy: WORKER_ID
      }
    });

    if (claimed.count !== 1) continue;

    try {
      const start = Date.now();
      await runRecomputeNow(job.projectId, job.reason);
      const durationMs = Date.now() - start;

      await prisma.auditEvent.create({
        data: {
          workspaceId: job.workspaceId,
          projectId: job.projectId,
          actorUserId: WORKER_ID,
          type: "recompute_worker_ok",
          payloadJson: {
            projectId: job.projectId,
            reason: job.reason,
            durationMs,
            workerId: WORKER_ID
          }
        }
      });

      const row = await prisma.recomputeQueue.findUnique({
        where: { projectId: job.projectId },
        select: { id: true, nextRunAt: true, lockedAt: true, lockedBy: true }
      });

      if (!row) continue;
      if (row.lockedBy !== WORKER_ID) continue;
      if (!row.lockedAt || row.lockedAt.getTime() !== lockTime.getTime()) continue;

      const now2 = new Date();

      if (row.nextRunAt > now2) {
        await prisma.recomputeQueue.updateMany({
          where: { id: row.id, lockedBy: WORKER_ID, lockedAt: lockTime },
          data: { lockedAt: null, lockedBy: null, attempts: 0 }
        });
      } else {
        await prisma.recomputeQueue.deleteMany({
          where: { id: row.id, lockedBy: WORKER_ID, lockedAt: lockTime }
        });
      }
    } catch (err: any) {
      const attempt = (job.attempts ?? 0) + 1;
      const backoffMs = Math.min(60000, 2000 * Math.pow(2, Math.min(5, attempt)));

      console.log("[worker] recompute failed", { projectId: job.projectId, err });

      try {
        await prisma.auditEvent.create({
          data: {
            workspaceId: job.workspaceId,
            projectId: job.projectId,
            actorUserId: WORKER_ID,
            type: "recompute_worker_fail",
            payloadJson: {
              projectId: job.projectId,
              reason: job.reason,
              attempt,
              backoffMs,
              workerId: WORKER_ID,
              error: err?.message ?? String(err)
            }
          }
        });
      } catch (auditErr) {
        console.log("[worker] audit fail", auditErr);
      }

      await prisma.recomputeQueue.updateMany({
        where: { id: job.id, lockedBy: WORKER_ID, lockedAt: lockTime },
        data: {
          lockedAt: null,
          lockedBy: null,
          attempts: { increment: 1 },
          nextRunAt: new Date(Date.now() + backoffMs)
        }
      });
    }
  }
}

async function main() {
  console.log(`[worker] up ${WORKER_ID} poll=${POLL_MS}ms stale=${STALE_LOCK_MS}ms batch=${BATCH}`);

  while (true) {
    try {
      await tick();
    } catch (err) {
      console.log("[worker] tick error", err);
    }
    await sleep(POLL_MS);
  }
}

void main().catch((err) => {
  console.error("[worker] fatal", err);
  process.exit(1);
});
