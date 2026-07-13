"use client";

import { motion, Variants } from "framer-motion";
import { FaLightbulb, FaRocket, FaChartLine } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { SectionHeading } from "@/components/services/sales&business/SectionHeading";
import { Button } from "@/components/ui/buttons/Button";

const steps = [
  {
    icon: FaLightbulb,
    title: "1. Strategy & Discovery",
    description:
      "We dive deep into your business goals, target audience, and current sales processes. This phase includes B2B Sales Strategy Development and Lead Generation Programme Design tailored to your unique market.",
  },
  {
    icon: FaCogs,
    title: "2. Optimisation & Enablement",
    description:
      "We design and optimise your sales funnel, set up your CRM, and create compelling proposals and pitch decks that resonate with your prospects. We ensure every tool and asset is aligned for maximum impact.",
  },
  {
    icon: FaRocket,
    title: "3. Execution & Training",
    description:
      "We provide hands‑on sales team training and coaching, ensuring your team adopts best practices and leverages the new systems. Continuous support drives immediate performance improvements.",
  },
  {
    icon: FaChartLine,
    title: "4. Retention & Growth",
    description:
      "We implement client retention and account growth strategies, alongside ongoing business development consulting, to ensure sustainable, long‑term success and expanding revenue streams.",
  },
];

export const SalesProcess = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-20 md:py-28 bg-[var(--color-card-bg)] border-t border-[var(--color-border)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Our Approach"
          title={
            <>
              How We Drive Your{" "}
              <span className="text-[var(--color-secondary)]">
                Sales Growth
              </span>
            </>
          }
          subtitle="A structured, end‑to‑end process that transforms your sales engine from the inside out."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex gap-5 p-6 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] text-xl">
                <step.icon />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-body)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button href="#contact" variant="primary" size="lg">
            Let‘s Start Your Growth Journey
          </Button>
        </div>
      </div>
    </section>
  );
};
