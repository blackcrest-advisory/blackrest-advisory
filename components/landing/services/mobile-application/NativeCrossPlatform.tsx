"use client";

//===== imports =====//
import {
  Check,
  Code2,
  Layers3,
  Smartphone,
  TimerReset,
  TrendingUp,
  Wrench,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// BENEFITS
//==============================================================//

const benefits = [
  {
    icon: TimerReset,
    title: "Faster Delivery",
    description:
      "Build core features once and release across iOS and Android together.",
  },
  {
    icon: TrendingUp,
    title: "Lower Complexity",
    description:
      "One shared product foundation reduces duplicated development effort.",
  },
  {
    icon: Wrench,
    title: "Simpler Maintenance",
    description:
      "Updates, fixes and improvements can be managed from one codebase.",
  },
  {
    icon: Layers3,
    title: "Consistent Experience",
    description:
      "Keep product behavior, branding and interaction patterns aligned.",
  },
];

//==============================================================//
// PLATFORMS
//==============================================================//

const platforms = [
  {
    label: "iOS",
    detail: "iPhone & iPad",
  },
  {
    label: "Android",
    detail: "Phones & Tablets",
  },
];

//==============================================================//
// NATIVE CROSS PLATFORM
//==============================================================//

const NativeCrossPlatform = () => {
  return (
    <Section className="relative bg-background py-16 sm:py-20 lg:py-28">
      <Container>
        {/*===== HEADER =====*/}

        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16 lg:pb-14">
          {/* left */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                02 / Cross-Platform
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              One product foundation designed to deliver a consistent experience
              across the devices your customers use.
            </p>
          </div>

          {/* right */}
          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]">
              One codebase.
              <span className="block text-secondary">Two major platforms.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              Cross-platform development lets us create shared application logic
              and reusable interface systems while still delivering a polished
              experience on both iOS and Android.
            </p>
          </div>
        </div>

        {/*===== MAIN STORY =====*/}

        <div className="mt-10 grid overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] lg:mt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(300px,0.65fr)_minmax(0,0.8fr)]">
          {/*===== LEFT / CODEBASE =====*/}

          <div className="border-b border-border px-5 py-7 sm:px-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-9">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Shared foundation
            </span>

            <div className="mt-6 flex h-12 w-12 items-center justify-center border border-secondary/20 bg-secondary/[0.045] text-secondary">
              <Code2 className="h-5 w-5" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-heading">
              Build once.
              <span className="block text-secondary">Maintain together.</span>
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Shared business logic, API integration, state management and
              reusable UI create a cleaner development workflow and a more
              maintainable product.
            </p>

            {/* simple feature list */}
            <div className="mt-7 space-y-3 border-t border-border pt-5">
              {[
                "Shared application logic",
                "Reusable interface components",
                "Unified feature development",
                "Simpler long-term maintenance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center border border-secondary/25 text-secondary">
                    <Check className="h-2.5 w-2.5" />
                  </span>

                  <span className="text-xs font-medium text-heading">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*===== CENTER / PLATFORM BRIDGE =====*/}

          <div className="relative flex min-h-[330px] flex-col justify-center border-b border-border bg-muted/10 px-5 py-8 sm:px-6 lg:border-b-0 lg:border-r">
            <div className="mx-auto w-full max-w-[270px]">
              {/* central node */}
              <div className="border border-secondary/25 bg-primary px-5 py-5 text-center text-white">
                <Code2 className="mx-auto h-5 w-5 text-gold-light"/>

                <span className="mt-3 block font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                  Shared Codebase
                </span>

                <p className="mt-2 text-xs text-white/45">
                  One product core
                </p>
              </div>

              {/* connector */}
              <div
                aria-hidden="true"
                className="mx-auto h-10 w-px bg-secondary/35"
              />

              {/* output platforms */}
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.label}
                    className="border border-border bg-card px-3 py-4 text-center"
                  >
                    <Smartphone className="mx-auto h-4 w-4 text-secondary"/>

                    <span className="mt-2 block text-sm font-semibold text-heading">
                      {platform.label}
                    </span>

                    <span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.11em] text-muted-foreground/35">
                      {platform.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
              One core → multiple experiences
            </p>
          </div>

          {/*===== RIGHT / BENEFITS =====*/}

          <div className="px-5 py-7 sm:px-6 lg:px-8 lg:py-9">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Why it matters
            </span>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em] text-heading">
              Less duplication.
              <span className="block text-secondary">More product focus.</span>
            </h3>

            <div className="mt-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className={`
                      flex
                      gap-4
                      py-4

                      ${
                        index !== benefits.length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    `}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-heading">
                        {benefit.title}
                      </h4>

                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/*===== SIMPLE VALUE STRIP =====*/}

        <div className="mt-6 grid overflow-hidden border border-border bg-muted/10 sm:grid-cols-3">
          <ValueItem
            number="01"
            label="One Team"
            description="A unified development workflow."
          />

          <ValueItem
            number="02"
            label="One Product Core"
            description="Shared logic across platforms."
          />

          <ValueItem
            number="03"
            label="Two Platforms"
            description="iOS and Android delivery."
            last
          />
        </div>

        {/*===== CLOSING =====*/}

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm font-medium leading-6 text-heading">
            The goal is not simply to reuse code. It&apos;s to create a product
            that is easier to build, easier to maintain, and consistent across
            platforms.
          </p>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
            Shared Core / Native Experience
          </span>
        </div>
      </Container>
    </Section>
  );
};

export default NativeCrossPlatform;

//==============================================================//
// VALUE ITEM
//==============================================================//

function ValueItem({
  number,
  label,
  description,
  last = false,
}: {
  number: string;
  label: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        px-5 py-5
        sm:px-6

        ${!last ? "border-b border-border sm:border-b-0 sm:border-r" : ""}
      `}
    >
      <span className="font-mono text-[7px] font-semibold text-secondary/55">
        {number}
      </span>

      <h4 className="mt-2 text-sm font-semibold text-heading">
        {label}
      </h4>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
