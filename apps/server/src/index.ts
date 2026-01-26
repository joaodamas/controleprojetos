import express from "express";
import cors from "cors";
import crypto from "crypto";
import { authMiddleware, AuthenticatedRequest } from "./auth";
import { prisma } from "./db";
import { BLUEPRINTS } from "./blueprints/catalog";
import { scheduleRecompute } from "./recompute";
import { sendWorkspaceInviteEmail, isEmailConfigured } from "./email";
import {
  InterventionStatus,
  Prisma,
  RiskSeverity,
  RiskStatus,
  WorkspaceRole,
  WorkItemType
} from "@prisma/client";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", authMiddleware);

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

function isoOrNull(d: Date | null | undefined) {
  return d ? d.toISOString() : null;
}

async function audit(args: {
  workspaceId: string;
  projectId?: string | null;
  actorUserId: string;
  type: string;
  payload?: any;
}) {
  try {
    await prisma.auditEvent.create({
      data: {
        workspaceId: args.workspaceId,
        projectId: args.projectId ?? null,
        actorUserId: args.actorUserId,
        type: args.type,
        payloadJson: args.payload ?? null
      }
    });
  } catch (err) {
    console.log("[audit] failed", err);
  }
}

function parseStatusList(input: unknown, allowed: string[], fallback: string[]) {
  if (typeof input !== "string" || input.trim().length === 0) {
    return fallback;
  }
  const parts = input
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const filtered = parts.filter((value) => allowed.includes(value));
  return filtered.length > 0 ? filtered : fallback;
}

function parseLimit(input: unknown, fallback = 50) {
  const raw = Number(input ?? fallback);
  if (Number.isNaN(raw)) return fallback;
  return Math.min(Math.max(raw, 1), 200);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function base64Url(buf: Buffer) {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function parseInviteTtlDays() {
  const v = Number(process.env.INVITE_TTL_DAYS ?? 7);
  if (!Number.isFinite(v) || v <= 0) return 7;
  return Math.min(v, 30);
}

function isOverdue(dueDate: Date | null, status: string) {
  if (!dueDate) return false;
  if (status !== "open" && status !== "in_progress") return false;
  const today = new Date();
  return dueDate.getTime() < today.getTime();
}

function hasEvidence(body: any) {
  const noteOk = typeof body?.evidenceNote === "string" && body.evidenceNote.trim().length >= 10;

  const links = body?.evidenceLinksJson;
  const linksOk =
    Array.isArray(links) &&
    links.filter((x) => typeof x === "string" && x.trim().length > 0).length > 0;

  const checklist = body?.checklistJson;
  const checklistOk =
    Array.isArray(checklist) &&
    checklist.length > 0 &&
    checklist.every((x) => x && typeof x === "object" && x.done === true);

  return noteOk || linksOk || checklistOk;
}

const roleRank: Record<WorkspaceRole, number> = {
  owner: 4,
  admin: 3,
  manager: 2,
  member: 1,
  viewer: 0
};

function hasMinRole(role: WorkspaceRole, minRole: WorkspaceRole) {
  return roleRank[role] >= roleRank[minRole];
}

async function requireWorkspaceMember(
  res: express.Response,
  workspaceId: string,
  userId: string
) {
  const member = await prisma.workspaceMember.findUnique({
    where: { workspaceId_userId: { workspaceId, userId } }
  });

  if (!member) {
    res.status(403).json({ error: "FORBIDDEN" });
    return null;
  }

  return member;
}

function getStatuses(statusesJson: unknown): string[] {
  if (Array.isArray(statusesJson)) {
    return statusesJson.filter((value) => typeof value === "string") as string[];
  }
  return [];
}

function parseDateInput(value: unknown, field: string) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`INVALID_DATE:${field}`);
  }
  return date;
}

