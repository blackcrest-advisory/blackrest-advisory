"use client";

import { Section } from "@/components/shared/Section";
import { motion } from "framer-motion";
import { BarChart3, Globe2, Smartphone, Handshake } from "lucide-react";

const services = [
  {
    title: "Digital Marketing",
    description:
      "Data-driven SEO, paid media, content, and conversion optimisation to attract and convert B2B clients.",
    icon: BarChart3,
    features: [
      "SEO & Content Strategy",
      "Paid Media (PPC, LinkedIn)",
      "Conversion Rate Optimisation",
    ],
  },
  {
    title: "Web Development",
    description:
      "High-performance corporate websites, e-commerce platforms, and custom web applications built to convert.",
    icon: Globe2,
    features: [
      "Custom Web Applications",
      "E‑commerce Solutions",
      "Performance Optimisation",
    ],
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform apps for iOS and Android that enhance customer engagement and open new revenue channels.",
    icon: Smartphone,
    features: [
      "Native iOS & Android",
      "Cross‑platform (React Native)",
      "App Store Optimisation",
    ],
  },
  {
    title: "Sales & Business Support",
    description:
      "Sales strategy, funnel design, CRM setup, and training to build stronger pipelines and close more deals.",
    icon: Handshake,
    features: [
      "Sales Funnel Design",
      "CRM Implementation",
      "Team Training & Coaching",
    ],
  },
];

const Services = () => {
  return (
    <Section id="services" className="bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-heading sm:text-4xl"
          >
            Our Core Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-body"
          >
            End-to-end digital solutions designed to drive growth across every
            dimension of your business.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group relative rounded-2xl border border-border bg-card-bg p-8 shadow-sm transition-shadow hover:shadow-xl dark:shadow-gray-900/30"
              >
                {/* Decorative accent line */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary/20">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-semibold text-heading">
                  {service.title}
                </h3>
                <p className="mt-3 text-base text-body">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="mt-4 space-y-1.5 border-t border-border/40 pt-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-body/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Services;
