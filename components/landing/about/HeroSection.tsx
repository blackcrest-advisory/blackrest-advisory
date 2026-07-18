"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,var(--color-gold)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,var(--color-gold)_0%,transparent_50%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-secondary/10 text-secondary px-4 py-1.5 rounded-full border border-secondary/20 mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-primary dark:text-white">
            Building the Future of
            <span className="block mt-1 bg-gradient-to-r from-secondary to-[#e8d48b] bg-clip-text text-transparent">
              European B2B Digital Growth
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-body dark:text-body max-w-2xl mx-auto leading-relaxed">
            We are a full‑service international digital solutions company —
            combining strategy, technology, marketing, and sales support to help
            European businesses thrive.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary" size="lg" href="#our-story">
              Our Story
            </Button>
            <Button variant="outline" size="lg" href="#values">
              Our Values
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
