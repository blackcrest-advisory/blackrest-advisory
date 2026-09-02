"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";

import {
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { Cpu, Sparkles } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface Technology {
  label: string;
  icon: IconType;
}

const technologies: Technology[] = [
  { label: "Next.js", icon: SiNextdotjs },
  { label: "React", icon: SiReact },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "Framer Motion", icon: SiFramer },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Express", icon: SiExpress },
  { label: "Prisma", icon: SiPrisma },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "MongoDB", icon: SiMongodb },
  { label: "Redis", icon: SiRedis },
  { label: "Docker", icon: SiDocker },
  { label: "Vercel", icon: SiVercel },
  { label: "Cloudinary", icon: SiCloudinary },
  { label: "GitHub", icon: SiGithub },
];

export default function TechnologyMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const marqueeItems = [...technologies, ...technologies];

  return (
    <Section className="relative isolate overflow-hidden bg-navy-deep py-20 text-white sm:py-24 lg:py-28">
      {/*===== BACKGROUND =====*/}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute left-[12%] top-[10%] h-64 w-64 rounded-full bg-gold-light/[0.05] blur-[120px]" />

        <div className="absolute right-[10%] bottom-[8%] h-72 w-72 rounded-full bg-white/[0.025] blur-[140px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container>
        {/*===== SECTION HEADER =====*/}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end lg:gap-16">
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -18,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <Cpu className="h-3.5 w-3.5 text-gold-light" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                Technology Stack
              </span>

              <span className="h-px w-10 bg-gold-light/30" />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              A carefully selected engineering stack focused on speed,
              maintainability and production-ready delivery.
            </p>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 24,
                    filter: "blur(5px)",
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Built with purpose
            </span>

            <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl xl:text-[58px]">
              The tools behind
              <span className="block text-gold-light">
                reliable digital products.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              From frontend systems to backend infrastructure, every technology
              is chosen to support performance, scalability and long-term
              maintainability.
            </p>
          </motion.div>
        </div>

        {/*===== META BAR =====*/}
        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="mt-12 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-light" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/45">
              Modern engineering ecosystem
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-success"
                  animate={{
                    scale: [1, 2.3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                  }}
                />
              )}

              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
              Production ready
            </span>
          </div>
        </motion.div>
      </Container>

      {/*===== MARQUEE =====*/}
      <div
        className="group relative mt-8 overflow-hidden sm:mt-10 lg:mt-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        tabIndex={0}
      >
        {/*===== EDGE MASKS =====*/}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-transparent sm:w-32 lg:w-48"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-navy-deep via-navy-deep/90 to-transparent sm:w-32 lg:w-48"
        />

        {/*===== TOP RAIL =====*/}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/*===== BOTTOM RAIL =====*/}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/*===== TRACK =====*/}
        <motion.div
          className="flex w-max items-center py-3"
          animate={
            shouldReduceMotion || isPaused
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((technology, index) => {
            const Icon = technology.icon;

            return (
              <div
                key={`${technology.label}-${index}`}
                className="group/item relative flex shrink-0 items-center"
              >
                <div className="relative flex items-center gap-3 px-6 py-5 sm:px-8 lg:px-10">
                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <div className="absolute inset-0 scale-75 rounded-full bg-gold-light/0 blur-xl transition-all duration-500 group-hover/item:scale-125 group-hover/item:bg-gold-light/15" />

                    <Icon className="relative h-5 w-5 text-white/42 transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:text-gold-light" />
                  </div>

                  <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 transition-colors duration-300 group-hover/item:text-white sm:text-[11px]">
                    {technology.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-gold-light transition-all duration-500 group-hover/item:w-[45%]"
                  />
                </div>

                {/*===== DIVIDER =====*/}
                <div aria-hidden="true" className="flex items-center px-1">
                  <span className="h-1 w-1 rotate-45 border border-gold-light/35 transition-all duration-300 group-hover/item:bg-gold-light/50" />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/*===== SCAN LIGHT =====*/}
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 z-10 w-24 bg-gradient-to-r from-transparent via-gold-light/[0.04] to-transparent blur-sm"
            animate={{
              left: ["-15%", "115%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />
        )}
      </div>

      {/*===== FOOTER NOTE =====*/}
      <Container>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-gold-light">
            Technology should disappear behind the experience.
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
            Blackcrest / Engineering Stack
          </span>
        </div>
      </Container>
    </Section>
  );
}
