import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient()
    : (globalForPrisma.prisma ??= new PrismaClient());