async function createWorkItemsFromBlueprint(args: {
  workspaceId: string;
  projectId: string;
  parentId?: string | null;
  items: Array<{ type: string; title: string; isCritical?: boolean; children?: any[] }>;
  status: string;
  tx: Prisma.TransactionClient;
}) {
  const { workspaceId, projectId, parentId, items, status, tx } = args;

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const created = await tx.workItem.create({
      data: {
        workspaceId,
        projectId,
        parentId: parentId || null,
        type: item.type as WorkItemType,
        title: item.title,
        status,
        isCritical: Boolean(item.isCritical),
        orderIndex: index
      }
    });

    if (item.children && item.children.length > 0) {
      await createWorkItemsFromBlueprint({
        workspaceId,
        projectId,
        parentId: created.id,
        items: item.children,
        status,
        tx
      });
    }
  }
}

app.post("/api/workspaces", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const name = typeof req.body?.name === "string" ? req.body.name : "Workspace";

  const result = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name }
    });

    const member = await tx.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId,
        role: "owner"
      }
    });

    return { workspace, member };
  });

  res.json({
    id: result.workspace.id,
    name: result.workspace.name,
    userRole: result.member.role
  });
});

app.get("/api/workspaces", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const memberships = await prisma.workspaceMember.findMany({
    where: { userId },
    include: { workspace: true }
  });

  const data = memberships.map((member) => ({
    id: member.workspace.id,
    name: member.workspace.name,
    userRole: member.role,
    blueprintId: member.workspace.blueprintId,
    blueprintVersion: member.workspace.blueprintVersion,
    statuses: getStatuses(member.workspace.statusesJson)
  }));

  res.json(data);
});

app.get("/api/workspaces/:id", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId }
  });

  if (!workspace) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;

  return res.json({
    id: workspace.id,
    name: workspace.name,
    userRole: member.role,
    blueprintId: workspace.blueprintId,
    blueprintVersion: workspace.blueprintVersion,
    statuses: getStatuses(workspace.statusesJson)
  });
});

app.post("/api/workspaces/:id/blueprint/install", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId }
  });

  if (!workspace) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "admin")) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  const blueprintId =
    typeof req.body?.blueprintId === "string"
      ? req.body.blueprintId
      : "implementation_go_live";

  const blueprint = BLUEPRINTS[blueprintId];
  if (!blueprint) {
    return res.status(400).json({ error: "BLUEPRINT_NOT_FOUND" });
  }

  if (workspace.blueprintId && workspace.blueprintId !== blueprint.id) {
    return res.status(409).json({ error: "BLUEPRINT_ALREADY_INSTALLED" });
  }

  if (!workspace.blueprintId) {
    const updated = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        blueprintId: blueprint.id,
        blueprintVersion: blueprint.version,
        governancePreset: blueprint.governancePreset,
        statusesJson: blueprint.statuses
      }
    });

    await audit({
      workspaceId,
      projectId: null,
      actorUserId: userId,
      type: "blueprint_install",
      payload: {
        blueprintId: blueprint.id,
        blueprintVersion: blueprint.version
      }
    });

    return res.json({
      id: updated.id,
      blueprintId: updated.blueprintId,
      blueprintVersion: updated.blueprintVersion,
      statuses: blueprint.statuses
    });
  }

  return res.json({
    id: workspace.id,
    blueprintId: workspace.blueprintId,
    blueprintVersion: workspace.blueprintVersion,
    statuses: getStatuses(workspace.statusesJson)
  });
});

