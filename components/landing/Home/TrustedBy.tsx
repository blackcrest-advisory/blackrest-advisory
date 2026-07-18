"use client";

import { motion } from "framer-motion";
import { Users, Globe, Award, Building } from "lucide-react";

const stats = [
  {
    number: "100+",
    label: "Clients",
    icon: Users,
  },
  {
    number: "5+",
    label: "European Countries",
    icon: Globe,
  },
  {
    number: "99%",
    label: "Client Satisfaction",
    icon: Award,
  },
  {
    number: "50+",
    label: "Projects Delivered",
    icon: Building,
  },
];

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-background to-primary/5 py-20">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✨ Updated header – left aligned with an underline */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Social Proof
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-3xl font-bold text-heading sm:text-4xl"
          >
            Trusted by European Businesses
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 h-1 rounded-full bg-gradient-to-r from-secondary to-primary"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-body"
          >
            We’ve helped over 100 businesses across Europe grow their digital
            presence and achieve measurable results.
          </motion.p>
        </div>

        {/* Stats grid – unchanged */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card-bg/50 p-8 text-center shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary transition-colors group-hover:from-secondary/20 group-hover:to-primary/20">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <motion.p
                  className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {stat.number}
                </motion.p>
                <p className="mt-2 text-sm font-medium text-body">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
