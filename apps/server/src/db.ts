import { PrismaClient } from "@prisma/client";

import { loadEnv } from "./env";

// Ensure DATABASE_URL is available for PrismaClient at runtime.
loadEnv();

const url = process.env.DATABASE_URL;
if (!url || typeof url !== "string" || url.trim().length === 0) {
  throw new Error(
    'DATABASE_URL is missing. Create "apps/server/.env.local" with DATABASE_URL=... or set it in the environment.'
  );
}

export const prisma = new PrismaClient({
  datasources: { db: { url } },
});
