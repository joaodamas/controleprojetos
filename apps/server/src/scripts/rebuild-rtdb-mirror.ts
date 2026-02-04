import { prisma } from "../db";
import { mirrorMembership } from "../rtdb";

type ScriptOptions = {
  dryRun: boolean;
  workspaceId: string | null;
};

function parseArgs(): ScriptOptions {
  const args = process.argv.slice(2);
  let dryRun = false;
  let workspaceId: string | null = null;

  for (const arg of args) {
    if (arg === "--dry-run") dryRun = true;
    if (arg.startsWith("--workspaceId=")) {
      const value = arg.split("=", 2)[1];
      workspaceId = value ? value.trim() : null;
    }
  }

  return { dryRun, workspaceId };
}

function logSummary(counts: Record<string, { ok: number; failed: number }>) {
  const entries = Object.entries(counts);
  for (const [workspaceId, stats] of entries) {
    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        workspaceId,
        ok: stats.ok,
        failed: stats.failed
      })
    );
  }
}

async function main() {
  const { dryRun, workspaceId } = parseArgs();

  const members = await prisma.workspaceMember.findMany({
    where: workspaceId ? { workspaceId } : undefined,
    select: { workspaceId: true, userId: true, role: true }
  });

  let ok = 0;
  let failed = 0;
  const counts: Record<string, { ok: number; failed: number }> = {};

  for (const member of members) {
    if (!counts[member.workspaceId]) counts[member.workspaceId] = { ok: 0, failed: 0 };
    if (dryRun) {
      ok += 1;
      counts[member.workspaceId].ok += 1;
      continue;
    }

    try {
      await mirrorMembership({
        workspaceId: member.workspaceId,
        userId: member.userId,
        role: member.role,
        status: "active"
      });
      ok += 1;
      counts[member.workspaceId].ok += 1;
    } catch (err) {
      failed += 1;
      counts[member.workspaceId].failed += 1;
      console.log(
        JSON.stringify({
          ts: new Date().toISOString(),
          workspaceId: member.workspaceId,
          userId: member.userId,
          role: member.role,
          error: err instanceof Error ? err.message : String(err)
        })
      );
    }
  }

  logSummary(counts);

  console.log(
    `[rtdb] rebuild finished: ok=${ok} failed=${failed} total=${members.length} dryRun=${dryRun}`
  );

  if (!dryRun && failed > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((err) => {
    console.error("[rtdb] rebuild crashed", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
