export type PaymentStatus =
  | "paid"
  | "pending"
  | "overdue"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;
  invoiceId: string;
  clientName: string;
  projectName: string;
  amount: number;
  date: string; // ISO date string
  method: string; // "Credit Card", "Bank Transfer", etc.
  status: PaymentStatus;
}
