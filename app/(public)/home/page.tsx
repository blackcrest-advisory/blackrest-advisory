import TrustedBy from "@/components/landing/Home/TrustedBy";
import WhoWeServe from "@/components/landing/Home/WhoWeServe";
import Services from "@/components/landing/Home/Services";
import DeliveryModel from "@/components/landing/Home/DeliveryModel";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";
import HeroTwo from "@/components/landing/Home/HeroTwo";
import BusinessDevelopmentIntro from "@/components/landing/Home/BusinessDevelopmentIntro";
import BusinessHelpFinder from "@/components/landing/Home/BusinessHelpFinder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blackcrest Advisory | Start, Build & Grow Your Business",
  description:
    "Business advice and practical support for founders, startups, and growing businesses. Explore business development, websites, marketing, and sales support.",
};

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroTwo />
      <BusinessDevelopmentIntro />
      <TrustedBy />
      <WhoWeServe />
      <Services />
      <DeliveryModel />
      <CTA />
      <BusinessHelpFinder />
    </PageWrapper>
  );
}
