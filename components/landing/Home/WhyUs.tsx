"use client";

import { motion } from "framer-motion";
import { Eye, Handshake, ShieldCheck, TrendingUp } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    number: "01",
    title: "International Quality",
    kicker: "Standards",
    description:
      "We hold our work to European-grade standards across strategy, delivery, communication, and execution.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Results Over Activity",
    kicker: "Outcomes",
    description:
      "We care about what the work changes — stronger pipelines, higher conversion, better systems, and measurable commercial impact.",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Long-Term Partnership",
    kicker: "Partnership",
    description:
      "We aim to become a dependable extension of your team, not another supplier completing isolated tasks.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Radical Transparency",
    kicker: "Clarity",
    description:
      "Clear communication, honest reporting, visible progress, and no unnecessary complexity between you and the work.",
    icon: Eye,
  },
];

export default function WhyUs() {
  return (
    <Section className="relative overflow-hidden bg-muted/40">
      {/* Editorial background detail */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[7%] top-0 h-full w-px bg-border/50" />
        <div className="absolute right-[7%] top-0 h-full w-px bg-border/30" />

        <motion.div
          className="absolute left-[7%] top-0 h-24 w-px bg-secondary"
          animate={{
            y: ["0%", "700%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute -left-28 bottom-[-12rem] h-[30rem] w-[30rem] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.09), transparent 68%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Brand statement */}
          <div className="lg:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Why Blackcrest
              </span>

              <span className="h-px w-10 bg-secondary/50" />
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
              The way we work
              <span className="block text-muted-foreground">
                matters as much as
              </span>
              <span className="text-gold-gradient">what we deliver.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.55 }}
              className="mt-7 max-w-lg text-base leading-8 text-body"
            >
              Great digital work is not only about design, technology, or
              marketing. It is also about judgment, communication, ownership,
              and the discipline behind every decision.
            </motion.p>

            {/* Signature thought */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="mt-10 max-w-md border-l border-secondary/40 pl-5"
            >
              <p className="text-sm font-medium leading-7 text-foreground/80">
                “We want every client to feel informed, confident, and in
                control of the work — from first conversation to final result.”
              </p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Blackcrest operating principle
              </p>
            </motion.div>
          </div>

          {/* Principles */}
          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-[23px] top-4 hidden h-[calc(100%-2rem)] w-px bg-border sm:block" />

            <div className="space-y-2">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <motion.article
                    key={reason.title}
                    initial={{
                      opacity: 0,
                      x: 30,
                      filter: "blur(4px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative"
                  >
                    <div
                      className="
                        relative grid gap-5 border-b border-border/70
                        py-7 transition-colors duration-300
                        sm:grid-cols-[48px_1fr_auto]
                        sm:items-start
                        group-hover:bg-background/55
                      "
                    >
                      {/* Icon node */}
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{
                            rotate: -6,
                            scale: 1.06,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                          }}
                          className="
                            flex h-12 w-12 items-center justify-center
                            border border-border
                            bg-background
                            text-secondary
                            shadow-sm
                            transition-[border-color,box-shadow,background-color]
                            duration-300
                            group-hover:border-secondary/30
                            group-hover:bg-secondary/[0.055]
                            group-hover:shadow-[var(--shadow-gold-glow)]
                          "
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </motion.div>

                        {/* Pulse dot */}
                        <motion.span
                          className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-secondary"
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.6, 0.15, 0.6],
                          }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: index * 0.35,
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                            {reason.kicker}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-border" />

                          <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground/50">
                            {reason.number}
                          </span>
                        </div>

                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-heading sm:text-2xl">
                          {reason.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-body sm:text-base">
                          {reason.description}
                        </p>

                        {/* Reveal line */}
                        <div className="mt-5 h-px w-full overflow-hidden bg-border/50">
                          <motion.div
                            className="h-full bg-secondary"
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "0%" }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.18 + index * 0.08,
                              duration: 0.75,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </div>
                      </div>

                      {/* Large number */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.08,
                        }}
                        className="hidden select-none text-5xl font-semibold tracking-[-0.06em] text-navy/[0.045] sm:block"
                      >
                        {reason.number}
                      </motion.div>

                      {/* Hover sweep */}
                      <motion.div
                        className="pointer-events-none absolute inset-y-0 left-0 w-[28%]"
                        initial={{ x: "-140%" }}
                        whileHover={{ x: "460%" }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgb(166 124 39 / 0.055), transparent)",
                        }}
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            These principles shape how we scope projects, communicate progress,
            make decisions, and build long-term relationships with our clients.
          </p>

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-navy">
            Strategy
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Ownership
            <span className="h-1 w-1 rounded-full bg-secondary" />
            Accountability
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
