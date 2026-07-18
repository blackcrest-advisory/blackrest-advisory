import Hero from "@/components/landing/services/mobile-application/Hero";
import InsideEveryTap from "@/components/landing/services/mobile-application/InsideEveryTap";
import NativeCrossPlatform from "@/components/landing/services/mobile-application/NativeCrossPlatform";

const page = () => {
  return (
    <div>
      <Hero />
      <NativeCrossPlatform />
      <InsideEveryTap />
    </div>
  );
};

export default page;
