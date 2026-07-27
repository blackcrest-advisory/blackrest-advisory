import BuildLayers from "@/components/landing/services/website-development/BuildLayers";
import ExperienceTimeline from "@/components/landing/services/website-development/ExperienceTimeline";
import Hero from "@/components/landing/services/website-development/Hero";
import PerformanceDashboard from "@/components/landing/services/website-development/PerformanceDashboard";
import TechnologyOrbit from "@/components/landing/services/website-development/TechnologyOrbit";
import WebsiteAnatomy from "@/components/landing/services/website-development/WebsiteAnatomy";
import WhatWeBuild from "@/components/landing/services/website-development/WhatWeBuild";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function WebDevelopmentPage() {
  return (
    <PageWrapper>
      <Hero />
      <WebsiteAnatomy />
      <BuildLayers />
      <WhatWeBuild />
      <TechnologyOrbit />
      <PerformanceDashboard />
      <ExperienceTimeline />
    </PageWrapper>
  );
}
