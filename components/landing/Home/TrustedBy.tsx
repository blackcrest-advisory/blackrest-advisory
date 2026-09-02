"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  Check,
  MessageCircle,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const workingPrinciples = [
  {
    number: "01",
    label: "Business-first thinking",
    micro: "Start with the real goal",
    description:
      "We begin by understanding the business challenge, not by pushing a pre-made solution.",
    icon: Target,
  },
  {
    number: "02",
    label: "Focused delivery",
    micro: "Build what matters",
    description:
      "The work stays centred on the digital improvements that can create the clearest value.",
    icon: Workflow,
  },
  {
    number: "03",
    label: "Direct communication",
    micro: "Stay informed",
    description:
      "You have a clear view of priorities, progress, and the decisions shaping the work.",
    icon: MessageCircle,
  },
  {
    number: "04",
    label: "Flexible support",
    micro: "Adapt as you grow",
    description:
      "We can focus on a single project or bring together the right capabilities for a wider business objective.",
    icon: Sparkles,
  },
];

const principles = [
  "Business-first thinking",
  "Focused delivery",
  "Direct communication",
];

export default function TrustedBy() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden border-y border-border bg-background text-foreground transition-colors duration-300">
      {/*===== BACKGROUND ARCHITECTURE =====*/}

      <div className="pointer-events-none absolute inset-0">
        {/* subtle gold atmosphere */}
        <div
          className="absolute right-[-16rem] top-[-14rem] h-[40rem] w-[40rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 68%)",
          }}
        />

        {/* architectural vertical guides */}
        <div
          className="absolute inset-0 hidden opacity-[0.22] lg:block"
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

        {/* moving signal */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute left-[-10rem] top-[34%] h-px w-32 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_12px_var(--color-secondary)]"
            animate={{
              x: ["0vw", "115vw"],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "linear",
            }}
          />
        )}
      </div>

      <Container className="relative">
        {/*===== SECTION INTRO =====*/}

        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-secondary"
                    animate={{
                      scale: [1, 2.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  />
                )}

                <span className="relative h-2 w-2 rounded-full bg-secondary"/>
              </span>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                What to expect
              </span>

              <span className="h-px w-10 bg-secondary/40"/>
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
              Clear thinking.
              <span className="block text-muted-foreground">
                Focused delivery.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
              duration: 0.55,
            }}
            className="lg:justify-self-end"
          >
            <p className="max-w-xl text-sm leading-7 text-body sm:text-base">
              A strong digital project needs more than good execution. It needs
              clear priorities, open communication, and a delivery approach that
              stays connected to the business goal.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-2"
                >
                  <Check className="h-3.5 w-3.5 text-secondary"/>

                  <span className="text-xs font-medium text-muted-foreground">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/*===== WORKING PRINCIPLES =====*/}

        <div className="grid border-b border-border lg:grid-cols-4">
          {workingPrinciples.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.article
                key={principle.label}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 22,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  group relative
                  overflow-hidden
                  border-b border-border
                  py-8
                  transition-colors duration-500
                  hover:bg-card
                  lg:min-h-[320px]
                  lg:border-b-0
                  lg:px-7

                  ${index > 0 ? "lg:border-l" : ""}
                  ${index === 0 ? "lg:pl-0" : ""}
                  ${index === workingPrinciples.length - 1 ? "lg:pr-0" : ""}
                `}
              >
                {/*===== subtle interactive illumination =====*/}

                <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-secondary/[0.08] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"/>

                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[30%]"
                    initial={{
                      x: "-150%",
                    }}
                    whileHover={{
                      x: "480%",
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-secondary) 5%, transparent), transparent)",
                    }}
                  />
                )}

                <div className="relative z-10 flex h-full flex-col">
                  {/* metadata */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground/50">
                      {principle.number}
                    </span>

                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: -7,
                              scale: 1.06,
                            }
                      }
                      className="flex h-10 w-10 items-center justify-center border border-border bg-card text-muted-foreground transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/[0.07] group-hover:text-secondary"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </motion.div>
                  </div>

                  {/* principle */}
                  <div className="mt-8">
                    <p className="text-lg font-semibold tracking-[-0.025em] text-foreground transition-colors duration-300 group-hover:text-secondary">
                      {principle.label}
                    </p>

                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-secondary">
                      {principle.micro}
                    </p>
                  </div>

                  {/* description */}
                  <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>

                  {/* footer */}
                  <div className="mt-auto flex items-center justify-between pt-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/45 sm:text-[10px]">
                      Working principle
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-secondary/50 transition-colors duration-300 group-hover:bg-secondary" />
                  </div>

                  {/* active bottom signal */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
                    <div className="h-full w-0 bg-secondary transition-all duration-500 group-hover:w-full"/>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/*===== CLOSING DELIVERY STATEMENT =====*/}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
          }}
          className="grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
              <Check className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-heading">
                A delivery partner that keeps the work connected to the goal.
              </p>

              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                Blackcrest brings together the right people and practical
                expertise needed to move your business forward with confidence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.17em] text-muted-foreground/50 sm:text-[10px]">
            Clarity
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Focus
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Communication
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Progress
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
