"use server";

import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";
import type {
  AdminFile,
  AdminInvoice,
} from "@/types/dashboard/admin/assetTypes";

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");
}

export async function getAdminFiles(): Promise<AdminFile[]> {
  await requireAdmin();
  const files = await prisma.file.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      extension: true,
      category: true,
      sizeInBytes: true,
      downloadUrl: true,
      uploadedByRole: true,
      createdAt: true,
      project: {
        select: { id: true, title: true, user: { select: { name: true } } },
      },
    },
  });

  return files.map((file) => ({
    id: file.id,
    name: file.name,
    extension: file.extension,
    category: file.category,
    sizeInBytes: file.sizeInBytes,
    downloadUrl: file.downloadUrl,
    uploadedByRole: file.uploadedByRole,
    createdAt: file.createdAt.toISOString(),
    project: {
      id: file.project.id,
      title: file.project.title,
      clientName: file.project.user.name,
    },
  }));
}

export async function getAdminInvoices(): Promise<AdminInvoice[]> {
  await requireAdmin();
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      invoiceNumber: true,
      amount: true,
      currency: true,
      status: true,
      dueDate: true,
      paidAt: true,
      createdAt: true,
      project: {
        select: { id: true, title: true, user: { select: { name: true } } },
      },
    },
  });

  return invoices.map((invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    amount: invoice.amount,
    currency: invoice.currency,
    status: invoice.status,
    dueDate: invoice.dueDate?.toISOString() ?? null,
    paidAt: invoice.paidAt?.toISOString() ?? null,
    createdAt: invoice.createdAt.toISOString(),
    project: {
      id: invoice.project.id,
      title: invoice.project.title,
      clientName: invoice.project.user.name,
    },
  }));
}
