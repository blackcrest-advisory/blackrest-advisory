import ByTheNumbers from "@/components/landing/services/digital-marketing/ByTheNumbers";
import FeaturedWork from "@/components/landing/services/digital-marketing/FeaturedWork";
import FinalCTA from "@/components/landing/services/digital-marketing/FinalCTA";
import Hero from "@/components/landing/services/digital-marketing/Hero";
import Marquee from "@/components/landing/services/digital-marketing/Marquee";
import StickyScroll from "@/components/landing/services/digital-marketing/StickyScroll";
import WhatWeDo from "@/components/landing/services/digital-marketing/WhatWeDo";

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
