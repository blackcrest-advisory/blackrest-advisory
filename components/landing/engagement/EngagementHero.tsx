// src/components/engagement/EngagementHero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { float } from "@/utils/animations";

export const EngagementHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10">
      {/* Ambient background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Glowing orbs */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-3xl" />

        {/* Floating shapes */}
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 h-16 w-16 rounded-full border-2 border-secondary/10 bg-secondary/5 backdrop-blur-sm"
        />
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 h-12 w-12 rotate-45 border-2 border-secondary/10 bg-secondary/5 backdrop-blur-sm"
        />
        <motion.div
          variants={float}
          initial="initial"
          animate="animate"
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-3/4 right-1/3 h-20 w-20 rounded-full border-2 border-secondary/10 bg-secondary/5 backdrop-blur-sm"
        />
      </div>

      <div className="container relative z-10 flex min-h-screen items-center px-4 py-12 md:px-6">
        {/* Main content grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column: Massive number (now smaller, responsive) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-center"
          >
            <span className="font-display text-[8rem] font-black leading-none tracking-tighter text-transparent md:text-[10rem] lg:text-[13rem] xl:text-[16rem] bg-clip-text bg-gradient-to-br from-secondary/40 via-secondary to-secondary/20 dark:from-secondary/30 dark:via-secondary dark:to-secondary/10">
              01
            </span>
            {/* Decorative line - hidden on mobile, visible from lg */}
            <div className="absolute bottom-0 right-0 hidden h-0.5 w-24 bg-gradient-to-r from-secondary/80 to-transparent lg:block lg:bottom-8 lg:right-8" />
          </motion.div>

          {/* Right column: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-center space-y-4 md:space-y-6"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary/80 md:text-sm">
              Begin Your Engagement
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Let’s Build Your{" "}
              <span className="relative inline-block">
                <span className="text-secondary">Financial Future</span>
                {/* Underline glow */}
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-secondary/30 blur-sm" />
              </span>
            </h1>
            <p className="max-w-lg text-sm text-body/80 sm:text-base md:text-lg">
              Partner with Blackcrest Advisory to navigate complex financial
              landscapes with confidence and clarity. From strategy to
              execution, we’re with you every step of the way.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 md:gap-4">
              <Button variant="primary" size="lg" href="#engagement-models">
                Explore Engagement Models
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" href="#faq">
                See FAQs
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-body/40 md:bottom-8"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-widest md:text-xs">
            Scroll
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-secondary/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
