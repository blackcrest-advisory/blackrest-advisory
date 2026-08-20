"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleDot, Sparkles } from "lucide-react";

import IndustrySelector from "@/components/features/auth/IndustrySelector";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const benefits = [
  "Industry-specific recommendations",
  "More relevant service guidance",
  "A tailored onboarding experience",
];

export default function SelectIndustryPage() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <PageWrapper>
      <Section
        className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background py-12 text-foreground sm:py-16 lg:py-20"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  color-mix(in srgb, var(--color-border) 60%, transparent) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "25% 100%",
            }}
          />

          <div
            className="absolute -right-44 -top-36 h-[36rem] w-[36rem] opacity-55"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 9%, transparent), transparent 70%)",
            }}
          />

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute left-[-10rem] top-[38%] h-px w-32 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_12px_var(--color-secondary)]"
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
          <div
            className="mx-auto grid max-w-6xl border border-border bg-card shadow-[var(--shadow-overlay)] lg:grid-cols-[0.82fr_1.18fr]"
          >
            {/* Left */}
            <motion.aside
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -22,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden border-b border-border bg-primary p-8 text-primary-foreground lg:min-h-[650px] lg:border-b-0 lg:border-r lg:p-10"
            >
              <div
                className="pointer-events-none absolute -right-28 -top-20 h-72 w-72 rounded-full bg-secondary/15 blur-[90px]"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <CircleDot className="h-4 w-4 text-secondary" />

                  <span
                    className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary"
                  >
                    Personalise your experience
                  </span>
                </div>

                <h1
                  className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-primary-foreground sm:text-5xl"
                >
                  Start with
                  <span className="block text-primary-foreground/45">
                    your industry.
                  </span>
                  <span className="text-secondary">
                    We&apos;ll tailor the rest.
                  </span>
                </h1>

                <p
                  className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/55"
                >
                  Choose the sector that best represents your business. It helps
                  Blackcrest shape more relevant recommendations, services, and
                  onboarding context from the very beginning.
                </p>

                <div className="mt-10 border-t border-primary-foreground/10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.3 + index * 0.08,
                      }}
                      className="flex items-center justify-between border-b border-primary-foreground/10 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10"
                        >
                          <Check className="h-3 w-3 text-secondary" />
                        </div>

                        <span
                          className="text-xs font-medium text-primary-foreground/65"
                        >
                          {benefit}
                        </span>
                      </div>

                      <span
                        className="font-mono text-[7px] text-primary-foreground/25"
                      >
                        0{index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-12 lg:absolute lg:bottom-10 lg:left-10 lg:right-10">
                <div className="flex items-center justify-between border-t border-primary-foreground/10 pt-5">
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary-foreground/30"
                  >
                    Step 01 / Industry
                  </span>

                  <ArrowRight className="h-4 w-4 text-secondary" />
                </div>
              </div>
            </motion.aside>

            {/* Right */}
            <motion.main
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 22,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:min-h-[650px] lg:flex-col lg:justify-center lg:px-12"
            >
              <div className="mx-auto w-full max-w-2xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-secondary" />

                  <span
                    className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary"
                  >
                    Industry selection
                  </span>

                  <span className="h-px w-10 bg-secondary/40" />
                </div>

                <h2
                  className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl"
                >
                  Which sector best describes your business?
                </h2>

                <p
                  className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground"
                >
                  Pick the closest match. You can always clarify your exact
                  business model later during onboarding.
                </p>

                <div
                  className="mt-8 border-t border-border pt-8"
                >
                  <IndustrySelector />
                </div>

                <div
                  className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"
                >
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
                  >
                    Select → Continue → Personalise
                  </span>

                  <span
                    className="text-xs text-muted-foreground"
                  >
                    Choose the closest fit
                  </span>
                </div>
              </div>
            </motion.main>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
