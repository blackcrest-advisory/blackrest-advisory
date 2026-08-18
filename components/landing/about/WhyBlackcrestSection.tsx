"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Minus, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { whyData } from "@/content-data/about/aboutData";

const comparisons = [
  {
    weak: "Task-based delivery",
    strong: "Business-outcome ownership",
  },
  {
    weak: "Disconnected specialists",
    strong: "One accountable partner",
  },
  {
    weak: "Short-term project mindset",
    strong: "Long-term growth partnership",
  },
];

export const WhyBlackcrestSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* background architecture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-12rem] top-[20%] h-[34rem] w-[34rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.08), transparent 68%)",
          }}
        />

        <div className="absolute left-[8%] top-0 hidden h-full w-px bg-border/50 lg:block" />

        <motion.div
          aria-hidden="true"
          className="absolute left-[8%] top-0 hidden h-28 w-px bg-secondary lg:block"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: ["0vh", "75vh"],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          {/* left */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Why Blackcrest
              </span>

              <span className="h-px w-12 bg-secondary/50" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.8rem] lg:leading-[1.03]"
            >
              The difference is
              <span className="block text-muted-foreground">
                not what we sell.
              </span>
              <span className="text-gold-gradient">It&apos;s how we work.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="mt-7 max-w-lg text-base leading-8 text-body"
            >
              The European B2B market has no shortage of agencies and
              consultants. Our advantage is the way we combine strategy,
              execution, accountability, and long-term ownership.
            </motion.p>

            {/* comparison */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="mt-10 border border-border bg-card"
            >
              <div className="grid grid-cols-2 border-b border-border px-5 py-3">
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Typical model
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-secondary">
                  Blackcrest model
                </span>
              </div>

              {comparisons.map((item) => (
                <div
                  key={item.strong}
                  className="grid grid-cols-2 border-b border-border px-5 py-4 last:border-none"
                >
                  <div className="flex items-start gap-2 pr-4">
                    <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/45" />

                    <span className="text-sm leading-6 text-muted-foreground">
                      {item.weak}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 border-l border-border pl-4">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />

                    <span className="text-sm font-medium leading-6 text-foreground">
                      {item.strong}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/45">
              BCR / Difference / 03
            </p>
          </div>

          {/* right */}
          <div>
            <div className="border-t border-border">
              {whyData.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 24,
                    filter: "blur(4px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden border-b border-border"
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            x: 6,
                          }
                    }
                    transition={{
                      duration: 0.3,
                    }}
                    className="relative grid gap-5 py-8 sm:grid-cols-[64px_1fr_auto] sm:items-start"
                  >
                    {/* number / icon */}
                    <div className="relative">
                      <div
                        className="
                          flex h-12 w-12 items-center justify-center
                          border border-border
                          bg-card
                          text-xl
                          shadow-[var(--shadow-card)]
                          transition-all duration-300
                          group-hover:border-secondary/30
                          group-hover:bg-secondary/[0.06]
                          group-hover:shadow-[var(--shadow-gold-glow)]
                        "
                      >
                        {item.icon}
                      </div>

                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-background font-mono text-[7px] text-secondary">
                        0{index + 1}
                      </span>
                    </div>

                    {/* copy */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">
                          Principle
                        </span>

                        <span className="h-1 w-1 rounded-full bg-border" />

                        <span className="font-mono text-[9px] text-muted-foreground/45">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-heading">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-body sm:text-base">
                        {item.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0.3 }}
                      whileHover={{
                        opacity: 1,
                        x: 3,
                        y: -3,
                      }}
                      className="hidden h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-secondary/30 group-hover:text-secondary sm:flex"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>

                    {/* hover sweep */}
                    {!reduceMotion && (
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-[25%]"
                        initial={{ x: "-140%" }}
                        whileHover={{ x: "500%" }}
                        transition={{
                          duration: 0.95,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgb(166 124 39 / 0.05), transparent)",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.article>
              ))}
            </div>

            {/* closing thought */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-start gap-4 border border-secondary/15 bg-secondary/[0.045] p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary/[0.1] text-secondary">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-heading">
                  Our measure of success is simple.
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  If the client is stronger, clearer, and better positioned
                  after working with us, the engagement has done its job.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