app.post("/api/workspaces/:id/invites", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
  if (!workspace) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "admin")) return res.status(403).json({ error: "FORBIDDEN" });

  const emailRaw = typeof req.body?.email === "string" ? req.body.email : "";
  const email = normalizeEmail(emailRaw);

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "INVALID_EMAIL" });
  }

  const roleRaw = typeof req.body?.role === "string" ? req.body.role : "member";
  const allowedRoles: WorkspaceRole[] = ["admin", "manager", "member", "viewer"];
  const role = (allowedRoles.includes(roleRaw as WorkspaceRole) ? roleRaw : "member") as WorkspaceRole;

  const ttlDays = parseInviteTtlDays();
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

  const token = base64Url(crypto.randomBytes(32));
  const tokenHash = sha256Hex(token);
  const tokenPrefix = token.slice(0, 8);

  const invite = await prisma.$transaction(async (tx) => {
    const created = await tx.workspaceInvite.upsert({
      where: {
        workspaceId_email_status: {
          workspaceId,
          email,
          status: "pending"
        }
      },
      create: {
        workspaceId,
        email,
        role,
        status: "pending",
        tokenHash,
        tokenPrefix,
        invitedByUserId: userId,
        expiresAt
      },
      update: {
        role,
        tokenHash,
        tokenPrefix,
        invitedByUserId: userId,
        expiresAt,
        updatedAt: new Date()
      }
    });

    await audit({
      workspaceId,
      projectId: null,
      actorUserId: userId,
      type: "workspace_invite_created",
      payload: { inviteId: created.id, email, role, expiresAt: expiresAt.toISOString() }
    });

    return created;
  });

  const baseUrl = process.env.APP_BASE_URL || "http://localhost:5173";
  const inviteUrl = `${baseUrl.replace(/\\/+$/, "")}/invite/${token}`;

  try {
    await sendWorkspaceInviteEmail({
      to: email,
      workspaceName: workspace.name,
      inviteUrl,
      invitedByUserId: userId,
      role,
      expiresAtIso: expiresAt.toISOString()
    });
  } catch (err) {
    console.log("[invite] email send failed", err);
  }

  const emailConfigured = isEmailConfigured();
  return res.json({
    ok: true,
    inviteId: invite.id,
    email,
    role,
    expiresAt: invite.expiresAt,
    inviteUrl: emailConfigured ? undefined : inviteUrl
  });
});

app.get("/api/workspaces/:id/invites", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
  if (!workspace) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "admin")) return res.status(403).json({ error: "FORBIDDEN" });

  const invites = await prisma.workspaceInvite.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "desc" },
    take: 200
  });

  return res.json({ invites });
});

app.post("/api/invites/accept", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const token = typeof req.body?.token === "string" ? req.body.token : "";
  if (!token) return res.status(400).json({ error: "TOKEN_REQUIRED" });

  const tokenHash = sha256Hex(token);

  const invite = await prisma.workspaceInvite.findUnique({
    where: { tokenHash }
  });

  if (!invite) return res.status(404).json({ error: "INVITE_NOT_FOUND" });

  if (invite.status !== "pending") return res.status(409).json({ error: "INVITE_NOT_PENDING" });

  if (invite.expiresAt.getTime() < Date.now()) {
    await prisma.workspaceInvite.update({
      where: { id: invite.id },
      data: { status: "expired", updatedAt: new Date() }
    });
    return res.status(410).json({ error: "INVITE_EXPIRED" });
  }

  await prisma.$transaction(async (tx) => {
    await tx.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId: invite.workspaceId, userId } },
      create: { workspaceId: invite.workspaceId, userId, role: invite.role },
      update: { role: invite.role }
    });

    await tx.workspaceInvite.update({
      where: { id: invite.id },
      data: {
        status: "accepted",
        acceptedAt: new Date(),
        acceptedByUserId: userId
      }
    });

    await audit({
      workspaceId: invite.workspaceId,
      projectId: null,
      actorUserId: userId,
      type: "workspace_invite_accepted",
      payload: { inviteId: invite.id, email: invite.email, role: invite.role }
    });
  });

  return res.json({ ok: true, workspaceId: invite.workspaceId });
});

app.post("/api/workspaces/:id/invites/:inviteId/revoke", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;
  const inviteId = req.params.inviteId;

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "admin")) return res.status(403).json({ error: "FORBIDDEN" });

  const invite = await prisma.workspaceInvite.findUnique({ where: { id: inviteId } });
  if (!invite || invite.workspaceId !== workspaceId) return res.status(404).json({ error: "NOT_FOUND" });

  if (invite.status !== "pending") return res.status(409).json({ error: "NOT_PENDING" });

  await prisma.workspaceInvite.update({
    where: { id: inviteId },
    data: { status: "revoked", revokedAt: new Date() }
  });

  await audit({
    workspaceId,
    projectId: null,
    actorUserId: userId,
    type: "workspace_invite_revoked",
    payload: { inviteId, email: invite.email }
  });

  return res.json({ ok: true });
});

