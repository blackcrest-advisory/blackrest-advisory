import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Printer,
  Calendar,
  DollarSign,
  User,
  FileText,
} from "lucide-react";
import { PrintButton } from "@/components/client-dashboard/invoices/PrintButton";

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoiceDetailPage({
  params,
}: InvoiceDetailPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      project: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!invoice || invoice.project.userId !== user.id) {
    notFound();
  }

  // Parse line items if they exist
  const lineItems = invoice.lineItems as any[] | null;

  return (
    <PageWrapper>
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Navigation */}
            <Link
              href="/client/dashboard/invoices"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Invoices
            </Link>

            {/* Invoice Card */}
            <Card className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-border pb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Invoice
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    #{invoice.invoiceNumber}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={invoice.status.toLowerCase()} />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Two-column details */}
              <div className="grid gap-6 mt-6 md:grid-cols-2">
                {/* Left: Bill To */}
                <div className="space-y-2">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Bill To
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {invoice.project.user.name || invoice.project.user.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.project.user.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Project: {invoice.project.title}
                  </p>
                </div>

                {/* Right: Invoice Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-border/50 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Invoice Date
                    </span>
                    <span className="text-sm text-foreground">
                      {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Due Date
                    </span>
                    <span className="text-sm text-foreground">
                      {invoice.dueDate
                        ? format(new Date(invoice.dueDate), "MMM d, yyyy")
                        : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      Currency
                    </span>
                    <span className="text-sm text-foreground">
                      {invoice.currency}
                    </span>
                  </div>
                  {invoice.paidAt && (
                    <div className="flex items-center justify-between border-b border-border/50 py-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Paid On
                      </span>
                      <span className="text-sm text-foreground">
                        {format(new Date(invoice.paidAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items Table */}
              <div className="mt-8">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  Line Items
                </h3>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-4 py-3 text-left font-medium text-foreground">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right font-medium text-foreground">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems && lineItems.length > 0 ? (
                        lineItems.map((item, index) => (
                          <tr
                            key={index}
                            className={`border-b border-border ${index % 2 === 0 ? "bg-background" : "bg-muted/5"}`}
                          >
                            <td className="px-4 py-3 text-muted-foreground">
                              {item.description || item}
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-foreground">
                              {item.amount || invoice.amount} {invoice.currency}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 text-muted-foreground">
                            {invoice.project.title}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-foreground">
                            {invoice.amount} {invoice.currency}
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-secondary/5 border-t-2 border-secondary">
                        <td className="px-4 py-3 text-right font-semibold text-foreground">
                          Total
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-secondary text-lg">
                          {invoice.amount} {invoice.currency}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="mt-6 rounded-lg bg-muted/30 p-4 border border-border">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Notes
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {invoice.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href={`/api/invoices/${invoice.id}/pdf`}
                  variant="primary"
                  size="md"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <PrintButton />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
