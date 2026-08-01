import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

function mapPaymentStatus(status: string): string {
  switch (status) {
    case "PAID":
      return "paid";
    case "OVERDUE":
      return "overdue";
    default:
      return "pending";
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: user.id,
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
    const mappedPayments = invoices.map((invoice) => ({
      id: invoice.id,
      invoiceId: invoice.invoiceNumber,
      clientName: invoice.user.name,
      projectName: invoice.project.title,
      amount: invoice.amount,
      date: invoice.paidAt
        ? invoice.paidAt.toISOString().split("T")[0]
        : invoice.createdAt.toISOString().split("T")[0],
      method: invoice.paymentMethod ?? "Bank Transfer",
      status: mapPaymentStatus(invoice.status),
    }));

    return NextResponse.json(
      { success: true, data: mappedPayments },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
