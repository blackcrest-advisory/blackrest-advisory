import { PageWrapper } from "@/components/ui/PageWrapper";
import { StepsSection } from "@/components/landing/start-project/StepsSection";
import { ProjectForm } from "@/components/landing/start-project/ProjectForm";
import { InfoCard } from "@/components/landing/start-project/InfoCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function StartProjectPage() {
  return (
    <PageWrapper>
      <StepsSection />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <ProjectForm />
            </div>
            <div className="lg:col-span-2">
              <InfoCard />
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
