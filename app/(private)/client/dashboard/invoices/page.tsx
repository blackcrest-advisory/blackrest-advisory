import { redirect } from "next/navigation";
import { InvoicesTable } from "@/components/features/invoice/InvoicesTable";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import type { Invoice } from "@/types/dashboard/client/invoiceTypes";

//===== Map database status to frontend status =====//
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

  //===== Fetch invoices =====//
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

  //===== Transform to frontend type =====//
  const invoices: Invoice[] = invoiceRecords.map((invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    clientName: invoice.user.name,
    projectName: invoice.project.title,
    amount: invoice.amount,
    issueDate: invoice.createdAt.toISOString().split("T")[0],
    dueDate: invoice.dueDate ? invoice.dueDate.toISOString().split("T")[0] : "",
    status: mapInvoiceStatus(invoice.status),
  }));

  return (
    //===== Invoices Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
              <p className="mt-1 text-muted-foreground">
                View and manage all your project invoices.
              </p>
            </div>
            <InvoicesTable invoices={invoices} />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
