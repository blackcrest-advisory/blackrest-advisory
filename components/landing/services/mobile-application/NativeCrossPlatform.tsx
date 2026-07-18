// components/home/NativeCrossPlatform.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/landing/services/website-development/shared/Container";
import { SectionHeading } from "@/components/landing/services/website-development/shared/SectionHeading";
import {
  FiCode,
  FiLayers,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiSmartphone,
  FiCloud,
} from "react-icons/fi";

//===== Left Content: Value Proposition & Benefits =====//
const LeftContent = () => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold text-[var(--color-heading)] leading-tight">
        One Codebase, <br />
        <span className="text-[var(--color-secondary)]">
          Unlimited Platforms
        </span>
      </h2>
      <p className="mt-4 text-[var(--color-body)] text-lg leading-relaxed">
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
          <span className="mt-1 p-1.5 rounded-full bg-[var(--color-secondary)]/10">
            <item.icon className="w-4 h-4 text-[var(--color-secondary)]" />
          </span>
          <span className="text-[var(--color-heading)] font-medium">
            {item.label}
          </span>
        </motion.li>
      ))}
    </ul>

    <p className="text-sm text-[var(--color-body)] border-l-2 border-[var(--color-secondary)] pl-4 italic">
      &ldquo;Cross‑platform development allowed our team to launch on both
      stores in half the time, with a 30% lower budget.&rdquo;
    </p>
  </motion.div>
);

//===== Center Visual: Animated Codebase Node =====//
const CodebaseVisual = () => (
  <div className="relative flex items-center justify-center h-[300px] md:h-[400px]">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />
    </div>

    {/* Central code icon */}
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-primary)] border-2 border-[var(--color-secondary)] shadow-2xl flex items-center justify-center"
    >
      <FiCode className="w-10 h-10 md:w-12 md:h-12 text-[var(--color-secondary)]" />
    </motion.div>
  </div>
);

//===== Right Column: Metrics & Timeline =====//
const RightContent = () => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="space-y-8"
  >
    {/* Platform compatibility bars */}
    <div className="p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-4">
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
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--color-heading)]">
                {item.platform}
              </span>
              <span className="text-[var(--color-secondary)]">
                {item.perc}%
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-secondary)] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.perc}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Development timeline */}
    <div className="p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-4">
        Development Timeline
      </h3>
      <ol className="relative border-l border-[var(--color-border)] ml-3 space-y-4">
        {["Plan", "Design", "Develop", "Test", "Deploy"].map((step, idx) => (
          <li key={step} className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-[var(--color-card-bg)] bg-[var(--color-primary)]">
              <span className="text-xs text-white">{idx + 1}</span>
            </span>
            <h4 className="font-medium text-[var(--color-heading)]">{step}</h4>
            <p className="text-xs text-[var(--color-body)]">
              {idx + 2}–{idx + 4} weeks
            </p>
          </li>
        ))}
      </ol>
    </div>
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
    <div className="mt-24 lg:mt-32">
      <h3 className="text-2xl font-bold text-[var(--color-heading)] text-center mb-10">
        Why One Codebase Matters
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyItems.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-secondary)]/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1.5 rounded-lg bg-[var(--color-secondary)]/10">
                <Icon className="w-5 h-5 text-[var(--color-secondary)]" />
              </div>
              <h4 className="font-semibold text-[var(--color-heading)]">
                {title}
              </h4>
            </div>
            <p className="text-sm text-[var(--color-body)]">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

//===== Main Section =====//
const NativeCrossPlatform = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[var(--color-card-bg)] overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--color-secondary)]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
      </div>

      <Container>
        <SectionHeading
          title="Native Feel, Cross‑Platform Reach"
          subtitle="One codebase. Two platforms. Consistent experience."
        />

        {/* Three‑column layout: left content → center visual → right metrics */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0 items-start">
          <div className="lg:pr-8">
            <LeftContent />
          </div>
          <div className="flex justify-center order-first lg:order-none">
            <CodebaseVisual />
          </div>
          <div className="lg:pl-8">
            <RightContent />
          </div>
        </div>

        {/* Supporting section */}
        <WhyOneCodebase />
      </Container>
    </section>
  );
};

export default NativeCrossPlatform;
