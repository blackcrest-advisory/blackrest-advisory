"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  FolderCheck,
  RefreshCw,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

const AnimatedCounter = ({ value, suffix = "" }: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(count, {
    damping: 34,
    stiffness: 72,
    mass: 0.8,
  });

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    count.set(value);
  }, [count, value]);

  return (
    <span>
      {new Intl.NumberFormat("en-GB").format(displayValue)}
      {suffix}
    </span>
  );
};

const stats = [
  {
    id: "experience",
    index: "01",
    label: "Years Experience",
    value: 15,
    suffix: "+",
    icon: Clock3,
    note: "Cross-functional digital expertise",
  },
  {
    id: "clients",
    index: "02",
    label: "Clients Served",
    value: 120,
    suffix: "+",
    icon: BriefcaseBusiness,
    note: "Across varied B2B environments",
  },
  {
    id: "projects",
    index: "03",
    label: "Projects Delivered",
    value: 280,
    suffix: "+",
    icon: FolderCheck,
    note: "Strategy through execution",
  },
  {
    id: "retention",
    index: "04",
    label: "Client Retention",
    value: 94,
    suffix: "%",
    icon: RefreshCw,
    note: "Built around long-term relationships",
  },
];

export const EngagementStats = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
  });

  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden border-y border-border bg-background py-0">
      {/* subtle technical background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-[28rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent 67%)",
          }}
        />
      </div>

      <Container className="relative">
        <div ref={ref} className="grid lg:grid-cols-[0.72fr_1.28fr]">
          {/* ========================================
              LEFT — CONTEXT / INTRO
          ======================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col justify-between border-b border-border py-10 lg:min-h-[430px] lg:border-b-0 lg:border-r lg:py-14 lg:pr-12"
          >
            <div>
              {/* eyebrow */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  {!reduceMotion && (
                    <motion.span
                      animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 rounded-full bg-secondary"
                    />
                  )}

                  <span className="relative h-2 w-2 rounded-full bg-secondary" />
                </span>

                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  Blackcrest / By the numbers
                </span>
              </div>

              <h2 className="mt-6 max-w-md text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
                Built around
                <span className="block text-muted-foreground">
                  measurable work.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-body">
                A snapshot of the experience, delivery capacity, and client
                relationships behind the way we work.
              </p>
            </div>

            {/* status */}
            <div className="mt-10 lg:mt-0">
              <div className="flex max-w-sm items-center justify-between border-t border-border pt-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    Engagement philosophy
                  </p>

                  <p className="mt-1.5 text-xs font-medium text-foreground">
                    Quality over volume
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* corner index */}
            <span className="absolute right-5 top-5 font-mono text-[9px] text-muted-foreground/30 lg:right-8">
              METRICS_01
            </span>
          </motion.div>

          {/* ========================================
              RIGHT — METRIC MATRIX
          ======================================== */}
          <div className="grid sm:grid-cols-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.article
                  key={stat.id}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 24,
                    filter: reduceMotion ? "none" : "blur(4px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group relative min-h-[215px]
                    overflow-hidden
                    border-border
                    p-6 sm:p-7 lg:p-8

                    ${index % 2 === 0 ? "sm:border-r" : ""}
                    ${index < 2 ? "border-b" : ""}
                    ${index === 2 ? "border-b sm:border-b-0" : ""}
                  `}
                >
                  {/* hover surface */}
                  <div className="absolute inset-0 bg-card opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>

                  {/* hover gold glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-secondary/[0.07] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"/>

                  {/* animated scanning line */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-px w-20 bg-gradient-to-r from-transparent via-secondary to-transparent"
                      initial={{ x: "-120%" }}
                      whileHover={{
                        x: "700%",
                      }}
                      transition={{
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    {/* top metadata */}
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[9px] font-medium tracking-[0.16em] text-muted-foreground/45">
                        {stat.index}
                      </span>

                      <motion.div
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                rotate: -8,
                                scale: 1.06,
                              }
                        }
                        className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/[0.07] group-hover:text-secondary"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                    </div>

                    {/* number */}
                    <div className="mt-7">
                      <div className="font-mono text-[3.4rem] font-medium leading-none tracking-[-0.07em] text-heading sm:text-[4rem] lg:text-[4.5rem]">
                        {isInView ? (
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                          />
                        ) : (
                          <>0{stat.suffix}</>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-semibold text-foreground">
                        {stat.label}
                      </p>
                    </div>

                    {/* bottom description */}
                    <div className="mt-auto flex items-end justify-between gap-5 pt-5">
                      <p className="max-w-[14rem] text-xs leading-5 text-muted-foreground">
                        {stat.note}
                      </p>

                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"/>
                    </div>

                    {/* animated bottom progress */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + index * 0.08,
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full origin-left bg-gradient-to-r from-secondary via-secondary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ========================================
            BOTTOM DATA STRIP
        ======================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.5,
          }}
          className="flex flex-col gap-4 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Experience
              <span className="mx-2 text-border">/</span>
              Delivery
              <span className="mx-2 text-border">/</span>
              Relationships
            </p>
          </div>

          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/40">
            Blackcrest Advisory — Engagement Metrics
          </p>
        </motion.div>
      </Container>
    </Section>
  );
};
