import Hero from "@/components/landing/Home/Hero";
import TrustedBy from "@/components/landing/Home/TrustedBy";
import WhoWeServe from "@/components/landing/Home/WhoWeServe";
import Services from "@/components/landing/Home/Services";
import WhyUs from "@/components/landing/Home/WhyUs";
import DeliveryModel from "@/components/landing/Home/DeliveryModel";
import CTA from "@/components/landing/Home/CTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero - First impression, value proposition */}
      <Hero />

      {/* 2. Trusted By - Social proof, builds credibility */}
      <TrustedBy />

      {/* 3. Who We Serve - Shows target audience, helps visitors self-identify */}
      <WhoWeServe />

      {/* 4. Services - Core offerings, what we do */}
      <Services />

      {/* 5. Why Us - Differentiators, why choose us over competitors */}
      <WhyUs />

      {/* 6. Delivery Model - Operational excellence, hybrid approach */}
      <DeliveryModel />

      {/* 7. CTA - Final call to action, close the loop */}
      <CTA />
    </>
  );
}
