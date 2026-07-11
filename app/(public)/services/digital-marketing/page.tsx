import ByTheNumbers from "@/components/services/ByTheNumbers";
import FeaturedWork from "@/components/services/FeaturedWork";
import FinalCTA from "@/components/services/FinalCTA";
import Hero from "@/components/services/Hero";
import Marquee from "@/components/services/Marquee";
import StickyScroll from "@/components/services/StickyScroll";
import WhatWeDo from "@/components/services/WhatWeDo";

export default function DigitalMarketingPage() {
  return (
    <main className="bg-background ">
      <Hero />
      <Marquee />
      <WhatWeDo />
      <FeaturedWork />
      <ByTheNumbers />
      <StickyScroll />
      <FinalCTA />
    </main>
  );
}
