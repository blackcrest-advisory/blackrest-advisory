import { HeroSection } from "@/components/landing/about/HeroSection";
import { HowWeOperateSection } from "@/components/landing/about/HowWeOperateSection";
import { WhoWeAreSection } from "@/components/landing/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/landing/about/WhyBlackcrestSection";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <WhoWeAreSection />
      <HowWeOperateSection />
      <WhyBlackcrestSection />
    </PageWrapper>
  );
}
