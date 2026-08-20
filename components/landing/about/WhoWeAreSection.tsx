"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, Compass, Globe2, Target } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";

const principles = [
  "Strategy before execution",
  "Commercial outcomes over vanity metrics",
  "Long-term relationships over transactions",
];

export const WhoWeAreSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section
      id="our-story"
      className="relative overflow-hidden bg-muted/35 py-16 sm:py-20 lg:py-28"
    >
      {/* ================================================================ */}
      {/* Background architecture                                          */}
      {/* ================================================================ */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-56 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.08), transparent 68%)",
          }}
        />

        <div className="absolute right-[7%] top-0 hidden h-full w-px bg-border/50 lg:block" />

        <motion.div
          aria-hidden="true"
          className="absolute right-[7%] top-0 hidden h-28 w-px bg-secondary lg:block"
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

        <div className="absolute bottom-8 left-[4%] hidden select-none font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/35 xl:block">
          BCR / Company / 02
        </div>
      </div>

      <Container className="relative">
        {/* ================================================================ */}
        {/* Section heading                                                  */}
        {/* ================================================================ */}

        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
              Who we are
            </span>

            <span className="h-px w-12 bg-secondary/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end"
          >
            We sit between consultancy and execution — helping businesses make
            stronger decisions and then turning those decisions into working
            digital systems.
          </motion.p>
        </div>

        {/* ================================================================ */}
        {/* Main editorial composition                                       */}
        {/* ================================================================ */}

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ============================================================ */}
          {/* Visual                                                       */}
          {/* ============================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              x: -28,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Image frame */}
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              transition={{
                duration: 0.35,
              }}
              className="group relative"
            >
              <div className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.035,
                        }
                  }
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src={IMAGE.aboutHeroImage}
                    alt="Blackcrest Advisory team collaboration"
                    width={900}
                    height={1100}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* Navy editorial wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent" />

                {/* moving light */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
                    initial={{ x: "-150%" }}
                    whileHover={{
                      x: "420%",
                    }}
                    transition={{
                      duration: 1.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.12), transparent)",
                    }}
                  />
                )}

                {/* Image metadata */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                      Blackcrest Advisory
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Strategy meets execution
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/10 text-gold-light backdrop-blur-md">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* corner mark */}
              <div className="absolute -left-3 -top-3 hidden h-12 w-12 border-l border-t border-secondary/40 sm:block" />

              <div className="absolute -bottom-3 -right-3 hidden h-12 w-12 border-b border-r border-secondary/40 sm:block" />
            </motion.div>

            {/* Floating company position */}
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="relative -mt-8 ml-5 mr-5 border border-border bg-background/95 p-5 shadow-[var(--shadow-overlay)] backdrop-blur-xl sm:ml-auto sm:mr-[-1.5rem] sm:max-w-xs"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-gold-light">
                  <Globe2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    International mindset
                  </p>

                  <p className="mt-2 text-sm leading-6 text-foreground/75">
                    Built to support European businesses with a flexible,
                    cross-disciplinary delivery model.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* Story                                                        */}
          {/* ============================================================ */}

          <motion.div
            initial={{
              opacity: 0,
              x: 28,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:pt-5"
          >
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              More than an agency.
              <span className="block text-muted-foreground">
                More practical than a consultancy.
              </span>
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-body">
              <p>
                Blackcrest Advisory is a B2B digital solutions company helping
                European organisations navigate growth, technology, marketing,
                and commercial execution.
              </p>

              <p>
                Our role is not simply to deliver isolated websites, campaigns,
                or systems. We look at how the pieces work together and focus
                our effort on what creates meaningful business progress.
              </p>
            </div>

            {/* Principle list */}
            <div className="mt-9 border-y border-border">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle}
                  initial={{
                    opacity: 0,
                    x: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="group flex items-center justify-between border-b border-border py-4 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[9px] text-secondary">
                      0{index + 1}
                    </span>

                    <span className="text-sm font-medium text-foreground/80">
                      {principle}
                    </span>
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/[0.08] text-secondary transition-transform duration-300 group-hover:scale-110">
                    <Check className="h-3 w-3" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission / Vision */}
            <div
              id="values"
              className="mt-10 grid gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2"
            >
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-secondary) 6%, var(--color-card))",
                      }
                }
                className="bg-[var(--color-card)] p-6 text-[var(--color-card-foreground)] transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center bg-secondary/[0.08] text-secondary">
                    <Target className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[9px] text-muted-foreground/50">
                    01
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Mission
                </p>

                <h3 className="mt-2 text-lg font-semibold text-heading">
                  Turn digital capability into business growth.
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Give businesses the strategy, technology, marketing, and sales
                  support needed to create sustainable commercial progress.
                </p>
              </motion.div>

              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-secondary) 4%, var(--color-card))",
                      }
                }
                className="bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center bg-secondary/[0.08] text-secondary">
                    <Compass className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[9px] text-muted-foreground/50">
                    02
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Vision
                </p>

                <h3 className="mt-2 text-lg font-semibold text-heading">
                  Become a trusted long-term digital growth partner.
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Build an international B2B advisory and delivery company known
                  for quality, clarity, accountability, and measurable results.
                </p>
              </motion.div>
            </div>

            {/* final statement */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-start gap-4 border-l-2 border-secondary/40 pl-5"
            >
              <p className="max-w-xl text-sm font-medium leading-7 text-foreground/75">
                We are interested in becoming more valuable to our clients over
                time — not simply completing the next project.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
