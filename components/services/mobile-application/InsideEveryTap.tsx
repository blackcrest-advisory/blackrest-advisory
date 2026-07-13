"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/services/website-development/shared/Container";
import { SectionHeading } from "@/components/services/website-development/shared/SectionHeading";
import Image from "next/image";
import {
  FiNavigation,
  FiZap,
  FiLock,
  FiWifi,
  FiCpu,
  FiSmile,
  FiLayers,
  FiSmartphone,
  FiUserCheck,
  FiRefreshCw,
  FiMousePointer,
  FiShield,
  FiThumbsUp,
} from "react-icons/fi";
import { IMAGE } from "@/constant/imagesConfig";
import CountUp from "react-countup";

// ── Types ──────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  metric: string;
  side: "left" | "right";
  index: number;
}

const leftFeatures: FeatureCardProps[] = [
  {
    icon: FiNavigation,
    title: "Smooth Navigation",
    description:
      "Intuitive gestures and transitions guide users effortlessly. Every swipe feels natural, reducing cognitive load.",
    metric: "99% task completion",
    side: "left",
    index: 0,
  },
  {
    icon: FiSmile,
    title: "Native Feel",
    description:
      "Hardware‑accelerated animations run at a buttery 60fps. The interface responds instantly, just like a built‑in app.",
    metric: "60fps animations",
    side: "left",
    index: 1,
  },
  {
    icon: FiWifi,
    title: "Offline Access",
    description:
      "Critical features work without internet. Data syncs automatically when connectivity returns, keeping users productive.",
    metric: "Works offline",
    side: "left",
    index: 2,
  },
  {
    icon: FiLayers,
    title: "Accessibility",
    description:
      "Screen‑reader friendly, high contrast, and full keyboard navigation ensure everyone can use the app comfortably.",
    metric: "WCAG 2.1 AA",
    side: "left",
    index: 3,
  },
];

const rightFeatures: FeatureCardProps[] = [
  {
    icon: FiZap,
    title: "Fast Response",
    description:
      "Background prefetching and intelligent caching keep the UI fast. Redundant calls are eliminated by design.",
    metric: "<150ms latency",
    side: "right",
    index: 0,
  },
  {
    icon: FiLock,
    title: "Secure Auth",
    description:
      "End‑to‑end encryption, biometric login, and OWASP‑compliant practices protect user data in transit and at rest.",
    metric: "Bank‑level encryption",
    side: "right",
    index: 1,
  },
  {
    icon: FiCpu,
    title: "Optimized API",
    description:
      "Real‑time sync across devices ensures data is always up to date. Conflict resolution happens automatically.",
    metric: "Real‑time sync",
    side: "right",
    index: 2,
  },
  {
    icon: FiSmile,
    title: "Actionable Analytics",
    description:
      "Privacy‑first telemetry gives you insights without compromising trust. Make data‑driven decisions confidently.",
    metric: "GDPR compliant",
    side: "right",
    index: 3,
  },
];

// ── Feature Card Component (no connector line) ──────
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  metric,
  side,
  index,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      <div className="p-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-sm group-hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 rounded-lg bg-[var(--color-primary)]/10">
            <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-heading)]">
              {title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-body)] leading-relaxed">
              {description}
            </p>
            <span className="mt-3 inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
              {metric}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Phone with Glow (no connector points) ─────────────
const PhoneWithGlow = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative mx-auto w-56 md:w-64 lg:w-72"
  >
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-80 bg-[var(--color-secondary)]/20 blur-3xl rounded-full" />
    </div>
    <Image
      src={IMAGE.phoneMockup}
      alt="Phone mockup"
      width={300}
      height={600}
      className="relative z-10 w-full h-auto drop-shadow-2xl"
      priority
    />
  </motion.div>
);

// ── User Journey Timeline ─────────────────────────────
const journeySteps = [
  { icon: FiSmartphone, label: "Open App" },
  { icon: FiUserCheck, label: "Authentication" },
  { icon: FiRefreshCw, label: "Data Sync" },
  { icon: FiMousePointer, label: "Interaction" },
  { icon: FiShield, label: "Secure Processing" },
  { icon: FiThumbsUp, label: "Instant Feedback" },
];

