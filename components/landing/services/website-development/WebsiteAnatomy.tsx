"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/landing/services/website-development/shared/Container";
import { SectionHeading } from "@/components/landing/services/website-development/shared/SectionHeading";
import {
  FiMonitor,
  FiServer,
  FiDatabase,
  FiLock,
  FiBarChart2,
  FiEdit,
  FiTrendingUp,
  FiCpu,
} from "react-icons/fi";

const nodes = [
  {
    icon: FiMonitor,
    label: "Frontend",
    description: "UI, interactions & user experience",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: FiServer,
    label: "Backend",
    description: "Business logic, APIs & data processing",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: FiDatabase,
    label: "Database",
    description: "Structured data storage & retrieval",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: FiLock,
    label: "Security",
    description: "Encryption, auth & threat protection",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  {
    icon: FiBarChart2,
    label: "Analytics",
    description: "User behavior, insights & reporting",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: FiEdit,
    label: "CMS",
    description: "Content management made simple",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
  {
    icon: FiTrendingUp,
    label: "SEO",
    description: "Visibility, rankings & organic traffic",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: FiCpu,
    label: "Performance",
    description: "Speed, reliability & Core Web Vitals",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WebsiteAnatomy = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-card-bg)] overflow-hidden">
      {/* Subtle background pattern – adds depth without distracting */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMzBhMTUgMTUgMCAwIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] bg-repeat" />

      <Container>
        {/* Gold‑accented heading */}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-[var(--color-secondary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-secondary)]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Architecture
          </motion.span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl md:text-5xl">
            Your Website,{" "}
            <span className="text-[var(--color-secondary)]">Deconstructed</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-body)]">
            Every modern website is built on interconnected layers. We master
            them all – from the frontend you see to the backend that powers it.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {nodes.map((node) => (
            <motion.div
              key={node.label}
              variants={itemVariants}
              className={`group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[var(--color-secondary)]/40 ${node.bg}`}
              whileHover={{ y: -6 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[var(--color-secondary)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                <div
                  className={`rounded-xl p-3 transition-colors duration-300 ${
                    node.bg
                  } group-hover:bg-[var(--color-secondary)]/10`}
                >
                  <node.icon
                    className={`h-8 w-8 ${node.color} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[var(--color-heading)]">
                  {node.label}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-body)] leading-relaxed">
                  {node.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom golden badge */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-background)] px-6 py-3 text-sm shadow-sm">
            <span className="font-medium text-[var(--color-secondary)]">
              ✦ All layers work together
            </span>
            <span className="text-[var(--color-body)]">→</span>
            <span className="font-medium text-[var(--color-heading)]">
              seamless performance
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WebsiteAnatomy;
