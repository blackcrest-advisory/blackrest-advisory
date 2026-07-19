"use client";

import { Button } from "@/components/ui/Button";
import { IMAGE } from "@/constants/imagesConfig";
import { orbitron } from "@/lib/font";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { GiStarShuriken } from "react-icons/gi";

export default function Hero() {
  const services = [
    "Digital Marketing",
    "SEO Optimization",
    "Social Media Management",
    "Responsive Web Design",
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center overflow-hidden bg-background">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* ================= Left Content ================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-xl flex-col justify-center space-y-6 md:space-y-8 lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary"
            >
              <GiStarShuriken className="h-4 w-4 animate-spin-slow" />
              <span>Digital Marketing Services</span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <h1
                className={cn(
                  orbitron.className,
                  "text-4xl font-bold leading-[1.1] tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-5xl",
                )}
              >
                <span className="block">Digital Marketing to</span>

                <span className="block text-balance text-secondary">
                  Shout Your Message From the Rooftops!
                </span>
              </h1>
            </div>

            {/* Service List */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:max-w-lg">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.08,
                  }}
                  className="flex items-center gap-3 font-medium text-heading/90"
                >
                  <GiStarShuriken className="shrink-0 text-sm text-secondary" />

                  <span className="text-sm md:text-base">{service}</span>
                </motion.li>
              ))}
            </ul>

            {/* Description */}
            <p className="max-w-xl text-sm leading-relaxed text-body md:text-base lg:text-lg">
              At our heart, we are a digital marketing agency. We know how to
              mix the right blend of engagement tools that bring you and your
              website leads and sales.
            </p>

            {/* CTA */}
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

          {/* ================= Right Image ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div
              className="
                relative
                w-full
                overflow-hidden
               
                border
                border-secondary/20
                shadow-2xl
                aspect-4/4
                sm:aspect-5/4
                lg:aspect-4/4
                xl:aspect-5/5
              "
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
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Mobile Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent lg:hidden" />
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -bottom-4 -left-4 -z-10 h-28 w-28 rounded-full bg-secondary/10 blur-3xl lg:-bottom-6 lg:-left-6 lg:h-32 lg:w-32" />

            <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl lg:-right-6 lg:-top-6 lg:h-32 lg:w-32" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
