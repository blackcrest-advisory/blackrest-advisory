import { HeroSection } from "@/components/about/HeroSection";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { WhyBlackcrestSection } from "@/components/about/WhyBlackcrestSection";

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <WhoWeAreSection />
      <WhyBlackcrestSection />
    </main>
  );
}
