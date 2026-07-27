"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/utils/animations";

export const HeroSection = () => {
  return (
    <Section>
      {/* Background gradient */}

      <Container className="relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/20 mb-5">
            About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
            Building the Future of
            <span className="block mt-1 bg-gradient-to-r from-secondary to-[#e8d48b] bg-clip-text text-transparent">
              European B2B Digital Growth
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a full‑service international digital solutions company —
            combining strategy, technology, marketing, and sales support to help
            European businesses thrive.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="md" href="#our-story">
              Our Story
            </Button>
            <Button variant="outline" size="md" href="#values">
              Our Values
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
