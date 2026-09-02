"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { revalidatePath } from "next/cache";
import { InvoiceStatus } from "@prisma/client";
import { z } from "zod";
import {
  sendInvoiceNotification,
  createNotification,
} from "@/lib/services/email/email.service";

//===== validation schemas =====//
const createInvoiceSchema = z.object({
  projectId: z.string().min(1),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("EUR"),
  dueDate: z.string().optional(), // ISO date string
  notes: z.string().optional(),
  lineItems: z.any().optional(),
});

const updateInvoiceSchema = z.object({
  amount: z.number().positive().optional(),
  currency: z.string().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]).optional(),
  lineItems: z.any().optional(),
});

type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

//===== generate invoice number =====//
async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count({
    where: {
      invoiceNumber: {
        startsWith: `INV-${year}-`,
      },
    },
  });
  const seq = String(count + 1).padStart(3, "0");
  return `INV-${year}-${seq}`;
}

//===== create invoice (admin) =====//
export async function createInvoice(
  input: z.infer<typeof createInvoiceSchema>,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const parsed = createInvoiceSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { projectId, amount, currency, dueDate, notes, lineItems } =
      parsed.data;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });
    if (!project) {
      return { success: false, error: "Project not found" };
    }

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await prisma.invoice.create({
      data: {
        projectId,
        userId: project.userId,
        invoiceNumber,
        amount,
        currency: currency || "EUR",
        status: "DRAFT",
        dueDate: dueDate ? new Date(dueDate) : null,
        notes: notes || null,
        lineItems: lineItems || null,
      },
    });

    revalidatePath(`/admin/dashboard/projects/${projectId}`);
    return { success: true, data: invoice };
  } catch (error: any) {
    console.error("createInvoice error:", error);
    return {
      success: false,
      error: error.message || "Failed to create invoice",
    };
  }
}

//===== update invoice (admin) =====//
export async function updateInvoice(
  invoiceId: string,
  input: z.infer<typeof updateInvoiceSchema>,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    // First, get the existing invoice
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { project: true },
    });
    if (!existingInvoice) {
      return { success: false, error: "Invoice not found" };
    }

    const parsed = updateInvoiceSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { amount, currency, dueDate, notes, status, lineItems } = parsed.data;

    // Prepare update data
    const updateData: any = {
      amount: amount ?? existingInvoice.amount,
      currency: currency ?? existingInvoice.currency,
      dueDate: dueDate ? new Date(dueDate) : existingInvoice.dueDate,
      notes: notes ?? existingInvoice.notes,
      status: status ?? existingInvoice.status,
      lineItems: lineItems ?? existingInvoice.lineItems,
    };

    // If status is being changed to PAID and it wasn't already PAID
    if (status === "PAID" && existingInvoice.status !== "PAID") {
      // Update the project's budgetSpent
      await prisma.project.update({
        where: { id: existingInvoice.projectId },
        data: {
          budgetSpent: {
            increment: existingInvoice.amount,
          },
        },
      });
      // Set paidAt
      updateData.paidAt = new Date();
    } else if (status !== "PAID" && existingInvoice.status === "PAID") {
      // If status is being changed from PAID to something else, decrement
      // (should we allow this? maybe not, but we handle it)
      await prisma.project.update({
        where: { id: existingInvoice.projectId },
        data: {
          budgetSpent: {
            decrement: existingInvoice.amount,
          },
        },
      });
      updateData.paidAt = null;
    }

    const updated = await prisma.invoice.update({
      where: { id: invoiceId },
      data: updateData,
    });

    revalidatePath(`/admin/dashboard/projects/${existingInvoice.projectId}`);
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("updateInvoice error:", error);
    return {
      success: false,
      error: error.message || "Failed to update invoice",
    };
  }
}

//===== send invoice to client (admin) =====//
export async function sendInvoice(invoiceId: string): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        project: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    if (invoice.status !== "DRAFT" && invoice.status !== "SENT") {
      return {
        success: false,
        error: "Invoice cannot be sent in its current status",
      };
    }

    // Update status to SENT
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "SENT" },
    });

    // Send email to client
    await sendInvoiceNotification({
      to: invoice.project.user.email,
      name: invoice.project.user.name || "Client",
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount,
      currency: invoice.currency,
      dueDate: invoice.dueDate,
      projectTitle: invoice.project.title,
      link: `${process.env.NEXT_PUBLIC_APP_URL}/client/dashboard/projects/${invoice.projectId}`,
    });

    // In-app notification for client
    await createNotification({
      userId: invoice.project.userId,
      type: "INVOICE_SENT",
      title: "New Invoice",
      body: `Invoice ${invoice.invoiceNumber} for "${invoice.project.title}" has been sent.`,
      link: `/client/dashboard/projects/${invoice.projectId}`,
    });

    revalidatePath(`/admin/dashboard/projects/${invoice.projectId}`);
    return { success: true, data: { message: "Invoice sent" } };
  } catch (error: any) {
    console.error("sendInvoice error:", error);
    return { success: false, error: error.message || "Failed to send invoice" };
  }
}

//===== delete invoice (admin) =====//
export async function deleteInvoice(invoiceId: string): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: { projectId: true },
    });
    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    await prisma.invoice.delete({
      where: { id: invoiceId },
    });

    revalidatePath(`/admin/dashboard/projects/${invoice.projectId}`);
    return { success: true, data: { message: "Invoice deleted" } };
  } catch (error: any) {
    console.error("deleteInvoice error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete invoice",
    };
  }
}
