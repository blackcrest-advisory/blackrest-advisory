import { redirect } from "next/navigation";

import { LeadsClient } from "@/components/admin-dashboard/leads/LeadsClient";
import { getAdminLeads } from "@/lib/actions/leads/admin-lead.action";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function LeadsPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const leads = await getAdminLeads();

  return <LeadsClient initialLeads={leads} />;
}
