import BuildLayers from "@/components/landing/services/website-development/BuildLayers";
import CTA from "@/components/landing/Home/CTA";
import Hero from "@/components/landing/services/website-development/Hero";
import TechnologyOrbit from "@/components/landing/services/website-development/TechnologyOrbit";
import WhatWeBuild from "@/components/landing/services/website-development/WhatWeBuild";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function WebDevelopmentPage() {
  return (
    <PageWrapper>
      <Hero />
      <WhatWeBuild />
      <BuildLayers />
      <div className="pb-10">
        <TechnologyOrbit />
      </div>
      {/* <CTA /> */}
    </PageWrapper>
  );
}
