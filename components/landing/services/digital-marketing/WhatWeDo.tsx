"use client";

//===== imports =====//
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CircleDot,
  Megaphone,
  MousePointerClick,
  Search,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { IMAGE } from "@/constants/imagesConfig";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// CONTENT
//==============================================================//

const channels = [
  {
    number: "01",
    title: "Search",
    label: "Organic demand",
    icon: Search,
  },
  {
    number: "02",
    title: "Paid",
    label: "Targeted acquisition",
    icon: MousePointerClick,
  },
  {
    number: "03",
    title: "Social",
    label: "Audience engagement",
    icon: Share2,
  },
  {
    number: "04",
    title: "Content",
    label: "Authority & trust",
    icon: Megaphone,
  },
];

const outcomes = [
  "Reach the right audience",
  "Create qualified demand",
  "Improve conversion journeys",
  "Measure commercial impact",
];

//==============================================================//
// WHAT WE DO
//==============================================================//

export default function WhatWeDo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/*===== BACKGROUND ARCHITECTURE =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute left-[7%] top-0 h-full w-px bg-border/45"
        />

        <div
          className="absolute right-[7%] top-0 h-full w-px bg-border/45"
        />

        <div
          className="absolute left-1/2 top-[46%] h-px w-[86%] -translate-x-1/2 bg-border/35"
        />

        <div
          className="absolute right-[8%] top-[10%] h-80 w-80 rounded-full bg-secondary/[0.055] blur-[120px]"
        />
      </div>

      <Container>
        {/*===== SECTION INTRO =====*/}

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end lg:gap-16 lg:pb-14"
        >
          {/* left index */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="min-w-0"
          >
            <div
              className="flex items-center gap-3"
            >
              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                02 / What we do
              </span>

              <span
                className="h-px w-12 bg-secondary/35"
              />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            >
              Digital marketing works best when every channel supports the same
              commercial objective.
            </p>
          </motion.div>

          {/* headline */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="min-w-0"
          >
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[58px]"
            >
              More than visibility.
              <span className="block text-secondary">
                A system built to create demand.
              </span>
            </h2>
          </motion.div>
        </motion.div>

        {/*===== MAIN SYSTEM =====*/}

        <div
          className="grid min-w-0 gap-10 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(500px,1.1fr)] lg:gap-14 lg:pt-14 xl:gap-20"
        >
          {/*===== CONTENT =====*/}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 28,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-w-0 flex-col justify-between"
          >
            <div>
              <div
                className="flex items-center gap-2"
              >
                <CircleDot className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary"
                >
                  Integrated marketing
                </span>
              </div>

              <p
                className="mt-5 max-w-xl text-sm leading-7 text-body sm:text-base sm:leading-8"
              >
                We don&apos;t treat SEO, paid media, content, social, and
                conversion as isolated services. Blackcrest brings them together
                around one strategy — helping you attract the right audience,
                move prospects through the journey, and turn marketing activity
                into measurable business opportunities.
              </p>

              {/* outcomes */}
              <div
                className="mt-8 border-y border-border"
              >
                {outcomes.map((outcome, index) => (
                  <div
                    key={outcome}
                    className="group flex items-center justify-between gap-5 border-b border-border py-3.5 last:border-b-0"
                  >
                    <div
                      className="flex min-w-0 items-center gap-4"
                    >
                      <span
                        className="font-mono text-[7px] font-semibold text-secondary/50"
                      >
                        0{index + 1}
                      </span>

                      <span
                        className="text-xs font-medium text-heading sm:text-sm"
                      >
                        {outcome}
                      </span>
                    </div>

                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-secondary"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                className="group w-full !rounded-md sm:w-auto"
              >
                Talk With Our Experts
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </div>
          </motion.div>

          {/*===== MARKETING SYSTEM VISUAL =====*/}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 40,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-w-0"
          >
            {/* visual index */}
            <div
              className="mb-3 flex items-center justify-between gap-3"
            >
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40"
              >
                Channel orchestration
              </span>

              <span
                className="font-mono text-[7px] uppercase tracking-[0.15em] text-secondary"
              >
                System / 01
              </span>
            </div>

            {/* main frame */}
            <div
              className="relative min-h-[520px] overflow-hidden border border-border bg-primary shadow-[var(--shadow-overlay)] sm:min-h-[580px]"
            >
              {/* image */}
              <div
                className="absolute inset-0"
              >
                <Image
                  src={IMAGE.seo_image}
                  alt="SEO and digital marketing strategy"
                  fill
                  sizes="
                    (max-width: 1024px) 100vw,
                    55vw
                  "
                  className="object-cover object-center"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-navy-deep/65 to-navy-deep/95"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-navy-deep/20"
                />
              </div>

              {/* grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.17] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]"
              />

              {/*===== TOP SIGNAL =====*/}

              <div
                className="absolute left-4 right-4 top-4 flex items-center justify-between gap-4 border-b border-white/15 pb-3 sm:left-6 sm:right-6 sm:top-6"
              >
                <div
                  className="flex items-center gap-2"
                >
                  <span
                    className="relative flex h-2 w-2"
                  >
                    {!shouldReduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-gold-light"
                        animate={{
                          scale: [1, 2.2, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}

                    <span
                      className="relative h-2 w-2 rounded-full bg-gold-light"
                    />
                  </span>

                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-white/55"
                  >
                    Integrated signal
                  </span>
                </div>

                <BarChart3 className="h-4 w-4 text-gold-light" />
              </div>

              {/*===== CENTER NETWORK =====*/}

              <div
                className="absolute inset-x-5 top-[22%] sm:inset-x-8"
              >
                {/* center label */}
                <div
                  className="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold-light/30 bg-navy-deep/70 text-center backdrop-blur-md sm:h-32 sm:w-32"
                >
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            rotate: 360,
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                          }
                    }
                    className="absolute h-36 w-36 rounded-full border border-dashed border-gold-light/15 sm:h-40 sm:w-40"
                  />

                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-gold-light"
                  >
                    Blackcrest
                  </span>

                  <span
                    className="mt-1 text-sm font-semibold text-white"
                  >
                    Growth System
                  </span>
                </div>

                {/* connector */}
                <div
                  aria-hidden="true"
                  className="mx-auto mt-8 h-10 w-px bg-gradient-to-b from-gold-light/60 to-white/10"
                />
              </div>

              {/*===== CHANNEL GRID =====*/}

              <div
                className="absolute bottom-5 left-4 right-4 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:bottom-6 sm:left-6 sm:right-6 lg:grid-cols-4"
              >
                {channels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <div
                      key={channel.title}
                      className="group relative min-w-0 overflow-hidden bg-navy-deep/90 px-3 py-4 backdrop-blur-md transition-colors duration-300 hover:bg-navy-deep/80 sm:px-4"
                    >
                      <div
                        className="flex items-start justify-between gap-3"
                      >
                        <Icon
                          className="h-4 w-4 text-gold-light"
                        />

                        <span
                          className="font-mono text-[7px] text-white/25"
                        >
                          {channel.number}
                        </span>
                      </div>

                      <p
                        className="mt-5 text-xs font-semibold text-white"
                      >
                        {channel.title}
                      </p>

                      <p
                        className="mt-1 text-[9px] leading-4 text-white/40"
                      >
                        {channel.label}
                      </p>

                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-light transition-all duration-500 group-hover:w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* external decorative signal */}
            <div
              aria-hidden="true"
              className="absolute -right-3 top-[28%] hidden h-28 w-px bg-gradient-to-b from-transparent via-secondary/60 to-transparent lg:block"
            />
          </motion.div>
        </div>

        {/*===== SECTION FOOTER =====*/}

        <div
          className="mt-12 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between lg:mt-16"
        >
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            One strategy. Connected channels.
          </span>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35"
          >
            Search / Paid / Social / Content / Conversion
          </span>
        </div>
      </Container>
    </Section>
  );
}
