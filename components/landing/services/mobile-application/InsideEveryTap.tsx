"use client";

//===== imports =====//
import Image from "next/image";

import {
  Activity,
  BarChart3,
  Fingerprint,
  Gauge,
  Navigation,
  ShieldCheck,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";

//==============================================================//
// EXPERIENCE FEATURES
//==============================================================//

const features = [
  {
    number: "01",
    title: "Smooth Navigation",
    description:
      "Clear flows and familiar gestures help users move naturally through the product.",
    meta: "Interaction",
    icon: Navigation,
  },
  {
    number: "02",
    title: "Secure Auth",
    description:
      "Protected access without unnecessary friction between users and the product.",
    meta: "Security",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Fast Response",
    description:
      "Efficient rendering and data handling keep interactions feeling immediate.",
    meta: "Performance",
    icon: Zap,
  },
  {
    number: "04",
    title: "Offline Access",
    description:
      "Important experiences remain useful when connectivity becomes unreliable.",
    meta: "Availability",
    icon: Wifi,
  },
  {
    number: "05",
    title: "Connected Data",
    description:
      "Reliable APIs and synchronisation keep information current across sessions.",
    meta: "Data",
    icon: Activity,
  },
  {
    number: "06",
    title: "Useful Analytics",
    description:
      "Meaningful product insights help teams understand behavior and improve.",
    meta: "Intelligence",
    icon: BarChart3,
  },
];

//==============================================================//
// INSIDE EVERY TAP
//==============================================================//

const InsideEveryTap = () => {
  return (
    <Section className="relative overflow-hidden bg-muted/20 py-16 sm:py-20 lg:py-28">
      <Container>
        {/*===== HEADER =====*/}

        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                03 / Inside Every Tap
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]">
              Simple on the surface.
              <span className="block text-secondary">Powerful underneath.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              Great mobile experiences are built from dozens of invisible
              decisions. Navigation, speed, security, connectivity and data all
              work together so the product simply feels right.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <SmallSignal label="Touch-first" />
              <SmallSignal label="Responsive" />
              <SmallSignal label="Secure" />
              <SmallSignal label="Connected" />
            </div>
          </div>
        </div>

        {/*===== EXPERIENCE LAYOUT =====*/}

        <div className="mt-10 grid overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] lg:mt-14 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.35fr)]">
          {/*===== PHONE STAGE =====*/}

          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden border-b border-border bg-primary px-6 py-12 lg:min-h-[680px] lg:border-b-0 lg:border-r">
            {/*===== BACKGROUND TYPE =====*/}

            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[110px] font-semibold tracking-[-0.08em] text-white/[0.025] sm:text-[150px] lg:-rotate-90 lg:text-[170px]"
            >
              MOBILE
            </span>

            {/*===== TOP LABEL =====*/}

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4 lg:left-6 lg:right-6 lg:top-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  Experience active
                </span>
              </div>

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                Mobile / UX
              </span>
            </div>

            {/*===== PHONE =====*/}

            <div className="relative z-10 flex flex-col items-center">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[320px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[80px]"
              />

              <div className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 bg-navy-deep shadow-[0_35px_80px_rgba(0,0,0,0.28)]">
                <Image
                  src={IMAGE.phoneMockup}
                  alt="Mobile application interface"
                  width={300}
                  height={600}
                  priority
                  className="h-auto w-[205px] object-cover sm:w-[225px] lg:w-[245px]"
                />
              </div>

              <div className="relative z-10 mt-7 flex items-center gap-3">
                <Smartphone className="h-3.5 w-3.5 text-gold-light" />

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/40">
                  Designed for real-world interaction
                </span>
              </div>
            </div>

            {/*===== BOTTOM LABEL =====*/}

            <span className="absolute bottom-5 left-5 font-mono text-[7px] uppercase tracking-[0.14em] text-white/20 lg:bottom-6 lg:left-6">
              Blackcrest / Mobile Experience
            </span>
          </div>

          {/*===== EXPERIENCE GRID =====*/}

          <div className="grid min-w-0 sm:grid-cols-2">
            {/*===== FEATURE 01 - FEATURED =====*/}

            <article className="group relative min-w-0 border-b border-border bg-secondary/[0.035] p-6 sm:col-span-2 sm:p-7 lg:p-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[2px] w-16 bg-secondary"
              />

              <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
                      <Navigation className="h-4 w-4" />
                    </div>

                    <div>
                      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                        Interaction
                      </span>

                      <span className="ml-3 font-mono text-[7px] text-muted-foreground/35">
                        01
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
                    Smooth Navigation
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    Clear flows and familiar gestures help users move naturally
                    through the product without having to think about the
                    interface.
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <span className="text-5xl font-semibold tracking-[-0.06em] text-secondary/10">
                    01
                  </span>
                </div>
              </div>
            </article>

            {/*===== REMAINING FEATURES =====*/}

            {features.slice(1).map((feature, index) => {
              const Icon = feature.icon;

              const isLast = index === features.slice(1).length - 1;

              return (
                <article
                  key={feature.title}
                  className={`
                    group
                    relative
                    min-w-0
                    p-6
                    transition-colors
                    duration-300
                    hover:bg-muted/10
                    sm:p-7
                    lg:p-8

                    ${!isLast ? "border-b border-border" : ""}

                    ${index % 2 === 0 ? "sm:border-r sm:border-border" : ""}
                  `}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary transition-colors duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/[0.065]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="font-mono text-[7px] font-semibold text-secondary/45">
                      {feature.number}
                    </span>
                  </div>

                  <span className="mt-7 block font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
                    {feature.meta}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-xs leading-5 text-muted-foreground">
                    {feature.description}
                  </p>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-1px] left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-10"
                  />
                </article>
              );
            })}
          </div>
        </div>

        {/*===== EXPERIENCE PRINCIPLES =====*/}

        <div className="mt-6 grid overflow-hidden border border-border bg-card sm:grid-cols-3">
          <Principle
            icon={Gauge}
            label="Responsive"
            description="Interactions designed to feel immediate."
          />

          <Principle
            icon={ShieldCheck}
            label="Protected"
            description="Security considered from the first interaction."
          />

          <Principle
            icon={Smartphone}
            label="Intuitive"
            description="Interfaces that feel natural from the first tap."
            last
          />
        </div>

        {/*===== CLOSING LINE =====*/}

        <div className="mt-9 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base font-medium leading-7 tracking-[-0.015em] text-heading">
            Good mobile engineering is rarely noticed.
            <span className="text-secondary"> Friction is.</span>
          </p>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
            Touch / Response / Trust
          </span>
        </div>
      </Container>
    </Section>
  );
};

export default InsideEveryTap;

//==============================================================//
// SMALL SIGNAL
//==============================================================//

function SmallSignal({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1 w-1 rounded-full bg-secondary" />

      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/45">
        {label}
      </span>
    </div>
  );
}

//==============================================================//
// PRINCIPLE
//==============================================================//

function Principle({
  icon: Icon,
  label,
  description,
  last = false,
}: {
  icon: typeof Gauge;
  label: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-4
        px-5
        py-5
        sm:px-6

        ${!last ? "border-b border-border sm:border-b-0 sm:border-r" : ""}
      `}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-heading">
          {label}
        </h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
