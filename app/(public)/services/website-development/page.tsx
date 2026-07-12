"use client";

import BuildLayers from "@/components/services/website-development/BuildLayers";
import ExperienceTimeline from "@/components/services/website-development/ExperienceTimeline";
import Hero from "@/components/services/website-development/Hero";
import PerformanceDashboard from "@/components/services/website-development/PerformanceDashboard";
import TechnologyOrbit from "@/components/services/website-development/TechnologyOrbit";
import WebsiteAnatomy from "@/components/services/website-development/WebsiteAnatomy";
import WhatWeBuild from "@/components/services/website-development/WhatWeBuild";

export default function WebDevelopmentPage() {
  return (
    <main>
      <Hero />
      <WebsiteAnatomy />
      <BuildLayers />
      <WhatWeBuild />
      <TechnologyOrbit />
      <PerformanceDashboard />
      <ExperienceTimeline />
      {/* <FutureArchitecture />
      <WhyBlackcrest />
      <CTASection /> */}
    </main>
  );
}
