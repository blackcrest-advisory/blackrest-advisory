import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { PaymentsTable } from "@/components/features/payment/PaymentsTable";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientPayments } from "@/lib/data/invoices";
import type { Payment } from "@/types/dashboard/client/paymentTypes";

//===== Map database status to frontend status =====//
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

  //===== Fetch paid/overdue invoices =====//
  const invoiceRecords = await getClientPayments(user.id);

  //===== Transform to frontend type =====//
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

  const paidCount = payments.filter(
    (payment) => payment.status === "paid",
  ).length;
  const openCount = payments.filter(
    (payment) => payment.status !== "paid",
  ).length;

  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Page header =====*/}
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Client Finance
            </span>
            <span className="h-px w-10 bg-secondary/35" />
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
            Payments
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Review payment activity, invoice references, methods, and current
            payment status across your projects.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Payment records
        </div>
      </div>

      {/*===== Summary =====*/}
      <div className="grid border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        <SummaryItem
          icon={ReceiptText}
          label="Payment records"
          value={String(payments.length).padStart(2, "0")}
        />

        <SummaryItem
          icon={ShieldCheck}
          label="Paid"
          value={String(paidCount).padStart(2, "0")}
          bordered
        />

        <SummaryItem
          icon={CircleDollarSign}
          label="Open / overdue"
          value={String(openCount).padStart(2, "0")}
          bordered
        />
      </div>

      {/*===== Payments register =====*/}
      <PaymentsTable payments={payments} />
    </div>
  );
}

//===== Summary item =====//
function SummaryItem({
  icon: Icon,
  label,
  value,
  bordered = false,
}: {
  icon: typeof CreditCard;
  label: string;
  value: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 px-5 py-5 ${bordered ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
    >
      <div>
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
          {label}
        </span>

        <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading">
          {value}
        </p>
      </div>

      <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}
