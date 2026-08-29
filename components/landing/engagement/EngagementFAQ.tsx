"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  MessageSquareText,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    question: "What happens after I get in touch?",
    answer:
      "We begin by understanding the challenge and the outcome you need. From there, we can recommend a practical scope, the right support, and a sensible first step.",
  },
  {
    question: "Can we begin with one focused project?",
    answer:
      "Yes. A clearly defined project is often the best place to start. We can focus on a website, mobile feature, marketing initiative, or sales-support need, then build on the work when it is useful.",
  },
  {
    question: "Can you support more than one area?",
    answer:
      "Yes. Web, mobile, marketing, and sales support can be combined when they serve the same business goal. We keep the work connected instead of treating each area as a separate problem.",
  },
  {
    question: "How are scope and pricing agreed?",
    answer:
      "We agree the scope, priorities, and commercial approach before work begins. The details depend on the type of support, but you should always understand what is included and what happens next.",
  },
  {
    question: "Can support continue after launch or delivery?",
    answer:
      "Yes. If there is a useful next step after a project, we can discuss ongoing improvements, marketing activity, maintenance, or focused commercial support.",
  },
];

export const EngagementFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section
      id="faq"
      className="relative overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-20 lg:py-28"
    >
      {/* Subtle architecture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-border/50 lg:block" />

        <div
          className="absolute -right-48 top-[15%] h-[34rem] w-[34rem] opacity-50"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent 70%)",
          }}
        />

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
      </div>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* LEFT */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -16,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <HelpCircle className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Common questions
              </span>

              <span className="h-px w-10 bg-secondary/40" />
            </motion.div>

            <motion.h2
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
                delay: 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-md text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]"
            >
              A few things you may
              <span className="block text-muted-foreground">
                want to know first.
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
              className="mt-6 max-w-md text-sm leading-7 text-body sm:text-base"
            >
              Clear answers about starting a project, combining services, scope,
              and what support can look like after delivery.
            </motion.p>

            {/* Contact block */}
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
              transition={{ delay: 0.2 }}
              className="mt-10 border border-border bg-card p-5 text-card-foreground shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.07] text-secondary">
                  <MessageSquareText className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-heading">
                    Something more specific?
                  </p>

                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    Every engagement is different. If your question is about a
                    particular project, we can usually answer it quickly in an
                    initial conversation.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                href="/contact"
                className="group mt-5"
              >
                Ask us directly
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/40">
              BCR / Knowledge / 05
            </p>
          </div>

          {/* RIGHT — QUESTIONS */}
          <div className="border-t border-border">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.article
                  key={faq.question}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-40px",
                  }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.45,
                  }}
                  className="relative border-b border-border"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="group relative grid w-full grid-cols-[40px_1fr_auto] items-start gap-4 py-6 text-left sm:grid-cols-[56px_1fr_auto] sm:py-7"
                  >
                    {/* number */}
                    <span
                      className={`
                        pt-1
                        font-mono text-[9px]
                        font-semibold tracking-[0.15em]
                        transition-colors duration-300
                        ${
                          isOpen ? "text-secondary" : "text-muted-foreground/35"
                        }
                      `}
                    >
                      0{index + 1}
                    </span>

                    {/* question */}
                    <span
                      className={`
                        max-w-2xl
                        text-base font-semibold
                        leading-6 tracking-[-0.015em]
                        transition-colors duration-300
                        sm:text-lg
                        ${
                          isOpen
                            ? "text-heading"
                            : "text-foreground/80 group-hover:text-heading"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                    {/* icon */}
                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className={`
                        flex h-8 w-8
                        items-center justify-center
                        border transition-all duration-300
                        ${
                          isOpen
                            ? "border-secondary/30 bg-secondary/[0.08] text-secondary"
                            : "border-border bg-card text-muted-foreground group-hover:border-secondary/20 group-hover:text-secondary"
                        }
                      `}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>

                    {/* active signal */}
                    {isOpen && (
                      <motion.span
                        layoutId="faq-active-line"
                        className="absolute bottom-[-1px] left-0 h-[2px] w-16 bg-secondary"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={
                          reduceMotion
                            ? { opacity: 1 }
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }
                        transition={{
                          height: {
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={
                            reduceMotion
                              ? undefined
                              : {
                                  y: -8,
                                }
                          }
                          animate={{
                            y: 0,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                          className="grid grid-cols-[40px_1fr] gap-4 pb-7 sm:grid-cols-[56px_1fr]"
                        >
                          <div />

                          <div className="max-w-2xl">
                            <p className="text-sm leading-7 text-body sm:text-base sm:leading-8">
                              {faq.answer}
                            </p>

                            <div className="mt-5 flex items-center gap-3">
                              <span className="h-px w-8 bg-secondary/35" />

                              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40">
                                Blackcrest Advisory
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            {/* Footer note */}
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
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs leading-6 text-muted-foreground">
                Still unsure about scope, pricing, or the right engagement
                model?
              </p>

              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-secondary"
              >
                Start a conversation
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
