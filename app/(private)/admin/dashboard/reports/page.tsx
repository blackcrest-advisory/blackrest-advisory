import { ReportsDashboard } from "@/components/admin-dashboard/reports/ReportsDashboard";
import { getAdminReports } from "@/lib/actions/reports/report.action";

export default async function ReportsPage() {
  const reportData = await getAdminReports();
  return <ReportsDashboard initialData={reportData} />;
}
