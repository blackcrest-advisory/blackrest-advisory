// src/components/engagement/EngagementStats.tsx
"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

  // Spring with smooth deceleration
  const spring = useSpring(count, {
    damping: 30,
    stiffness: 80,
  });

  // Listen to spring changes and update state
  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(latest);
  });

  // Start counting when value changes
  useEffect(() => {
    count.set(value);
  }, [count, value]);

  // Format number with separators
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
    <section className="py-16 bg-primary text-background dark:bg-background dark:text-foreground border-y border-border/40">
      <div className="container">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
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
              <p className="text-sm uppercase tracking-wider text-white dark:text-body/50 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
