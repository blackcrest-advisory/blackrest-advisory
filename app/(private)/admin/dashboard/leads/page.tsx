import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { LeadsClient } from "@/components/admin-dashboard/leads/LeadsClient";
import { getAdminLeads } from "@/lib/actions/leads/admin-lead.action";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function LeadsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const leads = await getAdminLeads();

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <LeadsClient initialLeads={leads} />
        </Container>
      </Section>
    </PageWrapper>
  );
}
