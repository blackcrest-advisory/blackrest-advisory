import type { Metadata } from "next";
import { EngagementHero } from "@/components/landing/engagement/EngagementHero";
import { EngagementProcess } from "@/components/landing/engagement/EngagementProcess";
import { EngagementModels } from "@/components/landing/engagement/EngagementModels";
import { EngagementFAQ } from "@/components/landing/engagement/EngagementFAQ";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "Work with Blackcrest Advisory | Business Solutions",
  description:
    "See how Blackcrest turns business problems into practical solutions, with clear project plans, agreed costs, regular updates, and ongoing business services.",
};

export default function EngagementPage() {
  return (
    <PageWrapper>
      <EngagementHero />
      <EngagementModels />
      <EngagementProcess />
      <EngagementFAQ />
      <CTA
        copy={{
          title: "Start with the problem.",
          emphasis: "Agree the way forward.",
          description:
            "Tell us what your business needs to change. We will assess the challenge and recommend the right work, whether that is one project or an ongoing partnership.",
          trustPoints: [
            "A solution built around your business",
            "Clear costs and responsibilities",
            "An agreed plan before work begins",
          ],
          reassurance:
            "Bring your goals, current challenges, and any work already in place. We will discuss what needs attention first and what delivery would involve.",
        }}
      />
    </PageWrapper>
  );
}
