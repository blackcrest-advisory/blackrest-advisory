import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { generateInvoiceNumber } from "@/lib/utils/invoice";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: invoices },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        {
          success: false,
          error: "Project ID, user ID, and amount are required",
        },
        { status: 400 },
      );
    }

    const {
      projectId,
      userId,
      proposalId,
      amount,
      currency,
      dueDate,
      notes,
      lineItems,
    } = body as Record<string, unknown>;

    if (
      typeof projectId !== "string" ||
      !projectId ||
      typeof userId !== "string" ||
      !userId ||
      typeof amount !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Project ID, user ID, and amount are required",
        },
        { status: 400 },
      );
    }

    const invoiceNumber = generateInvoiceNumber();
    const invoiceCurrency =
      typeof currency === "string" && currency ? currency : "EUR";
    const invoice = await prisma.$transaction(async (transaction) => {
      const createdInvoice = await transaction.invoice.create({
        data: {
          projectId,
          userId,
          proposalId:
            typeof proposalId === "string" || proposalId === null
              ? proposalId
              : undefined,
          invoiceNumber,
          amount,
          currency: invoiceCurrency,
          dueDate:
            typeof dueDate === "string"
              ? new Date(dueDate)
              : dueDate === null
                ? null
                : undefined,
          notes:
            typeof notes === "string" || notes === null ? notes : undefined,
          lineItems:
            lineItems === undefined || lineItems === null
              ? undefined
              : (lineItems as Prisma.InputJsonValue),
          status: "DRAFT",
        },
      });

      await transaction.notification.create({
        data: {
          userId,
          type: "INVOICE_SENT",
          title: "New invoice created",
          body: `Invoice ${invoiceNumber} for ${amount} ${invoiceCurrency} has been created`,
          link: "/client/dashboard/invoices",
        },
      });

      return createdInvoice;
    });

    return NextResponse.json(
      { success: true, data: invoice },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
