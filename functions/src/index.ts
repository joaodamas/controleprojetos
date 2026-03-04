import {setGlobalOptions} from "firebase-functions";
import {onCall, HttpsError} from "firebase-functions/https";
import {onDocumentCreated} from "firebase-functions/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();

setGlobalOptions({maxInstances: 10});

const ADMIN_EMAILS = new Set([
  "joaodamasit@gmail.com",
  "joaodamas4@gmail.com",
]);

// ─── Set Custom Claims (admin role) ───
// Called once per user after signup or manually by an existing admin
export const setAdminClaim = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const callerEmail = request.auth.token.email;
  const callerIsAdmin = request.auth.token.admin === true ||
    ADMIN_EMAILS.has(callerEmail ?? "");

  if (!callerIsAdmin) {
    throw new HttpsError("permission-denied", "Apenas admins podem definir roles.");
  }

  const {targetUid, role} = request.data as {targetUid: string; role: string};

  if (!targetUid || !role) {
    throw new HttpsError("invalid-argument", "targetUid e role são obrigatórios.");
  }

  const validRoles = ["admin", "manager", "viewer"];
  if (!validRoles.includes(role)) {
    throw new HttpsError("invalid-argument", `Role inválida. Use: ${validRoles.join(", ")}`);
  }

  const isAdmin = role === "admin";
  await admin.auth().setCustomUserClaims(targetUid, {admin: isAdmin, role});

  await admin.database().ref(`users/${targetUid}`).update({
    role,
    isAdmin,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
  });

  return {success: true, message: `Role '${role}' definida para ${targetUid}.`};
});

// ─── Auto-set admin claim for known admin emails on first login ───
export const onUserCreated = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const uid = request.auth.uid;
  const email = request.auth.token.email ?? "";

  if (ADMIN_EMAILS.has(email.toLowerCase())) {
    await admin.auth().setCustomUserClaims(uid, {admin: true, role: "admin"});
    await admin.database().ref(`users/${uid}`).update({
      isAdmin: true,
      role: "admin",
    });
    return {admin: true};
  }

  const currentClaims = (await admin.auth().getUser(uid)).customClaims || {};
  if (!currentClaims.role) {
    await admin.auth().setCustomUserClaims(uid, {admin: false, role: "viewer"});
    await admin.database().ref(`users/${uid}`).update({
      isAdmin: false,
      role: "viewer",
    });
  }

  return {admin: false};
});

// ─── List users (admin only) - bypasses client DB rules when admin doc not yet synced ───
export const listUsersByAdmin = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const uid = request.auth.uid;
  const email = request.auth.token.email ?? "";
  const callerIsAdmin = request.auth.token.admin === true ||
    ADMIN_EMAILS.has(email.toLowerCase());

  if (!callerIsAdmin) {
    throw new HttpsError("permission-denied", "Apenas administradores podem listar usuários.");
  }

  // Garantir que o documento do admin tenha isAdmin: true para leituras diretas futuras
  await admin.database().ref(`users/${uid}`).update({
    isAdmin: true,
    role: "admin",
    email: email || undefined,
    displayName: request.auth.token.name || undefined,
    updatedAt: admin.database.ServerValue.TIMESTAMP,
  });

  const snapshot = await admin.database().ref("users").once("value");
  const raw = snapshot.val() || {};
  const users = Object.entries(raw).map(([userUid, data]) => {
    const d = (data as Record<string, unknown>) || {};
    return {
      uid: userUid,
      email: d?.email ?? "",
      displayName: d?.displayName ?? "",
      role: d?.role ?? "viewer",
      createdAt: d?.createdAt ?? null,
      lastLoginAt: d?.lastLoginAt ?? null,
    };
  });

  return {users};
});

