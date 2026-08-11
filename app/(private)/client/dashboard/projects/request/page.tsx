import { RequestProjectForm } from "@/components/client-dashboard/briefs/RequestProjectForm";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function page() {
  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <RequestProjectForm />
        </Container>
      </Section>
    </PageWrapper>
  );
}
