import Hero from "@/components/landing/services/mobile-application/Hero";
import InsideEveryTap from "@/components/landing/services/mobile-application/InsideEveryTap";
import NativeCrossPlatform from "@/components/landing/services/mobile-application/NativeCrossPlatform";
import { PageWrapper } from "@/components/ui/PageWrapper";

const page = () => {
  return (
    <PageWrapper>
      <Hero />
      <NativeCrossPlatform />
      <InsideEveryTap />
    </PageWrapper>
  );
};

export default page;