app.post("/api/workspaces/:id/projects", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId }
  });

  if (!workspace) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "manager")) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  if (!workspace.blueprintId || !workspace.blueprintVersion) {
    return res.status(400).json({ error: "BLUEPRINT_REQUIRED" });
  }

  const blueprint = BLUEPRINTS[workspace.blueprintId];
  if (!blueprint) {
    return res.status(400).json({ error: "BLUEPRINT_NOT_FOUND" });
  }

  const statuses = getStatuses(workspace.statusesJson);
  if (statuses.length === 0) {
    return res.status(400).json({ error: "WORKSPACE_STATUSES_MISSING" });
  }

  const name = typeof req.body?.name === "string" ? req.body.name : "Untitled project";

  const project = await prisma.$transaction(async (tx) => {
    const created = await tx.project.create({
      data: {
        workspaceId,
        name
      }
    });

    await createWorkItemsFromBlueprint({
      workspaceId,
      projectId: created.id,
      parentId: null,
      items: blueprint.defaultStructure,
      status: statuses[0],
      tx
    });

    return created;
  });

  return res.json({
    id: project.id,
    name: project.name
  });
});

app.get("/api/projects/:id/work-items", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { workspace: true }
  });

  if (!project) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const items = await prisma.workItem.findMany({
    where: { projectId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }]
  });

  return res.json({
    statuses: getStatuses(project.workspace.statusesJson),
    items
  });
});

app.patch("/api/work-items/:id", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workItemId = req.params.id;

  const workItem = await prisma.workItem.findUnique({
    where: { id: workItemId },
    include: { project: { include: { workspace: true } } }
  });

  if (!workItem) {
    return res.status(404).json({ error: "NOT_FOUND" });
  }

  const member = await requireWorkspaceMember(res, workItem.project.workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "manager")) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  const statuses = getStatuses(workItem.project.workspace.statusesJson);

  const statusInput = req.body?.status;
  if (statusInput !== undefined) {
    if (typeof statusInput !== "string" || !statuses.includes(statusInput)) {
      return res.status(400).json({ error: "INVALID_STATUS" });
    }
  }

  let startDate: Date | null | undefined;
  let dueDate: Date | null | undefined;
  let doneAt: Date | null | undefined;

  try {
    startDate = parseDateInput(req.body?.startDate, "startDate");
    dueDate = parseDateInput(req.body?.dueDate, "dueDate");
    doneAt = parseDateInput(req.body?.doneAt, "doneAt");
  } catch (err) {
    return res.status(400).json({ error: "INVALID_DATE" });
  }

  const finalStatus = statusInput ?? workItem.status;
  const nextStartDate = startDate !== undefined ? startDate : workItem.startDate;
  const nextDueDate = dueDate !== undefined ? dueDate : workItem.dueDate;

  if (nextStartDate && nextDueDate && nextDueDate < nextStartDate) {
    return res.status(400).json({ error: "INVALID_DATE_RANGE" });
  }

  if (doneAt !== undefined && finalStatus !== "done") {
    return res.status(400).json({ error: "DONE_AT_REQUIRES_DONE_STATUS" });
  }

  let normalizedDoneAt: Date | null | undefined = doneAt;
  if (statusInput !== undefined) {
    if (finalStatus === "done") {
      normalizedDoneAt = doneAt ?? new Date();
    } else {
      normalizedDoneAt = null;
    }
  } else if (doneAt === undefined && workItem.status !== "done" && finalStatus !== "done") {
    normalizedDoneAt = undefined;
  }

  const updated = await prisma.workItem.update({
    where: { id: workItemId },
    data: {
      title: typeof req.body?.title === "string" ? req.body.title : undefined,
      status: statusInput !== undefined ? statusInput : undefined,
      startDate,
      dueDate,
      doneAt: normalizedDoneAt,
      ownerUserId:
        typeof req.body?.ownerUserId === "string" ? req.body.ownerUserId : undefined,
      isCritical:
        typeof req.body?.isCritical === "boolean" ? req.body.isCritical : undefined
    }
  });

  scheduleRecompute(workItem.projectId, "work_item_patch");

  await audit({
    workspaceId: workItem.workspaceId,
    projectId: workItem.projectId,
    actorUserId: userId,
    type: "work_item_patch",
    payload: {
      workItemId,
      changes: {
        title: req.body?.title,
        status: statusInput,
        startDate: startDate ?? undefined,
        dueDate: dueDate ?? undefined,
        doneAt: normalizedDoneAt ?? undefined,
        ownerUserId: req.body?.ownerUserId,
        isCritical: req.body?.isCritical
      }
    }
  });

  return res.json(updated);
});

