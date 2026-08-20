"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Handshake,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//===== Commercial capabilities =====//
const capabilities = [
  "B2B Sales Strategy",
  "Pipeline Development",
  "Sales Process Optimisation",
  "Client Retention",
];

//===== Pipeline stages =====//
const pipeline = [
  {
    id: "01",
    label: "Prospect",
    description: "Find the right opportunities.",
    icon: Target,
  },
  {
    id: "02",
    label: "Qualify",
    description: "Focus on real commercial potential.",
    icon: UserRoundCheck,
  },
  {
    id: "03",
    label: "Convert",
    description: "Create momentum through a clear process.",
    icon: BriefcaseBusiness,
  },
  {
    id: "04",
    label: "Retain",
    description: "Grow stronger client relationships.",
    icon: Handshake,
  },
];

//===== Sales hero =====//
export const SalesHero = () => {
  return (
    <Section className="relative isolate overflow-hidden bg-background py-0">
      {/*===== Ambient background =====*/}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-secondary/[0.055] blur-[150px]" />
        <div className="absolute -left-32 bottom-0 h-[340px] w-[340px] rounded-full bg-primary/[0.04] blur-[140px]" />
      </div>

      <Container>
        {/*===== Top bar =====*/}
        <div className="flex flex-col gap-3 border-x border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Sales & Business Support
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35">
              Strategy / Pipeline / Growth
            </span>
            <span className="hidden font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary sm:block">
              Commercial / 01
            </span>
          </div>
        </div>

        {/*===== Hero statement =====*/}
        <div className="border-x border-border px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  Commercial Growth Practice
                </span>
              </div>

              <h1 className="mt-7 max-w-[980px] text-[44px] font-semibold leading-[0.96] tracking-[-0.06em] text-heading sm:text-[58px] lg:text-[72px] xl:text-[82px]">
                Turn scattered sales effort into{" "}
                <span className="text-secondary">commercial momentum.</span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-lg text-sm leading-7 text-body sm:text-base sm:leading-8">
                Blackcrest helps B2B businesses create stronger commercial
                systems — improving how opportunities are found, qualified,
                converted, retained, and grown.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="#capabilities"
                  variant="primary"
                  size="md"
                  className="group w-full !rounded-md sm:w-auto"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button
                  href="#contact"
                  variant="outline"
                  size="md"
                  className="w-full !rounded-md sm:w-auto"
                >
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </div>

          {/*===== Capability signals =====*/}
          <div className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.04] text-secondary">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/*===== Commercial journey =====*/}
        <div className="grid border-x border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === pipeline.length - 1;

            return (
              <div
                key={stage.id}
                className={`group relative min-w-0 bg-card px-5 py-6 transition-colors duration-300 hover:bg-muted/10 sm:px-6 ${!isLast ? "border-b border-border sm:border-r lg:border-b-0" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[7px] font-semibold text-secondary/45">
                    {stage.id}
                  </span>
                </div>

                <span className="mt-6 block font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/30">
                  Commercial stage
                </span>

                <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                  {stage.label}
                </h2>

                <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
                  {stage.description}
                </p>

                <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-secondary transition-all duration-300 group-hover:w-16" />
              </div>
            );
          })}
        </div>

        {/*===== Commercial brief =====*/}
        <div className="grid overflow-hidden border-x border-t border-border bg-primary text-white lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-white/10 px-5 py-7 sm:px-7 lg:border-b-0 lg:border-r lg:px-8 lg:py-9">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
              Commercial objective
            </span>

            <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
              Make growth easier to manage and easier to repeat.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
              A healthier sales operation gives your team clearer priorities,
              stronger conversations, and better visibility across the pipeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-3">
            <CommercialFocus
              number="01"
              label="Focus"
              title="Right opportunities"
              description="Spend more time on prospects with genuine commercial potential."
            />

            <CommercialFocus
              number="02"
              label="Structure"
              title="Clearer process"
              description="Create a sales workflow that teams can understand and consistently follow."
            />

            <CommercialFocus
              number="03"
              label="Growth"
              title="Stronger accounts"
              description="Build relationships that create retention, expansion, and long-term value."
              last
            />
          </div>
        </div>

        {/*===== Bottom rail =====*/}
        <div className="flex flex-col gap-3 border-x border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Target className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
              Prospect → Qualify → Convert → Retain → Grow
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Handshake className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
              Commercial outcomes first
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

//===== Commercial focus =====//
function CommercialFocus({
  number,
  label,
  title,
  description,
  last = false,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`min-w-0 px-5 py-6 sm:px-6 lg:py-8 ${!last ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-gold-light/55">
          {label}
        </span>
        <span className="font-mono text-[7px] font-semibold text-white/15">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-white/40">{description}</p>
    </div>
  );
}