const UserJourney = () => (
  <div className="mt-24 lg:mt-32">
    <h3 className="text-2xl font-bold text-[var(--color-heading)] text-center mb-10">
      User Journey
    </h3>
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
      {journeySteps.map((step, idx) => (
        <motion.div
          key={step.label}
          className="flex md:flex-col items-center gap-3 md:gap-2 w-full md:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <step.icon className="w-5 h-5 text-[var(--color-secondary)]" />
            </div>
            {/* Horizontal line on md+ */}
            {idx < journeySteps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-linear-to-r from-[var(--color-secondary)] to-transparent translate-y-[-50%]" />
            )}
          </div>
          <span className="text-sm font-medium text-[var(--color-heading)] whitespace-nowrap">
            {step.label}
          </span>
          {/* Vertical line on mobile */}
          {idx < journeySteps.length - 1 && (
            <div className="md:hidden w-0.5 h-6 bg-linear-to-b from-[var(--color-secondary)] to-transparent mx-auto" />
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// ── Animated Statistic Cards ─────────────────────────
const stats = [
  { label: "Uptime", value: 99.9, suffix: "%", isCount: true },
  {
    label: "Response Time",
    value: 150,
    prefix: "<",
    suffix: "ms",
    isCount: true,
  },
  { label: "Offline Ready", text: "✓", description: "Works without internet" },
  { label: "Security", text: "Bank-Level", description: "AES-256 encryption" },
  {
    label: "Cross Platform",
    text: "iOS/Android/Web",
    description: "Single codebase",
  },
  { label: "Real-time Sync", text: "< 1s", description: "Conflict resolution" },
];

const AnimatedStats = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="flex flex-col items-center p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-2xl font-bold text-[var(--color-secondary)]">
            {stat.isCount ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                suffix={stat.suffix}
                prefix={stat.prefix ?? ""}
                redraw={false}
              />
            ) : (
              <h2 className=" break-all">{stat.text}</h2>
            )}
          </div>
          <p className="mt-2 text-xs font-medium text-[var(--color-heading)]">
            {stat.label}
          </p>
          {stat.description && (
            <p className="mt-1 text-xs text-[var(--color-body)] text-center">
              {stat.description}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ── Why Users Notice the Difference ──────────────────
const benefits = [
  {
    title: "Instant Load",
    desc: "Pre‑cached assets deliver sub‑second app starts.",
  },
  {
    title: "Fluid Gestures",
    desc: "60fps interactions that rival native apps.",
  },
  {
    title: "Always Available",
    desc: "Core features work offline, so you never stop.",
  },
  {
    title: "Privacy Focused",
    desc: "Your data stays yours. No hidden tracking.",
  },
  {
    title: "Seamless Updates",
    desc: "Background updates without interrupting your flow.",
  },
  {
    title: "Unified Experience",
    desc: "Consistent design across phone, tablet, and desktop.",
  },
];

const WhyUsersNotice = () => (
  <div className="mt-24 lg:mt-32">
    <h3 className="text-2xl font-bold text-[var(--color-heading)] text-center mb-10">
      Why Users Notice the Difference
    </h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-secondary)]/30 transition-colors"
        >
          <h4 className="font-semibold text-[var(--color-heading)]">
            {b.title}
          </h4>
          <p className="mt-1 text-sm text-[var(--color-body)]">{b.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── Technology Behind the Experience ────────────────
const techStack = [
  "APIs",
  "Cloud Sync",
  "Push Notifications",
  "Authentication",
  "Analytics",
  "Offline Storage",
  "Performance Optimization",
];

const TechnologyBehind = () => (
  <div className="mt-24 lg:mt-32">
    <h3 className="text-2xl font-bold text-[var(--color-heading)] text-center mb-10">
      Technology Behind the Experience
    </h3>
    <div className="flex flex-wrap justify-center gap-4">
      {techStack.map((tech, i) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="px-5 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-border)] text-sm font-medium text-[var(--color-heading)] hover:bg-[var(--color-secondary)]/10 hover:border-[var(--color-secondary)]/30 transition-colors"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </div>
);

// ── Background Particles (subtle floating elements) ──
const BackgroundParticles = () => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <motion.div
      className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[var(--color-secondary)]/5 blur-3xl"
      animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[var(--color-primary)]/5 blur-3xl"
      animate={{ y: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ── Main Component ───────────────────────────────────
const InsideEveryTap = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-card-bg)] overflow-hidden">
      <BackgroundParticles />
      <Container>
        <SectionHeading
          title="Inside Every Interaction"
          subtitle="Every interaction is engineered for delight – speed, security, and seamless flow."
        />

        {/* ── Central phone with left/right feature cards ── */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0 items-center">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 lg:pr-12"
          >
            {leftFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                side="left"
                index={idx}
              />
            ))}
          </motion.div>

          {/* Center Phone */}
          <PhoneWithGlow />

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 lg:pl-12"
          >
            {rightFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                side="right"
                index={idx}
              />
            ))}
          </motion.div>
        </div>

        {/* User Journey Timeline */}
        <UserJourney />

        {/* Animated Statistic Cards */}
        <AnimatedStats />

        {/* Why Users Notice the Difference */}
        <WhyUsersNotice />

        {/* Technology Behind the Experience */}
        <TechnologyBehind />
      </Container>
    </section>
  );
};

export default InsideEveryTap;