app.post("/api/projects/:id/baselines", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { workspace: true }
  });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;
  if (!hasMinRole(member.role, "manager")) return res.status(403).json({ error: "FORBIDDEN" });

  const items = await prisma.workItem.findMany({
    where: { projectId },
    orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }]
  });

  const payloadItems = items.map((it) => ({
    id: it.id,
    parentId: it.parentId,
    title: it.title,
    type: it.type,
    status: it.status,
    startDate: isoOrNull(it.startDate),
    dueDate: isoOrNull(it.dueDate),
    doneAt: isoOrNull(it.doneAt),
    isCritical: it.isCritical,
    orderIndex: it.orderIndex
  }));

  const total = items.length;
  const milestones = items.filter((i) => i.type === "milestone").length;
  const critical = items.filter((i) => i.isCritical).length;
  const criticalMilestones = items.filter((i) => i.type === "milestone" && i.isCritical).length;

  const dueDates = items.filter((i) => i.dueDate).map((i) => i.dueDate as Date);
  const minDue = dueDates.length ? dueDates.reduce((a, b) => (a < b ? a : b)) : null;
  const maxDue = dueDates.length ? dueDates.reduce((a, b) => (a > b ? a : b)) : null;

  const today = toDateOnlyUTC(new Date());
  const overdueCriticalMilestones = items.filter((i) => {
    if (i.type !== "milestone") return false;
    if (!i.isCritical) return false;
    if (i.doneAt) return false;
    if (!i.dueDate) return false;
    return toDateOnlyUTC(i.dueDate) < today;
  }).length;

  const summaryJson = {
    total,
    milestones,
    critical,
    criticalMilestones,
    minDue: minDue ? toDateOnlyUTC(minDue) : null,
    maxDue: maxDue ? toDateOnlyUTC(maxDue) : null,
    overdueCriticalMilestones
  };

  const label = typeof req.body?.label === "string" ? req.body.label : null;

  const created = await prisma.$transaction(async (tx) => {
    const baseline = await tx.baselineSnapshot.create({
      data: {
        workspaceId: project.workspaceId,
        projectId,
        label,
        payloadJson: {
          project: { id: project.id, name: project.name },
          createdAt: new Date().toISOString(),
          workItems: payloadItems
        },
        summaryJson,
        createdByUserId: userId
      }
    });

    await tx.project.update({
      where: { id: projectId },
      data: { baselineActiveId: baseline.id }
    });

    return baseline;
  });

  scheduleRecompute(projectId, "baseline_create");

  await audit({
    workspaceId: project.workspaceId,
    projectId,
    actorUserId: userId,
    type: "baseline_create",
    payload: {
      baselineId: created.id,
      label
    }
  });

  return res.json({
    id: created.id,
    createdAt: created.createdAt,
    summary: created.summaryJson,
    baselineActiveId: created.id
  });
});

app.get("/api/projects/:id/baselines", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { workspace: true }
  });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const baselines = await prisma.baselineSnapshot.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, label: true, summaryJson: true }
  });

  return res.json({
    baselineActiveId: project.baselineActiveId,
    baselines
  });
});

app.get("/api/projects/:id/risks", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const risks = await prisma.risk.findMany({
    where: { projectId },
    orderBy: [{ severity: "desc" }, { createdAt: "desc" }]
  });

  return res.json({ risks });
});

app.get("/api/projects/:id/interventions", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const interventions = await prisma.intervention.findMany({
    where: { projectId },
    orderBy: [
      { dueDate: { sort: "asc", nulls: "last" } },
      { updatedAt: "desc" }
    ]
  });

  return res.json({ interventions });
});

