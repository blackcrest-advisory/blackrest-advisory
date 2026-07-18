import { EngagementHero } from "@/components/landing/engagement/EngagementHero";
import { EngagementProcess } from "@/components/landing/engagement/EngagementProcess";
import { EngagementModels } from "@/components/landing/engagement/EngagementModels";
import { EngagementStats } from "@/components/landing/engagement/EngagementStats";
import { EngagementFAQ } from "@/components/landing/engagement/EngagementFAQ";
import { EngagementCTA } from "@/components/landing/engagement/EngagementCTA";
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
