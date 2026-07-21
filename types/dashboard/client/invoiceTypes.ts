export type InvoiceStatus =
  | "paid"
  | "pending"
  | "overdue"
  | "draft"
  | "cancelled";

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "INV-001"
  clientName: string;
  projectName: string;
  amount: number;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  status: InvoiceStatus;
}
