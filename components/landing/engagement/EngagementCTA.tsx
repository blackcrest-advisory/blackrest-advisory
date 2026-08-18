"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const reassurance = [
  "No-obligation discovery call",
  "Clear recommendations",
  "Senior-level conversation",
];

export const EngagementCTA = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section
      className="
        relative overflow-hidden
        bg-background
        py-16
        text-foreground
        transition-colors duration-300
        sm:py-20 lg:py-28
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-14rem] top-[-12rem] h-[38rem] w-[38rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 9%, transparent), transparent 68%)",
          }}
        />

        <div
          className="absolute bottom-[-16rem] left-[-12rem] h-[34rem] w-[34rem] opacity-35"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 70%)",
          }}
        />

        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="
              absolute left-[-8rem] top-[46%]
              h-px w-28
              bg-gradient-to-r
              from-transparent
              via-secondary
              to-transparent
              shadow-[0_0_14px_var(--color-secondary)]
            "
            animate={{
              x: ["0vw", "115vw"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "linear",
            }}
          />
        )}
      </div>

      <Container className="relative">
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative overflow-hidden
            border border-border
            bg-card
            text-card-foreground
            shadow-[var(--shadow-overlay)]
          "
        >
          {/* Top accent */}
          <motion.div
            initial={{
              scaleX: reduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute left-0 top-0
              h-[2px] w-full
              origin-left
              bg-gradient-to-r
              from-secondary
              via-secondary/50
              to-transparent
            "
          />

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}
            <div className="relative border-b border-border p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-secondary" />

                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  Start an engagement
                </span>

                <span className="h-px w-10 bg-secondary/40" />
              </div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08,
                  duration: 0.6,
                }}
                className="
                  mt-6 max-w-3xl
                  text-4xl font-semibold
                  tracking-[-0.045em]
                  text-heading
                  sm:text-5xl
                  lg:text-[3.8rem]
                  lg:leading-[1.04]
                "
              >
                The next step should
                <span className="block text-muted-foreground">
                  create clarity,
                </span>
                <span className="text-gold-gradient">
                  not commitment pressure.
                </span>
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                className="mt-7 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8"
              >
                Tell us what you are trying to solve, improve, or build.
                We&apos;ll help you understand the right engagement model and
                the most sensible next step.
              </motion.p>

              {/* reassurance */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                }}
                className="mt-9 grid gap-3 sm:grid-cols-3"
              >
                {reassurance.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.22 + index * 0.06,
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/[0.08]">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>

                    <span className="text-xs font-medium text-muted-foreground">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.28,
                }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  className="group"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Book a discovery call
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  href="mailto:hello@blackcrestadvisory.com"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email us
                </Button>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="relative flex flex-col bg-muted/35 p-7 sm:p-10 lg:p-12">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/50">
                    Contact options
                  </p>

                  <p className="mt-2 text-sm font-semibold text-heading">
                    Choose the easiest way to start.
                  </p>
                </div>

                <span className="font-mono text-[8px] text-secondary">
                  BCR / 06
                </span>
              </div>

              {/* Contact route 1 */}
              <motion.a
                href="/contact"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                className="
                  group mt-8
                  border-t border-border
                  py-6
                "
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        border border-secondary/20
                        bg-secondary/[0.07]
                        text-secondary
                        transition-all duration-300
                        group-hover:bg-secondary
                        group-hover:text-secondary-foreground
                      "
                    >
                      <MessageSquareText className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Discovery conversation
                      </p>

                      <p className="mt-1 max-w-xs text-xs leading-6 text-muted-foreground">
                        Best if you want to discuss scope, fit, priorities, or
                        the right engagement model.
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
                </div>
              </motion.a>

              {/* Contact route 2 */}
              <motion.a
                href="mailto:hello@blackcrestadvisory.com"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                className="
                  group
                  border-t border-border
                  py-6
                "
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        border border-secondary/20
                        bg-secondary/[0.07]
                        text-secondary
                        transition-all duration-300
                        group-hover:bg-secondary
                        group-hover:text-secondary-foreground
                      "
                    >
                      <Mail className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-heading">
                        Email the team
                      </p>

                      <p className="mt-1 break-all text-xs leading-6 text-muted-foreground">
                        hello@blackcrestadvisory.com
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
                </div>
              </motion.a>

              {/* phone */}
              <div className="border-y border-border py-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-card text-muted-foreground">
                    <Phone className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Prefer to call?
                    </p>

                    <p className="mt-1 text-sm font-semibold text-heading">
                      +44 20 1234 5678
                    </p>
                  </div>
                </div>
              </div>

              {/* bottom assurance */}
              <div className="mt-auto pt-8">
                <div className="border border-secondary/20 bg-secondary/[0.05] p-5">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                    First conversation
                  </p>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    No generic pitch. No unnecessary commitment. Just a focused
                    discussion about the business need and whether Blackcrest is
                    the right fit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="flex flex-col gap-3 border-t border-border px-7 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
            <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/40">
              Blackcrest Advisory
            </span>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Understand
              <span className="text-secondary">→</span>
              Align
              <span className="text-secondary">→</span>
              Engage
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
