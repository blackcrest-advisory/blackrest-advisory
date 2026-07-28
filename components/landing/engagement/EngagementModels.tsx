"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, Layers, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/utils/animations";

//===== Engagement models data =====//
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
    popular: true,
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
    popular: false,
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
    popular: false,
  },
];

export const EngagementModels = () => {
  return (
    //===== Engagement models section with three options =====//
    <Section>
      <Container>
        {/*===== Section header =====*/}
        <div className="mb-12 text-center md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
            Choose Your Path
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Engagement Models
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We offer flexible engagement models to suit different client needs,
            project sizes, and stages of growth.
          </p>
        </div>

        {/*===== Models grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <motion.div key={model.title} variants={fadeInUp}>
                <Card
                  padding="lg"
                  hoverEffect
                  className="group relative flex h-full flex-col"
                >
                  {/*===== "Most Popular" badge =====*/}
                  {model.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-0.5 text-[10px] font-semibold text-white shadow-lg sm:px-4 sm:py-1 sm:text-xs whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground sm:text-xl">
                    {model.title}
                  </h3>

                  {/* Best for */}
                  <span className="mb-3 text-xs font-medium uppercase tracking-wider text-secondary/80 sm:text-sm">
                    Best for: {model.bestFor}
                  </span>

                  {/* Description */}
                  <p className="mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {model.description}
                  </p>

                  {/* Features list */}
                  <ul className="mb-6 flex-1 space-y-1.5 sm:space-y-2">
                    {model.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs text-muted-foreground/80 sm:text-sm"
                      >
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary sm:h-4 sm:w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant="outline"
                    className="mt-auto w-full border-secondary/30 text-secondary hover:bg-secondary hover:text-primary-foreground"
                  >
                    {model.cta}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};
