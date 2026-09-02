import CTA from "@/components/landing/Home/CTA";
import Hero from "@/components/landing/services/digital-marketing/Hero";
import StickyScroll from "@/components/landing/services/digital-marketing/StickyScroll";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function DigitalMarketingPage() {
  return (
    <PageWrapper>
      <Hero />
      <StickyScroll />
      <CTA />
    </PageWrapper>
  );
}
