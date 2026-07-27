"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Payment } from "@/types/dashboard/client/paymentTypes";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

interface PaymentsTableProps {
  payments: Payment[];
}

export const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  //===== Filter by invoice ID or client name =====//
  const filtered = payments.filter(
    (p) =>
      p.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="max-w-sm">
        <Input
          icon={Search}
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-[var(--color-body)]"
              >
                No payments found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-mono text-sm">
                  {payment.invoiceId}
                </TableCell>
                <TableCell>{payment.clientName}</TableCell>
                <TableCell>{payment.projectName}</TableCell>
                <TableCell>
                  $
                  {payment.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString('en-GB')}
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <PaymentStatusBadge status={payment.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
