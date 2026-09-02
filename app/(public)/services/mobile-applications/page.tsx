import CTA from "@/components/landing/Home/CTA";
import Hero from "@/components/landing/services/mobile-application/Hero";
import InsideEveryTap from "@/components/landing/services/mobile-application/InsideEveryTap";
import NativeCrossPlatform from "@/components/landing/services/mobile-application/NativeCrossPlatform";
import { PageWrapper } from "@/components/ui/PageWrapper";

const MobileApplicationsPage = () => {
  return (
    <PageWrapper>
      <Hero />
      <NativeCrossPlatform />
      <InsideEveryTap />
      <CTA />
    </PageWrapper>
  );
};

export default MobileApplicationsPage;
