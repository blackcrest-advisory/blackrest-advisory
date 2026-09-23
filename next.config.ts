import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const renamedAreas = {
      "page-setup": "business-setup-plan",
      "buyer-persona": "niche-selection",
      "marketing-strategy": "marketing-growth",
      "execution-growth": "execution-support",
      retention: "after-support-retention",
    };

    return Object.entries(renamedAreas).map(([previous, current]) => ({
      source: `/services/business-development/${previous}`,
      destination: `/services/business-development/${current}`,
      permanent: true,
    }));
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
