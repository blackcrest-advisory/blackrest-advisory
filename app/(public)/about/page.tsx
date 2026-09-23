import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/about/HeroSection";
import { WhoWeAreSection } from "@/components/landing/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/landing/about/WhyBlackcrestSection";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "About Blackcrest Advisory | Business Support for New Founders",
  description:
    "Get to know Blackcrest Advisory. We help new founders understand their customers, choose a niche, plan their business, and turn ideas into practical action.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <WhoWeAreSection />
      <WhyBlackcrestSection />
      <CTA />
    </PageWrapper>
  );
}
