import { InvoiceStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
        project: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: invoice }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      throw new Error("Invalid request body");
    }

    const { status, dueDate, notes, lineItems, paymentMethod } = body as Record<
      string,
      unknown
    >;
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    const invoiceStatus =
      typeof status === "string" &&
      Object.values(InvoiceStatus).includes(status as InvoiceStatus)
        ? (status as InvoiceStatus)
        : undefined;
    const updatedInvoice = await prisma.$transaction(async (transaction) => {
      const updated = await transaction.invoice.update({
        where: {
          id: invoice.id,
        },
        data: {
          status: invoiceStatus,
          dueDate:
            typeof dueDate === "string"
              ? new Date(dueDate)
              : dueDate === null
                ? null
                : undefined,
          notes:
            typeof notes === "string" || notes === null ? notes : undefined,
          lineItems:
            lineItems === undefined
              ? undefined
              : lineItems === null
                ? Prisma.JsonNull
                : (lineItems as Prisma.InputJsonValue),
          paymentMethod:
            typeof paymentMethod === "string" || paymentMethod === null
              ? paymentMethod
              : undefined,
          paidAt: invoiceStatus === "PAID" ? new Date() : undefined,
        },
      });

      if (invoiceStatus === "SENT") {
        await transaction.notification.create({
          data: {
            userId: invoice.userId,
            type: "INVOICE_SENT",
            title: "Invoice sent",
            body: `Invoice ${invoice.invoiceNumber} for ${invoice.amount} ${invoice.currency} is ready to view`,
            link: "/client/dashboard/invoices",
          },
        });
      }

      return updated;
    });

    return NextResponse.json(
      { success: true, data: updatedInvoice },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