// ─── Create user by admin ───
export const createUserByAdmin = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const callerEmail = request.auth.token.email;
  const callerIsAdmin = request.auth.token.admin === true ||
    ADMIN_EMAILS.has(callerEmail ?? "");

  if (!callerIsAdmin) {
    throw new HttpsError("permission-denied", "Apenas admins podem criar usuários.");
  }

  const {email, displayName, role} = request.data as {
    email: string;
    displayName?: string;
    role: string;
  };

  if (!email || !email.includes("@")) {
    throw new HttpsError("invalid-argument", "E-mail inválido.");
  }

  const validRoles = ["admin", "manager", "viewer"];
  const safeRole = validRoles.includes(role) ? role : "viewer";
  const isAdminRole = safeRole === "admin";

  try {
    const userRecord = await admin.auth().createUser({
      email: email.trim().toLowerCase(),
      displayName: (displayName || "").trim() || undefined,
      disabled: false,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: isAdminRole,
      role: safeRole,
    });

    await admin.database().ref(`users/${userRecord.uid}`).set({
      email: userRecord.email,
      displayName: userRecord.displayName || "",
      role: safeRole,
      isAdmin: isAdminRole,
      status: "active",
      createdAt: admin.database.ServerValue.TIMESTAMP,
      createdBy: request.auth.uid,
    });

    const resetLink = await admin.auth().generatePasswordResetLink(email);

    return {
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      resetLink,
      message: `Usuário ${email} criado com sucesso.`,
    };
  } catch (err: unknown) {
    const error = err as {code?: string; message?: string};
    if (error.code === "auth/email-already-exists") {
      throw new HttpsError("already-exists", "Este e-mail já está cadastrado.");
    }
    throw new HttpsError("internal", error.message || "Erro ao criar usuário.");
  }
});

// ─── Toggle user status (enable/disable) ───
export const toggleUserStatus = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const callerEmail = request.auth.token.email;
  const callerIsAdmin = request.auth.token.admin === true ||
    ADMIN_EMAILS.has(callerEmail ?? "");

  if (!callerIsAdmin) {
    throw new HttpsError("permission-denied", "Apenas admins podem alterar status.");
  }

  const {targetUid, disabled} = request.data as {
    targetUid: string;
    disabled: boolean;
  };

  if (!targetUid) {
    throw new HttpsError("invalid-argument", "targetUid é obrigatório.");
  }

  if (targetUid === request.auth.uid) {
    throw new HttpsError("failed-precondition", "Você não pode desativar a si mesmo.");
  }

  await admin.auth().updateUser(targetUid, {disabled: !!disabled});

  await admin.database().ref(`users/${targetUid}`).update({
    status: disabled ? "disabled" : "active",
    updatedAt: admin.database.ServerValue.TIMESTAMP,
  });

  return {
    success: true,
    disabled: !!disabled,
    message: disabled ? "Usuário desativado." : "Usuário reativado.",
  };
});

// ─── Write audit log on sensitive Firestore changes ───
export const onAuditableChange = onDocumentCreated(
  "tenants/{tenantId}/clients/{clientId}/projects/{projectId}",
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const {tenantId, projectId} = event.params;

    await admin.database().ref(`audit_logs/${tenantId}`).push({
      action: `project_created:${projectId}`,
      details: {name: data?.name ?? "N/A"},
      userId: tenantId,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });
  }
);

// ─── Validate and enforce business rules server-side ───
export const validateProjectData = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Autenticação necessária.");
  }

  const project = request.data as Record<string, unknown>;

  const requiredFields = ["name", "start", "end"];
  for (const field of requiredFields) {
    if (!project[field] || typeof project[field] !== "string" ||
        (project[field] as string).trim().length === 0) {
      throw new HttpsError("invalid-argument", `Campo obrigatório ausente: ${field}`);
    }
  }

  const name = (project.name as string).trim();
  if (name.length > 200) {
    throw new HttpsError("invalid-argument", "Nome do projeto excede 200 caracteres.");
  }

  const start = new Date(project.start as string);
  const end = new Date(project.end as string);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new HttpsError("invalid-argument", "Datas inválidas.");
  }
  if (end <= start) {
    throw new HttpsError("invalid-argument", "Data de término deve ser posterior à data de início.");
  }

  const validStatuses = [
    "planejado", "em_andamento", "em_validacao", "parado", "atrasado", "concluido",
  ];
  if (project.status && !validStatuses.includes(project.status as string)) {
    throw new HttpsError("invalid-argument",
      `Status inválido. Use: ${validStatuses.join(", ")}`);
  }

  return {valid: true, sanitized: {name, start: project.start, end: project.end}};
});
