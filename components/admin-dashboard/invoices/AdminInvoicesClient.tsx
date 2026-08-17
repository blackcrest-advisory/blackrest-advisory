"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, FileText, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Pagination } from "@/components/shared/Pagination";
import type { AdminInvoice } from "@/types/dashboard/admin/assetTypes";

const PAGE_SIZE = 10;
const statuses = [{ value: "all", label: "All statuses" }, { value: "DRAFT", label: "Draft" }, { value: "SENT", label: "Sent" }, { value: "PAID", label: "Paid" }, { value: "OVERDUE", label: "Overdue" }, { value: "CANCELLED", label: "Cancelled" }];
const formatMoney = (amount: number, currency: string) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "—";

export function AdminInvoicesClient({ initialInvoices }: { initialInvoices: AdminInvoice[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const invoices = useMemo(() => initialInvoices.filter((invoice) => (status === "all" || invoice.status === status) && `${invoice.invoiceNumber} ${invoice.project.title} ${invoice.project.clientName}`.toLowerCase().includes(search.toLowerCase())), [initialInvoices, search, status]);
  const visibleInvoices = invoices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paid = initialInvoices.filter((invoice) => invoice.status === "PAID").length;
  const overdue = initialInvoices.filter((invoice) => invoice.status === "OVERDUE").length;
  const updateSearch = (value: string) => { setSearch(value); setPage(1); };
  const updateStatus = (value: string) => { setStatus(value); setPage(1); };
  return <PageWrapper><Section className="py-2 md:py-2 lg:py-2"><Container><div className="space-y-6">
    <div><h1 className="text-2xl font-semibold text-foreground">Invoices</h1><p className="mt-1 text-sm text-muted-foreground">Track invoicing across all client projects.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><Metric label="All invoices" value={initialInvoices.length} /><Metric label="Paid invoices" value={paid} /><Metric label="Overdue invoices" value={overdue} /></div>
    <Card className="flex flex-col gap-3 p-4 sm:flex-row"><Input icon={Search} value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search invoice, project, or client..." className="sm:max-w-md" /><Select options={statuses} value={status} onChange={updateStatus} className="sm:w-44" /></Card>
    <Card padding="none" className="overflow-hidden"><Table><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Project / Client</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Due date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{visibleInvoices.map((invoice) => <TableRow key={invoice.id}><TableCell><p className="font-medium">{invoice.invoiceNumber}</p><p className="text-xs text-muted-foreground">Created {formatDate(invoice.createdAt)}</p></TableCell><TableCell><Link href={`/admin/dashboard/projects/${invoice.project.id}`} className="font-medium text-secondary hover:underline">{invoice.project.title}<span className="block text-xs font-normal text-muted-foreground">{invoice.project.clientName}</span></Link></TableCell><TableCell className="font-medium">{formatMoney(invoice.amount, invoice.currency)}</TableCell><TableCell><StatusBadge status={invoice.status.toLowerCase()} /></TableCell><TableCell>{formatDate(invoice.dueDate)}</TableCell><TableCell className="text-right"><a href={`/api/invoices/${invoice.id}/pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={`Download ${invoice.invoiceNumber}`}><Download className="h-4 w-4" /></a></TableCell></TableRow>)}</TableBody></Table>{!visibleInvoices.length && <div className="py-14 text-center text-sm text-muted-foreground"><FileText className="mx-auto mb-3 h-8 w-8" />No invoices match your filters.</div>}</Card>
    <Pagination currentPage={page} totalItems={invoices.length} pageSize={PAGE_SIZE} itemLabel="invoices" onPageChange={setPage} />
  </div></Container></Section></PageWrapper>;
}

function Metric({ label, value }: { label: string; value: number }) { return <Card padding="base"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold text-foreground">{value}</p></Card>; }
