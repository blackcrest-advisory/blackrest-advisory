import TrustedBy from "@/components/landing/Home/TrustedBy";
import WhoWeServe from "@/components/landing/Home/WhoWeServe";
import Services from "@/components/landing/Home/Services";
import DeliveryModel from "@/components/landing/Home/DeliveryModel";
import CTA from "@/components/landing/Home/CTA";
import { PageWrapper } from "@/components/ui/PageWrapper";
import HeroTwo from "@/components/landing/Home/HeroTwo";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroTwo />
      <TrustedBy />
      <WhoWeServe />
      <Services />
      <DeliveryModel />
      <CTA />
    </PageWrapper>
  );
}
