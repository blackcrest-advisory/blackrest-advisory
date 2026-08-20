"use client";

//===== imports =====//
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CircleDot,
  MousePointerClick,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

import { IMAGE } from "@/constants/imagesConfig";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// CONTENT
//==============================================================//

const capabilities = [
  "Performance Marketing",
  "Search & Organic Growth",
  "Content & Social",
  "Conversion & Landing Pages",
  "Analytics & Attribution",
];

const growthSystem = [
  {
    number: "01",
    label: "Strategy",
  },
  {
    number: "02",
    label: "Acquisition",
  },
  {
    number: "03",
    label: "Conversion",
  },
  {
    number: "04",
    label: "Retention",
  },
];

const intelligenceSignals = [
  {
    icon: Search,
    label: "Qualified Traffic",
  },
  {
    icon: MousePointerClick,
    label: "Conversion Rate",
  },
  {
    icon: TrendingUp,
    label: "Pipeline Growth",
  },
  {
    icon: BarChart3,
    label: "ROAS",
  },
];

//==============================================================//
// DIGITAL MARKETING HERO
//==============================================================//

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-background pb-10 pt-8 sm:pb-12 sm:pt-10 lg:min-h-[calc(100svh-80px)] lg:pb-14 lg:pt-12"
    >
      {/*===== ARCHITECTURAL BACKGROUND =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
      >
        {/* vertical grid */}
        <div
          className="absolute inset-0 opacity-[0.26] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:84px_100%] [mask-image:linear-gradient(to_bottom,black_10%,transparent_92%)]"
        />

        {/* horizontal guide */}
        <div
          className="absolute left-0 right-0 top-[42%] h-px bg-border/50"
        />

        {/* gold ambience */}
        <div
          className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-secondary/[0.07] blur-[130px]"
        />

        {/* navy ambience */}
        <div
          className="absolute -right-28 bottom-0 h-[420px] w-[420px] rounded-full bg-primary/[0.06] blur-[140px]"
        />
      </div>

      <Container>
        <div
          className="grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,1.05fr)] lg:gap-10 xl:gap-16"
        >
          {/*===== CONTENT =====*/}

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="relative z-10 min-w-0 lg:py-8"
          >
            {/* eyebrow */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <span
                className="flex h-8 w-8 items-center justify-center border border-secondary/20 bg-secondary/[0.055] text-secondary"
              >
                <Sparkles className="h-3.5 w-3.5" />
              </span>

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                Digital Marketing
              </span>

              <span
                className="h-px w-10 bg-secondary/40"
              />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Growth systems
              </span>
            </motion.div>

            {/*===== HEADLINE =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-7"
            >
              <h1
                className="max-w-[820px] text-[42px] font-semibold leading-[0.98] tracking-[-0.065em] text-heading sm:text-[56px] lg:text-[62px] xl:text-[72px]"
              >
                Turn attention
                <span
                  className="block text-secondary"
                >
                  into measurable growth.
                </span>
              </h1>

              <p
                className="mt-6 max-w-xl text-sm leading-7 text-body sm:text-base sm:leading-8"
              >
                Blackcrest connects strategy, acquisition, content, conversion,
                and performance intelligence into one focused marketing system
                built to generate meaningful business growth.
              </p>
            </motion.div>

            {/*===== CAPABILITIES =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-7 flex flex-wrap gap-x-5 gap-y-3"
            >
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-2"
                >
                  <CircleDot
                    className="h-3 w-3 shrink-0 text-secondary"
                  />

                  <span
                    className="text-xs font-medium text-foreground/80"
                  >
                    {capability}
                  </span>
                </div>
              ))}
            </motion.div>

            {/*===== CTA =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                variant="primary"
                size="lg"
                className="group w-full !rounded-md px-7 sm:w-auto"
              >
                Let&apos;s Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full !rounded-md px-7 sm:w-auto"
              >
                Request Proposal
              </Button>
            </motion.div>

            {/*===== GROWTH SYSTEM =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-9 border-y border-border"
            >
              <div
                className="grid grid-cols-2 sm:grid-cols-4"
              >
                {growthSystem.map((step, index) => (
                  <div
                    key={step.label}
                    className={`
                        relative
                        min-w-0
                        py-3.5
                        pr-3

                        ${
                          index > 0
                            ? "sm:border-l sm:border-border sm:pl-4"
                            : ""
                        }

                        ${index === 1 ? "border-l border-border pl-4" : ""}

                        ${
                          index >= 2
                            ? "border-t border-border sm:border-t-0"
                            : ""
                        }

                        ${index === 3 ? "border-l border-border pl-4" : ""}
                      `}
                  >
                    <span
                      className="font-mono text-[7px] font-semibold text-secondary/50"
                    >
                      {step.number}
                    </span>

                    <p
                      className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-heading"
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/*===== VISUAL SYSTEM =====*/}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 32,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            {/*===== FRAME INDEX =====*/}

            <div
              className="mb-3 flex items-center justify-between gap-4"
            >
              <div
                className="flex items-center gap-2"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />

                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40"
                >
                  Growth intelligence
                </span>
              </div>

              <span
                className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/35"
              >
                DM / 01
              </span>
            </div>

            {/*===== IMAGE FRAME =====*/}

            <div
              className="relative aspect-[5/5.4] min-w-0 overflow-hidden border border-border bg-primary shadow-[var(--shadow-overlay)] sm:aspect-[5/4.5] lg:aspect-[5/5.1] xl:aspect-[5/4.7]"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.025,
                      }
                }
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={IMAGE.digital_growth}
                  alt="Digital marketing growth strategy"
                  fill
                  priority
                  sizes="
                    (max-width: 1024px) 100vw,
                    52vw
                  "
                  className="object-cover object-center"
                />
              </motion.div>

              {/* cinematic treatment */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-navy-deep/35 via-transparent to-transparent"
              />

              {/* grid overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]"
              />

              {/*===== SIGNAL PATH =====*/}

              <div
                aria-hidden="true"
                className="absolute left-[12%] right-[12%] top-[28%] hidden md:block"
              >
                <svg
                  viewBox="0 0 600 140"
                  fill="none"
                  className="h-auto w-full"
                >
                  <motion.path
                    d="M4 118 C92 118 92 74 164 74 C236 74 250 100 320 100 C392 100 398 32 486 32 C530 32 560 44 596 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-secondary/65"
                    initial={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 0,
                            opacity: 0,
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 1,
                            opacity: 1,
                          }
                    }
                    transition={{
                      duration: 2,
                      delay: 0.8,
                      ease: "easeInOut",
                    }}
                  />

                  {[
                    [4, 118],
                    [164, 74],
                    [320, 100],
                    [486, 32],
                    [596, 12],
                  ].map(([cx, cy], index) => (
                    <motion.circle
                      key={index}
                      cx={cx}
                      cy={cy}
                      r="4"
                      className="fill-secondary"
                      initial={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              scale: 0,
                            }
                      }
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              scale: 1,
                            }
                      }
                      transition={{
                        delay: 1.05 + index * 0.12,
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/*===== TOP SIGNAL =====*/}

              <div
                className="absolute left-4 top-4 border border-white/15 bg-navy-deep/70 px-3 py-2.5 backdrop-blur-md sm:left-5 sm:top-5"
              >
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light"
                >
                  Connected growth
                </span>

                <div
                  className="mt-2 flex items-center gap-2"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gold-light"
                  />

                  <span
                    className="text-[10px] font-medium text-white/80"
                  >
                    Strategy → Performance
                  </span>
                </div>
              </div>

              {/*===== INTELLIGENCE PANEL =====*/}

              <div
                className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-navy-deep/80 px-4 py-4 backdrop-blur-xl sm:px-5 sm:py-5"
              >
                <div
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <span
                      className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                    >
                      Performance intelligence
                    </span>

                    <p
                      className="mt-1 text-xs text-white/55"
                    >
                      Measure what moves the business.
                    </p>
                  </div>

                  <TrendingUp
                    className="h-4 w-4 shrink-0 text-gold-light"
                  />
                </div>

                <div
                  className="mt-4 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4"
                >
                  {intelligenceSignals.map((signal) => {
                    const Icon = signal.icon;

                    return (
                      <div
                        key={signal.label}
                        className="bg-navy-deep/90 px-3 py-3"
                      >
                        <Icon
                          className="h-3.5 w-3.5 text-gold-light"
                        />

                        <span
                          className="mt-2 block font-mono text-[7px] font-semibold uppercase leading-4 tracking-[0.1em] text-white/60"
                        >
                          {signal.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/*===== EXTERNAL FRAME DETAILS =====*/}

            <div
              aria-hidden="true"
              className="absolute -right-3 top-[18%] hidden h-24 w-px bg-gradient-to-b from-transparent via-secondary/70 to-transparent lg:block"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-3 right-[15%] hidden h-px w-24 bg-gradient-to-r from-transparent via-secondary/60 to-transparent lg:block"
            />
          </motion.div>
        </div>

        {/*===== BOTTOM INDEX =====*/}

        <div
          className="mt-10 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between lg:mt-12"
        >
          <div
            className="flex items-center gap-3"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
            >
              Blackcrest Advisory
            </span>

            <span className="h-px w-8 bg-secondary/25" />

            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35"
            >
              Digital Growth Practice
            </span>
          </div>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30"
          >
            Strategy / Acquisition / Conversion
          </span>
        </div>
      </Container>
    </Section>
  );
}
