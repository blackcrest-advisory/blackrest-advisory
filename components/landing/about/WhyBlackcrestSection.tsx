"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { whyData } from "@/content-data/about/aboutData";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  hoverScale,
} from "@/lib/utils/animations";

export const WhyBlackcrestSection = () => {
  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest uppercase text-secondary"
          >
            Why Us
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mt-2 text-foreground relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-secondary after:rounded"
          >
            Why Blackcrest Advisory
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 text-muted-foreground leading-relaxed"
          >
            The European B2B market is served by many agencies. What makes us
            different is not our service list — it&apos;s our model of
            engagement and commitment to client outcomes.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14"
        >
          {whyData.map((item, idx) => (
            <motion.div key={idx} variants={fadeInUp} {...hoverScale}>
              <Card padding="lg" className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
