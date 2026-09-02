import "server-only";

import type { InvoiceStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/client";

export async function getClientPayments(userId: string) {
  return prisma.invoice.findMany({
    where: {
      userId,
      status: {
        in: ["PAID", "OVERDUE"],
      },
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      project: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getClientInvoices(
  userId: string,
  search: string,
  statusFilter: string,
) {
  const where: Prisma.InvoiceWhereInput = { userId };

  if (statusFilter) {
    where.status = statusFilter as InvoiceStatus;
  }

  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search, mode: "insensitive" } },
      { project: { title: { contains: search, mode: "insensitive" } } },
    ];
  }

  return prisma.invoice.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      project: {
        select: {
          title: true,
        },
      },
    },
  });
}

export async function getClientInvoiceById(invoiceId: string) {
  return prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      project: {
        include: {
          user: true,
        },
      },
    },
  });
}
