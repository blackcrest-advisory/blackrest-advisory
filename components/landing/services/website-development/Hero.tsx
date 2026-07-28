"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiCode, FiZap } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";
import { fadeInUp, scaleIn, slideInLeft } from "@/utils/animations";

const Hero = () => {
  return (
    <Section className="relative overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/*===== Left content =====*/}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <FiZap className="h-4 w-4" />
              <span>Website Development</span>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Build a <span className="text-secondary">Digital Foundation</span>{" "}
              That Drives Growth
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              From corporate websites to custom web applications – we design,
              develop, and optimise digital experiences that convert visitors
              into clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact" size="md">
                Start Your Project
              </Button>
              <Button variant="outline" size="md" href="#work">
                See Our Work
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FiCode className="h-4 w-4 text-secondary" />
                Next.js / React
              </span>
              <span className="flex items-center gap-1">
                <FiZap className="h-4 w-4 text-secondary" />
                Fast & Scalable
              </span>
            </div>
          </motion.div>

          {/*===== Right image =====*/}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={IMAGE.webDevHero}
                alt="Website development illustration"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/*===== Floating badge =====*/}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-card p-4 shadow-lg"
            >
              <span className="text-sm font-semibold text-foreground">
                +200%
              </span>
              <span className="block text-xs text-muted-foreground">
                Average traffic growth
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
