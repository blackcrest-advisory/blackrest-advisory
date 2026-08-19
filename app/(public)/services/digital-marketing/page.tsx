import ByTheNumbers from "@/components/landing/services/digital-marketing/ByTheNumbers";
import FeaturedWork from "@/components/landing/services/digital-marketing/FeaturedWork";
import FinalCTA from "@/components/landing/services/digital-marketing/FinalCTA";
import GrowthEngine from "@/components/landing/services/digital-marketing/GrowthEngine";
import Hero from "@/components/landing/services/digital-marketing/Hero";
import Marquee from "@/components/landing/services/digital-marketing/Marquee";
import StickyScroll from "@/components/landing/services/digital-marketing/StickyScroll";
import WhatWeDo from "@/components/landing/services/digital-marketing/WhatWeDo";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function DigitalMarketingPage() {
  return (
    <PageWrapper>
      <Hero />
      <Marquee />
      <WhatWeDo />
      <GrowthEngine />
      <FeaturedWork />
      <ByTheNumbers />
      <StickyScroll />
      <FinalCTA />
    </PageWrapper>
  );
}