app.get("/api/interventions", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = typeof req.query.workspaceId === "string" ? req.query.workspaceId : "";
  if (!workspaceId) {
    return res.status(400).json({ error: "WORKSPACE_ID_REQUIRED" });
  }

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;

  const scope = typeof req.query.scope === "string" ? req.query.scope : "workspace";
  const allowedStatuses = ["open", "in_progress", "done", "canceled"];
  const statuses = parseStatusList(req.query.status, allowedStatuses, ["open", "in_progress"]);
  const limit = parseLimit(req.query.limit, 50);

  const baseWhere: Prisma.InterventionWhereInput = {
    workspaceId,
    ...(scope === "mine" ? { ownerUserId: userId } : {})
  };

  const now = new Date();
  const active = statuses.filter((s) => s === "open" || s === "in_progress");
  const inactive = statuses.filter((s) => s === "done" || s === "canceled");

  const overdue = active.length
    ? await prisma.intervention.findMany({
        where: {
          ...baseWhere,
          status: { in: active as InterventionStatus[] },
          dueDate: { lt: now }
        },
        include: { project: { select: { id: true, name: true } } },
        take: limit,
        orderBy: [{ dueDate: "asc" }, { updatedAt: "desc" }]
      })
    : [];

  const remaining = limit - overdue.length;
  if (remaining <= 0) return res.json({ interventions: overdue });

  const nonOverdueClauses: Prisma.InterventionWhereInput[] = [];

  if (active.length) {
    nonOverdueClauses.push({
      status: { in: active as InterventionStatus[] },
      OR: [{ dueDate: null }, { dueDate: { gte: now } }]
    });
  }

  if (inactive.length) {
    nonOverdueClauses.push({
      status: { in: inactive as InterventionStatus[] }
    });
  }

  const nonOverdue = nonOverdueClauses.length
    ? await prisma.intervention.findMany({
        where: { ...baseWhere, OR: nonOverdueClauses },
        include: { project: { select: { id: true, name: true } } },
        take: remaining,
        orderBy: [
          { dueDate: { sort: "asc", nulls: "last" } },
          { updatedAt: "desc" }
        ]
      })
    : [];

  return res.json({ interventions: [...overdue, ...nonOverdue] });
});

app.patch("/api/interventions/:id", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const interventionId = req.params.id;

  const intervention = await prisma.intervention.findUnique({
    where: { id: interventionId },
    include: { project: { include: { workspace: true } } }
  });

  if (!intervention) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, intervention.project.workspaceId, userId);
  if (!member) return;

  if (!hasMinRole(member.role, "member")) {
    return res.status(403).json({ error: "FORBIDDEN" });
  }

  const statusInput = req.body?.status;
  if (statusInput !== undefined) {
    const allowed = ["open", "in_progress", "done", "canceled"];
    if (typeof statusInput !== "string" || !allowed.includes(statusInput)) {
      return res.status(400).json({ error: "INVALID_STATUS" });
    }
  }

  const nextStatus = (statusInput ?? intervention.status) as InterventionStatus;
  const shouldAutoAssignOwner = statusInput === "in_progress" && !intervention.ownerUserId;
  const statusChanged = statusInput !== undefined && statusInput !== intervention.status;

  if (statusInput === "done") {
    if (!hasEvidence(req.body)) {
      return res.status(400).json({ error: "EVIDENCE_REQUIRED" });
    }
  }

  const closing =
    statusInput !== undefined &&
    (nextStatus === "done" || nextStatus === "canceled");

  const reopening =
    statusInput !== undefined &&
    (intervention.status === "done" || intervention.status === "canceled") &&
    (nextStatus === "open" || nextStatus === "in_progress");

  const updated = await prisma.intervention.update({
    where: { id: interventionId },
    data: {
      status: statusInput !== undefined ? nextStatus : undefined,
      ownerUserId: shouldAutoAssignOwner ? userId : undefined,
      evidenceNote: typeof req.body?.evidenceNote === "string" ? req.body.evidenceNote : undefined,
      evidenceLinksJson: Array.isArray(req.body?.evidenceLinksJson) ? req.body.evidenceLinksJson : undefined,
      checklistJson: Array.isArray(req.body?.checklistJson) ? req.body.checklistJson : undefined,
      closedAt: closing ? new Date() : reopening ? null : undefined,
      closedByUserId: closing ? userId : reopening ? null : undefined
    }
  });

  if (statusChanged || shouldAutoAssignOwner) {
    await audit({
      workspaceId: intervention.project.workspaceId,
      projectId: intervention.projectId,
      actorUserId: userId,
      type: "intervention_patch",
      payload: {
        interventionId,
        fromStatus: intervention.status,
        toStatus: statusInput ?? intervention.status,
        autoOwner: shouldAutoAssignOwner
      }
    });
  }

  return res.json(updated);
});

