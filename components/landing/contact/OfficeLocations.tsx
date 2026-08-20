"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Globe2,
  MapPin,
  Navigation2,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { officeLocations } from "@/content-data/contact/contactData";

export const OfficeLocations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());

  const activeLocation = officeLocations[activeIndex];

  return (
    <Section
      className="relative overflow-hidden bg-background text-foreground transition-colors duration-300"
    >
      {/* ====================================================== */}
      {/* Background                                             */}
      {/* ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-48 top-[-12rem] h-[36rem] w-[36rem] opacity-50"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 hidden opacity-[0.14] xl:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />
      </div>

      <Container className="relative">
        {/* ====================================================== */}
        {/* Header                                                 */}
        {/* ====================================================== */}

        <div
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <Globe2 className="h-4 w-4 text-secondary" />

              <span
                className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                European presence
              </span>

              <span className="h-px w-12 bg-secondary/40" />
            </div>

            <h2
              className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl"
            >
              Local presence.
              <span className="block text-muted-foreground">
                International perspective.
              </span>
            </h2>
          </motion.div>

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
            transition={{
              delay: 0.08,
            }}
            className="max-w-xl text-sm leading-7 text-body sm:text-base lg:justify-self-end"
          >
            Blackcrest works with businesses across Europe through a flexible,
            distributed model — combining local market understanding with
            consistent delivery standards.
          </motion.p>
        </div>

        {/* ====================================================== */}
        {/* Interactive location atlas                             */}
        {/* ====================================================== */}

        <div
          className="grid border-b border-border lg:grid-cols-[0.42fr_0.58fr] xl:grid-cols-[0.36fr_0.64fr]"
        >
          {/* ==================================================== */}
          {/* LEFT — location selector                             */}
          {/* ==================================================== */}

          <div className="border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex overflow-x-auto lg:block">
              {officeLocations.map((location, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={`${location.city}-${location.country}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`
                      group relative
                      min-w-[240px] flex-1
                      border-r border-border
                      px-5 py-6 text-left
                      transition-[background-color,color]
                      duration-300
                      last:border-r-0

                      lg:min-w-0
                      lg:border-b
                      lg:border-r-0
                      lg:px-7
                      lg:py-8
                      lg:last:border-b-0

                      ${
                        isActive
                          ? "bg-secondary/[0.025]"
                          : "hover:bg-secondary/[0.015]"
                      }
                    `}
                  >
                    {/* Active marker */}
                    {isActive && (
                      <motion.span
                        layoutId="office-location-active"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-secondary lg:bottom-auto lg:left-0 lg:top-1/2 lg:h-12 lg:w-[2px] lg:-translate-y-1/2"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 32,
                        }}
                      />
                    )}

                    {/* top row */}
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`
                          font-mono
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          transition-colors duration-300
                          ${
                            isActive
                              ? "text-secondary"
                              : "text-muted-foreground/45"
                          }
                        `}
                      >
                        0{index + 1}
                      </span>

                      <ArrowUpRight
                        className={`
                          h-4 w-4
                          transition-all duration-300
                          ${
                            isActive
                              ? "text-secondary"
                              : `
                                text-muted-foreground/20
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                                group-hover:text-secondary
                              `
                          }
                        `}
                      />
                    </div>

                    {/* city */}
                    <p
                      className={`
                        mt-6
                        text-xl
                        font-semibold
                        tracking-[-0.025em]
                        transition-colors duration-300
                        ${
                          isActive
                            ? "text-heading"
                            : "text-foreground/85 group-hover:text-heading"
                        }
                      `}
                    >
                      {location.city}
                    </p>

                    {/* country */}
                    <p
                      className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {location.country}
                    </p>

                    {/* address */}
                    <div className="mt-5 flex items-start gap-2">
                      <MapPin
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary/70"
                      />

                      <p
                        className="max-w-[210px] text-xs leading-5 text-muted-foreground"
                      >
                        {location.address}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT — active location image                        */}
          {/* ==================================================== */}

          <div
            className="relative min-h-[500px] overflow-hidden bg-card sm:min-h-[560px] lg:min-h-[620px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeLocation.city}-${activeLocation.country}`}
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 1.02,
                  filter: reduceMotion ? "none" : "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.99,
                  filter: reduceMotion ? "none" : "blur(2px)",
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeLocation.image}
                  alt={`${activeLocation.city} office`}
                  fill
                  priority={activeIndex === 0}
                  className="object-cover"
                  sizes="
                    (max-width: 1024px) 100vw,
                    (max-width: 1280px) 58vw,
                    64vw
                  "
                />

                {/* image grading */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-navy-deep/72 via-navy-deep/30 to-navy-deep/8"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/88 via-transparent to-navy-deep/12"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 75% 30%, rgb(166 124 39 / 0.13), transparent 45%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* ================================================== */}
            {/* image overlay                                      */}
            {/* ================================================== */}

            <div
              className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10"
            >
              {/* top meta */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.4, 1, 0.4],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_var(--color-secondary)]"
                  />

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/55"
                  >
                    Location active
                  </span>
                </div>

                <span
                  className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35"
                >
                  BCR / Europe
                </span>
              </div>

              {/* city content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${activeLocation.city}`}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion ? 0 : -10,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-gold-light" />

                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold-light"
                    >
                      Blackcrest presence
                    </span>
                  </div>

                  <h3
                    className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
                  >
                    {activeLocation.city}
                  </h3>

                  <p
                    className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-white/50"
                  >
                    {activeLocation.country}
                  </p>

                  <div
                    className="mt-6 max-w-lg border-l border-gold/35 pl-4"
                  >
                    <p
                      className="text-sm leading-7 text-white/65"
                    >
                      Supporting clients through a flexible international
                      delivery model, with consistent Blackcrest standards
                      across every engagement.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* coordinates */}
            <div
              className="pointer-events-none absolute bottom-7 right-7 z-10 hidden items-center gap-2 lg:flex"
            >
              <Navigation2 className="h-3.5 w-3.5 text-gold-light" />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40"
              >
                Europe / Network
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Footer strip                                           */}
        {/* ====================================================== */}

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
          transition={{
            duration: 0.5,
          }}
          className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            className="max-w-xl text-xs leading-6 text-muted-foreground"
          >
            Our delivery model is designed around client needs, not geographic
            boundaries.
          </p>

          <div
            className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Local context
            <span className="text-secondary">→</span>
            European reach
            <span className="text-secondary">→</span>
            Consistent delivery
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
