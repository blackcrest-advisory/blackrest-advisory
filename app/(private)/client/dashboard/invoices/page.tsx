import { invoicesMockData } from "@/mock-data/invoicesMockData";
import { InvoicesTable } from "@/components/features/invoice/InvoicesTable";

//===== Server component – passes mock data to the interactive table =====//
export default function InvoicesPage() {
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
      <InvoicesTable invoices={invoicesMockData} />
    </div>
  );
}
