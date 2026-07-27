"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/utils/animations";

//===== Tech stack data =====//
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

//===== Orbiting Icon Component =====//
interface OrbitingIconProps {
  tech: TechItem;
  angle: number;
  radius: number;
  rotation: MotionValue<number>;
}

const OrbitingIcon = ({ tech, angle, radius, rotation }: OrbitingIconProps) => {
  const x = useTransform(rotation, (r) => Math.cos(r + angle) * radius);
  const y = useTransform(rotation, (r) => Math.sin(r + angle) * radius);

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: angle * 0.5 }}
    >
      <tech.icon className="h-8 w-8 text-secondary" />
      <span className="mt-1 text-xs font-medium text-muted-foreground">
        {tech.label}
      </span>
    </motion.div>
  );
};

//===== Main Section =====//
export default function TechnologyOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 2 * Math.PI]);

  return (
    //===== Technology Orbit Section =====//
    <Section className="overflow-hidden bg-background">
      {/* Wrapper div with ref – this is what useScroll observes */}
      <div ref={containerRef}>
        <Container>
          {/*===== Section header =====*/}
          <div className="text-center">
            <motion.span
              className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              ✦ Our Stack
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Our Technology Orbit
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
              We leverage a modern, best‑in‑class tech stack to build fast,
              secure, and scalable websites.
            </motion.p>
          </div>

          {/*===== Orbit =====*/}
          <div className="relative mt-16 flex h-80 items-center justify-center md:h-96">
            {/* Central brand mark */}
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">
                B
              </span>
            </div>

            {/* Orbiting icons */}
            {techIcons.map((tech, index) => {
              const angle = (index / techIcons.length) * 2 * Math.PI;
              return (
                <OrbitingIcon
                  key={tech.label}
                  tech={tech}
                  angle={angle}
                  radius={140}
                  rotation={rotation}
                />
              );
            })}
          </div>
        </Container>
      </div>
    </Section>
  );
}
