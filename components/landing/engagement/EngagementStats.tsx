"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/utils/animations";

//===== Animated counter component with spring physics =====//
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  separator?: string;
}

const AnimatedCounter = ({
  value,
  duration = 2.5,
  suffix = "",
  separator = ",",
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  //===== Spring with smooth deceleration =====//
  const spring = useSpring(count, {
    damping: 30,
    stiffness: 80,
  });

  //===== Listen to spring changes and update state =====//
  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(latest);
  });

  //===== Start counting when value changes =====//
  useEffect(() => {
    count.set(value);
  }, [count, value]);

  //===== Format number with separators =====//
  const formatNumber = (num: number) => {
    const parts = num.toFixed(0).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  return (
    <span>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

//===== Stats data =====//
const stats = [
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Clients Served", value: 120, suffix: "+" },
  { label: "Projects Delivered", value: 280, suffix: "+" },
  { label: "Client Retention", value: 94, suffix: "%" },
];

export const EngagementStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    //===== Stats section with counter animations =====//
    <Section className="overflow-hidden border-y border-border/40 bg-card">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="font-display text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                {isInView ? (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
