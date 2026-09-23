import { redirect } from "next/navigation";

import { PopupAnalyticsDashboard } from "@/components/admin-dashboard/popup-analytics/PopupAnalyticsDashboard";
import { getPopupAnalytics } from "@/lib/actions/popup-analytics/popup-analytics.action";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function PopupAnalyticsPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const analytics = await getPopupAnalytics();

  return <PopupAnalyticsDashboard analytics={analytics} />;
}
