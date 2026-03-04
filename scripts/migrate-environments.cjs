/**
 * Script de migração para ambientes com bases distintas.
 *
 * Para o ambiente prod (default-rtdb):
 * - Se clients/groups estiverem vazios na raiz, copia de workspaces/default/
 * - Garante que admins tenham isAdmin no RTDB
 *
 * Para staging/demo: criar as instâncias no Firebase Console primeiro,
 * depois rodar este script com FIREBASE_DATABASE_URL apontando para cada uma.
 *
 * Uso:
 *   node scripts/migrate-environments.cjs
 *   FIREBASE_DATABASE_URL=https://...-staging-rtdb.firebaseio.com node scripts/migrate-environments.cjs
 *
 * Requer: GOOGLE_APPLICATION_CREDENTIALS
 */

const admin = require("firebase-admin");

const DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL ||
  "https://controle-projetos-a55d5-default-rtdb.firebaseio.com";

async function migrate() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({ databaseURL: DATABASE_URL });
    } catch (err) {
      console.error(
        "Falha ao inicializar Firebase Admin. Configure GOOGLE_APPLICATION_CREDENTIALS."
      );
      console.error(err);
      process.exit(1);
    }
  }

  const db = admin.database();

  console.log("Migração para ambientes");
  console.log(`  Database: ${DATABASE_URL}`);
  console.log("");

  const updates = {};

  console.log("[1/4] Verificando clients na raiz...");
  const clientsRoot = await db.ref("clients").once("value");
  const clientsAtRoot = clientsRoot.val() || {};
  const hasClientsAtRoot = Object.keys(clientsAtRoot).length > 0;

  if (!hasClientsAtRoot) {
    console.log("     clients/ vazio. Copiando de workspaces/default/clients...");
    const legacyClients = await db.ref("workspaces/default/clients").once("value");
    const legacy = legacyClients.val() || {};
    if (Object.keys(legacy).length > 0) {
      Object.entries(legacy).forEach(([id, data]) => {
        updates[`clients/${id}`] = data;
      });
      console.log(`     ${Object.keys(legacy).length} clientes copiados`);
    } else {
      console.log("     Nenhum dado em workspaces/default/clients");
    }
  } else {
    console.log(`     clients/ já possui ${Object.keys(clientsAtRoot).length} itens`);
  }

  console.log("[2/4] Verificando groups na raiz...");
  const groupsRoot = await db.ref("groups").once("value");
  const groupsAtRoot = groupsRoot.val() || {};
  const hasGroupsAtRoot = Object.keys(groupsAtRoot).length > 0;

  if (!hasGroupsAtRoot) {
    console.log("     groups/ vazio. Copiando de workspaces/default/groups...");
    const legacyGroups = await db.ref("workspaces/default/groups").once("value");
    const legacy = legacyGroups.val() || {};
    if (Object.keys(legacy).length > 0) {
      Object.entries(legacy).forEach(([id, data]) => {
        updates[`groups/${id}`] = data;
      });
      console.log(`     ${Object.keys(legacy).length} grupos copiados`);
    } else {
      console.log("     Nenhum dado em workspaces/default/groups");
    }
  } else {
    console.log(`     groups/ já possui ${Object.keys(groupsAtRoot).length} itens`);
  }

  console.log("[3/4] Lendo users...");
  const usersSnap = await db.ref("users").once("value");
  const users = usersSnap.val() || {};
  const adminUids = Object.entries(users)
    .filter(([, data]) => data?.isAdmin === true)
    .map(([uid]) => uid);
  console.log(`     ${Object.keys(users).length} usuarios, ${adminUids.length} admins`);

  console.log("[4/4] Garantindo isAdmin para admins...");
  adminUids.forEach((uid) => {
    if (!users[uid]?.isAdmin) {
      updates[`users/${uid}/isAdmin`] = true;
    }
  });

  if (Object.keys(updates).length > 0) {
    await db.ref().update(updates);
    console.log("");
    console.log("Migração concluída. Atualizações aplicadas.");
  } else {
    console.log("");
    console.log("Nenhuma atualização necessária.");
  }

  console.log("");
  console.log("Para ambientes staging/demo:");
  console.log("  1. Crie as instâncias no Firebase Console (Realtime Database)");
  console.log("  2. Deploy das regras: firebase target:apply database staging staging-rtdb");
  console.log("  3. Rode: FIREBASE_DATABASE_URL=https://...-staging-rtdb.firebaseio.com node scripts/migrate-environments.cjs");
}

migrate().catch((err) => {
  console.error("Erro na migração:", err);
  process.exit(1);
});
