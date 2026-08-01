"use client";

import { motion } from "framer-motion";
import { Users, Globe, Award, Building } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  pulseScale,
  hoverScale,
} from "@/lib/utils/animations";

const stats = [
  {
    number: "100+",
    label: "Clients",
    icon: Users,
  },
  {
    number: "5+",
    label: "European Countries",
    icon: Globe,
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    icon: Award,
  },
  {
    number: "50+",
    label: "Projects Delivered",
    icon: Building,
  },
];

export default function TrustedBy() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
        variants={pulseScale}
        initial="initial"
        animate="animate"
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
        variants={pulseScale}
        initial="initial"
        animate="animate"
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Social Proof
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Trusted by European Businesses
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 h-1 rounded-full bg-gradient-to-r from-secondary to-primary"
          />

          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-muted-foreground"
          >
            We’ve helped over 100 businesses across Europe grow their digital
            presence and achieve measurable results.
          </motion.p>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card
                  padding="lg"
                  className="relative overflow-hidden text-center"
                >
                  {/* Top gradient bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary transition-colors group-hover:from-secondary/20 group-hover:to-primary/20">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>

                  <motion.p
                    className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
