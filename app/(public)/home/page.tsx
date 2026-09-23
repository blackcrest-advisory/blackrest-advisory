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
      <TrustedBy />
      <BusinessDevelopmentIntro />
      <WhoWeServe />
      <Services />
      <DeliveryModel />
      <CTA
        copy={{
          title: "Have an idea?",
          emphasis: "Let's talk about it.",
          description:
            "Tell us what you want to start and where you need help. We will talk through your options and help you choose a practical first step.",
          trustPoints: [
            "A conversation about your business idea",
            "Help deciding what to do first",
            "Support matched to your needs",
          ],
          reassurance:
            "You do not need a finished business plan to get in touch. Bring your questions, and we can work through them together.",
        }}
      />
      <BusinessHelpFinder />
    </PageWrapper>
  );
}
