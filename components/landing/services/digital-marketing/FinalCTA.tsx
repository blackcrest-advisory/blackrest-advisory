"use client";

//===== imports =====//
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { fadeInUp } from "@/lib/utils/animations";

//==============================================================//
// FINAL CTA
//==============================================================//

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-28"
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:76px_76px]"
        />

        {/* gold glow */}
        <div
          className="absolute left-[8%] top-[12%] h-[360px] w-[360px] rounded-full bg-secondary/[0.1] blur-[140px]"
        />

        {/* opposite glow */}
        <div
          className="absolute -right-32 bottom-[-80px] h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[150px]"
        />

        {/* vertical guides */}
        <div
          className="absolute left-[7%] top-0 h-full w-px bg-white/[0.07]"
        />

        <div
          className="absolute right-[7%] top-0 h-full w-px bg-white/[0.07]"
        />
      </div>

      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="relative border-y border-white/10"
        >
          {/* ================================================== */}
          {/* TOP STATUS                                        */}
          {/* ================================================== */}

          <div
            className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-3">
              <span
                className="relative flex h-2 w-2"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-gold-light"
                    animate={{
                      scale: [1, 2.4, 1],
                      opacity: [0.75, 0, 0.75],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                    }}
                  />
                )}

                <span
                  className="relative h-2 w-2 rounded-full bg-gold-light"
                />
              </span>

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.17em] text-gold-light"
              >
                Start the conversation
              </span>
            </div>

            <span
              className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/30"
            >
              Blackcrest / Digital Growth
            </span>
          </div>

          {/* ================================================== */}
          {/* MAIN CTA                                          */}
          {/* ================================================== */}

          <div
            className="grid min-w-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
          >
            {/* ================================================ */}
            {/* MESSAGE                                         */}
            {/* ================================================ */}

            <div
              className="relative min-w-0 px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
            >
              <Sparkles className="h-4 w-4 text-gold-light" />

              <h2
                className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-[60px] xl:text-[68px]"
              >
                Ready to turn
                <span className="block text-gold-light">
                  attention into growth?
                </span>
              </h2>

              <p
                className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8"
              >
                Let&apos;s build a digital marketing strategy that connects
                audience, acquisition, conversion, and performance around the
                outcomes that matter to your business.
              </p>

              {/* signal line */}
              <div
                className="mt-8 flex items-center gap-3"
              >
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          width: 0,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          width: 52,
                        }
                  }
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-px bg-gold-light"
                />

                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/35"
                >
                  Strategy / Growth / Performance
                </span>
              </div>
            </div>

            {/* ================================================ */}
            {/* ACTION PANEL                                    */}
            {/* ================================================ */}

            <div
              className="flex min-w-0 flex-col justify-between border-t border-white/10 bg-navy-deep/40 px-5 py-8 sm:px-6 lg:border-l lg:border-t-0 lg:px-8 lg:py-10"
            >
              <div>
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                >
                  Your next move
                </span>

                <h3
                  className="mt-3 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl"
                >
                  Start with a focused growth conversation.
                </h3>

                <p
                  className="mt-3 text-xs leading-6 text-white/45"
                >
                  Tell us what you&apos;re trying to achieve and where your
                  current marketing is falling short.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  className="group w-full !rounded-md"
                >
                  Request Proposal
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  className="w-full !rounded-md border-white/20 text-white hover:bg-white/5"
                >
                  <Mail className="h-4 w-4" />
                  hello@blackcrestadvisory.com
                </Button>
              </div>

              <div
                className="mt-8 border-t border-white/10 pt-4"
              >
                <div
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gold-light"
                  />

                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-white/30"
                  >
                    Growth starts with clarity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* BOTTOM CLOSE                                      */}
          {/* ================================================== */}

          <div
            className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light"
            >
              Blackcrest Advisory
            </span>

            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/25"
            >
              Digital Marketing / End of Brief
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
