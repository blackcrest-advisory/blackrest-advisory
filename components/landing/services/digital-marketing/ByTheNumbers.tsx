"use client";

//===== imports =====//
import { useRef } from "react";
import CountUp from "react-countup";
import {
  BarChart3,
  MailPlus,
  MousePointer2,
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// PERFORMANCE DATA
//==============================================================//

const stats = [
  {
    number: "01",
    label: "Increase in Website Traffic",
    value: 1211,
    suffix: "%",
    eyebrow: "Audience Growth",
    icon: MousePointer2,
  },
  {
    number: "02",
    label: "Increase in Social Media Followers",
    value: 750,
    suffix: "%",
    eyebrow: "Community Growth",
    icon: Share2,
  },
  {
    number: "03",
    label: "Google Ad Impressions",
    value: 22,
    suffix: "M",
    eyebrow: "Paid Visibility",
    icon: BarChart3,
  },
  {
    number: "04",
    label: "Email Contacts Collected",
    value: 120,
    suffix: "K",
    eyebrow: "Audience Capture",
    icon: MailPlus,
  },
];

//==============================================================//
// BY THE NUMBERS
//==============================================================//

export default function ByTheNumbers() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
      {/*===== BACKGROUND =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* horizontal technical lines */}
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:100%_72px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"/>

        {/* gold ambient light */}
        <div className="absolute left-[8%] top-[18%] h-[340px] w-[340px] rounded-full bg-secondary/[0.055] blur-[130px]"/>

        <div className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-primary/[0.045] blur-[140px]"/>
      </div>

      <Container>
        <div ref={ref}>
          {/*===== EDITORIAL INTRO =====*/}

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:items-end lg:gap-16 lg:pb-14"
          >
            {/* index */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="min-w-0"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  05 / Performance Evidence
                </span>

                <span className="h-px w-10 bg-secondary/35" />
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Digital marketing should create visible commercial movement, not
                simply more activity.
              </p>
            </motion.div>

            {/* headline */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="min-w-0"
            >
              <h2 className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[58px]">
                Performance you can
                <span className="block text-secondary">
                  actually see moving.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
                A strong marketing system compounds across channels. More
                visibility creates more opportunity, stronger engagement
                improves conversion, and better measurement creates smarter
                decisions.
              </p>
            </motion.div>
          </motion.div>

          {/*===== PERFORMANCE BOARD =====*/}

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mt-10 border border-border bg-card shadow-[var(--shadow-card)] lg:mt-14"
          >
            {/* board header */}
            <div className="flex flex-col gap-4 border-b border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  {!shouldReduceMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-success"
                      animate={{
                        scale: [1, 2.3, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    />
                  )}

                  <span className="relative h-2 w-2 rounded-full bg-success"/>
                </span>

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                  Selected performance outcomes
                </span>
              </div>

              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-secondary">
                Growth / Evidence
              </span>
            </div>

            {/*===== METRICS =====*/}

            <div className="grid min-w-0 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.article
                    key={stat.label}
                    variants={shouldReduceMotion ? undefined : fadeInUp}
                    className={`
                      group
                      relative
                      min-w-0
                      overflow-hidden
                      border-b border-border
                      px-5 py-7
                      transition-colors
                      duration-300
                      hover:bg-secondary/[0.018]
                      sm:px-6
                      xl:border-b-0

                      ${index % 2 === 0 ? "sm:border-r" : ""}

                      ${index < 3 ? "xl:border-r" : ""}
                    `}
                  >
                    {/* hover signal */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full"
                    />

                    {/* meta */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[7px] font-semibold text-secondary/50">
                          {stat.number}
                        </span>

                        <p className="mt-1 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                          {stat.eyebrow}
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-secondary transition-all duration-300 group-hover:border-secondary/25 group-hover:bg-secondary/[0.045]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    {/* value */}
                    <div className="mt-10">
                      <div className="whitespace-nowrap text-[44px] font-semibold leading-none tracking-[-0.06em] text-heading sm:text-[52px] xl:text-[48px] 2xl:text-[58px]">
                        {isInView ? (
                          <CountUp
                            start={0}
                            end={stat.value}
                            duration={shouldReduceMotion ? 0 : 2.5}
                            suffix={stat.suffix}
                          />
                        ) : (
                          `0${stat.suffix}`
                        )}
                      </div>

                      <p className="mt-4 max-w-[210px] text-xs font-medium leading-5 text-body">
                        {stat.label}
                      </p>
                    </div>

                    {/*===== DATA TRACE =====*/}

                    <div
                      aria-hidden="true"
                      className="relative mt-8 h-10 overflow-hidden"
                    >
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-border"/>

                      <svg
                        viewBox="0 0 260 40"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full overflow-visible"
                      >
                        <motion.path
                          d={
                            index === 0
                              ? "M0 33 C28 32 38 29 59 30 C86 31 91 20 118 22 C150 25 158 12 187 14 C218 16 229 6 260 5"
                              : index === 1
                                ? "M0 31 C30 27 43 31 68 25 C90 20 107 22 128 16 C151 11 170 17 193 10 C220 3 236 8 260 4"
                                : index === 2
                                  ? "M0 34 C34 35 43 25 67 27 C92 29 104 19 128 21 C151 23 165 12 190 15 C213 18 232 7 260 4"
                                  : "M0 33 C21 30 40 32 61 27 C83 22 100 25 120 18 C143 10 162 18 185 12 C207 6 229 9 260 3"
                          }
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-secondary/55"
                          initial={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  pathLength: 0,
                                  opacity: 0,
                                }
                          }
                          whileInView={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  pathLength: 1,
                                  opacity: 1,
                                }
                          }
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.4,
                            delay: 0.25 + index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </svg>

                      <span className="absolute bottom-0 left-0 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/25">
                        Performance trajectory
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/*===== BOARD FOOTER =====*/}

            <div className="grid border-t border-border bg-muted/10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-secondary/35" />

                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    Measure the movement
                  </span>
                </div>

                <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground">
                  Performance becomes useful when it helps reveal what to
                  strengthen, where to invest, and what to improve next.
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-border px-5 py-4 md:border-l md:border-t-0 sm:px-6">
                <TrendingUp className="h-3.5 w-3.5 text-secondary" />

                <span className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                  Evidence over vanity
                </span>
              </div>
            </div>
          </motion.div>

          {/*===== BOTTOM INDEX =====*/}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Visibility → Engagement → Conversion → Growth
            </span>

            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30">
              Blackcrest / Digital Marketing
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
