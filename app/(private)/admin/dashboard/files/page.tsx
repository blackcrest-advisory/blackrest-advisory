import { AdminFilesClient } from "@/components/admin-dashboard/files/AdminFilesClient";
import { getAdminFiles } from "@/lib/actions/admin/admin-assets.action";

export default async function AdminFilesPage() {
  const files = await getAdminFiles();
  return <AdminFilesClient initialFiles={files} />;
}
