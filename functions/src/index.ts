/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

export const deleteUser = onCall(async (request) => {
  const auth = request.auth;
  if (!auth) {
    throw new HttpsError("unauthenticated", "AUTH_REQUIRED");
  }

  const targetUid = String(request.data?.uid || "");
  if (!targetUid) {
    throw new HttpsError("invalid-argument", "UID_REQUIRED");
  }

  if (targetUid === auth.uid) {
    throw new HttpsError("failed-precondition", "CANNOT_DELETE_SELF");
  }

  const email = typeof auth.token?.email === "string" ? auth.token.email.toLowerCase() : "";
  let isAdmin = email === "joaodamasit@gmail.com";

  if (!isAdmin) {
    const roleSnap = await admin.database().ref(`users/${auth.uid}/role`).get();
    isAdmin = roleSnap.exists() && roleSnap.val() === "admin";
  }

  if (!isAdmin) {
    throw new HttpsError("permission-denied", "ADMIN_ONLY");
  }

  const updates: Record<string, null> = {
    [`users/${targetUid}`]: null,
    [`tenants/${targetUid}`]: null
  };

  const groupsSnap = await admin.database().ref("groups").get();
  if (groupsSnap.exists()) {
    groupsSnap.forEach((child) => {
      const groupId = child.key;
      if (!groupId) return false;
      const hasMember = child.child("members").child(targetUid).exists();
      if (hasMember) {
        updates[`groups/${groupId}/members/${targetUid}`] = null;
      }
      return false;
    });
  }

  await admin.database().ref().update(updates);

  try {
    await admin.auth().deleteUser(targetUid);
  } catch (err: any) {
    if (err?.code !== "auth/user-not-found") {
      throw new HttpsError("internal", "AUTH_DELETE_FAILED");
    }
  }

  return { ok: true };
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
