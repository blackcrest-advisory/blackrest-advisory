// src/components/engagement/EngagementModels.tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../../shared/SectionHeader";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { BadgeCheck, Clock, Layers, Sparkles } from "lucide-react";

const models = [
  {
    title: "Retained Partnership",
    icon: BadgeCheck,
    bestFor: "Businesses wanting an ongoing growth partner",
    description:
      "Monthly fixed retainer covering one or more service pillars. Regular strategy sessions, ongoing delivery, and monthly performance reporting. Our most popular and highest-impact model.",
    features: [
      "Dedicated account team",
      "Monthly strategy review",
      "Performance dashboards",
      "Unlimited ad-hoc support",
    ],
    cta: "Start Retained",
  },
  {
    title: "Project-Based",
    icon: Clock,
    bestFor: "Defined deliverables with clear scope",
    description:
      "Fixed-price engagements for specific deliverables — a new website, mobile app, campaign launch, or sales audit. Clear scope, defined timeline, milestone-based delivery.",
    features: [
      "Fixed scope & budget",
      "Milestone payments",
      "Dedicated project manager",
      "Post-launch handover",
    ],
    cta: "Request a Quote",
  },
  {
    title: "Hybrid",
    icon: Layers,
    bestFor: "Ongoing support plus specific projects",
    description:
      "A retainer for ongoing work combined with separate project-based billing for defined scope items. Offers continuity with the flexibility to handle ad-hoc projects.",
    features: [
      "Flexible scope",
      "Priority access",
      "Blended billing",
      "Strategic advisory included",
    ],
    cta: "Explore Hybrid",
  },
];

export const EngagementModels = () => {
  return (
    <section
      id="engagement-models"
      className="py-12 sm:py-16 md:py-20 lg:py-32"
    >
      <div className="container px-4 sm:px-6">
        <SectionHeader
          tag="Choose Your Path"
          title="Engagement Models"
          description="We offer flexible engagement models to suit different client needs, project sizes, and stages of growth."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.title}
                variants={fadeInUp}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-8 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Decorative badge */}
                {model.title === "Retained Partnership" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-0.5 sm:px-4 sm:py-1 text-[10px] sm:text-xs font-semibold text-cta-text shadow-lg whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-cta-text transition-colors">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                  {model.title}
                </h3>
                <span className="text-xs sm:text-sm font-medium text-secondary/80 uppercase tracking-wider mb-3">
                  Best for: {model.bestFor}
                </span>
                <p className="text-xs sm:text-sm text-body/70 leading-relaxed mb-6">
                  {model.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2 mb-6 flex-1">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs sm:text-sm text-body/80"
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-auto w-full rounded-lg border border-secondary/30 bg-transparent py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-secondary transition-all hover:bg-secondary hover:text-cta-text">
                  {model.cta}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
