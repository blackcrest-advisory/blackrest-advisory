"use client";

import { motion } from "framer-motion";
import {
  FiCode,
  FiLayers,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiSmartphone,
  FiCloud,
} from "react-icons/fi";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  slideInLeft,
  slideInRight,
  fadeInUp,
  staggerContainer,
  hoverScale,
} from "@/lib/utils/animations";

//===== Left Content: Value Proposition & Benefits =====//
const LeftContent = () => (
  <motion.div
    variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
        One Codebase, <br />
        <span className="text-secondary">Unlimited Platforms</span>
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Build once, deploy everywhere. Our cross‑platform development approach
        delivers native‑like performance, consistent user experiences, and
        significant cost savings without ever compromising on quality.
      </p>
    </div>

    <ul className="space-y-4">
      {[
        { icon: FiClock, label: "40% Faster Time‑to‑Market" },
        { icon: FiTrendingUp, label: "60% Reduction in Dev Costs" },
        { icon: FiLayers, label: "Single Codebase Maintenance" },
        { icon: FiSmartphone, label: "Simultaneous iOS & Android Releases" },
        { icon: FiCheckCircle, label: "Consistent Brand Experience" },
      ].map((item) => (
        <motion.li
          key={item.label}
          className="flex items-start gap-3"
          whileHover={{ x: 4 }}
        >
          <span className="mt-1 rounded-full bg-secondary/10 p-1.5">
            <item.icon className="h-4 w-4 text-secondary" />
          </span>
          <span className="font-medium text-foreground">{item.label}</span>
        </motion.li>
      ))}
    </ul>

    <p className="border-l-2 border-secondary pl-4 text-sm italic text-muted-foreground">
      &ldquo;Cross‑platform development allowed our team to launch on both
      stores in half the time, with a 30% lower budget.&rdquo;
    </p>
  </motion.div>
);

//===== Center Visual: Animated Codebase Node =====//
const CodebaseVisual = () => (
  <div className="relative flex h-[100px] lg:h-[300px] items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-48 w-48 rounded-full bg-secondary/10 blur-3xl md:h-64 md:w-64" />
    </div>

    {/* Central code icon */}
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-secondary bg-primary shadow-2xl md:h-24 md:w-24"
    >
      <FiCode className="h-10 w-10 text-secondary md:h-12 md:w-12" />
    </motion.div>
  </div>
);

//===== Right Column: Metrics & Timeline =====//
const RightContent = () => (
  <motion.div
    variants={slideInRight}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="space-y-8"
  >
    {/* Platform compatibility bars */}
    <Card padding="base" className="shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-foreground">
        Platform Compatibility
      </h3>
      <div className="space-y-3">
        {[
          { platform: "Android", perc: 100 },
          { platform: "iOS", perc: 100 },
          { platform: "Tablet", perc: 95 },
          { platform: "Desktop", perc: 90 },
        ].map((item) => (
          <div key={item.platform}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-foreground">{item.platform}</span>
              <span className="text-secondary">{item.perc}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-secondary"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.perc}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Development timeline */}
    <Card padding="base" className="shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-foreground">
        Development Timeline
      </h3>
      <ol className="relative ml-3 space-y-4 border-l border-border">
        {["Plan", "Design", "Develop", "Test", "Deploy"].map((step, idx) => (
          <li key={step} className="ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-card">
              <span className="text-xs text-primary-foreground">{idx + 1}</span>
            </span>
            <h4 className="font-medium text-foreground">{step}</h4>
            <p className="text-xs text-muted-foreground">
              {idx + 2}–{idx + 4} weeks
            </p>
          </li>
        ))}
      </ol>
    </Card>
  </motion.div>
);

//===== Why One Codebase Matters =====//
const WhyOneCodebase = () => {
  const whyItems = [
    {
      icon: FiClock,
      title: "Faster Development",
      desc: "Reuse 70–90% of code across platforms, slashing build time.",
    },
    {
      icon: FiTrendingUp,
      title: "Lower Cost",
      desc: "One team instead of two reduces development and maintenance costs.",
    },
    {
      icon: FiLayers,
      title: "Easier Maintenance",
      desc: "Fix a bug once, see it resolved everywhere instantly.",
    },
    {
      icon: FiSmartphone,
      title: "Consistent UX",
      desc: "Identical interface and behavior on every device.",
    },
    {
      icon: FiCheckCircle,
      title: "Faster Updates",
      desc: "Ship new features simultaneously to all stores.",
    },
    {
      icon: FiCloud,
      title: "Shared Logic",
      desc: "Business logic, API calls, and state live in a single layer.",
    },
  ];

  return (
    <div className="mt-10">
      <h3 className="mb-10 text-center text-2xl font-bold text-foreground">
        Why One Codebase Matters
      </h3>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {whyItems.map(({ icon: Icon, title, desc }, i) => (
          <motion.div key={title} variants={fadeInUp} {...hoverScale}>
            <Card padding="base" hoverEffect className="group">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-1.5 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-foreground">{title}</h4>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

//===== Main Section =====//
const NativeCrossPlatform = () => {
  return (
    //===== Native Cross‑Platform Section =====//
    <Section className="relative overflow-hidden bg-muted/30">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            ✦ Cross‑Platform
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Native Feel, Cross‑Platform Reach
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            One codebase. Two platforms. Consistent experience.
          </p>
        </div>

        {/*===== Three‑column layout =====*/}
        <div className="mt-14 grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-12 items-start">
          <div className="lg:pr-8">
            <LeftContent />
          </div>
          <div className="order-first flex justify-center lg:order-0">
            <CodebaseVisual />
          </div>
          <div className="lg:pl-8">
            <RightContent />
          </div>
        </div>

        {/*===== Supporting section =====*/}
        <WhyOneCodebase />
      </Container>
    </Section>
  );
};

export default NativeCrossPlatform;
