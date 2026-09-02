// components/landing/start-project/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
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
} from "@/lib/utils/animations";

export const HeroSection = () => {
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
        transition={{ delay: 0.5 }}
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
                Let&apos;s Build Something Exceptional
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl md:text-6xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              Start Your Next{" "}
              <span className="relative whitespace-nowrap text-secondary">
                Digital Project
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-body md:text-xl"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              Whether you need a modern website, a scalable web application,
              mobile app, or custom software solution, our team is ready to help
              turn your vision into reality.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <Button
                href="#form"
                size="lg"
                className="shadow-lg shadow-secondary/20"
              >
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                Schedule a Consultation
              </Button>
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
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Main circle with border and pulse */}
              <motion.div
                className="absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-secondary/20 bg-background/50 backdrop-blur-sm shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(201,168,76,0.1)",
                    "0 0 40px rgba(201,168,76,0.3)",
                    "0 0 20px rgba(201,168,76,0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-heading">
                    Launch Ready
                  </p>
                  <p className="text-xs text-body">From concept to delivery</p>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20">
                  <span className="text-lg">🚀</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 translate-x-1/2 translate-y-1/2"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
                  <span className="text-lg">💡</span>
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
