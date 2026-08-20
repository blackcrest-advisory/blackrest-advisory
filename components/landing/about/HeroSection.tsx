"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Globe2,
  Network,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const principles = [
  {
    number: "01",
    label: "Strategy",
  },
  {
    number: "02",
    label: "Technology",
  },
  {
    number: "03",
    label: "Growth",
  },
];

export const HeroSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative isolate overflow-hidden py-14 sm:py-20 lg:py-28">
      {/* ================================================================ */}
      {/* Background                                                       */}
      {/* ================================================================ */}

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
          className="absolute inset-0 opacity-[0.28]"
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

      <Container className="relative">
        {/* ================================================================ */}
        {/* Main layout                                                      */}
        {/* ================================================================ */}

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          {/* -------------------------------------------------------------- */}
          {/* Left                                                           */}
          {/* -------------------------------------------------------------- */}

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
              className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-heading sm:text-5xl md:text-6xl lg:text-[4.7rem]"
            >
              Built for businesses
              <span className="block text-muted-foreground">
                that expect more from
              </span>
              <span className="relative inline-block">
                <span className="text-gold-gradient">digital partners.</span>

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
              className="mt-8 max-w-2xl text-base leading-8 text-body sm:text-lg"
            >
              Blackcrest Advisory was created around a simple idea: businesses
              should not have to choose between strategic thinking and practical
              execution. We bring both together across technology, marketing,
              sales, and growth.
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
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="md"
                href="#our-story"
                className="group"
              >
                Explore our story
                <ArrowDownRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Button>

              <Button
                variant="outline"
                size="md"
                href="#values"
                className="group"
              >
                Our principles
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Right editorial panel                                          */}
          {/* -------------------------------------------------------------- */}

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
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Company profile
              </span>

              <span className="font-mono text-[10px] text-secondary">
                BCR / 02
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
              className="group relative overflow-hidden border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-8"
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
                    <Globe2 className="h-5 w-5" strokeWidth={1.8} />
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
                      Europe · Active
                    </span>
                  </div>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Our position
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
                  One partner across the digital growth equation.
                </h2>

                <p className="mt-4 text-sm leading-7 text-body">
                  We work across disciplines because business problems rarely
                  belong to just one department. Strategy influences technology.
                  Technology affects marketing. Marketing feeds sales. Growth
                  depends on all of them working together.
                </p>

                {/* principles */}
                <div className="mt-8 border-t border-border pt-6">
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
                      className="flex items-center justify-between border-b border-border/70 py-3 last:border-none"
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
              className="relative mt-4 flex items-center justify-between border-l border-secondary/30 pl-4"
            >
              <div className="flex items-center gap-3">
                <Network className="h-4 w-4 text-secondary" strokeWidth={1.8} />

                <span className="text-xs text-muted-foreground">
                  Connecting strategy with execution
                </span>
              </div>

              <Sparkles className="h-3.5 w-3.5 text-secondary/60" />
            </motion.div>
          </motion.div>
        </div>

        {/* ================================================================ */}
        {/* Bottom positioning statement                                     */}
        {/* ================================================================ */}

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
          className="mt-16 grid gap-6 border-t border-border pt-7 sm:grid-cols-[auto_1fr] sm:items-center"
        >
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
            What defines us
          </span>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:justify-end">
            <span>Commercial thinking</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>Hands-on execution</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>International perspective</span>
            <span className="h-1 w-1 rounded-full bg-secondary" />

            <span>Long-term partnership</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
