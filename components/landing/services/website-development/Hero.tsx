"use client";

import { Container } from "@/components/landing/services/website-development/shared/Container";
import { Button } from "@/components/ui/Button";
import { IMAGE } from "@/constants/imagesConfig";
import { motion } from "framer-motion";

import Image from "next/image";
import { FiCode, FiZap } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[var(--color-background)]">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-primary)]">
              <FiZap className="h-4 w-4" />
              <span>Website Development</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--color-heading)] sm:text-5xl md:text-6xl">
              Build a{" "}
              <span className="text-[var(--color-secondary)]">
                Digital Foundation
              </span>{" "}
              That Drives Growth
            </h1>
            <p className="mt-6 text-lg text-[var(--color-body)] max-w-lg">
              From corporate websites to custom web applications – we design,
              develop, and optimise digital experiences that convert visitors
              into clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact" size="lg">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" href="#work">
                See Our Work
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[var(--color-body)]">
              <span className="flex items-center gap-1">
                <FiCode className="h-4 w-4 text-[var(--color-secondary)]" />
                Next.js / React
              </span>
              <span className="flex items-center gap-1">
                <FiZap className="h-4 w-4 text-[var(--color-secondary)]" />
                Fast & Scalable
              </span>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={IMAGE.webDevHero}
                alt="Website development illustration"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[var(--color-primary)]/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 rounded-xl bg-[var(--color-card-bg)] p-4 shadow-lg border border-[var(--color-border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm font-semibold text-[var(--color-heading)]">
                +200%
              </span>
              <span className="block text-xs text-[var(--color-body)]">
                Average traffic growth
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
