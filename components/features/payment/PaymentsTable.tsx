"use client";

import { useMemo, useState } from "react";
import {
  CreditCard,
  FileSearch,
  ReceiptText,
  RotateCcw,
  Search,
} from "lucide-react";
import type { Payment } from "@/types/dashboard/client/paymentTypes";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { Pagination } from "@/components/shared/Pagination";

interface PaymentsTableProps {
  payments: Payment[];
}

const PAGE_SIZE = 8;

//===== Payments table =====//
export const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //===== Payment methods =====//
  const paymentMethods = useMemo(() => {
    return Array.from(
      new Set(payments.map((payment) => payment.method).filter(Boolean)),
    );
  }, [payments]);

  //===== Filter payments =====//
  const filteredPayments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !normalizedSearch ||
        payment.invoiceId.toLowerCase().includes(normalizedSearch) ||
        payment.clientName.toLowerCase().includes(normalizedSearch) ||
        payment.projectName.toLowerCase().includes(normalizedSearch);

      const matchesStatus = !statusFilter || payment.status === statusFilter;

      const matchesMethod = !methodFilter || payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, searchTerm, statusFilter, methodFilter]);

  //===== Pagination =====//
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAGE_SIZE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;

  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  //===== Search change =====//
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  //===== Status change =====//
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  //===== Method change =====//
  const handleMethodChange = (value: string) => {
    setMethodFilter(value);
    setCurrentPage(1);
  };

  //===== Reset filters =====//
  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("");
    setMethodFilter("");
    setCurrentPage(1);
  };

  const hasFilters = Boolean(searchTerm || statusFilter || methodFilter);

  return (
    <div className="relative overflow-visible border border-border bg-card shadow-[var(--shadow-card)]">
      <span className="absolute left-0 top-0 h-[2px] w-28 bg-secondary" />

      {/*===== Register header =====*/}
      <div className="relative z-30 border-b border-border px-4 pb-4 pt-5 sm:px-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="shrink-0">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Payment Register
            </span>

            <p className="mt-1 text-sm text-muted-foreground">
              {hasFilters
                ? `${filteredPayments.length} matching payment${filteredPayments.length === 1 ? "" : "s"}`
                : `${payments.length} payment${payments.length === 1 ? "" : "s"} available`}
            </p>
          </div>

          {/*===== Filters =====*/}
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center xl:w-auto">
            {/*===== Search =====*/}
            <div className="min-w-0 lg:flex-1 xl:w-[280px] xl:flex-none">
              <Input
                icon={Search}
                placeholder="Search invoice or project..."
                value={searchTerm}
                onChange={(event) => handleSearchChange(event.target.value)}
                className="w-full"
              />
            </div>

            {/*===== Status =====*/}
            <div className="relative z-50 w-full lg:w-[160px]">
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                options={[
                  {
                    label: "All statuses",
                    value: "",
                  },
                  {
                    label: "Paid",
                    value: "paid",
                  },
                  {
                    label: "Pending",
                    value: "pending",
                  },
                  {
                    label: "Overdue",
                    value: "overdue",
                  },
                ]}
                className="w-full"
              />
            </div>

            {/*===== Method =====*/}
            <div className="relative z-40 w-full lg:w-[180px]">
              <Select
                value={methodFilter}
                onChange={handleMethodChange}
                options={[
                  {
                    label: "All methods",
                    value: "",
                  },
                  ...paymentMethods.map((method) => ({
                    label: method,
                    value: method,
                  })),
                ]}
                className="w-full"
              />
            </div>

            {/*===== Filter status =====*/}
            <div className="flex items-center justify-between gap-3 lg:justify-start">
              <span className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
                {filteredPayments.length} result
                {filteredPayments.length === 1 ? "" : "s"}
              </span>

              {hasFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/25 hover:bg-secondary/[0.04] hover:text-secondary"
                  aria-label="Clear payment filters"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*===== Desktop table =====*/}
      {paginatedPayments.length > 0 && (
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Invoice
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Client
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Project
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Amount
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Date
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Method
                </th>

                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/10"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                        <ReceiptText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold text-heading">
                          {payment.invoiceId}
                        </p>

                        <span className="mt-0.5 block font-mono text-[6px] uppercase tracking-[0.12em] text-muted-foreground/30">
                          Payment record
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-[180px] truncate text-sm text-muted-foreground">
                      {payment.clientName}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-[220px] truncate text-sm font-medium text-heading">
                      {payment.projectName}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-semibold text-heading">
                      $
                      {payment.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString("en-GB")}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-secondary" />

                      <span className="whitespace-nowrap text-sm text-muted-foreground">
                        {payment.method}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <PaymentStatusBadge status={payment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*===== Mobile records =====*/}
      {paginatedPayments.length > 0 && (
        <div className="divide-y divide-border lg:hidden">
          {paginatedPayments.map((payment) => (
            <article key={payment.id} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                    <ReceiptText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold text-heading">
                      {payment.invoiceId}
                    </p>

                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {payment.projectName}
                    </p>
                  </div>
                </div>

                <PaymentStatusBadge status={payment.status} />
              </div>

              {/*===== Payment details =====*/}
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-border py-4">
                <PaymentDetail
                  label="Amount"
                  value={`$${payment.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`}
                />

                <PaymentDetail
                  label="Date"
                  value={new Date(payment.date).toLocaleDateString("en-GB")}
                />

                <PaymentDetail label="Method" value={payment.method} />

                <PaymentDetail label="Client" value={payment.clientName} />
              </div>
            </article>
          ))}
        </div>
      )}

      {/*===== Empty state =====*/}
      {paginatedPayments.length === 0 && (
        <div className="px-5 py-16 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
            <FileSearch className="h-4 w-4" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-heading">
            {hasFilters ? "No matching payments" : "No payments yet"}
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {hasFilters
              ? "Try adjusting your search or changing one of the payment filters."
              : "Payment activity connected to your invoices will appear here."}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-heading transition-colors hover:border-secondary/30 hover:bg-secondary/[0.04]"
            >
              <RotateCcw className="h-3.5 w-3.5 text-secondary" />
              Clear filters
            </button>
          )}
        </div>
      )}

      {/*===== Pagination =====*/}
      {filteredPayments.length > PAGE_SIZE && (
        <div className="border-t border-border bg-muted/10 px-4 py-4 sm:px-5">
          <Pagination
            currentPage={safeCurrentPage}
            totalItems={filteredPayments.length}
            pageSize={PAGE_SIZE}
            itemLabel="payments"
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

//===== Payment detail =====//
function PaymentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
        {label}
      </span>

      <p className="mt-1.5 truncate text-sm font-medium text-heading">
        {value}
      </p>
    </div>
  );
}
