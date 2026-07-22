import { paymentsMockData } from "@/mock-data/paymentsMockData";
import { PaymentsTable } from "@/components/features/payment/PaymentsTable";

//===== Server component – simply passes mock data to the interactive table =====//
export default function PaymentsPage() {
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
      <PaymentsTable payments={paymentsMockData} />
    </div>
  );
}
