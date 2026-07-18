"use client";

import { Section } from "@/components/shared/Section";
import { whyData } from "@/content-data/about/aboutData";
export const WhyBlackcrestSection = () => {
  return (
    <Section className="bg-muted">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase text-secondary">
          Why Us
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-secondary after:rounded">
          Why Blackcrest Advisory
        </h2>
        <p className="mt-8 text-body dark:text-body leading-relaxed">
          The European B2B market is served by many agencies. What makes us
          different is not our service list — it &apos;s our model of engagement
          and commitment to client outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 max-w-5xl mx-auto">
        {whyData.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-6 bg-card rounded-2xl p-8 border border-border shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-body dark:text-body leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
