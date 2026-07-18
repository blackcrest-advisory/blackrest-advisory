"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/shared/Section";

const CTA = () => {
  return (
    <Section id="contact" className="relative overflow-hidden bg-muted/30">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl border border-border bg-card-bg/80 p-8 shadow-xl backdrop-blur-sm md:p-12 lg:p-16"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/5 to-primary/5 opacity-50" />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
                Let&apos;s Talk
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl"
            >
              Ready to grow your business?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mt-4 max-w-2xl text-body"
            >
              Book your free discovery consultation today. No obligation. Just
              an honest conversation about your business goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href="/signup"
                className="shadow-lg shadow-secondary/20 transition-shadow hover:shadow-secondary/40"
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default CTA;
