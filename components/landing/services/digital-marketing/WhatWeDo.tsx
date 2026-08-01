"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";
import { slideInLeft, slideInRight } from "@/lib/utils/animations";

export default function WhatWeDo() {
  return (
    //===== What We Do section =====//
    <Section className="bg-background">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/*===== Left: Image =====*/}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={IMAGE.seo_image}
                  alt="SEO and digital marketing services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-full bg-secondary/10" />
          </motion.div>

          {/*===== Right: Content =====*/}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-1 space-y-6 lg:order-2"
          >
            <div className="space-y-2">
              <span className="text-sm font-medium uppercase tracking-wider text-secondary">
                What We Do as a Marketing Agency
              </span>
              <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Solutions for Increased Traffic and Higher Sales
              </h2>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground text-justify">
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
      </Container>
    </Section>
  );
}
