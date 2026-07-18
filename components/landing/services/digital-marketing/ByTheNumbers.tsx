"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { label: "Increase in Website Traffic", value: 1211, suffix: "%" },
  { label: "Increase in Social Media Followers", value: 750, suffix: "%" },
  { label: "Google Ad Impressions", value: 22, suffix: "M" },
  { label: "Email Collect", value: 120, suffix: "K" },
];

export default function ByTheNumbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="text-center mb-12">
          <span className="text-secondary font-medium tracking-wider uppercase text-sm">
            Check It Out!
          </span>
          <h2 className="text-heading text-3xl md:text-4xl font-bold mt-2">
            Advantages of Digital Marketing
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Here are just some of the results we have realized with a potent mix
            of expertise, creativity, and online marketing knowledge.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-card-bg/40 border border-border/40"
            >
              <div className="text-secondary text-3xl md:text-4xl lg:text-5xl font-bold">
                {isInView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-body text-sm mt-2 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
