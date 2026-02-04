import { PrismaClient } from "@prisma/client";
import { loadEnv } from "./env";

loadEnv();

if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary";
}

console.log("[DB] DATABASE_URL=", process.env.DATABASE_URL);
console.log("[DB] ACCELERATE_URL=", process.env.ACCELERATE_URL);
console.log("[DB] PRISMA_ACCELERATE_URL=", process.env.PRISMA_ACCELERATE_URL);
console.log("[DB] PRISMA_CLIENT_ENGINE_TYPE=", process.env.PRISMA_CLIENT_ENGINE_TYPE);

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL ausente. Crie apps/server/.env.local com DATABASE_URL=prisma+postgres://..."
  );
}

export const prisma = new PrismaClient();
