export type AdminFile = {
  id: string;
  name: string;
  extension: string;
  category: string;
  sizeInBytes: number;
  downloadUrl: string;
  uploadedByRole: string;
  createdAt: string;
  project: { id: string; title: string; clientName: string };
};

export type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
  dueDate: string | null;
  paidAt: string | null;
  createdAt: string;
  project: { id: string; title: string; clientName: string };
};
