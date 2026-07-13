import Hero from "@/components/services/mobile-application/Hero";
import InsideEveryTap from "@/components/services/mobile-application/InsideEveryTap";
import NativeCrossPlatform from "@/components/services/mobile-application/NativeCrossPlatform";

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
