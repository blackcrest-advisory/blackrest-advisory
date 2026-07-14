"use client";

import { motion } from "framer-motion";
import { Users, Network } from "lucide-react";

export default function DeliveryModel() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-heading sm:text-4xl"
          >
            Our Delivery Model
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-body"
          >
            A hybrid model combining a core in-house team with a curated network
            of specialist partners.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card-bg p-8 shadow-sm"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Users className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <h3 className="text-xl font-semibold text-heading">
              In-House Core Team
            </h3>
            <p className="mt-3 text-body">
              Strategy, account management, quality control, and primary
              delivery across all four service pillars are handled directly by
              the Blackcrest core team.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Ensuring consistency and accountability
              </li>
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Direct client relationships at all times
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card-bg p-8 shadow-sm"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Network className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <h3 className="text-xl font-semibold text-heading">
              Specialist Partner Network
            </h3>
            <p className="mt-3 text-body">
              For overflow capacity and niche specialisms, we engage a vetted
              network of specialist partners who work under Blackcrest quality
              standards.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Experts in specific platforms and markets
              </li>
              <li className="flex items-center gap-2 text-sm text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Curated and directly supervised
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
