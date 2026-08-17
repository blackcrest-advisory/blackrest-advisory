import { AdminServicesDashboard } from "@/components/admin-dashboard/services/AdminServicesDashboard";
import { getAdminServices } from "@/lib/actions/services/service.action";

export default async function AdminServicesPage() {
  const services = await getAdminServices();
  return <AdminServicesDashboard initialServices={services} />;
}
