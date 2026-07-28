"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";
import { fadeInUp, hoverScale } from "@/utils/animations";

export const EngagementCTA = () => {
  return (
    //===== Engagement CTA section =====//
    <Section className="bg-muted/30">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          {...hoverScale}
          className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-background to-secondary/5 p-6 shadow-2xl shadow-secondary/5 backdrop-blur-sm sm:rounded-3xl sm:p-8 md:p-10 lg:p-16"
        >
          {/*===== Ambient glow effects =====*/}
          <div className="absolute -top-40 -right-40 hidden h-80 w-80 rounded-full bg-secondary/20 blur-3xl lg:block" />
          <div className="absolute -bottom-40 -left-40 hidden h-80 w-80 rounded-full bg-secondary/10 blur-3xl lg:block" />

          {/*===== Decorative ring =====*/}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-secondary/10 sm:rounded-3xl" />

          {/*===== Gold micro-dots =====*/}
          <div className="absolute top-12 right-12 hidden h-1.5 w-1.5 rounded-full bg-secondary/40 sm:block" />
          <div className="absolute bottom-12 left-12 hidden h-1.5 w-1.5 rounded-full bg-secondary/30 sm:block" />
          <div className="absolute top-1/2 left-8 hidden h-1 w-1 rounded-full bg-secondary/20 lg:block" />
          <div className="absolute top-8 left-1/3 hidden h-1 w-1 rounded-full bg-secondary/20 lg:block" />

          {/*===== Content =====*/}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <span className="mb-4 inline-block rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-secondary sm:px-4 sm:py-1.5 sm:text-xs">
              Begin Your Journey
            </span>

            {/* Heading */}
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl   lg:text-4xl">
              Ready to Grow Your Business?
            </h2>

            {/* Description */}
            <p className="mx-auto mb-6 max-w-2xl px-2 text-sm text-muted-foreground/80 sm:text-base md:mb-10 md:text-lg">
              Book a complimentary 45‑minute discovery consultation with our
              team. No obligation, just an honest conversation about your
              business goals.
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                variant="primary"
                size="md"
                className="w-full shadow-lg transition-shadow hover:shadow-xl sm:w-auto"
              >
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book a Consultation
              </Button>
              <Button variant="outline" size="md">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                hello@blackcrestadvisory.com
              </Button>
            </div>

            {/* Phone */}
            <p className="mt-4 text-xs text-muted-foreground/60 sm:mt-6 sm:text-sm">
              Or call us directly:{" "}
              <span className="font-medium text-muted-foreground/80">
                +44 20 1234 5678
              </span>
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
