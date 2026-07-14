import ByTheNumbers from "@/components/services/digital-marketing/ByTheNumbers";
import FeaturedWork from "@/components/services/digital-marketing/FeaturedWork";
import FinalCTA from "@/components/services/digital-marketing/FinalCTA";
import Hero from "@/components/services/digital-marketing/Hero";
import Marquee from "@/components/services/digital-marketing/Marquee";
import StickyScroll from "@/components/services/digital-marketing/StickyScroll";
import WhatWeDo from "@/components/services/digital-marketing/WhatWeDo";

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
