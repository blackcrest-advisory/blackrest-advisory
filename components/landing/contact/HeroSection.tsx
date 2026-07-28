"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/utils/animations";

export const HeroSection = () => {
  return (
    //===== Contact Hero Section =====//
    <Section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,var(--color-gold)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,var(--color-gold)_0%,transparent_50%)]" />

      <Container className="relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          <span className="mb-6 inline-block rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary">
            Contact
          </span>
          <h1 className="text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            Let&apos;s Start a
            <span className="mt-1 block bg-gradient-to-r from-secondary to-[#e8d48b] bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Have a project in mind? We&apos;d love to hear from you. Reach out
            and let&apos;s explore how Blackcrest Advisory can help your
            business grow.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
};
