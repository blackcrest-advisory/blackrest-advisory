import { redirect } from "next/navigation";
import { PaymentsTable } from "@/components/features/payment/PaymentsTable";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import type { Payment } from "@/types/dashboard/client/paymentTypes";

function mapPaymentStatus(status: string): Payment["status"] {
  switch (status) {
    case "PAID":
      return "paid";
    case "OVERDUE":
      return "overdue";
    default:
      return "pending";
  }
}

export default async function PaymentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const invoiceRecords = await prisma.invoice.findMany({
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
  const payments: Payment[] = invoiceRecords.map((invoice) => ({
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-heading)]">
          Payments
        </h1>
        <p className="mt-1 text-[var(--color-body)]">
          Track all your invoice payments and statuses.
        </p>
      </div>
      <PaymentsTable payments={payments} />
    </div>
  );
}
