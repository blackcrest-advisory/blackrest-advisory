"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const trustPoints = [
  "No-obligation discovery call",
  "Clear next steps",
  "Senior-level conversation",
];

const CTA = () => {
  return (
    <Section className="relative overflow-hidden bg-background">
      <Container>
        <div className="relative overflow-hidden bg-navy-deep px-6 py-14 text-white shadow-[var(--shadow-overlay)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* Background composition */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(50rem 28rem at 82% 10%, rgb(166 124 39 / 0.16), transparent 60%)",
              }}
            />

            <motion.div
              className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[0.06]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-gold/10"
              animate={{ rotate: -360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute right-[9%] top-[18%] h-3 w-3 rounded-full bg-gold"
              animate={{
                y: [0, 18, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                boxShadow: "0 0 26px rgb(166 124 39 / 0.55)",
              }}
            />

            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            {/* Main message */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-gold-light" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Start a conversation
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl lg:leading-[1.03]"
              >
                Your next stage of growth
                <span className="block text-white/40">
                  starts with one conversation.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="mt-6 max-w-2xl text-base leading-8 text-white/55"
              >
                Tell us what you&apos;re trying to build, improve, or scale.
                We&apos;ll help you understand the strongest path forward —
                whether that means strategy, technology, marketing, sales, or a
                combination of them.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  className="group bg-gold text-navy hover:bg-gold-light"
                >
                  Book a discovery call
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  className="border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]"
                >
                  Explore our services
                </Button>
              </motion.div>
            </div>

            {/* Trust / reassurance */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                What to expect
              </p>

              <div className="mt-5 space-y-4">
                {trustPoints.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.25 + index * 0.08,
                      duration: 0.4,
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold-light" />
                    </div>

                    <span className="text-sm font-medium text-white/75">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm leading-6 text-white/45">
                  No sales pressure. No generic pitch. Just a focused
                  conversation about what your business needs next.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-white/30">Blackcrest Advisory</span>

            <div className="flex flex-wrap items-center gap-3 font-medium text-white/45">
              <span>Strategy</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <span>Technology</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <span>Growth</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <span>Partnership</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
