"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { LuMapPin } from "react-icons/lu";
import { officeLocations } from "@/content-data/contact/contactData";
import Image from "next/image";

export const OfficeLocations = () => {
  return (
    <Section className="bg-muted">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-sm font-semibold tracking-widest uppercase text-secondary">
          Our Offices
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary dark:text-white relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-secondary after:rounded">
          Global Presence
        </h2>
        <p className="mt-8 text-body dark:text-body leading-relaxed">
          We serve European businesses from our offices across the continent.
          Wherever you are, we&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 max-w-7xl mx-auto">
        {officeLocations.map((location, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={location.image}
                alt={`${location.city} office`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <span className="text-white font-bold text-xl">
                  {location.city}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3">
                <LuMapPin className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-primary dark:text-white">
                    {location.country}
                  </p>
                  <p className="text-sm text-body dark:text-body leading-relaxed">
                    {location.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
