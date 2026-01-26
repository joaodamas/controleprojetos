-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('owner', 'admin', 'manager', 'member', 'viewer');

-- CreateEnum
CREATE TYPE "WorkspaceInviteStatus" AS ENUM ('pending', 'accepted', 'revoked', 'expired');

-- CreateEnum
CREATE TYPE "WorkItemType" AS ENUM ('phase', 'milestone', 'task');

-- CreateEnum
CREATE TYPE "RiskSeverity" AS ENUM ('low', 'med', 'high');

-- CreateEnum
CREATE TYPE "RiskStatus" AS ENUM ('open', 'ack', 'resolved', 'ignored');

-- CreateEnum
CREATE TYPE "InterventionStatus" AS ENUM ('open', 'in_progress', 'done', 'canceled');

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blueprintId" TEXT,
    "blueprintVersion" INTEGER,
    "governancePreset" TEXT,
    "statusesJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkspaceRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceInvite" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "WorkspaceRole" NOT NULL,
    "status" "WorkspaceInviteStatus" NOT NULL DEFAULT 'pending',
    "tokenHash" TEXT NOT NULL,
    "tokenPrefix" TEXT,
    "invitedByUserId" TEXT NOT NULL,
    "acceptedByUserId" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "clientId" TEXT,
    "name" TEXT NOT NULL,
    "health" TEXT,
    "healthReason" TEXT,
    "baselineActiveId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkItem" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "WorkItemType" NOT NULL,
    "parentId" TEXT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "doneAt" TIMESTAMP(3),
    "ownerUserId" TEXT,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaselineSnapshot" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT,
    "payloadJson" JSONB NOT NULL,
    "summaryJson" JSONB,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BaselineSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "targetKey" TEXT NOT NULL,
    "targetWorkItemId" TEXT,
    "severity" "RiskSeverity" NOT NULL,
    "status" "RiskStatus" NOT NULL,
    "explanation" TEXT NOT NULL,
    "evidenceJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Risk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intervention" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "riskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "InterventionStatus" NOT NULL,
    "ownerUserId" TEXT,
    "dueDate" TIMESTAMP(3),
    "checklistJson" JSONB,
    "evidenceLinksJson" JSONB,
    "evidenceNote" TEXT,
    "closedAt" TIMESTAMP(3),
    "closedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProjectLastSeen" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProjectLastSeen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT,
    "actorUserId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecomputeRun" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "candidates" INTEGER NOT NULL,
    "upserted" INTEGER NOT NULL,
    "resolved" INTEGER NOT NULL,
    "high" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecomputeRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecomputeQueue" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "nextRunAt" TIMESTAMP(3) NOT NULL,
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecomputeQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkspaceMember_userId_idx" ON "WorkspaceMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspaceId_userId_key" ON "WorkspaceMember"("workspaceId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceInvite_tokenHash_key" ON "WorkspaceInvite"("tokenHash");

-- CreateIndex
CREATE INDEX "WorkspaceInvite_workspaceId_status_createdAt_idx" ON "WorkspaceInvite"("workspaceId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "WorkspaceInvite_email_status_idx" ON "WorkspaceInvite"("email", "status");

-- CreateIndex
CREATE INDEX "WorkspaceInvite_expiresAt_idx" ON "WorkspaceInvite"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceInvite_workspaceId_email_status_key" ON "WorkspaceInvite"("workspaceId", "email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Project_baselineActiveId_key" ON "Project"("baselineActiveId");

-- CreateIndex
CREATE INDEX "Project_workspaceId_idx" ON "Project"("workspaceId");

-- CreateIndex
CREATE INDEX "WorkItem_projectId_idx" ON "WorkItem"("projectId");

-- CreateIndex
CREATE INDEX "WorkItem_parentId_idx" ON "WorkItem"("parentId");

-- CreateIndex
CREATE INDEX "BaselineSnapshot_projectId_createdAt_idx" ON "BaselineSnapshot"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "Risk_projectId_status_idx" ON "Risk"("projectId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Risk_projectId_ruleId_targetKey_key" ON "Risk"("projectId", "ruleId", "targetKey");

-- CreateIndex
CREATE UNIQUE INDEX "Intervention_riskId_key" ON "Intervention"("riskId");

-- CreateIndex
CREATE INDEX "Intervention_projectId_status_idx" ON "Intervention"("projectId", "status");

-- CreateIndex
CREATE INDEX "Intervention_workspaceId_status_idx" ON "Intervention"("workspaceId", "status");

-- CreateIndex
CREATE INDEX "Intervention_workspaceId_status_dueDate_idx" ON "Intervention"("workspaceId", "status", "dueDate");

-- CreateIndex
CREATE INDEX "Intervention_workspaceId_status_updatedAt_idx" ON "Intervention"("workspaceId", "status", "updatedAt");

-- CreateIndex
CREATE INDEX "UserProjectLastSeen_projectId_idx" ON "UserProjectLastSeen"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProjectLastSeen_userId_projectId_key" ON "UserProjectLastSeen"("userId", "projectId");

-- CreateIndex
CREATE INDEX "AuditEvent_workspaceId_createdAt_idx" ON "AuditEvent"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_projectId_createdAt_idx" ON "AuditEvent"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_type_createdAt_idx" ON "AuditEvent"("type", "createdAt");

-- CreateIndex
CREATE INDEX "RecomputeRun_workspaceId_createdAt_idx" ON "RecomputeRun"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "RecomputeRun_projectId_createdAt_idx" ON "RecomputeRun"("projectId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RecomputeQueue_projectId_key" ON "RecomputeQueue"("projectId");

-- CreateIndex
CREATE INDEX "RecomputeQueue_nextRunAt_idx" ON "RecomputeQueue"("nextRunAt");

-- CreateIndex
CREATE INDEX "RecomputeQueue_lockedAt_idx" ON "RecomputeQueue"("lockedAt");

-- CreateIndex
CREATE INDEX "RecomputeQueue_workspaceId_nextRunAt_idx" ON "RecomputeQueue"("workspaceId", "nextRunAt");

-- CreateIndex
CREATE INDEX "RecomputeQueue_nextRunAt_lockedAt_idx" ON "RecomputeQueue"("nextRunAt", "lockedAt");

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceInvite" ADD CONSTRAINT "WorkspaceInvite_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_baselineActiveId_fkey" FOREIGN KEY ("baselineActiveId") REFERENCES "BaselineSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "WorkItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaselineSnapshot" ADD CONSTRAINT "BaselineSnapshot_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaselineSnapshot" ADD CONSTRAINT "BaselineSnapshot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "Risk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProjectLastSeen" ADD CONSTRAINT "UserProjectLastSeen_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecomputeRun" ADD CONSTRAINT "RecomputeRun_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecomputeRun" ADD CONSTRAINT "RecomputeRun_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecomputeQueue" ADD CONSTRAINT "RecomputeQueue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
