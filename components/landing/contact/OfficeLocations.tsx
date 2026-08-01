"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { officeLocations } from "@/content-data/contact/contactData";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export const OfficeLocations = () => {
  return (
    //===== Office locations section with global presence =====//
    <Section className="bg-muted">
      <Container>
        {/*===== Section header =====*/}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Our Offices
          </span>
          <h2 className="relative mt-2 inline-block text-3xl font-bold text-foreground md:text-4xl after:absolute after:bottom-[-6px] after:left-1/2 after:h-1 after:w-16 after:-translate-x-1/2 after:rounded after:bg-secondary">
            Global Presence
          </h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            We serve European businesses from our offices across the continent.
            Wherever you are, we&apos;re here to help.
          </p>
        </div>

        {/*===== Locations grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {officeLocations.map((location, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Card padding="none" hoverEffect className="overflow-hidden">
                {/*===== Image with overlay =====*/}
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
                    <span className="text-xl font-bold text-white">
                      {location.city}
                    </span>
                  </div>
                </div>

                {/*===== Address =====*/}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <LuMapPin className="mt-1 shrink-0 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {location.country}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {location.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
