/**
 * Script de migração: copia clients/ e groups/ para workspaces/default/
 * e adiciona todos os admins a users/{uid}/workspaces/default
 *
 * Uso: node scripts/migrate-to-workspaces.cjs
 *
 * Requer: GOOGLE_APPLICATION_CREDENTIALS apontando para service account JSON
 * ou execute via Firebase: firebase functions:shell e rode a função
 */

const admin = require("firebase-admin");

const WORKSPACE_ID = "default";

async function migrate() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        databaseURL:
          process.env.FIREBASE_DATABASE_URL ||
          "https://controle-projetos-a55d5-default-rtdb.firebaseio.com",
      });
    } catch (err) {
      console.error(
        "Falha ao inicializar Firebase Admin. Configure GOOGLE_APPLICATION_CREDENTIALS."
      );
      console.error(err);
      process.exit(1);
    }
  }

  const db = admin.database();

  console.log("[1/4] Lendo clients...");
  const clientsSnap = await db.ref("clients").once("value");
  const clients = clientsSnap.val() || {};
  const clientCount = Object.keys(clients).length;
  console.log(`     ${clientCount} clientes encontrados`);

  console.log("[2/4] Lendo groups...");
  const groupsSnap = await db.ref("groups").once("value");
  const groups = groupsSnap.val() || {};
  const groupCount = Object.keys(groups).length;
  console.log(`     ${groupCount} grupos encontrados`);

  console.log("[3/4] Lendo users...");
  const usersSnap = await db.ref("users").once("value");
  const users = usersSnap.val() || {};
  const adminUids = Object.entries(users)
    .filter(([, data]) => data?.isAdmin === true)
    .map(([uid]) => uid);
  const allUids = Object.keys(users);
  console.log(`     ${allUids.length} usuarios, ${adminUids.length} admins`);

  const updates = {};

  if (clientCount > 0) {
    Object.entries(clients).forEach(([clientId, data]) => {
      updates[`workspaces/${WORKSPACE_ID}/clients/${clientId}`] = data;
    });
  }

  if (groupCount > 0) {
    Object.entries(groups).forEach(([groupId, data]) => {
      updates[`workspaces/${WORKSPACE_ID}/groups/${groupId}`] = data;
    });
  }

  updates[`workspaces/${WORKSPACE_ID}/name`] = "Workspace principal";
  updates[`workspaces/${WORKSPACE_ID}/slug`] = "default";
  updates[`workspaces/${WORKSPACE_ID}/createdAt`] =
    admin.database.ServerValue.TIMESTAMP;

  if (adminUids.length > 0) {
    updates[`workspaces/${WORKSPACE_ID}/ownerId`] = adminUids[0];
  }

  allUids.forEach((uid) => {
    const role = users[uid]?.isAdmin ? "admin" : (users[uid]?.role || "viewer");
    updates[`users/${uid}/workspaces/${WORKSPACE_ID}`] = role;
    if (role === "admin" && !users[uid]?.isAdmin) {
      updates[`users/${uid}/isAdmin`] = true;
    }
  });

  console.log("[4/4] Escrevendo workspaces/default...");
  await db.ref().update(updates);

  console.log("");
  console.log("Migração concluída.");
  console.log(`  - workspaces/${WORKSPACE_ID}/clients: ${clientCount} clientes`);
  console.log(`  - workspaces/${WORKSPACE_ID}/groups: ${groupCount} grupos`);
  console.log(`  - ${allUids.length} usuarios adicionados ao workspace`);
  console.log("");
  console.log("Link para acessar: /w/" + WORKSPACE_ID);
}

migrate().catch((err) => {
  console.error("Erro na migração:", err);
  process.exit(1);
});
