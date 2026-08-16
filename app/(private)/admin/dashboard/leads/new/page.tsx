import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { CreateLeadForm } from "@/components/admin-dashboard/leads/CreateLeadForm";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function CreateLeadPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6">
            <Link href="/admin/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              All Leads
            </Link>
            <Card padding="lg">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">Manual Lead</p>
                <h1 className="mt-2 text-3xl font-semibold text-foreground">Add Lead</h1>
                <p className="mt-2 text-sm text-muted-foreground">Record a lead received by phone, referral, or another offline channel.</p>
              </div>
              <CreateLeadForm />
            </Card>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
