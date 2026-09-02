"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Rocket,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const segments = [
  {
    id: "startup",
    number: "01",
    title: "New ventures",
    stage: "Getting started",
    headline: "Turn a clear idea into a credible launch.",
    description:
      "We help founders shape the digital foundation they need to introduce their business with confidence and make a strong first impression.",
    icon: Rocket,
    services: [
      "Website and digital foundation",
      "Clear brand messaging",
      "Launch marketing essentials",
      "Sales-ready customer journey",
    ],
    challenge:
      "You have a strong idea, but need a clear online presence and a practical plan to reach the right people.",
    result:
      "A credible launch, a clear digital presence, and a foundation ready to grow with the business.",
  },
  {
    id: "sme",
    number: "02",
    title: "Growing businesses",
    stage: "Building momentum",
    headline: "Strengthen the systems behind your growth.",
    description:
      "We work with businesses that have traction and now need better digital tools, marketing activity, and sales support to keep moving forward.",
    icon: Building2,
    services: [
      "Web and mobile improvements",
      "Digital marketing campaigns",
      "Lead generation support",
      "Sales process and automation",
    ],
    challenge:
      "Your website, marketing, or sales process is no longer keeping up with the opportunities in front of you.",
    result:
      "A clearer customer journey, stronger demand generation, and systems that make growth easier to manage.",
  },
  {
    id: "enterprise",
    number: "03",
    title: "Established businesses",
    stage: "Evolving",
    headline: "Improve the digital experience without losing momentum.",
    description:
      "We support established teams that need focused delivery for a website, mobile product, digital campaign, or sales initiative.",
    icon: BriefcaseBusiness,
    services: [
      "Website and platform upgrades",
      "Mobile product development",
      "Digital marketing support",
      "Focused project delivery",
    ],
    challenge:
      "You need to improve a key digital touchpoint or commercial process without disrupting the work already underway.",
    result:
      "A focused improvement that gives your customers a better experience and your team a clearer way forward.",
  },
];

export default function WhoWeServe() {
  const [activeId, setActiveId] = useState("startup");

  const activeSegment =
    segments.find((segment) => segment.id === activeId) ?? segments[0];

  const ActiveIcon = activeSegment.icon;

  return (
    <Section className="relative overflow-hidden bg-navy-deep text-white">
      {/* Architectural background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55rem 32rem at 82% 28%, rgb(166 124 39 / 0.13), transparent 62%)",
          }}
        />

        <div className="absolute left-0 top-0 h-full w-px bg-white/[0.04]" />

        <div className="absolute right-[8%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="absolute right-[14%] top-1/2 h-[23rem] w-[23rem] -translate-y-1/2 rounded-full border border-gold/[0.08]" />

        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                Who we work with
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
            >
              Support that fits
              <span className="block text-white/40"> where you are now.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="max-w-lg text-sm leading-7 text-white/55 sm:text-base"
          >
            Whether you are launching, building momentum, or improving an
            established business, we focus on the digital work that moves you
            forward.
          </motion.p>
        </div>

        {/* Segment selector */}
        <div className="grid border-b border-white/10 md:grid-cols-3">
          {segments.map((segment) => {
            const Icon = segment.icon;
            const isActive = segment.id === activeId;

            return (
              <button
                key={segment.id}
                type="button"
                onClick={() => setActiveId(segment.id)}
                aria-pressed={isActive}
                className={`
                  group relative flex items-center gap-4 border-white/10
                  px-0 py-6 text-left transition-colors duration-300
                  md:border-r md:px-7
                  first:md:pl-0
                  last:md:border-r-0
                  ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }
                `}
              >
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-[var(--radius-control)] border transition-all duration-300
                    ${
                      isActive
                        ? "border-gold/40 bg-gold text-navy shadow-[var(--shadow-gold-glow)]"
                        : "border-white/10 bg-white/[0.035]"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>

                <div>
                  <span
                    className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      isActive ? "text-gold-light" : "text-white/30"
                    }`}
                  >
                    {segment.number} · {segment.stage}
                  </span>

                  <span className="mt-1 block text-sm font-semibold sm:text-base">
                    {segment.title}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="who-we-serve-active"
                    className="absolute bottom-0 left-0 h-[2px] w-full"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic content */}
        <div className="min-h-[520px] py-12 sm:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSegment.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
              className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20"
            >
              {/* Story */}
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-gold/20 bg-gold/10 text-gold-light">
                    <ActiveIcon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                      Business stage
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white/80">
                      {activeSegment.stage}
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                  {activeSegment.headline}
                </h3>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">
                  {activeSegment.description}
                </p>

                {/* Challenge */}
                <div className="mt-10 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                    When we can help most
                  </p>

                  <div className="mt-4 border-l border-gold/40 pl-5">
                    <p className="text-sm leading-7 text-white/70">
                      {activeSegment.challenge}
                    </p>
                  </div>
                </div>

                {/* Delivery process */}
                <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                  <div>
                    <p className="text-2xl font-semibold text-white">01</p>
                    <p className="mt-1 text-xs text-white/35">Understand the goal</p>
                  </div>

                  <div className="h-10 w-px bg-white/10" />

                  <div>
                    <p className="text-2xl font-semibold text-white">02</p>
                    <p className="mt-1 text-xs text-white/35">
                      Build the right solution
                    </p>
                  </div>

                  <div className="h-10 w-px bg-white/10" />

                  <div>
                    <p className="text-2xl font-semibold text-white">03</p>
                    <p className="mt-1 text-xs text-white/35">Keep improving</p>
                  </div>
                </div>
              </div>

              {/* Service panel */}
              <div
                className="border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_50px_rgb(0_0_0/0.16)] backdrop-blur-sm sm:p-8"
                style={{
                  borderRadius: "var(--radius-surface)",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                    Typical priorities
                  </p>

                  <span className="text-xs font-semibold text-gold-light">
                    {activeSegment.number}
                  </span>
                </div>

                <div className="mt-7">
                  {activeSegment.services.map((service, index) => (
                    <div
                      key={service}
                      className="flex items-center gap-4 border-b border-white/[0.07] py-4 first:pt-0 last:border-none last:pb-0"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                        <Check
                          className="h-3.5 w-3.5 text-gold-light"
                          strokeWidth={2.3}
                        />
                      </div>

                      <div className="flex flex-1 items-center justify-between gap-4">
                        <span className="text-sm font-medium text-white/78">
                          {service}
                        </span>

                        <span className="text-[10px] text-white/20">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className="mt-8 border border-gold/15 bg-gold/[0.065] p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                    Desired outcome
                  </span>

                  <p className="mt-2 text-sm font-medium leading-6 text-white/85">
                    {activeSegment.result}
                  </p>
                </div>

                <Link
                  href="/services"
                  className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white"
                >
                  Explore our services
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation cue */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-xs text-white/25">
            Choose the option that best reflects where your business is today.
          </p>

          <div className="flex items-center gap-2">
            {segments.map((segment) => {
              const active = segment.id === activeId;

              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setActiveId(segment.id)}
                  aria-label={`View ${segment.title}`}
                  className={`h-1.5 transition-all duration-300 ${
                    active
                      ? "w-8 bg-gold"
                      : "w-1.5 bg-white/15 hover:bg-white/30"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
