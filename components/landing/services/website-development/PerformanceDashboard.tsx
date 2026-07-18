"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/landing/services/website-development/shared/Container";
import CountUp from "react-countup";
import {
  FiZap,
  FiTrendingUp,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiActivity,
} from "react-icons/fi";

const metrics = [
  {
    label: "Performance",
    value: 99,
    unit: "",
    icon: FiZap,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    ringColor: "stroke-blue-500",
  },
  {
    label: "SEO",
    value: 100,
    unit: "",
    icon: FiTrendingUp,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    ringColor: "stroke-green-500",
  },
  {
    label: "Accessibility",
    value: 100,
    unit: "",
    icon: FiEye,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    ringColor: "stroke-purple-500",
  },
  {
    label: "Best Practices",
    value: 98,
    unit: "",
    icon: FiCheckCircle,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    ringColor: "stroke-orange-500",
  },
  {
    label: "Load Time",
    value: 0.9,
    unit: "s",
    icon: FiClock,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    ringColor: "stroke-cyan-500",
  },
  {
    label: "CLS",
    value: 0.01,
    unit: "",
    icon: FiActivity,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    ringColor: "stroke-rose-500",
  },
];

const PerformanceDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    const section = document.getElementById("performance");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Calculate circle circumference for progress rings
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section
      id="performance"
      className="relative py-16 md:py-24 bg-[var(--color-card-bg)] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      {/* Floating golden dots */}
      <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-[var(--color-secondary)]/20 blur-sm" />
      <div className="absolute bottom-20 right-10 h-3 w-3 rounded-full bg-[var(--color-secondary)]/20 blur-sm" />
      <div className="absolute top-1/2 left-1/4 h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)]/10 blur-sm" />

      <Container>
        {/* Gold-accented heading */}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-[var(--color-secondary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-secondary)]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Core Web Vitals
          </motion.span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl md:text-5xl">
            Performance{" "}
            <span className="text-[var(--color-secondary)]">Dashboard</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-body)]">
            We build for speed and reliability – every website is optimised to
            pass Google&apos;s Core Web Vitals with flying colours.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            // Calculate progress for the ring
            const progress = metric.value / 100;
            const strokeDashoffset = circumference * (1 - progress);

            return (
              <motion.div
                key={metric.label}
                className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--color-secondary)]/30"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{ y: -4 }}
              >
                {/* Golden glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-[var(--color-secondary)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Small golden top accent */}
                <div className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[var(--color-secondary)]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Circular progress ring */}
                  <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                    <svg className="h-24 w-24 -rotate-90 transform">
                      {/* Background circle */}
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-[var(--color-border)]"
                        opacity="0.3"
                      />
                      {/* Progress circle with gradient */}
                      <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke="url(#goldGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{
                          strokeDashoffset: isVisible
                            ? strokeDashoffset
                            : circumference,
                        }}
                        transition={{
                          duration: 1.8,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        className={metric.ringColor}
                      />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient
                          id="goldGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-secondary)"
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-secondary)"
                            stopOpacity="0.6"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Icon in the center */}
                    <div
                      className={`absolute flex h-10 w-10 items-center justify-center rounded-full ${metric.bg} ${metric.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--color-secondary)]/20`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-[var(--color-heading)]">
                      {isVisible ? (
                        <CountUp
                          end={metric.value}
                          duration={2.5}
                          decimals={metric.label === "Load Time" ? 1 : 0}
                          delay={index * 0.08}
                          redraw={true}
                        />
                      ) : (
                        metric.value
                      )}
                      <span className="text-sm font-normal text-[var(--color-body)]">
                        {metric.unit}
                      </span>
                    </span>
                  </div>

                  {/* Label */}
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--color-body)]">
                    {metric.label}
                  </div>

                  {/* Score badge for 100 scores */}
                  {metric.value >= 100 && (
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-0.5 text-[10px] font-bold text-[var(--color-secondary)]">
                      ✦ Perfect
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom golden badge with additional stats */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-background)] px-5 py-2.5 shadow-sm">
            <span className="text-[var(--color-secondary)]">✦</span>
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Google PageSpeed Insights Score
            </span>
            <span className="text-sm font-bold text-[var(--color-secondary)]">
              98+
            </span>
            <span className="text-[var(--color-secondary)]">✦</span>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-background)] px-5 py-2.5 shadow-sm">
            <span className="text-[var(--color-secondary)]">✦</span>
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Lighthouse Certified
            </span>
            <span className="text-[var(--color-secondary)]">✦</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PerformanceDashboard;
