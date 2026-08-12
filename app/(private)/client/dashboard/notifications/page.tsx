import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NotificationsPage } from "@/components/shared/NotificationsPage";

export default async function ClientNotificationsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <Section>
      <Container>
        <NotificationsPage />
      </Container>
    </Section>
  );
}
