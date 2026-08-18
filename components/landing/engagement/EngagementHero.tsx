"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleDot,
  Layers3,
  MessagesSquare,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const engagementSignals = [
  "Clear scope & priorities",
  "Senior-level collaboration",
  "Flexible delivery model",
];

const phases = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the challenge, context, and commercial objective.",
  },
  {
    number: "02",
    title: "Shape",
    description: "Define the right engagement model and delivery approach.",
  },
  {
    number: "03",
    title: "Mobilise",
    description: "Align the team, priorities, ownership, and first actions.",
  },
];

export const EngagementHero = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative isolate overflow-hidden bg-background py-14 text-foreground transition-colors duration-300 sm:py-20 lg:py-28">
      {/* Background architecture */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute right-[-14rem] top-[-8rem] h-[42rem] w-[42rem] opacity-70"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 11%, transparent), transparent 68%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                color-mix(in srgb, var(--color-border) 55%, transparent) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "88px 100%",
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-[-8rem] top-[42%] h-px w-32 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_14px_var(--color-secondary)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["0vw", "115vw"],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />

        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-border/50 lg:block" />

        <motion.div
          aria-hidden="true"
          className="absolute left-[7%] top-0 hidden h-24 w-px bg-secondary lg:block"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: ["0vh", "80vh"],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <CircleDot className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Engagement / Start here
              </span>

              <motion.span
                initial={{ scaleX: reduceMotion ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-px w-14 origin-left bg-secondary/40"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-heading sm:text-5xl md:text-6xl lg:text-[4.5rem]"
            >
              Start with the
              <span className="block text-muted-foreground">
                right engagement,
              </span>
              <span className="text-gold-gradient">not the biggest one.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-7 max-w-2xl text-base leading-8 text-body sm:text-lg"
            >
              Every business needs something different. We shape the engagement
              around the problem, the ambition, and the level of support you
              actually need — from focused advisory work to ongoing delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href="#engagement-models"
                className="group"
              >
                Explore engagement models
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button variant="outline" size="lg" href="#faq" className="group">
                See FAQs
                <ArrowDownRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Button>
            </motion.div>

            {/* signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6"
            >
              {engagementSignals.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/[0.08]">
                    <Check className="h-3 w-3 text-secondary" />
                  </div>
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — engagement launch panel */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.18,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Engagement blueprint
              </span>

              <span className="font-mono text-[9px] text-secondary">
                BCR / 04
              </span>
            </div>

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)] sm:p-8"
            >
              {/* scan */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-[34%]"
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "430%" }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent)",
                  }}
                />
              )}

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-11 w-11 items-center justify-center bg-primary text-secondary">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.35, 1, 0.35],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-success"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                      Ready
                    </span>
                  </div>
                </div>

                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  How an engagement begins
                </p>

                <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
                  Start by defining what success actually needs to look like.
                </h2>

                <p className="mt-4 text-sm leading-7 text-body">
                  We begin with context, not packages. That lets us recommend a
                  model that fits the problem instead of forcing the problem
                  into a predefined service.
                </p>

                <div className="relative mt-8">
                  <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-border" />

                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: 0.55,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-secondary via-secondary/40 to-transparent"
                  />

                  <div className="space-y-2">
                    {phases.map((phase, index) => (
                      <motion.div
                        key={phase.number}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.55 + index * 0.1,
                        }}
                        className="relative flex gap-5 py-3"
                      >
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/25 bg-background font-mono text-[9px] font-semibold text-secondary">
                          {phase.number}
                        </div>

                        <div className="flex-1 border-b border-border pb-4">
                          <p className="text-sm font-semibold text-heading">
                            {phase.title}
                          </p>

                          <p className="mt-1 text-xs leading-6 text-muted-foreground">
                            {phase.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-4 border border-secondary/20 bg-secondary/[0.05] p-4">
                  <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                  <p className="text-xs leading-6 text-muted-foreground">
                    The first conversation is about fit and direction — not
                    pressure, packages, or unnecessary commitments.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* lower metadata */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 flex items-center justify-between border-l border-secondary/30 pl-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />

                <span className="text-xs text-muted-foreground">
                  Scope around the business need
                </span>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/50">
                01 → 03
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom positioning row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          className="mt-16 grid gap-5 border-t border-border pt-7 sm:grid-cols-[auto_1fr] sm:items-center"
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">
            Engagement principle
          </span>

          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:justify-self-end sm:text-right">
            Begin small when that is the right answer. Expand when the value is
            clear. Every engagement should earn its next stage.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
};
