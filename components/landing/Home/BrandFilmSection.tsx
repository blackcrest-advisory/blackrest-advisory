"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const capabilities = ["Strategy", "Technology", "Marketing", "Sales"];

export default function BrandFilmSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.08, 1, 1.05],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [45, 0, -35],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0.55, 1, 1, 0.65],
  );

  return (
    <Section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy-deep py-0"
    >
      {/* =====================================================
          CINEMATIC FRAME
      ===================================================== */}
      <div
        className="relative min-h-[680px] overflow-hidden sm:min-h-[760px] lg:min-h-[820px] xl:min-h-[900px]"
      >
        {/* ===================================================
            VIDEO
        =================================================== */}
        <motion.div
          style={{
            scale: videoScale,
          }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/blackcrest-brand.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ===================================================
            CINEMATIC COLOR GRADING
        =================================================== */}

        {/* Main navy treatment */}
        <div className="pointer-events-none absolute inset-0 bg-navy-deep/35" />

        {/* Left readability */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/65 to-navy-deep/10"
        />

        {/* Vertical depth */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/25 via-transparent to-navy-deep/90"
        />

        {/* Gold atmospheric glow */}
        <div
          className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-secondary/[0.07] blur-[130px]"
        />

        {/* ===================================================
            FILM GRAIN
        =================================================== */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E")
            `,
          }}
        />

        {/* ===================================================
            SUBTLE ARCHITECTURAL GRID
        =================================================== */}
        <div
          className="pointer-events-none absolute inset-0 hidden opacity-[0.08] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.18) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />

        {/* ===================================================
            TOP META
        =================================================== */}
        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="flex items-center justify-between border-b border-white/10 py-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_var(--color-secondary)]"
              />

              <span
                className="font-mono text-[8px] font-medium uppercase tracking-[0.22em] text-white/55 sm:text-[9px]"
              >
                Blackcrest / European Digital Growth
              </span>
            </div>

            <span
              className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 sm:block"
            >
              Film / 001
            </span>
          </motion.div>
        </Container>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}
        <Container
          className="relative z-20 flex min-h-[580px] items-end pb-14 pt-24 sm:min-h-[650px] sm:pb-16 lg:min-h-[710px] lg:items-center lg:pb-10 lg:pt-10"
        >
          <motion.div
            style={{
              y: contentY,
              opacity,
            }}
            className="w-full"
          >
            <div className="max-w-5xl">
              {/* eyebrow */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                }}
                className="mb-7 flex items-center gap-4"
              >
                <span
                  className="font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-secondary"
                >
                  One integrated partner
                </span>

                <motion.span
                  initial={{
                    scaleX: reduceMotion ? 1 : 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25,
                    duration: 0.8,
                  }}
                  className="h-px w-16 origin-left bg-secondary/60"
                />
              </motion.div>

              {/* =================================================
                  STATEMENT
              ================================================= */}
              <div
                className="text-[clamp(3rem,8vw,7.8rem)] font-semibold leading-[0.87] tracking-[-0.065em] text-white"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  One partner.
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.12,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-white/50"
                >
                  Four capabilities.
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.24,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-gold-gradient"
                >
                  One objective.
                </motion.div>
              </div>

              {/* =================================================
                  SUPPORTING COPY
              ================================================= */}
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
                  delay: 0.42,
                  duration: 0.65,
                }}
                className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
              >
                <p
                  className="max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
                >
                  We connect strategy, technology, marketing and sales into one
                  coordinated growth engine for ambitious European businesses.
                </p>

                <div
                  className="hidden items-center gap-3 text-white/40 lg:flex"
                >
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.2em]"
                  >
                    Discover the system
                  </span>

                  <ArrowDownRight
                    className="h-4 w-4 text-secondary"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>

        {/* ===================================================
            CAPABILITY RAIL
        =================================================== */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-navy-deep/35 backdrop-blur-md"
        >
          <Container>
            <div
              className="grid grid-cols-2 sm:grid-cols-4"
            >
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + index * 0.08,
                  }}
                  className={`
                    group
                    relative
                    flex items-center
                    gap-3
                    py-4
                    sm:py-5

                    ${index > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""}

                    ${
                      index % 2 !== 0
                        ? "border-l border-white/10 pl-4 sm:pl-5"
                        : ""
                    }
                  `}
                >
                  <span
                    className="font-mono text-[8px] text-secondary/60"
                  >
                    0{index + 1}
                  </span>

                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55 transition-colors duration-300 group-hover:text-white sm:text-xs"
                  >
                    {capability}
                  </span>

                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-secondary transition-all duration-500 group-hover:w-full"
                  />
                </motion.div>
              ))}
            </div>
          </Container>
        </div>

        {/* ===================================================
            EDGE DECORATION
        =================================================== */}
        <div
          className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-4"
        >
          <span
            className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/25 [writing-mode:vertical-rl]"
          >
            Strategy / Technology / Growth
          </span>

          <span className="h-16 w-px bg-gradient-to-b from-secondary/50 to-transparent" />
        </div>

        {/* ===================================================
            MOVING GOLD SIGNAL
        =================================================== */}
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10rem] top-[38%] z-10 h-px w-32 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_14px_var(--color-secondary)]"
            animate={{
              x: ["0vw", "120vw"],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "linear",
            }}
          />
        )}

        {/* ===================================================
            VIGNETTE
        =================================================== */}
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.35)]"
        />
      </div>
    </Section>
  );
}
