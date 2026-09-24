import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/about/HeroSection";
import { WhoWeAreSection } from "@/components/landing/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/landing/about/WhyBlackcrestSection";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
  title: "About Blackcrest Advisory | Practical Business Solutions",
  description:
    "Blackcrest Advisory identifies business problems and delivers practical solutions across business planning, websites, marketing, and sales.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <WhoWeAreSection />
      <WhyBlackcrestSection />
      <CTA
        copy={{
          title: "Your business has a challenge.",
          emphasis: "Let's find the right solution.",
          description:
            "Tell us what is holding your business back. We will assess the problem, discuss the right approach, and define the work needed to move forward.",
          trustPoints: [
            "A clear understanding of the problem",
            "Solutions matched to your business",
            "Agreed costs, responsibilities, and timelines",
          ],
          reassurance:
            "Start with your business goal, what you have tried, and what is getting in the way. We will use that conversation to define the next step.",
        }}
      />
    </PageWrapper>
  );
}
