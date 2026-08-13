import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { InvoiceFilters } from "@/components/client-dashboard/invoices/InvoiceFilters";
import { Download, Eye } from "lucide-react";

interface ClientInvoicesPageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function ClientInvoicesPage({
  searchParams,
}: ClientInvoicesPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const search = params?.search || "";
  const statusFilter = params?.status || "";

  // Build where clause
  const where: any = { userId: user.id };

  if (statusFilter) {
    where.status = statusFilter;
  }

  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search, mode: "insensitive" } },
      { project: { title: { contains: search, mode: "insensitive" } } },
    ];
  }

  const invoices = await prisma.invoice.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      project: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <PageWrapper>
      <Section>
        <Container>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">
              My Invoices
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View all invoices from your projects.
            </p>
          </div>

          <Card className="p-6">
            {/* Filters */}
            <InvoiceFilters
              search={search}
              status={statusFilter}
              totalCount={invoices.length}
            />

            {/* Table */}
            {invoices.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  {search || statusFilter
                    ? "No invoices match your filters."
                    : "You have no invoices yet."}
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <span className="font-medium text-foreground">
                            {invoice.invoiceNumber}
                          </span>
                        </TableCell>
                        <TableCell>{invoice.project.title}</TableCell>
                        <TableCell>
                          {invoice.amount} {invoice.currency}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={invoice.status.toLowerCase()} />
                        </TableCell>
                        <TableCell>
                          {invoice.dueDate
                            ? new Date(invoice.dueDate).toLocaleDateString()
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/client/dashboard/invoices/${invoice.id}`}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <a
                              href={`/api/invoices/${invoice.id}/pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
