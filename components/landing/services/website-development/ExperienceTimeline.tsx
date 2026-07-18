"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/landing/services/website-development/shared/Container";
import { SectionHeading } from "@/components/landing/services/website-development/shared/SectionHeading";
import {
  FiMail,
  FiMessageCircle,
  FiEye,
  FiRefreshCw,
  FiHeart,
} from "react-icons/fi";
import { GiFireworkRocket } from "react-icons/gi";
import { ArrowBigRight } from "lucide-react";

const steps = [
  { icon: FiMail, label: "You Contact Us" },
  { icon: FiMessageCircle, label: "Strategy Call" },
  { icon: FiEye, label: "Design Preview" },
  { icon: FiRefreshCw, label: "Weekly Updates" },
  { icon: GiFireworkRocket, label: "Launch" },
  { icon: FiHeart, label: "Ongoing Support" },
];

const ExperienceTimeline = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-background)] overflow-hidden">
      {/* Subtle golden background glow */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      <Container>
        <SectionHeading
          title="Your Experience, From Start to Launch"
          subtitle="We keep you informed and involved every step of the way – no surprises, just progress."
        />

        <div className="relative mt-16">
          {/* Golden horizontal line – now perfectly centered on the circles (32px = half of 64px circle) */}
          <div className="absolute left-0 right-0 top-[32px] h-0.5 bg-linear-to-r from-transparent via-[var(--color-secondary)] to-transparent hidden sm:block" />

          {/* Glow overlay on the line */}
          <div className="absolute left-0 right-0 top-[30px] h-1 bg-[var(--color-secondary)]/20 blur-sm hidden sm:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Icon circle with golden background and premium glow */}
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-secondary)] text-white shadow-lg shadow-[var(--color-secondary)]/40"
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <step.icon className="h-7 w-7" />

                  {/* Outer glow ring – subtle pulse */}
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--color-secondary)]/30 animate-pulse" />

                  {/* Inner shimmer effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>

                <span className="mt-4 text-sm font-semibold text-[var(--color-heading)] tracking-tight sm:text-base">
                  {step.label}
                </span>

                {/* Step number badge - adds premium detail */}
                <span className="mt-1 text-xs font-medium text-[var(--color-secondary)]/60">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Golden arrow between steps – now perfectly aligned with circle center */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-[20px] hidden text-2xl text-[var(--color-secondary)] sm:block">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className="inline-block mb-2"
                    >
                      <ArrowBigRight className="h-7 w-7" />
                    </motion.span>
                  </div>
                )}

                {/* Vertical connecting lines for mobile */}
                {index < steps.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-linear-to-b from-[var(--color-secondary)] to-transparent sm:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom golden badge */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-card-bg)] px-6 py-3 shadow-sm backdrop-blur-sm">
            <span className="text-[var(--color-secondary)]">✦</span>
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Transparent process, consistent communication
            </span>
            <span className="text-[var(--color-secondary)]">✦</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ExperienceTimeline;
