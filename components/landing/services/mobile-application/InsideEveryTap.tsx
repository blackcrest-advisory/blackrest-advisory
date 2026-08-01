"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import CountUp from "react-countup";
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
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IMAGE } from "@/constants/imagesConfig";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  hoverScale,
} from "@/lib/utils/animations";

//===== Feature card data =====//
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

//===== Feature Card Component =====//
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
      variants={side === "left" ? slideInLeft : slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card padding="base" hoverEffect className="group">
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-lg bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <span className="mt-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              {metric}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

//===== Phone with Glow =====//
const PhoneWithGlow = () => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative mx-auto w-56 md:w-64 lg:w-72"
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-80 w-48 rounded-full bg-secondary/20 blur-3xl" />
    </div>
    <Image
      src={IMAGE.phoneMockup}
      alt="Phone mockup"
      width={300}
      height={600}
      className="relative z-10 h-auto w-full drop-shadow-2xl"
      priority
    />
  </motion.div>
);

//===== User Journey Timeline =====//
const journeySteps = [
  { icon: FiSmartphone, label: "Open App" },
  { icon: FiUserCheck, label: "Authentication" },
  { icon: FiRefreshCw, label: "Data Sync" },
  { icon: FiMousePointer, label: "Interaction" },
  { icon: FiShield, label: "Secure Processing" },
  { icon: FiThumbsUp, label: "Instant Feedback" },
];

const UserJourney = () => (
  <Section>
    <h3 className="mb-10 text-center text-2xl font-bold text-foreground">
      User Journey
    </h3>
    <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
      {journeySteps.map((step, idx) => (
        <motion.div
          key={step.label}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: idx * 0.1 }}
          className="flex w-full items-center gap-3 md:w-auto md:flex-col md:gap-2"
        >
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <step.icon className="h-5 w-5 text-secondary" />
            </div>
            {idx < journeySteps.length - 1 && (
              <div className="absolute top-1/2 left-full hidden w-full -translate-y-1/2 bg-gradient-to-r from-secondary to-transparent md:block h-0.5" />
            )}
          </div>
          <span className="whitespace-nowrap text-sm font-medium text-foreground">
            {step.label}
          </span>
          {idx < journeySteps.length - 1 && (
            <div className="h-6 w-0.5 bg-gradient-to-b from-secondary to-transparent md:hidden mx-auto" />
          )}
        </motion.div>
      ))}
    </div>
  </Section>
);

//===== Animated Statistic Cards =====//
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
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-10 grid grid-cols-2 gap-6 lg:mt-14 md:grid-cols-3"
    >
      {stats.map((stat, i) => (
        <motion.div key={stat.label} variants={fadeInUp} {...hoverScale}>
          <Card
            padding="base"
            hoverEffect
            className="flex flex-col items-center text-center"
          >
            <div className="text-2xl font-bold text-secondary">
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
                <h2 className="break-all">{stat.text}</h2>
              )}
            </div>
            <p className="mt-2 text-xs font-medium text-foreground">
              {stat.label}
            </p>
            {stat.description && (
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {stat.description}
              </p>
            )}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

//===== Why Users Notice the Difference =====//
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
  <Section>
    <h3 className="mb-10 text-center text-2xl font-bold text-foreground">
      Why Users Notice the Difference
    </h3>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {benefits.map((b, i) => (
        <motion.div key={b.title} variants={fadeInUp} {...hoverScale}>
          <Card padding="base" hoverEffect>
            <h4 className="font-semibold text-foreground">{b.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

//===== Technology Behind the Experience =====//
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
  <Section>
    <h3 className="mb-10 text-center text-2xl font-bold text-foreground">
      Technology Behind the Experience
    </h3>
    <div className="flex flex-wrap justify-center gap-4">
      {techStack.map((tech, i) => (
        <motion.span
          key={tech}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-full border border-border bg-primary/10 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-secondary/30 hover:bg-secondary/10"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </Section>
);

//===== Background Particles =====//
const BackgroundParticles = () => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    <motion.div
      className="absolute top-20 left-10 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
      animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-40 right-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
      animate={{ y: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

//===== Main Component =====//
const InsideEveryTap = () => {
  return (
    //===== Inside Every Interaction Section =====//
    <Section className="relative overflow-hidden bg-muted/30">
      <BackgroundParticles />

      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            ✦ User Experience
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Inside Every Interaction
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Every interaction is engineered for delight – speed, security, and
            seamless flow.
          </p>
        </div>

        {/*===== Central phone with left/right feature cards =====*/}
        <Section className=" grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          {/* Left Column */}
          <div className="space-y-6 lg:pr-12">
            {leftFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                side="left"
                index={idx}
              />
            ))}
          </div>

          {/* Center Phone */}
          <PhoneWithGlow />

          {/* Right Column */}
          <div className="space-y-6 lg:pl-12">
            {rightFeatures.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                side="right"
                index={idx}
              />
            ))}
          </div>
        </Section>

        {/* User Journey Timeline */}
        <UserJourney />

        {/* Animated Statistic Cards */}
        <AnimatedStats />

        {/* Why Users Notice the Difference */}
        <WhyUsersNotice />

        {/* Technology Behind the Experience */}
        <TechnologyBehind />
      </Container>
    </Section>
  );
};

export default InsideEveryTap;
