// components/landing/start-project/InfoCard.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Clock3,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  "Business-first planning",
  "Clear communication",
  "Focused project ownership",
  "Quality-aware delivery",
  "Support matched to scope",
  "Practical next steps",
];

export const InfoCard = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: reduceMotion ? 0 : 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-24 overflow-hidden border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]"
    >
      {/* top signal */}
      <motion.div
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-secondary via-secondary/45 to-transparent"
      />

      {/* header */}
      <div className="border-b border-border p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Project readiness
              </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-heading md:text-2xl">
              What you can expect from the process.
            </h3>
          </div>

          <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40">
            BCR / 02
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          A practical project-start process designed to give you clarity,
          visible progress, and a clear path from enquiry to delivery.
        </p>
      </div>

      {/* features */}
      <div className="p-6 md:p-7">
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/45">
          Delivery principles
        </p>

        <div className="mt-5 border-t border-border">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
              }}
              className="group flex items-center justify-between gap-4 border-b border-border py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/[0.08] transition-colors duration-300 group-hover:bg-secondary">
                  <Check className="h-3 w-3 text-secondary transition-colors duration-300 group-hover:text-secondary-foreground"/>
                </div>

                <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-heading">
                  {feature}
                </span>
              </div>

              <span className="font-mono text-[7px] text-muted-foreground/30">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* response */}
        <div className="mt-7 border border-secondary/20 bg-secondary/[0.05] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary/[0.09] text-secondary">
              <Clock3 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                Response expectation
              </p>

              <p className="mt-2 text-sm font-semibold text-heading">
                We review each enquiry carefully.
              </p>

              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                We use the context you share to give you a useful, relevant
                response focused on the right next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="border-t border-border bg-muted/25 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/45">
              Need to talk first?
            </p>

            <p className="mt-1 text-sm font-semibold text-heading">
              Contact the team directly.
            </p>
          </div>

          <MessageSquareText className="h-4 w-4 text-secondary" />
        </div>

        <div className="mt-5 border-t border-border">
          <a
            href="mailto:careselenite@gmail.com"
            className="group flex items-center justify-between gap-4 border-b border-border py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card text-muted-foreground transition-all duration-300 group-hover:border-secondary/30 group-hover:text-secondary">
                <Mail className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0">
                <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Email
                </p>

                <p className="mt-1 break-all text-xs font-medium text-foreground">
                  careselenite@gmail.com
                </p>
              </div>
            </div>

            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"/>
          </a>

          <div className="flex items-center gap-3 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-card text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Phone
              </p>

              <p className="mt-1 text-xs font-medium text-foreground">
                +88 01647-660300
              </p>
            </div>
          </div>
        </div>

        {/* assurance */}
        <div className="mt-3 flex items-start gap-3 border-l border-secondary/30 pl-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary"/>

          <p className="text-xs leading-6 text-muted-foreground">
            Your project information is used only to evaluate and respond to
            your inquiry.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.35, 1, 0.35],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-success"
            />

            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-success">
              Enquiries open
            </span>
          </div>

          <Sparkles className="h-3.5 w-3.5 text-secondary/60" />
        </div>
      </div>
    </motion.aside>
  );
};
