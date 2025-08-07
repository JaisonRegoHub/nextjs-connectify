// lib/prisma.js
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of PrismaClient in dev
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
