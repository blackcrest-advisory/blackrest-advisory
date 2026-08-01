"use client";

import { motion } from "framer-motion";
import { Globe, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  scaleIn,
  floatShape,
  gradientShift,
  pulseScale,
  orbit,
  orbitReverse,
} from "@/lib/utils/animations";

const Hero = () => {
  return (
    <Section>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        variants={gradientShift}
        initial="initial"
        animate="animate"
      />

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
        variants={floatShape}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute -bottom-32 right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        variants={floatShape}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }} // offset the second shape
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div variants={slideInLeft} initial="hidden" animate="visible">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
                B2B International Digital Solutions
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl md:text-6xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              Empowering European{" "}
              <span className="relative whitespace-nowrap text-secondary">
                Businesses
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>{" "}
              Through Technology
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-body md:text-xl"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              Blackcrest Advisory combines strategic thinking with hands-on
              execution across technology, marketing, and sales to drive
              measurable growth for startups, SMEs, and enterprises.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <Button
                variant="primary"
                size="md"
                href="/signup"
                className="shadow-lg shadow-secondary/20"
              >
                Get Started
              </Button>
              <Button variant="outline" size="md" href="/about">
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex flex-wrap gap-8 border-t border-border/40 pt-8"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.9 }}
            >
              <div>
                <p className="text-2xl font-bold text-heading">100+</p>
                <p className="text-sm text-body">Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-heading">5+</p>
                <p className="text-sm text-body">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-heading">99%</p>
                <p className="text-sm text-body">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right section - Premium abstract visual */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative h-72 w-full max-w-md lg:h-80">
              {/* Central glowing circle */}
              <motion.div
                className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-linear-to-br from-secondary/20 to-primary/10 blur-2xl"
                variants={pulseScale}
                initial="initial"
                animate="animate"
              />

              {/* Main circle with border and pulse */}
              <motion.div
                className="absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-secondary/20 bg-background/50 backdrop-blur-sm shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(99,102,241,0.1)",
                    "0 0 40px rgba(99,102,241,0.3)",
                    "0 0 20px rgba(99,102,241,0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <Globe
                    className="h-12 w-12 text-secondary"
                    strokeWidth={1.5}
                  />
                  <p className="mt-2 text-sm font-semibold text-heading">
                    Global Reach
                  </p>
                  <p className="text-xs text-body">
                    Connecting Europe & beyond
                  </p>
                </div>
              </motion.div>

              {/* Orbiting icons */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                variants={orbit}
                initial="initial"
                animate="animate"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 md:bottom-0 right-4 md:right-0 translate-x-1/2 translate-y-1/2"
                variants={orbitReverse}
                initial="initial"
                animate="animate"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </motion.div>

              {/* Small decorative dots */}
              <motion.div
                className="absolute top-1/4 right-0 h-3 w-3 rounded-full bg-secondary/40"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/3 left-0 h-2 w-2 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />

              {/* Dashed connecting lines */}
              <div className="absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-dashed border-secondary/10" />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
