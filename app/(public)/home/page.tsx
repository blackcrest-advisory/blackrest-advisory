import Hero from "@/components/landing/Home/Hero";
import TrustedBy from "@/components/landing/Home/TrustedBy";
import WhoWeServe from "@/components/landing/Home/WhoWeServe";
import Services from "@/components/landing/Home/Services";
import WhyUs from "@/components/landing/Home/WhyUs";
import DeliveryModel from "@/components/landing/Home/DeliveryModel";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";
import BrandFilmSection from "@/components/landing/Home/BrandFilmSection";

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <TrustedBy />
      <BrandFilmSection />
      <WhoWeServe />
      <Services />
      <WhyUs />
      <DeliveryModel />
      <CTA />
    </PageWrapper>
  );
}
