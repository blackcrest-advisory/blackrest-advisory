"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/landing/services/website-development/shared/Container";
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
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGE } from "@/constants/imagesConfig";

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

  // Dynamically adjust radius so pills never overflow
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // 80px offset accounts for the pill width (≈140px) and a little breathing room
        setRadius(Math.min(190, width / 2 - 80));
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 bg-(--color-background)">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-(--color-secondary)/5 mask-[radial-gradient(ellipse_at_top_right,white,transparent)] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Tag */}
            <motion.span
              className="inline-block rounded-full bg-(--color-secondary)/10 px-4 py-1.5 text-sm font-medium text-(--color-secondary)"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              ✦ Mobile Applications
            </motion.span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-(--color-heading) sm:text-5xl md:text-6xl">
              Your App,{" "}
              <span className="text-(--color-secondary)">in Every Hand</span>
            </h1>

            <p className="mt-6 text-lg text-body max-w-lg mx-auto lg:mx-0">
              From ideation to App Store – we build high‑performance mobile apps
              that engage users and drive business growth.
            </p>

            {/* Feature list */}
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
              {[
                "iOS & Android",
                "Cross‑platform",
                "Native Performance",
                "Secure by Design",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-body"
                >
                  <FiCheckCircle className="h-4 w-4 text-(--color-secondary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Button href="#contact" size="lg">
                Start Your App
              </Button>
              <Button variant="outline" size="lg" href="#work">
                See Our Work
              </Button>
            </div>

            {/* Stats badge */}
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-body">
              <span className="flex items-center gap-1">
                <span className="font-bold text-(--color-secondary)">4.9★</span>{" "}
                App Store
              </span>
              <span className="w-px h-6 bg-(--color-border)" />
              <span className="flex items-center gap-1">
                <span className="font-bold text-(--color-secondary)">10M+</span>{" "}
                Downloads
              </span>
            </div>
          </motion.div>

          {/* Right content – Phone mockup with orbiting features */}
          <motion.div
            ref={containerRef}
            className="relative flex h-125 items-center justify-center lg:h-150"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Central phone image */}
            <div className="relative z-10 rounded-full overflow-hidden">
              <Image
                src={IMAGE.mobileHero}
                alt="App on mobile"
                width={280}
                height={560}
                className="h-24 w-24 md:h-66 md:w-44 drop-shadow-2xl"
                priority
              />
              {/* Small glow behind phone */}
              <div className="absolute inset-0 -z-10 bg-(--color-secondary)/20 blur-3xl rounded-full scale-150" />
            </div>

            {/* Floating feature cards – now in a circular orbit */}
            {floatingFeatures.map((feature, index) => {
              const total = floatingFeatures.length;
              const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={feature.label}
                  className="absolute flex items-center gap-2 rounded-full border border-(--color-border) px-4 py-2 shadow-lg backdrop-blur-sm bg-accent text-white dark:text-white"
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
                    color: "var(--color-on-secondary)",
                    transition: {
                      duration: 0.08,
                      ease: "linear",
                    },
                  }}
                >
                  <feature.icon className="h-4 w-4" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {feature.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
