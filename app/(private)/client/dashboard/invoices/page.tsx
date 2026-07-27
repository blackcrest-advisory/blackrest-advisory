import { redirect } from "next/navigation";
import { InvoicesTable } from "@/components/features/invoice/InvoicesTable";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import type { Invoice } from "@/types/dashboard/client/invoiceTypes";

function mapInvoiceStatus(status: string): Invoice["status"] {
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

export default async function InvoicesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const invoiceRecords = await prisma.invoice.findMany({
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
  const invoices: Invoice[] = invoiceRecords.map((invoice) => ({
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-heading)]">
          Invoices
        </h1>
        <p className="mt-1 text-[var(--color-body)]">
          View and manage all your project invoices.
        </p>
      </div>
      <InvoicesTable invoices={invoices} />
    </div>
  );
}
