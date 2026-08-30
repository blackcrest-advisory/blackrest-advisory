"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const capabilities = [
  "Web Development",
  "Mobile Applications",
  "Digital Marketing",
  "Sales & Business Support",
];

const headline = [
  {
    text: "From business challenge",
    className: "text-white",
  },
  {
    text: "to digital",
    className: "text-white/45",
  },
  {
    text: "momentum.",
    className: "text-gold-gradient",
  },
];

export default function HeroTwo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.01, 1.05],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -18],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0.68],
  );

  return (
    <Section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep py-0"
    >
      <div className="relative min-h-[calc(100svh-68px)] overflow-hidden lg:h-[calc(100svh-68px)]">
        {/* =====================================================
            VIDEO
        ===================================================== */}

        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover brightness-[1.1] contrast-[1.04] saturate-[1.05]"
          >
            <source src="/videos/blackcrest-brand2.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* =====================================================
            CINEMATIC GRADING
        ===================================================== */}

        {/* Base treatment */}
        <div className="pointer-events-none absolute inset-0 bg-navy-deep/18" />

        {/* Main readability gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/58 to-navy-deep/12" />

        {/* Vertical depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/15 via-transparent to-navy-deep/68" />

        {/* Soft gold atmosphere */}
        <div className="pointer-events-none absolute -right-48 top-[20%] h-[32rem] w-[32rem] rounded-full bg-secondary/[0.07] blur-[140px]" />

        {/* =====================================================
            ARCHITECTURAL GRID
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.055] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.16) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />

        {/* =====================================================
            GRAIN
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-soft-light"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E")
            `,
          }}
        />

        {/* =====================================================
            FOREGROUND
        ===================================================== */}

        <div className="relative z-20 flex min-h-[calc(100svh-68px)] flex-col lg:h-[calc(100svh-68px)]">
          {/* ===================================================
              TOP META
          =================================================== */}

          <Container>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.15,
              }}
              className="flex items-center justify-between border-b border-white/10 py-3.5 sm:py-4"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  {!reduceMotion && (
                    <motion.span
                      className="absolute h-full w-full rounded-full bg-secondary"
                      animate={{
                        opacity: [0.2, 0.65, 0.2],
                        scale: [1, 1.8, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <span className="relative h-1.5 w-1.5 rounded-full bg-secondary" />
                </span>

                <span className="font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-white/55 sm:text-[9px]">
                  Blackcrest / B2B Digital Solutions Partner
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 md:block">
                Strategy → Delivery
              </span>
            </motion.div>
          </Container>

          {/* ===================================================
              HERO CONTENT
          =================================================== */}

          <Container className="flex min-h-0 flex-1 items-center py-6 sm:py-8 lg:py-10">
            <motion.div
              style={{
                y: contentY,
                opacity: contentOpacity,
              }}
              className="grid w-full items-end gap-8 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-14"
            >
              {/* =================================================
                  MAIN MESSAGE
              ================================================= */}

              <div className="max-w-[980px]">
                {/* Eyebrow */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -18,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.65,
                    delay: reduceMotion ? 0 : 0.25,
                  }}
                  className="mb-5 flex items-center gap-4"
                >
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-secondary sm:text-[10px]">
                    Strategy. Technology. Growth.
                  </span>

                  <motion.span
                    initial={{
                      scaleX: reduceMotion ? 1 : 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.45,
                      duration: reduceMotion ? 0 : 0.8,
                    }}
                    className="h-px w-10 origin-left bg-secondary/55"
                  />
                </motion.div>

                {/* Headline */}

                <h1 className="text-[clamp(2.4rem,3.9vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                  {headline.map((line, index) => (
                    <motion.span
                      key={line.text}
                      initial={{
                        opacity: 0,
                        y: reduceMotion ? 0 : 54,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.85,
                        delay: reduceMotion ? 0 : 0.28 + index * 0.11,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`block ${line.className}`}
                    >
                      {line.text}
                    </motion.span>
                  ))}
                </h1>

                {/* Supporting content */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : 0.72,
                  }}
                  className="mt-5 max-w-xl sm:mt-6"
                >
                  <p className="text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
                    Blackcrest brings web development, mobile applications,
                    digital marketing, and sales support together to help
                    ambitious businesses launch, improve, and grow with
                    confidence.
                  </p>

                  {/* CTAs */}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/start-project"
                      className="group inline-flex h-11 items-center justify-center gap-3 bg-secondary px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep transition-all duration-300 hover:bg-secondary/90 sm:px-6 sm:text-[11px]"
                    >
                      Start a project
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/services/digital-marketing"
                      className="group inline-flex h-11 items-center justify-center gap-3 border border-white/15 bg-white/[0.035] px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:text-white sm:px-6 sm:text-[11px]"
                    >
                      Explore services
                      <ArrowRight className="h-4 w-4 text-secondary transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Small positioning statement */}

                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-px w-8 bg-secondary/45" />

                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">
                      Clear thinking. Focused delivery. Measurable progress.
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* =================================================
                  4 → 1 SYSTEM MARK
              ================================================= */}

              <motion.aside
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  delay: reduceMotion ? 0 : 0.8,
                }}
                className="hidden border-l border-white/12 pl-6 xl:block"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">
                  Integrated delivery
                </span>

                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-semibold leading-none tracking-[-0.07em] text-white xl:text-6xl">
                    4
                  </span>

                  <span className="pb-1 text-xl font-light text-white/25">
                    →
                  </span>

                  <span className="text-5xl font-semibold leading-none tracking-[-0.07em] text-secondary xl:text-6xl">
                    1
                  </span>
                </div>

                <div className="my-4 h-px w-full bg-gradient-to-r from-secondary/45 to-transparent" />

                <p className="max-w-[220px] text-xs leading-6 text-white/48">
                  Web, mobile, marketing, and sales support aligned around a
                  clear business outcome.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                    One focused partner
                  </span>
                </div>
              </motion.aside>
            </motion.div>
          </Container>

          {/* ===================================================
              CAPABILITY INDEX
          =================================================== */}

          <div className="border-t border-white/10 bg-navy-deep/35 backdrop-blur-md">
            <Container>
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion ? 0 : 0.86 + index * 0.07,
                    }}
                    className={`
                      flex
                      min-h-[50px]
                      items-center
                      gap-3
                      py-3
                      sm:min-h-[58px]
                      sm:py-4

                      ${index % 2 !== 0 ? "border-l border-white/10 pl-4" : ""}

                      ${
                        index >= 2
                          ? "border-t border-white/10 sm:border-t-0"
                          : ""
                      }

                      ${
                        index > 0
                          ? "sm:border-l sm:border-white/10 sm:pl-5"
                          : ""
                      }
                    `}
                  >
                    <span className="font-mono text-[8px] text-secondary/60">
                      0{index + 1}
                    </span>

                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-[10px] lg:text-[11px]">
                      {capability}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Container>
          </div>
        </div>

        {/* =====================================================
            DESKTOP SCROLL CUE
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 1.2,
            duration: reduceMotion ? 0 : 0.7,
          }}
          className="pointer-events-none absolute bottom-20 right-6 z-30 hidden flex-col items-center gap-3 2xl:flex"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-white/25 [writing-mode:vertical-rl]">
            Explore
          </span>

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, 5, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-3.5 w-3.5 text-secondary/65" />
          </motion.div>
        </motion.div>

        {/* =====================================================
            VIGNETTE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_170px_rgba(0,0,0,0.35)]" />
      </div>
    </Section>
  );
}
