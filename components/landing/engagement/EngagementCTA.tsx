// src/components/engagement/EngagementCTA.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, Calendar } from "lucide-react";

export const EngagementCTA = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 
                     bg-gradient-to-br from-secondary/10 via-background to-secondary/5 
                     dark:from-secondary/5 dark:via-background dark:to-secondary/10
                     border border-secondary/20 dark:border-secondary/30
                     shadow-2xl shadow-secondary/5 dark:shadow-secondary/10
                     backdrop-blur-sm"
        >
          {/* Ambient glow effects - hidden on small screens for performance */}
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/10 hidden lg:block" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/5 hidden lg:block" />

          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-secondary/10 dark:ring-secondary/20" />

          {/* Gold micro‑dots - hidden on mobile */}
          <div className="hidden sm:block absolute top-12 right-12 h-1.5 w-1.5 rounded-full bg-secondary/40 dark:bg-secondary/60" />
          <div className="hidden sm:block absolute bottom-12 left-12 h-1.5 w-1.5 rounded-full bg-secondary/30 dark:bg-secondary/50" />
          <div className="hidden lg:block absolute top-1/2 left-8 h-1 w-1 rounded-full bg-secondary/20 dark:bg-secondary/40" />
          <div className="hidden lg:block absolute top-8 left-1/3 h-1 w-1 rounded-full bg-secondary/20 dark:bg-secondary/40" />

          <div className="relative z-10 text-center">
            {/* Badge */}
            <span
              className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest 
                             bg-secondary/10 dark:bg-secondary/20 
                             text-secondary dark:text-secondary-light 
                             px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6"
            >
              Begin Your Journey
            </span>

            {/* Heading */}
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 
                           text-foreground dark:text-foreground"
            >
              Ready to Grow Your Business?
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-body/80 dark:text-body/80 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-0">
              Book a complimentary 45‑minute discovery consultation with our
              team. No obligation, just an honest conversation about your
              business goals.
            </p>

            {/* Buttons - stack on mobile, row on larger screens */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
              >
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-secondary/40 text-foreground hover:bg-secondary/10 dark:border-secondary/40 dark:text-foreground dark:hover:bg-secondary/20 text-sm sm:text-base"
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                hello@blackcrestadvisory.com
              </Button>
            </div>

            {/* Phone */}
            <p className="text-xs sm:text-sm text-body/60 dark:text-body/60 mt-4 sm:mt-6">
              Or call us directly:{" "}
              <span className="font-medium text-body/80 dark:text-body/80">
                +44 20 1234 5678
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
