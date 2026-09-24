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

const headline = [
  {
    text: "Your idea.",
    className: "text-white",
  },
  {
    text: "Your business.",
    className: "text-white/75",
  },
  {
    text: "What’s next?",
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
      className="relative overflow-hidden bg-navy-deep py-0 md:py-0 lg:py-0"
    >
      <div className="relative flex flex-col overflow-hidden lg:block lg:h-[calc(100svh-68px)] lg:min-h-[calc(100svh-68px)]">
        {/* =====================================================
            VIDEO
        ===================================================== */}

        <motion.div
          style={{ scale: videoScale }}
          className="relative z-10 order-2 aspect-[64/27] w-full border-y border-gold-light/20 max-lg:transform-none! lg:absolute lg:inset-0 lg:z-auto lg:aspect-auto lg:border-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={1024}
            height={432}
            className="absolute inset-0 h-full w-full object-contain object-center brightness-[1.08] contrast-[1.04] saturate-[1.03] lg:object-cover"
          >
            <source src="/videos/blackcrest-brand2.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* =====================================================
            BACKGROUND TREATMENT
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 hidden bg-navy-deep/20 lg:block" />

        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-navy-deep/95 via-navy-deep/68 to-navy-deep/18 lg:block" />

        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-navy-deep/10 via-transparent to-navy-deep/65 lg:block" />

        <div className="pointer-events-none absolute -right-48 top-[20%] h-[32rem] w-[32rem] rounded-full bg-secondary/[0.06] blur-[140px]" />

        {/* =====================================================
            GRID
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.045] lg:block"
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
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E")
            `,
          }}
        />

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative z-20 order-1 flex items-center lg:h-[calc(100svh-68px)] lg:min-h-[calc(100svh-68px)]">
          <Container className="w-full px-6 pb-8 pt-10 sm:px-8 sm:py-12 lg:px-6 lg:py-20">
            <motion.div
              style={{
                y: contentY,
                opacity: contentOpacity,
              }}
              className="max-w-[900px] max-lg:transform-none! max-lg:opacity-100!"
            >
              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.65 }}
                className="mb-6 flex flex-wrap gap-x-1.5 gap-y-1 border-l-2 border-gold-light/60 pl-4 text-xs font-medium leading-relaxed tracking-[0.01em] sm:text-base lg:mb-5 lg:text-sm"
              >
                <span className="text-white/90">We Grow Together.</span>{" "}
                <span className="text-gold-light">We Achieve Together.</span>
              </motion.p>

              {/* EYEBROW */}

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
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : 0.2,
                }}
                className="mb-5 flex items-center gap-4"
              >
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-secondary sm:text-[10px]">
                  Business · Solutions · Partnership
                </span>

                <motion.span
                  initial={{
                    scaleX: reduceMotion ? 1 : 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    delay: reduceMotion ? 0 : 0.4,
                  }}
                  className="h-px w-10 origin-left bg-secondary/55"
                />
              </motion.div>

              {/* HEADLINE */}

              <h1 className="max-w-[900px] text-[clamp(2.5rem,9vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.045em] lg:text-[clamp(2.15rem,3.15vw,3.8rem)] lg:leading-[1.08]">
                {headline.map((line, index) => (
                  <motion.span
                    key={line.text}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 42,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.8,
                      delay: reduceMotion ? 0 : 0.25 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`block ${line.className}`}
                  >
                    {line.text}
                    {index < headline.length - 1 ? " " : null}
                  </motion.span>
                ))}
              </h1>

              {/* SUPPORTING TEXT */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.65,
                }}
                className="mt-6 max-w-[650px]"
              >
                <p className="text-sm leading-7 text-white/85 sm:text-[15px] lg:text-white/60">
                  Have an idea but don’t know where to begin? Have a business
                  but feel stuck on what comes next? Blackcrest identifies the
                  real problems, sets the right direction, and turns business
                  challenges into practical solutions.
                </p>

                {/* CTA */}

                <div className="mt-7 hidden gap-3 lg:flex lg:items-center">
                  <Link
                    href="/services/business-development"
                    className="group inline-flex h-11 items-center justify-center gap-3 bg-secondary px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep transition-all duration-300 hover:bg-gold-light sm:px-6 sm:text-[11px]"
                  >
                    Find Your Next Step
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/contact#contact-form"
                    className="group inline-flex h-11 items-center justify-center gap-3 border border-white/15 bg-white/[0.035] px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:text-white sm:px-6 sm:text-[11px]"
                  >
                    Talk to Blackcrest
                    <ArrowRight className="h-4 w-4 text-secondary transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </div>

        <Container className="relative z-20 order-3 px-6 py-7 sm:px-8 sm:py-8 lg:hidden">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services/business-development"
              className="group inline-flex min-h-12 items-center justify-between gap-4 rounded-sm bg-gold-light px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:flex-1"
            >
              Find Your Next Step
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="/contact#contact-form"
              className="group inline-flex min-h-12 items-center justify-between gap-4 rounded-sm border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-gold-light hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:flex-1"
            >
              Talk to Blackcrest
              <ArrowRight className="h-4 w-4 shrink-0 text-gold-light" aria-hidden="true" />
            </Link>
          </div>
        </Container>

        {/* =====================================================
            SCROLL CUE
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 1.1,
            duration: reduceMotion ? 0 : 0.7,
          }}
          className="pointer-events-none absolute bottom-7 right-7 z-30 hidden flex-col items-center gap-3 xl:flex"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-white/60 [writing-mode:vertical-rl]">
            See more
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

        <div className="pointer-events-none absolute inset-0 hidden shadow-[inset_0_0_170px_color-mix(in_srgb,var(--color-navy-deep)_35%,transparent)] lg:block" />
      </div>
    </Section>
  );
}
