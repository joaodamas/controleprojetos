import admin from "firebase-admin";
import type { WorkspaceRole } from "@prisma/client";

type MemberStatus = "active" | "pending" | "removed";

let adminApp: admin.app.App | null = null;

function initAdminApp() {
  if (adminApp) return adminApp;

  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  if (!databaseURL) {
    throw new Error("FIREBASE_DATABASE_URL_MISSING");
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    const parsed = JSON.parse(serviceAccountJson);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(parsed),
      databaseURL
    });
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKeyRaw) {
    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
    adminApp = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      databaseURL
    });
    return adminApp;
  }

  adminApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL
  });

  return adminApp;
}

function getDatabase() {
  return initAdminApp().database();
}

export async function mirrorMembership(params: {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
  status?: MemberStatus;
}) {
  const { workspaceId, userId, role } = params;
  const status = params.status ?? "active";
  const joinedAt = Date.now();

  const db = getDatabase();
  const updates: Record<string, any> = {};
  updates[`groups/${workspaceId}/members/${userId}`] = { role, status, joinedAt };
  updates[`users/${userId}/groups/${workspaceId}`] = { role, status, joinedAt };

  await db.ref().update(updates);
}

export async function removeMembership(params: { workspaceId: string; userId: string }) {
  const { workspaceId, userId } = params;
  const db = getDatabase();
  const updates: Record<string, any> = {};
  updates[`groups/${workspaceId}/members/${userId}`] = null;
  updates[`users/${userId}/groups/${workspaceId}`] = null;
  await db.ref().update(updates);
}