app.post("/api/projects/:id/seen", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  await prisma.userProjectLastSeen.upsert({
    where: { userId_projectId: { userId, projectId } },
    create: { userId, projectId, lastSeenAt: new Date() },
    update: { lastSeenAt: new Date() }
  });

  return res.json({ ok: true });
});

app.get("/api/workspaces/:id/projects", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const workspaceId = req.params.id;

  const member = await requireWorkspaceMember(res, workspaceId, userId);
  if (!member) return;

  const projects = await prisma.project.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, name: true, health: true, healthReason: true }
  });

  const projectIds = projects.map((p) => p.id);
  if (projectIds.length === 0) return res.json({ projects: [] });

  const riskGroups = await prisma.risk.groupBy({
    by: ["projectId"],
    where: {
      projectId: { in: projectIds },
      severity: RiskSeverity.high,
      status: { in: [RiskStatus.open, RiskStatus.ack] }
    },
    _count: { _all: true }
  });

  const interventionGroups = await prisma.intervention.groupBy({
    by: ["projectId"],
    where: {
      projectId: { in: projectIds },
      status: { in: [InterventionStatus.open, InterventionStatus.in_progress] }
    },
    _count: { _all: true }
  });

  const lastSeenRows = await prisma.userProjectLastSeen.findMany({
    where: { userId, projectId: { in: projectIds } }
  });

  const interventionMax = await prisma.intervention.groupBy({
    by: ["projectId"],
    where: { projectId: { in: projectIds } },
    _max: { updatedAt: true }
  });

  const riskCountByProject = new Map<string, number>();
  for (const row of riskGroups) riskCountByProject.set(row.projectId, row._count._all);

  const interventionCountByProject = new Map<string, number>();
  for (const row of interventionGroups) {
    interventionCountByProject.set(row.projectId, row._count._all);
  }

  const lastSeenByProject = new Map<string, Date>();
  for (const row of lastSeenRows) lastSeenByProject.set(row.projectId, row.lastSeenAt);

  const maxUpdatedByProject = new Map<string, Date>();
  for (const row of interventionMax) {
    if (row._max.updatedAt) maxUpdatedByProject.set(row.projectId, row._max.updatedAt);
  }

  const hasNewByProject = new Map<string, boolean>();
  for (const projectId of projectIds) {
    const lastSeen = lastSeenByProject.get(projectId);
    const maxUpdated = maxUpdatedByProject.get(projectId);
    const isNew = !!maxUpdated && (!lastSeen || maxUpdated.getTime() > lastSeen.getTime());
    if (isNew) hasNewByProject.set(projectId, true);
  }

  const payload = projects.map((project) => ({
    id: project.id,
    name: project.name,
    health: project.health,
    healthReason: project.healthReason,
    openHighRisks: riskCountByProject.get(project.id) ?? 0,
    openInterventions: interventionCountByProject.get(project.id) ?? 0,
    hasNew: hasNewByProject.get(project.id) ?? false
  }));

  return res.json({ projects: payload });
});

app.get("/api/ops/worker", async (_req: AuthenticatedRequest, res) => {
  const queueDepth = await prisma.recomputeQueue.count();
  const oldest = await prisma.recomputeQueue.findFirst({
    orderBy: { nextRunAt: "asc" },
    select: { nextRunAt: true }
  });
  const lockedCount = await prisma.recomputeQueue.count({
    where: { lockedAt: { not: null } }
  });

  const staleMs = Math.min(
    Math.max(Number(process.env.RECOMPUTE_STALE_LOCK_MS ?? 60000), 5000),
    10 * 60 * 1000
  );
  const stale = new Date(Date.now() - staleMs);
  const staleLocks = await prisma.recomputeQueue.count({
    where: { lockedAt: { lt: stale } }
  });

  return res.json({
    queueDepth,
    oldestNextRunAt: oldest?.nextRunAt ?? null,
    lockedCount,
    staleLocks
  });
});

