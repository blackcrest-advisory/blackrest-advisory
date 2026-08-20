"use client";

import {
  ChartNoAxesCombined,
  Lightbulb,
  Rocket,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//===== Process steps data =====//
const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Strategy & Discovery",
    description:
      "We understand your commercial goals, audience, current pipeline, and sales process before deciding what needs to change.",
    focus: ["Sales strategy", "Lead generation", "Market direction"],
  },
  {
    number: "02",
    icon: Settings2,
    title: "Optimisation & Enablement",
    description:
      "We strengthen the systems behind your sales activity, from funnel structure and CRM organisation to proposals and sales material.",
    focus: ["Funnel design", "CRM structure", "Sales assets"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execution & Training",
    description:
      "Your team gets the processes, guidance, and practical support needed to put the new commercial system into daily use.",
    focus: ["Team coaching", "Execution", "Sales consistency"],
  },
  {
    number: "04",
    icon: ChartNoAxesCombined,
    title: "Retention & Growth",
    description:
      "We focus on strengthening client relationships, identifying account opportunities, and creating a healthier path to long-term growth.",
    focus: ["Retention", "Account growth", "Business development"],
  },
];

//===== Sales process =====//
export const SalesProcess = () => {
  return (
    <Section className="relative bg-muted/20 py-16 sm:py-20 lg:py-28">
      <Container>
        {/*===== Section header =====*/}
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                03 / Our Approach
              </span>
              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A clear commercial process designed to move from diagnosis to
              execution and sustainable growth.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]">
              A stronger sales engine starts with{" "}
              <span className="text-secondary">a better process.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              We work through the commercial system in stages — understanding
              the problem first, improving the structure, supporting execution,
              and then building on what works.
            </p>
          </div>
        </div>

        {/*===== Process roadmap =====*/}
        <div className="relative mt-12 lg:mt-16">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-border lg:block" />

          <div className="grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="group relative min-w-0 border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card-hover)] sm:p-6"
                >
                  {/*===== Step header =====*/}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center border border-secondary/20 bg-secondary/[0.05] text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-2xl font-semibold tracking-[-0.05em] text-secondary/15">
                      {step.number}
                    </span>
                  </div>

                  {/*===== Step content =====*/}
                  <div className="mt-7">
                    <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
                      Stage {step.number}
                    </span>

                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/*===== Step focus =====*/}
                  <div className="mt-6 border-t border-border pt-4">
                    <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                      Focus
                    </span>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.focus.map((item) => (
                        <span
                          key={item}
                          className="border border-border bg-muted/20 px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/*===== Connector =====*/}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-[17px] top-[27px] z-20 hidden h-3 w-3 border border-secondary/30 bg-background lg:block" />
                  )}

                  <span className="absolute bottom-0 left-0 h-[2px] w-10 bg-secondary transition-all duration-300 group-hover:w-16" />
                </article>
              );
            })}
          </div>
        </div>

        {/*===== Process outcome =====*/}
        <div className="mt-6 grid overflow-hidden border border-border bg-primary text-white lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="px-5 py-6 sm:px-7">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
              The outcome
            </span>

            <p className="mt-2 max-w-2xl text-lg font-medium leading-7 tracking-[-0.02em] text-white">
              A commercial system your team can understand, operate, measure,
              and improve.
            </p>
          </div>

          <div className="grid grid-cols-4 border-t border-white/10 lg:border-l lg:border-t-0">
            <OutcomeItem number="01" label="Understand" />
            <OutcomeItem number="02" label="Improve" />
            <OutcomeItem number="03" label="Execute" />
            <OutcomeItem number="04" label="Grow" last />
          </div>
        </div>

        {/*===== CTA =====*/}
        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Ready to improve your sales process?
            </span>

            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Start with a conversation about where your commercial process is
              today and where you want it to go.
            </p>
          </div>

          <Button href="#contact" variant="primary" size="lg">
            Let&apos;s Start Your Growth Journey
          </Button>
        </div>
      </Container>
    </Section>
  );
};

//===== Outcome item =====//
function OutcomeItem({
  number,
  label,
  last = false,
}: {
  number: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`min-w-0 px-3 py-4 text-center sm:px-4 ${!last ? "border-r border-white/10" : ""}`}
    >
      <span className="font-mono text-[6px] font-semibold text-gold-light/50">
        {number}
      </span>

      <span className="mt-1 block text-[10px] font-semibold text-white/60">
        {label}
      </span>
    </div>
  );
}
