"use client";

import { motion } from "framer-motion";

export default function DigitalPresence() {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 via-secondary/10 to-secondary/5 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="text-secondary font-medium tracking-widest uppercase text-sm">
            Digital Presence
          </span>
          <h2 className="text-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Amplify Your
            <span className="text-secondary block">Digital Presence</span>
          </h2>
          <p className="text-body text-lg max-w-2xl mx-auto mt-6">
            We amplify your brand&apos;s digital footprint across every channel,
            ensuring you&apos;re seen, heard, and remembered.
          </p>
        </motion.div>

        {/* Animated particles or decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
