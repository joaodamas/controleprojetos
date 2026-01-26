import { prisma } from "./db";
import { InterventionStatus, RiskSeverity, RiskStatus, WorkItemType } from "@prisma/client";

type RecomputeReason = string;

function toDateOnlyUTC(d: Date): string {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysDiffDateOnly(fromYYYYMMDD: string, toYYYYMMDD: string): number {
  const a = new Date(`${fromYYYYMMDD}T00:00:00Z`).getTime();
  const b = new Date(`${toYYYYMMDD}T00:00:00Z`).getTime();
  return Math.floor((b - a) / (1000 * 60 * 60 * 24));
}

function isoToDateOnly(iso: string | null | undefined): string | null {
  if (!iso) return null;
  if (iso.length >= 10) return iso.slice(0, 10);
  return null;
}

type DesiredRisk = {
  ruleId: string;
  targetKey: string;
  targetWorkItemId: string | null;
  severity: RiskSeverity;
  explanation: string;
};

async function recomputeProject(projectId: string, reason: RecomputeReason) {
  const t0 = Date.now();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      workspaceId: true,
      baselineActiveId: true,
      baselineActive: { select: { payloadJson: true } }
    }
  });

  if (!project) {
    console.log("[recompute] project not found", { projectId, reason });
    return;
  }

  const today = toDateOnlyUTC(new Date());

  const baselineItems: any[] = (project.baselineActive?.payloadJson as any)?.workItems ?? [];
  const baselineDueById = new Map<string, string>();
  for (const it of baselineItems) {
    const id = String(it?.id ?? "");
    const due = isoToDateOnly(it?.dueDate);
    if (id && due) baselineDueById.set(id, due);
  }

  const workItems = await prisma.workItem.findMany({
    where: { projectId },
    select: {
      id: true,
      title: true,
      type: true,
      isCritical: true,
      dueDate: true,
      doneAt: true
    }
  });

  const desired: DesiredRisk[] = [];

  // Rule A: overdue critical milestone (HIGH)
  for (const wi of workItems) {
    if (wi.type !== WorkItemType.milestone) continue;
    if (!wi.isCritical) continue;
    if (wi.doneAt) continue;
    if (!wi.dueDate) continue;

    const due = toDateOnlyUTC(wi.dueDate);
    if (due < today) {
      desired.push({
        ruleId: "milestone_overdue",
        targetKey: wi.id,
        targetWorkItemId: wi.id,
        severity: RiskSeverity.high,
        explanation: `Milestone critico atrasado: "${wi.title}" (due ${due}, hoje ${today}).`
      });
    }
  }

  // Rule B: slip vs baseline on critical milestone (HIGH)
  for (const wi of workItems) {
    if (wi.type !== WorkItemType.milestone) continue;
    if (!wi.isCritical) continue;
    if (!wi.dueDate) continue;

    const base = baselineDueById.get(wi.id);
    if (!base) continue;

    const cur = toDateOnlyUTC(wi.dueDate);
    const slipDays = daysDiffDateOnly(base, cur);
    if (slipDays > 0) {
      desired.push({
        ruleId: "critical_slip_vs_baseline",
        targetKey: wi.id,
        targetWorkItemId: wi.id,
        severity: RiskSeverity.high,
        explanation: `Milestone critico escorregou vs baseline: "${wi.title}" (${base} -> ${cur}, ${slipDays}d).`
      });
    }
  }

  const managedRuleIds = ["milestone_overdue", "critical_slip_vs_baseline"];

  const existing = await prisma.risk.findMany({
    where: { projectId, ruleId: { in: managedRuleIds } },
    select: { id: true, ruleId: true, targetKey: true, status: true, severity: true }
  });

  const existingByKey = new Map<string, typeof existing[number]>();
  for (const r of existing) existingByKey.set(`${r.ruleId}:${r.targetKey}`, r);

  const desiredKeySet = new Set<string>();
  for (const d of desired) desiredKeySet.add(`${d.ruleId}:${d.targetKey}`);

  const result = await prisma.$transaction(async (tx) => {
    let candidates = desired.length;
    let upserted = 0;
    let resolved = 0;
    let highOpen = 0;

    for (const d of desired) {
      const key = `${d.ruleId}:${d.targetKey}`;
      const prev = existingByKey.get(key);

      let nextStatus: RiskStatus = RiskStatus.open;
      if (prev?.status === RiskStatus.ignored) nextStatus = RiskStatus.ignored;
      else if (prev?.status === RiskStatus.ack) nextStatus = RiskStatus.ack;
      else nextStatus = RiskStatus.open;

      const up = await tx.risk.upsert({
        where: {
          projectId_ruleId_targetKey: {
            projectId,
            ruleId: d.ruleId,
            targetKey: d.targetKey
          }
        },
        create: {
          workspaceId: project.workspaceId,
          projectId,
          ruleId: d.ruleId,
          targetKey: d.targetKey,
          targetWorkItemId: d.targetWorkItemId,
          severity: d.severity,
          status: nextStatus,
          explanation: d.explanation,
          evidenceJson: null
        },
        update: {
          targetWorkItemId: d.targetWorkItemId,
          severity: d.severity,
          status: nextStatus,
          explanation: d.explanation,
          resolvedAt: nextStatus === RiskStatus.resolved ? new Date() : null
        },
        select: { id: true, status: true, severity: true }
      });

      upserted++;

      if (up.severity === RiskSeverity.high && (up.status === RiskStatus.open || up.status === RiskStatus.ack)) {
        const title = `Intervencao: ${d.ruleId} - ${d.targetKey}`;
        await tx.intervention.upsert({
          where: { riskId: up.id },
          create: {
            workspaceId: project.workspaceId,
            projectId,
            riskId: up.id,
            title,
            status: InterventionStatus.open
          },
          update: { title }
        });

        highOpen++;
      }
    }

    for (const r of existing) {
      const key = `${r.ruleId}:${r.targetKey}`;
      if (desiredKeySet.has(key)) continue;
      if (r.status !== RiskStatus.open && r.status !== RiskStatus.ack) continue;

      await tx.risk.update({
        where: { id: r.id },
        data: { status: RiskStatus.resolved, resolvedAt: new Date() }
      });
      resolved++;
    }

    const health = highOpen > 0 ? "red" : "green";
    const healthReason = highOpen > 0 ? `${highOpen} risco(s) HIGH ativo(s).` : "Sem riscos HIGH ativos.";

    await tx.project.update({
      where: { id: projectId },
      data: { health, healthReason }
    });

    return { candidates, upserted, resolved, high: highOpen };
  });

  const durationMs = Date.now() - t0;

  try {
    await prisma.recomputeRun.create({
      data: {
        workspaceId: project.workspaceId,
        projectId,
        reason,
        durationMs,
        candidates: result.candidates,
        upserted: result.upserted,
        resolved: result.resolved,
        high: result.high
      }
    });
  } catch (err) {
    console.log("[recompute] failed to write RecomputeRun", err);
  }

  console.log("[recompute]", { projectId, reason, durationMs, ...result });
}

async function scheduleRecomputeDb(projectId: string, reason: string) {
  const debounceMs = Math.min(
    Math.max(Number(process.env.RECOMPUTE_DEBOUNCE_MS ?? 2000), 0),
    60000
  );

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { workspaceId: true }
  });
  if (!project) return;

  const nextRunAt = new Date(Date.now() + debounceMs);

  await prisma.recomputeQueue.upsert({
    where: { projectId },
    create: {
      workspaceId: project.workspaceId,
      projectId,
      reason,
      nextRunAt
    },
    update: {
      reason,
      nextRunAt
    }
  });
}

export function scheduleRecompute(projectId: string, reason: string) {
  void scheduleRecomputeDb(projectId, reason).catch((err) => {
    console.log("[recompute] failed to enqueue", { projectId, reason, err });
  });
}

export async function runRecomputeNow(projectId: string, reason: string) {
  await recomputeProject(projectId, reason);
}