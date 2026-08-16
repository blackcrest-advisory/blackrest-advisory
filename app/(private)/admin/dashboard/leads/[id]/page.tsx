import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
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
  if (!admin) redirect("/login");

  const { id } = await params;
  const { edit } = await searchParams;
  const lead = await getAdminLead(id);
  if (!lead) notFound();

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <LeadDetailsClient lead={lead} initialEdit={edit === "true"} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
