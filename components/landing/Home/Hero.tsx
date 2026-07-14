"use client";

import { motion } from "framer-motion";
import { Globe, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content - unchanged except slight timing tweaks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm">
                B2B International Digital Solutions
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Blackcrest Advisory combines strategic thinking with hands-on
              execution across technology, marketing, and sales to drive
              measurable growth for startups, SMEs, and enterprises.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg shadow-secondary/20"
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex flex-wrap gap-8 border-t border-border/40 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative h-72 w-full max-w-md lg:h-80">
              {/* Central glowing circle */}
              <motion.div
                className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-gradient-to-br from-secondary/20 to-primary/10 blur-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                {/* Inner content - you can replace this with an <img> tag if you have an image */}
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
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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

              {/* Dashed connecting lines (pure CSS) */}
              <div className="absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-dashed border-secondary/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
