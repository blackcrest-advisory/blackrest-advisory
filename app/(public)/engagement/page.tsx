import { EngagementHero } from "@/components/engagement/EngagementHero";
import { EngagementProcess } from "@/components/engagement/EngagementProcess";
import { EngagementModels } from "@/components/engagement/EngagementModels";
import { EngagementStats } from "@/components/engagement/EngagementStats";
import { EngagementFAQ } from "@/components/engagement/EngagementFAQ";
import { EngagementCTA } from "@/components/engagement/EngagementCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement | Blackcrest Advisory",
  description:
    "Explore how Blackcrest Advisory partners with businesses to deliver digital transformation, marketing, and growth solutions. Flexible engagement models tailored to your needs.",
};

export default function EngagementPage() {
  return (
    <main className="min-h-screen">
      <EngagementHero />
      <EngagementStats />
      <EngagementProcess />
      <EngagementModels />
      <EngagementFAQ />
      <EngagementCTA />
    </main>
  );
}
