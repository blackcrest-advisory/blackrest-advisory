"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Network,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const principles = [
  {
    number: "01",
    label: "Understand your customer",
  },
  {
    number: "02",
    label: "Plan your business",
  },
  {
    number: "03",
    label: "Take practical action",
  },
];

export const HeroSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative isolate overflow-hidden bg-background py-0 md:py-0 lg:py-0">
      {/*===== Background =====*/}

      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* asymmetric warm glow */}
        <div
          className="absolute -right-32 top-[-8rem] h-[42rem] w-[42rem] opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.11), transparent 68%)",
          }}
        />

        {/* technical line field */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                color-mix(in srgb, var(--color-border) 50%, transparent) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "96px 100%",
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 88%, transparent)",
          }}
        />

        {/* giant word */}
        <div className="absolute -bottom-10 right-[-2%] hidden select-none text-[13rem] font-semibold tracking-[-0.08em] text-navy/[0.025] xl:block">
          ABOUT
        </div>

        {/* vertical drafting mark */}
        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-border/60 lg:block" />

        <motion.div
          aria-hidden="true"
          className="absolute left-[7%] top-0 hidden h-24 w-px bg-secondary lg:block"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: ["0vh", "85vh"],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative flex max-w-7xl flex-col py-12 sm:py-16 lg:py-20">
        {/*===== Main layout =====*/}

        <div className="grid flex-1 gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          {/*===== Left =====*/}

          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                Blackcrest / About
              </span>

              <motion.span
                initial={{
                  scaleX: reduceMotion ? 1 : 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-px w-16 origin-left bg-secondary/50"
              />
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-3xl text-[clamp(2.5rem,4.2vw,4.35rem)] font-semibold leading-[1.1] tracking-[-0.05em] text-heading"
            >
              Helping you turn
              <span className="block text-muted-foreground">
                a business idea into
              </span>
              <span className="relative inline-block">
                <span className="text-gold-gradient">a clear way forward.</span>

                <motion.span
                  aria-hidden="true"
                  initial={{
                    scaleX: reduceMotion ? 1 : 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    delay: 0.55,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -bottom-2 left-0 h-px w-full origin-left bg-secondary/40"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.26,
                duration: 0.55,
              }}
              className="mt-5 max-w-xl text-base leading-7 text-body"
            >
              Starting a business comes with questions. Blackcrest helps new
              founders understand their customers, choose a direction, and
              build a practical plan—with support to put it into action.
            </motion.p>

            {/* actions */}
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.38,
                duration: 0.5,
              }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button
                variant="primary"
                size="md"
                href="#our-story"
                className="group"
              >
                Get to know Blackcrest
                <ArrowDownRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Button>

              <Button
                variant="outline"
                size="md"
                href="#why-blackcrest"
                className="group"
              >
                Why Blackcrest
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </div>

          {/*===== Right editorial panel =====*/}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* index */}
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                For people starting a business
              </span>

              <span className="font-mono text-[10px] text-secondary">
                Your starting point
              </span>
            </div>

            {/* Main panel */}
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              transition={{
                duration: 0.3,
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              {/* hover scan */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
                  initial={{
                    x: "-140%",
                  }}
                  whileHover={{
                    x: "420%",
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgb(166 124 39 / 0.06), transparent)",
                  }}
                />
              )}

              <div className="relative">
                {/* icon/status */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center bg-navy text-gold-light">
                    <Network className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.4, 1, 0.4],
                            }
                      }
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-success"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      Advice & practical support
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Our purpose
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl">
                  You do not need to have every answer.
                </h2>

                <p className="mt-3 text-sm leading-6 text-body">
                  You might be unsure what to sell, who to reach, or where to
                  invest first. We help you work through the problem and
                  decide on a useful next step.
                </p>

                {/* principles */}
                <div className="mt-5 border-t border-border pt-4">
                  {principles.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                      }}
                      className="flex items-center justify-between border-b border-border/70 py-2.5 last:border-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[9px] text-secondary">
                          {item.number}
                        </span>

                        <span className="text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                      </div>

                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* floating network annotation */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              className="relative mt-3 flex items-center justify-between border-l border-secondary/30 pl-4"
            >
              <div className="flex items-center gap-3">
                <Network className="h-4 w-4 text-secondary" strokeWidth={1.8} />

                <span className="text-xs text-muted-foreground">
                  Business · Growth · Solution
                </span>
              </div>

              <Sparkles className="h-3.5 w-3.5 text-secondary/60" />
            </motion.div>
          </motion.div>
        </div>

        {/*===== Bottom positioning statement =====*/}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.75,
            duration: 0.6,
          }}
          className="mt-12 grid gap-4 border-t border-border pt-5 sm:grid-cols-[auto_1fr] sm:items-center"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
            What defines us
          </span>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:justify-end">
            <span>Customer understanding</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>Practical planning</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>Clear communication</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>Long-term partnership</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
