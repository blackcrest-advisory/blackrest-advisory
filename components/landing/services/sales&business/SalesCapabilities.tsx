"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  FileText,
  Handshake,
  Megaphone,
  Presentation,
  Rocket,
  Search,
  Settings,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//===== Capabilities data =====//
const capabilities = [
  {
    icon: Target,
    title: "B2B Sales Strategy",
    meta: "Strategy",
    description: "Commercial plans aligned with market and growth goals.",
  },
  {
    icon: BadgeDollarSign,
    title: "Sales Funnel Optimisation",
    meta: "Conversion",
    description: "Improve conversion across every stage of the buying journey.",
  },
  {
    icon: Settings,
    title: "CRM & Pipeline Setup",
    meta: "Operations",
    description: "Build a clearer CRM structure and healthier sales pipeline.",
  },
  {
    icon: Rocket,
    title: "Lead Generation",
    meta: "Acquisition",
    description: "Create focused programmes designed for better-fit prospects.",
  },
  {
    icon: FileText,
    title: "Proposal & Pitch Support",
    meta: "Sales Enablement",
    description:
      "Sharper proposals and sales material for stronger conversations.",
  },
  {
    icon: Presentation,
    title: "Sales Team Coaching",
    meta: "Enablement",
    description: "Improve process, communication, and commercial confidence.",
  },
  {
    icon: Handshake,
    title: "Client Retention",
    meta: "Retention",
    description:
      "Strengthen relationships and create longer-term account value.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Development",
    meta: "Growth",
    description: "Identify opportunities and build more consistent growth.",
  },
  {
    icon: UserRoundCheck,
    title: "Account Growth",
    meta: "Expansion",
    description: "Find opportunities to deepen valuable client relationships.",
  },
  {
    icon: Search,
    title: "Market Opportunity Research",
    meta: "Research",
    description: "Understand target segments, gaps, and buying signals.",
  },
  {
    icon: BarChart3,
    title: "Sales Reporting",
    meta: "Insights",
    description:
      "Create clearer visibility around pipeline health and activity.",
  },
  {
    icon: Megaphone,
    title: "Sales Messaging",
    meta: "Positioning",
    description:
      "Improve how value is communicated throughout the sales process.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Sales Process Design",
    meta: "Process",
    description:
      "Create a repeatable structure your commercial team can follow.",
  },
  {
    icon: TrendingUp,
    title: "Growth Planning",
    meta: "Planning",
    description: "Connect sales activity with practical commercial priorities.",
  },
];

const firstRow = capabilities.slice(0, 7);
const secondRow = capabilities.slice(7);

//===== Sales capabilities =====//
export const SalesCapabilities = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="capabilities"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/*===== Ambient glow =====*/}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[32%] h-64 w-64 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute left-[38%] top-[45%] h-72 w-72 rounded-full bg-secondary/5 blur-[130px]" />
        <div className="absolute right-[16%] top-[30%] h-64 w-64 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[38%] h-64 w-64 rounded-full bg-secondary/5 blur-[130px]" />
      </div>

      <Container>
        {/*===== Section header =====*/}
        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                02 / Capabilities
              </span>
              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Practical commercial support across strategy, pipeline,
              conversion, retention, and account growth.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]">
              Commercial support across the{" "}
              <span className="text-secondary">entire sales journey.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              From building a stronger pipeline to improving sales execution and
              client retention, Blackcrest supports the commercial systems that
              turn opportunity into sustainable growth.
            </p>
          </div>
        </div>

        {/*===== Capability marquee =====*/}
        <div className="relative z-10 mt-12 space-y-3 overflow-hidden lg:mt-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-20 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-20 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-28" />

          <CapabilityRow
            items={firstRow}
            direction="left"
            shouldReduceMotion={shouldReduceMotion}
          />
          <CapabilityRow
            items={secondRow}
            direction="right"
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/*===== Bottom summary =====*/}
        <div className="relative z-10 mt-9 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm font-medium leading-6 text-heading">
            Strategy, systems, people, and execution — connected around one
            commercial objective.
          </p>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
            Acquire / Convert / Retain / Grow
          </span>
        </div>
      </Container>
    </Section>
  );
};

//===== Capability row =====//
function CapabilityRow({
  items,
  direction,
  shouldReduceMotion,
}: {
  items: typeof capabilities;
  direction: "left" | "right";
  shouldReduceMotion: boolean | null;
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden py-1">
      <motion.div
        className="flex w-max shrink-0 gap-3 pr-3"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
        }
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <CapabilityCard key={`${item.title}-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

//===== Capability card =====//
function CapabilityCard({ item }: { item: (typeof capabilities)[number] }) {
  const Icon = item.icon;

  return (
    <article
      className="group relative w-[220px] shrink-0 overflow-hidden border border-border/80 p-3.5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/20 hover:shadow-[var(--shadow-card-hover)] sm:w-[235px] bg-card"
    >
      {/*===== Card glow =====*/}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60 bg-secondary/20"
      />

      {/*===== Card top =====*/}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/10 text-secondary"
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
          {item.meta}
        </span>
      </div>

      {/*===== Card content =====*/}
      <div className="relative z-10 mt-3">
        <h3 className="text-[13px] font-semibold leading-5 tracking-[-0.015em] text-heading">
          {item.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[10px] leading-[1.55] text-muted-foreground">
          {item.description}
        </p>
      </div>

      {/*===== Card footer =====*/}
      <div className="relative z-10 mt-3 flex items-center gap-2 border-t border-border/60 pt-2.5">
        <span
          className="h-1 w-1 rounded-full bg-secondary"
        />
        <span className="font-mono text-[5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Commercial Support
        </span>
      </div>
    </article>
  );
}
