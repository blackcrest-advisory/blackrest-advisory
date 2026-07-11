"use client";

import { orbitron } from "@/lib/font";
import { motion } from "framer-motion";
import { GiStarShuriken } from "react-icons/gi";

const services = [
  "Digital Marketing",
  "SEO",
  "Social Media Management",
  "Responsive Web Design",
  "PPC Advertising",
  "Content Marketing",
  "Email Marketing",
  "Conversion Optimisation",
];

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-border/50 bg-card-bg/30 py-4 md:py-5 lg:py-6 mt-4 lg:mt-8">
      <div className="relative overflow-hidden">
        <motion.div
          className={`flex w-max ${orbitron.className}`}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...services, ...services].map((service, index) => (
            <span
              key={index}
              className="flex items-center whitespace-nowrap px-5 md:px-7 lg:px-8"
            >
              <GiStarShuriken
                className="mr-5 text-secondary shrink-0"
                style={{ fontSize: "1em" }}
              />
              <span className="text-heading text-lg font-medium md:text-xl lg:text-5xl">
                {service}
              </span>

              <GiStarShuriken
                className="ml-5 text-secondary shrink-0"
                style={{ fontSize: "1em" }}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
