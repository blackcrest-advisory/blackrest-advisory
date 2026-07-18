import { HeroSection } from "@/components/landing/about/HeroSection";
import { WhoWeAreSection } from "@/components/landing/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/landing/about/WhyBlackcrestSection";

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <WhoWeAreSection />
      <WhyBlackcrestSection />
    </main>
  );
}
