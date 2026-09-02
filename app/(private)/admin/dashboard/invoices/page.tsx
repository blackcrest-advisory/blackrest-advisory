import { AdminInvoicesClient } from "@/components/admin-dashboard/invoices/AdminInvoicesClient";
import { getAdminInvoices } from "@/lib/actions/admin/admin-assets.action";

export default async function AdminInvoicesPage() {
  const invoices = await getAdminInvoices();
  return <AdminInvoicesClient initialInvoices={invoices} />;
}
