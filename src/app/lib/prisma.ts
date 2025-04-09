// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Create a type-safe "global" store to reuse prisma in dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse the existing instance if it exists, otherwise create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Only assign it to globalThis in dev — not in prod
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
