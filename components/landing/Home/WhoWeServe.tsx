"use client";

import { motion } from "framer-motion";
import { Rocket, Building2, Briefcase } from "lucide-react";

const segments = [
  {
    number: "01",
    title: "Startups",
    tag: "Early‑Stage",
    description:
      "Early-stage businesses needing a strong digital foundation — brand identity, website, marketing strategy, and technology infrastructure.",
    icon: Rocket,
    gradient: "from-secondary/15 to-secondary/5",
    iconBg: "bg-secondary/20",
    hoverBg: "group-hover:bg-secondary/30",
  },
  {
    number: "02",
    title: "SMEs",
    tag: "Scaling",
    description:
      "Growing businesses seeking to scale their online presence, improve acquisition funnels, expand to new markets, or modernise their technology.",
    icon: Building2,
    gradient: "from-primary/15 to-primary/5",
    iconBg: "bg-primary/20",
    hoverBg: "group-hover:bg-primary/30",
  },
  {
    number: "03",
    title: "Enterprise Organisations",
    tag: "Established",
    description:
      "Established companies requiring specialist digital transformation, system integrations, advanced marketing programmes, or additional capacity.",
    icon: Briefcase,
    gradient: "from-secondary/15 to-primary/5",
    iconBg: "bg-secondary/20",
    hoverBg: "group-hover:bg-secondary/30",
  },
];

export default function WhoWeServe() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      {/* Decorative background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-sm"
          >
            Our Clients
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 text-3xl font-bold text-heading sm:text-4xl"
          >
            Who We Serve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-3 max-w-2xl text-body"
          >
            We partner with European organisations at every stage of their
            growth journey — from first‑time founders to global enterprises.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {segments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, rgba(var(--secondary-rgb), 0.08) 0%, rgba(var(--primary-rgb), 0.03) 100%)`,
                }}
              >
                {/* Decorative large number */}
                <div className="absolute -right-2 -top-2 text-8xl font-black text-secondary/5 transition-opacity duration-300 group-hover:opacity-20 select-none">
                  {segment.number}
                </div>

                {/* Icon */}
                <div
                  className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${segment.iconBg} text-secondary transition-colors duration-300 ${segment.hoverBg}`}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </div>

                {/* Tag */}
                <span className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary backdrop-blur-sm">
                  {segment.tag}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-heading">
                  {segment.title}
                </h3>
                <p className="mt-3 text-body">{segment.description}</p>

                {/* Bottom accent line */}
                <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-secondary to-primary opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
