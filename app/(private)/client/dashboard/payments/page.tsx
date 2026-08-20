import { redirect } from "next/navigation";
import { PaymentsTable } from "@/components/features/payment/PaymentsTable";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
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

  return (
    //===== Payments Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Payments</h1>
              <p className="mt-1 text-muted-foreground">
                Track all your invoice payments and statuses.
              </p>
            </div>
            <PaymentsTable payments={payments} />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
