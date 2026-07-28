"use client";

import { motion } from "framer-motion";
import { Users, Network } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  hoverScale,
} from "@/utils/animations";

export default function DeliveryModel() {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Our Delivery Model
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            A hybrid model combining a core in-house team with a curated network
            of specialist partners.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* In-House Core Team */}
          <motion.div variants={slideInLeft} {...hoverScale}>
            <Card padding="lg" className="h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Users className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                In-House Core Team
              </h3>
              <p className="mt-3 text-muted-foreground">
                Strategy, account management, quality control, and primary
                delivery across all four service pillars are handled directly by
                the Blackcrest core team.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Ensuring consistency and accountability
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Direct client relationships at all times
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Specialist Partner Network */}
          <motion.div variants={slideInRight} {...hoverScale}>
            <Card padding="lg" className="h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Network className="h-7 w-7" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Specialist Partner Network
              </h3>
              <p className="mt-3 text-muted-foreground">
                For overflow capacity and niche specialisms, we engage a vetted
                network of specialist partners who work under Blackcrest quality
                standards.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Experts in specific platforms and markets
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Curated and directly supervised
                </li>
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
