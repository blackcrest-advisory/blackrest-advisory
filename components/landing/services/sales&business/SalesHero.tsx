// components/sales-support/SalesHero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { FaBullseye, FaUsersGear, FaHandshake } from "react-icons/fa6";
import CountUp from "react-countup";
import { SectionHeading } from "@/components/landing/services/sales&business/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IMAGE } from "@/constant/imagesConfig";
import { Funnel } from "lucide-react";

export const SalesHero = () => {
  const stats = [
    { value: 87, suffix: "%", label: "Pipeline growth" },
    { value: 3.4, suffix: "×", label: "Deal acceleration" },
    { value: 92, suffix: "%", label: "Client retention" },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-background)] py-20 md:py-28 lg:py-36">
      {/* Decorative gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-bl from-[var(--color-secondary)]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-[var(--color-primary)]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeading
              label="✦ Sales & Business Support"
              title={
                <>
                  Sales &{" "}
                  <span className="text-[var(--color-secondary)]">
                    Business Support
                  </span>{" "}
                  Services
                </>
              }
              subtitle="Technology and marketing are only as powerful as the sales process behind them. Blackcrest provides professional sales support services that help European businesses build stronger pipelines, close more deals, and retain clients for longer."
              align="left"
              className="!max-w-full"
            />

            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="#capabilities" variant="primary" size="lg">
                Explore Services
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Talk to an Expert
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--color-border)]">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="text-left"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)]">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-sm text-[var(--color-body)] mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 backdrop-blur-sm">
              {/* Optional image */}
              <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden mb-6">
                <Image
                  src={IMAGE.salesHeroImage}
                  alt="Sales support team"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: FaBullseye,
                    text: "B2B Sales Strategy",
                    desc: "Data‑driven growth plans",
                  },
                  {
                    icon: Funnel,
                    text: "Funnel Optimisation",
                    desc: "Conversion at every stage",
                  },
                  {
                    icon: FaUsersGear,
                    text: "Team Training & Coaching",
                    desc: "Empower your sales force",
                  },
                  {
                    icon: FaHandshake,
                    text: "Client Retention",
                    desc: "Long‑term account growth",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-[var(--color-primary)]/5 transition-colors"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-heading)]">
                        {item.text}
                      </p>
                      <p className="text-sm text-[var(--color-body)]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
