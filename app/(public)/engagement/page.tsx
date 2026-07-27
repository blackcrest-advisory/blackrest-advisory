import { EngagementHero } from "@/components/landing/engagement/EngagementHero";
import { EngagementProcess } from "@/components/landing/engagement/EngagementProcess";
import { EngagementModels } from "@/components/landing/engagement/EngagementModels";
import { EngagementStats } from "@/components/landing/engagement/EngagementStats";
import { EngagementFAQ } from "@/components/landing/engagement/EngagementFAQ";
import { EngagementCTA } from "@/components/landing/engagement/EngagementCTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function EngagementPage() {
  return (
    <PageWrapper>
      <EngagementHero />
      <EngagementStats />
      <EngagementProcess />
      <EngagementModels />
      <EngagementFAQ />
      <EngagementCTA />
    </PageWrapper>
  );
}
