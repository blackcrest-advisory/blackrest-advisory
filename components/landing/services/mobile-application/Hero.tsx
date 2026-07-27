"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  FiBell,
  FiLock,
  FiWifi,
  FiMessageCircle,
  FiCreditCard,
  FiMapPin,
  FiMoon,
  FiCheckCircle,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";
import { fadeInUp, scaleIn, slideInLeft } from "@/utils/animations";

const floatingFeatures = [
  { icon: FiBell, label: "Push Notifications" },
  { icon: FiLock, label: "Secure Login" },
  { icon: FiWifi, label: "Offline Mode" },
  { icon: FiMessageCircle, label: "Real-time Chat" },
  { icon: FiCreditCard, label: "Payments" },
  { icon: FiMapPin, label: "GPS Tracking" },
  { icon: FiMoon, label: "Dark Mode" },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(190);

  //===== Dynamically adjust radius so pills never overflow =====//
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setRadius(Math.min(190, width / 2 - 80));
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    //===== Mobile App Hero Section =====//
    <Section className="relative overflow-hidden bg-background lg:py-0">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-secondary/5 mask-[radial-gradient(ellipse_at_top_right,white,transparent)] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/*===== Left content =====*/}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Tag */}
            <motion.span
              className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              ✦ Mobile Applications
            </motion.span>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Your App, <span className="text-secondary">in Every Hand</span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground lg:mx-0">
              From ideation to App Store – we build high‑performance mobile apps
              that engage users and drive business growth.
            </p>

            {/* Feature list */}
            <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3 lg:mx-0">
              {[
                "iOS & Android",
                "Cross‑platform",
                "Native Performance",
                "Secure by Design",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <FiCheckCircle className="h-4 w-4 text-secondary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="#contact" size="md">
                Start Your App
              </Button>
              <Button variant="outline" size="md" href="#work">
                See Our Work
              </Button>
            </div>

            {/* Stats badge */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
              <span className="flex items-center gap-1">
                <span className="font-bold text-secondary">4.9★</span> App Store
              </span>
              <span className="h-6 w-px bg-border" />
              <span className="flex items-center gap-1">
                <span className="font-bold text-secondary">10M+</span> Downloads
              </span>
            </div>
          </motion.div>

          {/*===== Right content – Phone mockup with orbiting features =====*/}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex h-110 items-center justify-center lg:h-120"
          >
            {/* Wrapper div for ref – needed for dynamic radius */}
            <div
              ref={containerRef}
              className="relative flex h-full w-full items-center justify-center"
            >
              {/* Central phone image */}
              <div className="relative z-10 overflow-hidden rounded-full">
                <Image
                  src={IMAGE.mobileHero}
                  alt="App on mobile"
                  width={280}
                  height={560}
                  className="h-24 w-24 drop-shadow-2xl md:h-66 md:w-44"
                  priority
                />
                {/* Small glow behind phone */}
                <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-secondary/20 blur-3xl" />
              </div>

              {/* Floating feature cards */}
              {floatingFeatures.map((feature, index) => {
                const total = floatingFeatures.length;
                const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={feature.label}
                    className="absolute flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x,
                      y,
                    }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                      type: "spring",
                      stiffness: 150,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 3,
                      transition: { duration: 0.08, ease: "linear" },
                    }}
                  >
                    <feature.icon className="h-4 w-4 text-secondary" />
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">
                      {feature.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
