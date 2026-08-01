import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";

function mapInvoiceStatus(status: string): string {
  switch (status) {
    case "DRAFT":
      return "draft";
    case "SENT":
      return "pending";
    case "PAID":
      return "paid";
    case "OVERDUE":
      return "overdue";
    case "CANCELLED":
      return "cancelled";
    default:
      return "pending";
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.id,
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
        createdAt: "desc",
      },
    });
    const mappedInvoices = invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.user.name,
      projectName: invoice.project.title,
      amount: invoice.amount,
      issueDate: invoice.createdAt.toISOString().split("T")[0],
      dueDate: invoice.dueDate
        ? invoice.dueDate.toISOString().split("T")[0]
        : "",
      status: mapInvoiceStatus(invoice.status),
    }));

    return NextResponse.json(
      { success: true, data: mappedInvoices },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
