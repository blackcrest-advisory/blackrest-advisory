"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, fadeIn, pulseScale, hoverScale } from "@/utils/animations";
import { Card } from "@/components/ui/Card";

const CTA = () => {
  return (
    <Section>
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
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          {...hoverScale}
        >
          <Card
            padding="lg"
            className="relative overflow-hidden md:p-12 lg:p-16"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/5 to-primary/5 opacity-50" />

            <div className="relative z-10 text-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
                  Let&apos;s Talk
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Ready to grow your business?
              </motion.h2>

              <motion.p
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mx-auto mt-4 max-w-2xl text-muted-foreground"
              >
                Book your free discovery consultation today. No obligation. Just
                an honest conversation about your business goals.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  className="shadow-lg shadow-secondary/20 transition-shadow hover:shadow-secondary/40"
                >
                  Get Started
                </Button>
                <Button variant="outline" size="md">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
};

export default CTA;
