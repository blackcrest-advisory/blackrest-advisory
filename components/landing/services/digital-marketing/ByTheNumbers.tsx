"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, staggerContainer, hoverScale } from "@/utils/animations";

const stats = [
  { label: "Increase in Website Traffic", value: 1211, suffix: "%" },
  { label: "Increase in Social Media Followers", value: 750, suffix: "%" },
  { label: "Google Ad Impressions", value: 22, suffix: "M" },
  { label: "Email Collect", value: 120, suffix: "K" },
];

export default function ByTheNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section>
      <Container>
        <div ref={ref}>
          {/*===== Section header =====*/}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-secondary">
              Check It Out!
            </span>
            <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
              Advantages of Digital Marketing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Here are just some of the results we have realized with a potent
              mix of expertise, creativity, and online marketing knowledge.
            </p>
          </motion.div>

          {/*===== Stats grid =====*/}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} {...hoverScale}>
                <Card padding="base" hoverEffect className="text-center">
                  <div className="text-3xl font-bold text-secondary md:text-4xl lg:text-5xl">
                    {isInView ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.suffix}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <div className="mt-2 text-sm leading-tight text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
