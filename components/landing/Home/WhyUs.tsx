"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Handshake, Eye } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, fadeIn, staggerContainer } from "@/utils/animations";

const reasons = [
  {
    title: "International Quality",
    description:
      "We hold our work to European-grade standards in every deliverable, deadline, and client interaction.",
    icon: ShieldCheck,
  },
  {
    title: "Results Over Activity",
    description:
      "We measure success in business outcomes—revenue, leads, conversions—not just deliverables.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Partnership",
    description:
      "We build relationships, not transactions. Our clients stay because we grow with their business.",
    icon: Handshake,
  },
  {
    title: "Transparency",
    description:
      "Clear communication, honest reporting, and no hidden agendas. You always know exactly where your project stands.",
    icon: Eye,
  },
];

const WhyUs = () => {
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
            Why Blackcrest Advisory
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            We combine strategic thinking with hands-on execution to deliver
            real results.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={fadeInUp}
                whileHover={{
                  y: -4,
                  scale: 1,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  padding="base"
                  hoverEffect
                  className="group relative overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};

export default WhyUs;
