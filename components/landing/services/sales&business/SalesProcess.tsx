"use client";

import { motion } from "framer-motion";
import { FaLightbulb, FaRocket, FaChartLine } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { staggerContainer, fadeInUp, hoverScale } from "@/lib/utils/animations";

//===== Process steps data =====//
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
  return (
    <Section className="border-t border-border/50 bg-muted/30">
      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            ✦ Our Approach
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How We Drive Your{" "}
            <span className="text-secondary">Sales Growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A structured, end‑to‑end process that transforms your sales engine
            from the inside out.
          </p>
        </div>

        {/*===== Process steps grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={fadeInUp} {...hoverScale}>
              <Card padding="base" hoverEffect className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
                  <step.icon />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground text-justify text-base">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/*===== CTA =====*/}
        <div className="mt-16 text-center">
          <Button href="#contact" variant="primary" size="lg">
            Let&apos;s Start Your Growth Journey
          </Button>
        </div>
      </Container>
    </Section>
  );
};
