"use client";

import { Button } from "@/components/ui/Button";
import { IMAGE } from "@/constant/imagesConfig";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-secondary/10 to-secondary/5 border border-border/50">
              {/* Replace with your actual image */}
              <div className="w-full h-full flex items-center justify-center text-body/40 text-lg">
                <Image fill src={IMAGE.seo_image} alt="seo_image" />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-secondary font-medium tracking-wider uppercase text-sm">
                What We Do as a Marketing Agency
              </span>
              <h2 className="text-heading text-3xl md:text-4xl font-bold leading-tight">
                Solutions for Increased Traffic and Higher Sales
              </h2>
            </div>

            <p className="text-body text-base leading-relaxed">
              We don&apos;t just take care of the basics—we develop and execute
              strategic plans that include a blended mix of products targeted to
              improve your customer engagement, boost your organic search
              results, and grow your bottom line.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary">Talk With Our Experts</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
