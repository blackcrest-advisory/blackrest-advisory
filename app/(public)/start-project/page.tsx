import { PageWrapper } from "@/components/ui/PageWrapper";
import { StepsSection } from "@/components/landing/start-project/StepsSection";
import { ProjectInquiryForm } from "@/components/landing/start-project/ProjectInquiryForm";
import { InfoCard } from "@/components/landing/start-project/InfoCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function StartProjectPage() {
  return (
    <PageWrapper>
      <StepsSection />

      <Section className="bg-background">
        <Container>
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] lg:items-start lg:gap-10 xl:gap-12"
          >
            <ProjectInquiryForm />

            <InfoCard />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
