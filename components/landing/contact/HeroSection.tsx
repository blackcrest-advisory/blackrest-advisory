"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  Check,
  CircleDot,
  Clock3,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const expectations = [
  "We review your enquiry",
  "We identify the right next step",
  "We respond with clarity",
];

export const HeroSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section
      className="
        relative overflow-hidden
        bg-background
        py-16 text-foreground
        transition-colors duration-300
        sm:py-20 lg:py-28
      "
    >
      {/* Background architecture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -right-48 -top-40
            h-[42rem] w-[42rem]
            opacity-60
          "
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 9%, transparent), transparent 68%)",
          }}
        />

        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-border/50 lg:block" />

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute left-[7%] top-0 hidden h-24 w-px bg-secondary lg:block"
            animate={{
              y: ["0vh", "75vh"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        )}

        <div
          className="
            absolute inset-0
            hidden opacity-[0.18]
            lg:block
          "
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
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -16,
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
              <CircleDot className="h-4 w-4 text-secondary" />

              <span
                className="
                  font-mono
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-secondary
                "
              >
                Contact / Start here
              </span>

              <span className="h-px w-12 bg-secondary/40" />
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 26,
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
              className="
                mt-7
                max-w-4xl
                text-4xl
                font-semibold
                leading-[1.03]
                tracking-[-0.05em]
                text-heading
                sm:text-5xl
                md:text-6xl
                lg:text-[4.6rem]
              "
            >
              Start with a
              <span className="block text-muted-foreground">
                clear conversation.
              </span>
              <span className="text-gold-gradient">
                We&apos;ll take it from there.
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.55,
              }}
              className="
                mt-7 max-w-2xl
                text-base leading-8
                text-body
                sm:text-lg
              "
            >
              Whether you have a defined project, a growth challenge, or simply
              need clarity on what to do next, tell us what you&apos;re working
              through and we&apos;ll help you identify the right path forward.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.32,
              }}
              className="
                mt-9
                flex flex-wrap
                items-center
                gap-x-6
                gap-y-3
                border-t border-border
                pt-6
              "
            >
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-secondary" />

                <span className="text-xs font-medium text-muted-foreground">
                  No generic sales pitch
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-secondary" />

                <span className="text-xs font-medium text-muted-foreground">
                  Focused first conversation
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 28,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.16,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-muted-foreground/50
                "
              >
                Enquiry workflow
              </span>

              <span className="font-mono text-[8px] text-secondary">
                BCR / CONTACT
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
              transition={{
                duration: 0.3,
              }}
              className="
                group relative
                overflow-hidden
                border border-border
                bg-card
                p-7
                text-card-foreground
                shadow-[var(--shadow-card)]
                sm:p-8
              "
            >
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-y-0 left-0
                    w-[35%]
                  "
                  initial={{ x: "-150%" }}
                  whileHover={{ x: "430%" }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-secondary) 6%, transparent), transparent)",
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-5">
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      bg-primary
                      text-secondary
                    "
                  >
                    <MessageSquareText className="h-5 w-5" />
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

                    <span
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-success
                      "
                    >
                      Open
                    </span>
                  </div>
                </div>

                <p
                  className="
                    mt-8
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  What happens next
                </p>

                <h2
                  className="
                    mt-3
                    max-w-lg
                    text-2xl
                    font-semibold
                    tracking-[-0.035em]
                    text-heading
                    sm:text-3xl
                  "
                >
                  A simple first step, with no unnecessary friction.
                </h2>

                <div className="mt-8 border-t border-border">
                  {expectations.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.45 + index * 0.08,
                      }}
                      className="
                        flex items-center
                        justify-between
                        border-b border-border
                        py-4
                      "
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="
                            flex h-6 w-6
                            items-center justify-center
                            rounded-full
                            bg-secondary/[0.08]
                          "
                        >
                          <Check className="h-3 w-3 text-secondary" />
                        </span>

                        <span className="text-sm font-medium text-foreground">
                          {item}
                        </span>
                      </div>

                      <span
                        className="
                          font-mono
                          text-[8px]
                          text-muted-foreground/30
                        "
                      >
                        0{index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div
                  className="
                    mt-7
                    flex items-start
                    gap-4
                    border border-secondary/20
                    bg-secondary/[0.05]
                    p-4
                  "
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

                  <p className="text-xs leading-6 text-muted-foreground">
                    You don&apos;t need a perfect brief before contacting us.
                    Context is enough to start the conversation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.65,
              }}
              className="
                mt-4
                flex items-center
                justify-between
                border-l border-secondary/30
                pl-4
              "
            >
              <span className="text-xs text-muted-foreground">
                Continue to the contact form below
              </span>

              <ArrowDownRight className="h-4 w-4 text-secondary" />
            </motion.div>
          </motion.div>
        </div>

        {/* bottom orientation */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="
            mt-16
            flex flex-col gap-4
            border-t border-border
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            Project enquiry, retained partnership, specialist support, or just
            an initial conversation — start wherever makes sense.
          </p>

          <div
            className="
              flex items-center gap-3
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-muted-foreground/40
            "
          >
            Context
            <span className="text-secondary">→</span>
            Conversation
            <span className="text-secondary">→</span>
            Direction
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
