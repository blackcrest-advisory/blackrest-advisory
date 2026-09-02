import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NotificationsPage } from "@/components/shared/NotificationsPage";

export default async function AdminNotificationsPage() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/login");
  }
  return (
    <PageWrapper>
      <Section>
        <Container>
          <NotificationsPage />
        </Container>
      </Section>
    </PageWrapper>
  );
}
