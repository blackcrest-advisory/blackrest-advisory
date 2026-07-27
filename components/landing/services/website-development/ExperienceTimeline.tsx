"use client";

import { motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import {
  FiMail,
  FiMessageCircle,
  FiEye,
  FiRefreshCw,
  FiHeart,
} from "react-icons/fi";
import { GiFireworkRocket } from "react-icons/gi";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer, hoverScale } from "@/utils/animations";

//===== Timeline steps data =====//
const steps = [
  { icon: FiMail, label: "You Contact Us" },
  { icon: FiMessageCircle, label: "Strategy Call" },
  { icon: FiEye, label: "Design Preview" },
  { icon: FiRefreshCw, label: "Weekly Updates" },
  { icon: GiFireworkRocket, label: "Launch" },
  { icon: FiHeart, label: "Ongoing Support" },
];

export default function ExperienceTimeline() {
  return (
    //===== Experience Timeline Section =====//
    <Section className="relative overflow-hidden bg-background">
      {/* Subtle golden background glow */}
      <div className="absolute inset-0 bg-secondary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Your Journey
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Your Experience, From Start to Launch
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            We keep you informed and involved every step of the way – no
            surprises, just progress.
          </motion.p>
        </div>

        {/*===== Timeline =====*/}
        <div className="relative mt-16">
          {/* Golden horizontal line – centred on the circles */}
          <div className="absolute left-0 right-0 top-[32px] hidden h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent sm:block" />
          <div className="absolute left-0 right-0 top-[30px] hidden h-1 bg-secondary/20 blur-sm sm:block" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:grid-cols-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle with golden background and premium glow */}
                <motion.div
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg shadow-secondary/40"
                  {...hoverScale}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <step.icon className="h-7 w-7 text-background" />

                  {/* Outer glow ring – subtle pulse */}
                  <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse" />

                  {/* Inner shimmer effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>

                <span className="mt-4 text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {step.label}
                </span>

                {/* Step number badge */}
                <span className="mt-1 text-xs font-medium text-secondary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Golden arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-[20px] hidden text-2xl text-secondary sm:block">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className="inline-block mb-2"
                    >
                      <ArrowBigRight className="h-7 w-7" />
                    </motion.span>
                  </div>
                )}

                {/* Vertical connecting lines for mobile */}
                {index < steps.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-gradient-to-b from-secondary to-transparent sm:hidden" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/*===== Bottom golden badge =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-secondary/20 bg-card px-6 py-3 shadow-sm backdrop-blur-sm">
            <span className="text-secondary">✦</span>
            <span className="text-sm font-medium text-foreground">
              Transparent process, consistent communication
            </span>
            <span className="text-secondary">✦</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
