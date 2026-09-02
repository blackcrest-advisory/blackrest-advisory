import { notFound, redirect } from "next/navigation";

import { LeadDetailsClient } from "@/components/admin-dashboard/leads/LeadDetailsClient";
import { getAdminLead } from "@/lib/actions/leads/admin-lead.action";
import { getAdminUser } from "@/lib/utils/admin-utils";

interface LeadDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function LeadDetailsPage({
  params,
  searchParams,
}: LeadDetailsPageProps) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const { id } = await params;
  const { edit } = await searchParams;

  const lead = await getAdminLead(id);

  if (!lead) {
    notFound();
  }

  return <LeadDetailsClient lead={lead} initialEdit={edit === "true"} />;
}
