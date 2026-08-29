import { HeroSection } from "@/components/landing/about/HeroSection";
import { WhoWeAreSection } from "@/components/landing/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/landing/about/WhyBlackcrestSection";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";

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