app.get("/api/projects/:id/recompute-runs", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const limit = parseLimit(req.query.limit, 50);

  const runs = await prisma.recomputeRun.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    take: limit
  });

  return res.json({ runs });
});

app.get("/api/projects/:id/audit-events", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  const limit = parseLimit(req.query.limit, 100);

  const type = typeof req.query.type === "string" && req.query.type.trim() ? req.query.type.trim() : null;
  const actorUserId =
    typeof req.query.actorUserId === "string" && req.query.actorUserId.trim()
      ? req.query.actorUserId.trim()
      : null;

  const beforeRaw = typeof req.query.before === "string" ? req.query.before : null;
  let before: Date | null = null;
  if (beforeRaw) {
    const d = new Date(beforeRaw);
    if (Number.isNaN(d.getTime())) return res.status(400).json({ error: "INVALID_BEFORE" });
    before = d;
  }

  const where: any = {
    projectId,
    ...(type ? { type } : {}),
    ...(actorUserId ? { actorUserId } : {}),
    ...(before ? { createdAt: { lt: before } } : {})
  };

  const events = await prisma.auditEvent.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit
  });

  const nextBefore = events.length ? events[events.length - 1].createdAt.toISOString() : null;

  return res.json({ events, nextBefore });
});

app.get("/api/projects/:id/baseline-diff", async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const projectId = req.params.id;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { baselineActive: true }
  });

  if (!project) return res.status(404).json({ error: "NOT_FOUND" });

  const member = await requireWorkspaceMember(res, project.workspaceId, userId);
  if (!member) return;

  if (!project.baselineActive) {
    return res.json({
      baselineActiveId: null,
      slipsCritical: [],
      overdueCritical: []
    });
  }

  const baselinePayload: any = project.baselineActive.payloadJson ?? {};
  const baselineItems: any[] = Array.isArray(baselinePayload.workItems) ? baselinePayload.workItems : [];

  const baselineDueById = new Map<string, string>();
  for (const it of baselineItems) {
    const id = String(it?.id ?? "");
    const due = typeof it?.dueDate === "string" ? it.dueDate.slice(0, 10) : null;
    if (id && due) baselineDueById.set(id, due);
  }

  const items = await prisma.workItem.findMany({
    where: { projectId, isCritical: true, type: WorkItemType.milestone },
    select: { id: true, title: true, dueDate: true, doneAt: true }
  });

  const today = toDateOnlyUTC(new Date());

  const slipsCritical: any[] = [];
  const overdueCritical: any[] = [];

  for (const wi of items) {
    const baseDue = baselineDueById.get(wi.id) ?? null;
    const curDue = wi.dueDate ? toDateOnlyUTC(wi.dueDate) : null;

    if (baseDue && curDue) {
      const slipDays = daysDiffDateOnly(baseDue, curDue);
      if (slipDays > 0) {
        slipsCritical.push({
          workItemId: wi.id,
          title: wi.title,
          baselineDue: baseDue,
          currentDue: curDue,
          slipDays
        });
      }
    }

    if (!wi.doneAt && curDue && curDue < today) {
      overdueCritical.push({
        workItemId: wi.id,
        title: wi.title,
        dueDate: curDue,
        daysOverdue: daysDiffDateOnly(curDue, today)
      });
    }
  }

  slipsCritical.sort((a, b) => b.slipDays - a.slipDays);
  overdueCritical.sort((a, b) => b.daysOverdue - a.daysOverdue);

  return res.json({
    baselineActiveId: project.baselineActiveId,
    slipsCritical: slipsCritical.slice(0, 10),
    overdueCritical: overdueCritical.slice(0, 10)
  });
});

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`server up on ${port}`);
});
