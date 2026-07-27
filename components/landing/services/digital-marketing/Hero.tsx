"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { GiStarShuriken } from "react-icons/gi";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";
import {
  slideInLeft,
  scaleIn,
  fadeInUp,
  staggerContainer,
} from "@/utils/animations";

export default function Hero() {
  const services = [
    "Digital Marketing",
    "SEO Optimization",
    "Social Media Management",
    "Responsive Web Design",
  ];

  return (
    //===== Hero Section =====//
    <Section className="relative flex items-center overflow-hidden bg-background">
      {/*===== Background blur decorations =====*/}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/*===== Left content =====*/}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-xl flex-col justify-center space-y-6 md:space-y-8 lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary"
            >
              <GiStarShuriken className="h-4 w-4 animate-spin-slow" />
              <span>Digital Marketing Services</span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                <span className="block">Digital Marketing to</span>
                <span className="block text-balance text-secondary">
                  Shout Your Message From the Rooftops!
                </span>
              </h1>
            </div>

            {/* Service list */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:max-w-lg"
            >
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3 font-medium text-foreground/90"
                >
                  <GiStarShuriken className="shrink-0 text-sm text-secondary" />
                  <span className="text-sm md:text-base">{service}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Description */}
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base lg:text-base text-justify">
              At our heart, we are a digital marketing agency. We know how to
              mix the right blend of engagement tools that bring you and your
              website leads and sales.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                className="group w-full px-8 sm:w-fit"
              >
                Let&apos;s Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full px-8 sm:w-fit"
              >
                Request Proposal
              </Button>
            </div>
          </motion.div>

          {/*===== Right image =====*/}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="relative aspect-4/4 w-full overflow-hidden border border-secondary/20 shadow-2xl sm:aspect-5/4 lg:aspect-4/4 xl:aspect-5/5">
              {/* Motion wrapper for smooth hover zoom */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={IMAGE.digital_growth}
                  alt="Digital Marketing Agency Growth"
                  fill
                  priority
                  sizes="
                    (max-width:640px) 100vw,
                    (max-width:1024px) 90vw,
                    50vw
                  "
                  className="object-cover"
                />
              </motion.div>
              {/* Mobile overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent lg:hidden" />
            </div>

            {/* Decorative blobs */}
            <div className="absolute -bottom-4 -left-4 -z-10 h-28 w-28 rounded-full bg-secondary/10 blur-3xl lg:-bottom-6 lg:-left-6 lg:h-32 lg:w-32" />
            <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl lg:-right-6 lg:-top-6 lg:h-32 lg:w-32" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
