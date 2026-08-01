"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import { FaBullseye, FaUsersGear, FaHandshake } from "react-icons/fa6";
import { Funnel } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { IMAGE } from "@/constants/imagesConfig";
import {
  slideInLeft,
  scaleIn,
  fadeInUp,
  staggerContainer,
  hoverScale,
} from "@/lib/utils/animations";

export const SalesHero = () => {
  const stats = [
    { value: 87, suffix: "%", label: "Pipeline growth" },
    { value: 3.4, suffix: "×", label: "Deal acceleration" },
    { value: 92, suffix: "%", label: "Client retention" },
  ];

  return (
    //===== Sales & Business Support Hero Section =====//
    <Section className="relative overflow-hidden bg-background">
      {/*===== Decorative gradients =====*/}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-secondary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/*===== Left content =====*/}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              ✦ Sales & Business Support
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Sales & <span className="text-secondary">Business Support</span>{" "}
              Services
            </h2>

            {/* Description */}
            <p className="mt-4 text-base text-muted-foreground text-justify">
              Technology and marketing are only as powerful as the sales process
              behind them. Blackcrest provides professional sales support
              services that help European businesses build stronger pipelines,
              close more deals, and retain clients for longer.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#capabilities" variant="primary" size="md">
                Explore Services
              </Button>
              <Button href="#contact" variant="outline" size="md">
                Talk to an Expert
              </Button>
            </div>

            {/*===== Stats =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: 0.1 * idx }}
                  className="text-left"
                >
                  <div className="text-3xl font-bold text-secondary md:text-4xl">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/*===== Right visual card =====*/}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl backdrop-blur-sm md:p-8">
              {/* Image */}
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl md:h-56">
                <Image
                  src={IMAGE.salesHeroImage}
                  alt="Sales support team"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Service items */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  {
                    icon: FaBullseye,
                    text: "B2B Sales Strategy",
                    desc: "Data‑driven growth plans",
                  },
                  {
                    icon: Funnel,
                    text: "Funnel Optimisation",
                    desc: "Conversion at every stage",
                  },
                  {
                    icon: FaUsersGear,
                    text: "Team Training & Coaching",
                    desc: "Empower your sales force",
                  },
                  {
                    icon: FaHandshake,
                    text: "Client Retention",
                    desc: "Long‑term account growth",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    {...hoverScale}
                    className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-primary/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.text}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
