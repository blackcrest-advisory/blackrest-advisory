"use client";

import { motion } from "framer-motion";
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
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, staggerContainer, hoverScale } from "@/utils/animations";

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

export default function WebsiteAnatomy() {
  return (
    <Section className="relative overflow-hidden bg-muted/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMzBhMTUgMTUgMCAwIDEgMCAzMCAxNSAxNSAwIDAgMSAwLTMweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] bg-repeat" />

      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Architecture
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Your Website, <span className="text-secondary">Deconstructed</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Every modern website is built on interconnected layers. We master
            them all – from the frontend you see to the backend that powers it.
          </motion.p>
        </div>

        {/*===== Cards grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
        >
          {nodes.map((node) => (
            <motion.div key={node.label} variants={fadeInUp} {...hoverScale}>
              <Card
                padding="base"
                hoverEffect
                className={`group relative border-border/50 ${node.bg}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-col items-center text-center">
                  <div
                    className={`rounded-xl p-3 transition-colors duration-300 ${
                      node.bg
                    } group-hover:bg-secondary/10`}
                  >
                    <node.icon
                      className={`h-8 w-8 ${node.color} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">
                    {node.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {node.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/*===== Bottom golden badge =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-secondary/20 bg-card px-6 py-3 text-sm shadow-sm">
            <span className="font-medium text-secondary">
              ✦ All layers work together
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium text-foreground">
              seamless performance
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
