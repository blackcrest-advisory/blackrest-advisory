"use client";

import { motion } from "framer-motion";
import { Rocket, Building2, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  pulseScale,
  hoverScale,
} from "@/utils/animations";

const segments = [
  {
    number: "01",
    title: "Startups",
    tag: "Early‑Stage",
    description:
      "Early-stage businesses needing a strong digital foundation — brand identity, website, marketing strategy, and technology infrastructure.",
    icon: Rocket,
    iconBg: "bg-secondary/20 group-hover:bg-secondary/30",
  },
  {
    number: "02",
    title: "SMEs",
    tag: "Scaling",
    description:
      "Growing businesses seeking to scale their online presence, improve acquisition funnels, expand to new markets, or modernise their technology.",
    icon: Building2,
    iconBg: "bg-primary/20 group-hover:bg-primary/30",
  },
  {
    number: "03",
    title: "Enterprise Organisations",
    tag: "Established",
    description:
      "Established companies requiring specialist digital transformation, system integrations, advanced marketing programmes, or additional capacity.",
    icon: Briefcase,
    iconBg: "bg-secondary/20 group-hover:bg-secondary/30",
  },
];

export default function WhoWeServe() {
  return (
    <Section className="relative overflow-hidden bg-background">
      {/* Decorative background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
        variants={pulseScale}
        initial="initial"
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        variants={pulseScale}
        initial="initial"
        animate="animate"
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <Container>
        <div className="text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm"
          >
            Our Clients
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Who We Serve
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-3 max-w-2xl text-muted-foreground"
          >
            We partner with European organisations at every stage of their
            growth journey — from first‑time founders to global enterprises.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <motion.div
                key={segment.title}
                variants={fadeInUp}
                {...hoverScale}
              >
                <Card
                  padding="lg"
                  hoverEffect
                  className="group relative overflow-hidden"
                >
                  {/* Decorative large number */}
                  <div className="absolute right-2 top-2 text-8xl font-black text-secondary/5 transition-opacity duration-300 group-hover:opacity-20 select-none">
                    {segment.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${segment.iconBg} text-secondary transition-colors duration-300`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.8} />
                  </div>

                  {/* Tag */}
                  <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary backdrop-blur-sm">
                    {segment.tag}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-foreground">
                    {segment.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {segment.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-secondary to-primary opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
