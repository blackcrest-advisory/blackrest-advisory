import { EngagementHero } from "@/components/landing/engagement/EngagementHero";
import { EngagementProcess } from "@/components/landing/engagement/EngagementProcess";
import { EngagementModels } from "@/components/landing/engagement/EngagementModels";
import { EngagementFAQ } from "@/components/landing/engagement/EngagementFAQ";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function EngagementPage() {
  return (
    <PageWrapper>
      <EngagementHero />
      <EngagementModels />
      <EngagementProcess />
      <EngagementFAQ />
      <CTA />
    </PageWrapper>
  );
}
