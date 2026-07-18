"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/landing/services/website-development/shared/Container";
import { SectionHeading } from "@/components/landing/services/website-development/shared/SectionHeading";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPrisma,
  SiCloudinary,
  SiTailwindcss,
  SiPostgresql,
  SiFramer,
} from "react-icons/si";
import type { IconType } from "react-icons";

// ----------------------------------------------
// Data
// ----------------------------------------------

interface TechItem {
  icon: IconType;
  label: string;
}

const techIcons: TechItem[] = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiPrisma, label: "Prisma" },
  { icon: SiCloudinary, label: "Cloudinary" },
  { icon: SiFramer, label: "Framer Motion" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiPostgresql, label: "PostgreSQL" },
];

// ----------------------------------------------
// Orbiting Icon Component (valid Hook usage)
// ----------------------------------------------

interface OrbitingIconProps {
  tech: TechItem;
  angle: number; // fixed angle offset in radians
  radius: number; // orbit radius in px
  rotation: MotionValue<number>; // MotionValue in radians (0–2π)
}

const OrbitingIcon = ({ tech, angle, radius, rotation }: OrbitingIconProps) => {
  // Hooks are at the top level of a component
  const x = useTransform(rotation, (r) => Math.cos(r + angle) * radius);
  const y = useTransform(rotation, (r) => Math.sin(r + angle) * radius);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ x, y }} // MotionValues injected directly
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: angle * 0.5 }} // slightly different delay
    >
      <tech.icon className="h-8 w-8 text-[var(--color-secondary)]" />
      <span className="mt-1 text-xs font-medium text-[var(--color-body)]">
        {tech.label}
      </span>
    </motion.div>
  );
};

// ----------------------------------------------
// Main Section
// ----------------------------------------------

const TechnologyOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Convert scroll progress to radians (0 – 2π)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 2 * Math.PI]);

  return (
    <section
      ref={containerRef}
      className="overflow-hidden bg-[var(--color-background)] py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          title="Our Technology Orbit"
          subtitle="We leverage a modern, best‑in‑class tech stack to build fast, secure, and scalable websites."
        />

        <div className="relative mt-16 flex h-80 items-center justify-center md:h-96">
          {/* Central brand mark */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-lg">
            <span className="text-2xl font-bold text-white dark:text-accent">
              B
            </span>
          </div>

          {/* Orbiting icons – each is now a proper component */}
          {techIcons.map((tech, index) => {
            const angle = (index / techIcons.length) * 2 * Math.PI;
            return (
              <OrbitingIcon
                key={tech.label}
                tech={tech}
                angle={angle}
                radius={140} // adjust as needed
                rotation={rotation}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TechnologyOrbit;
