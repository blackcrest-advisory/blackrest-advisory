"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, CircleDot, Sparkles } from "lucide-react";

import { orbitron } from "@/lib/utils/font-utils";

//==============================================================//
// CAPABILITIES
//==============================================================//

const services = [
  "Performance Marketing",
  "SEO & Organic Growth",
  "Social Media",
  "Landing Pages",
  "PPC Advertising",
  "Content Strategy",
  "Email Marketing",
  "Conversion Optimisation",
];

const signals = [
  "Qualified Traffic",
  "Demand Generation",
  "ROAS",
  "Pipeline Growth",
  "Attribution",
  "Conversion",
  "Retention",
  "Audience Intelligence",
];

//==============================================================//
// MARQUEE
//==============================================================//

export default function Marquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate mt-4 overflow-hidden border-y border-border bg-primary py-7 text-primary-foreground lg:mt-8 lg:py-9">
      {/*===== BACKGROUND GRID =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:58px_58px]"
      />

      {/* ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[70%] -translate-x-1/2 -translate-y-1/2 bg-secondary/[0.09] blur-[100px]"
      />

      {/*===== TOP INDEX =====*/}

      <div className="relative z-10 mx-auto mb-5 flex max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Activity className="h-3.5 w-3.5 text-gold-light" />

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.18em] text-gold-light">
            Growth capability signal
          </span>
        </div>

        <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-white/30 sm:block">
          Blackcrest / Digital Growth
        </span>
      </div>

      {/*===== PRIMARY MOTION RAIL =====*/}

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-primary to-transparent sm:w-28"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-primary to-transparent sm:w-28"
        />

        <motion.div
          className={`
            flex
            w-max
            items-center
            ${orbitron.className}
          `}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 34,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={`${service}-${index}`}
              className="flex items-center whitespace-nowrap px-5 sm:px-7 lg:px-9"
            >
              <CircleDot className="mr-5 h-3 w-3 shrink-0 text-gold-light" />

              <span className="text-[28px] font-medium uppercase leading-none tracking-[-0.04em] text-white sm:text-[38px] lg:text-[56px] xl:text-[68px]">
                {service}
              </span>

              <ArrowUpRight className="ml-5 h-5 w-5 shrink-0 text-gold-light/70 sm:h-6 sm:w-6"/>
            </div>
          ))}
        </motion.div>
      </div>

      {/*===== SECONDARY SIGNAL RAIL =====*/}

      <div className="relative mt-5 overflow-hidden border-y border-white/10 bg-white/[0.025] py-3">
        <motion.div
          className="flex w-max items-center"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["-50%", "0%"],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 42,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {[...signals, ...signals].map((signal, index) => (
            <div
              key={`${signal}-${index}`}
              className="flex items-center whitespace-nowrap px-5 sm:px-7"
            >
              <span className="mr-4 h-px w-8 bg-gold-light/35"/>

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[9px]">
                {signal}
              </span>

              <Sparkles className="ml-4 h-3 w-3 text-gold-light/50"/>
            </div>
          ))}
        </motion.div>
      </div>

      {/*===== BOTTOM STATUS =====*/}

      <div className="relative z-10 mx-auto mt-5 flex max-w-[1600px] flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-light"/>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Connected growth system
          </span>
        </div>

        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/25">
          Strategy / Acquisition / Conversion / Retention
        </span>
      </div>

      {/*===== SCAN LINE =====*/}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-gradient-to-b from-transparent via-gold-light/60 to-transparent shadow-[0_0_20px_rgba(232,207,143,0.45)]"
          initial={{ left: "-4%" }}
          animate={{ left: "104%" }}
          transition={{
            duration: 7,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      )}
    </section>
  );
}
