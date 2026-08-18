"use client";

import { useEffect, useRef, useState } from "react";
import { Fraunces } from "next/font/google";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */

const headlineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const wordReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/* Headline data — "Businesses" carries the accent treatment           */
/* ------------------------------------------------------------------ */

const headlineWords = [
  { text: "Empowering" },
  { text: "European" },
  { text: "Businesses", accent: true },
  { text: "Through" },
  { text: "Technology" },
];

/* ------------------------------------------------------------------ */
/* Stats — rendered as a report-style row with count-up on view        */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 100, suffix: "+", label: "Clients" },
  { value: 5, suffix: "+", label: "Countries" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col gap-1 pl-6 first:pl-0">
      <p className="font-mono text-2xl font-medium tabular-nums text-heading">
        {count}
        {suffix}
      </p>
      <p className="text-xs uppercase tracking-wider text-body">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Network map — the hero's signature element                         */
/* Abstract nodes connected by arcing lines that draw in on load,      */
/* standing in for cross-border reach instead of a generic orbit icon. */
/* ------------------------------------------------------------------ */

const nodes = [
  { id: "hub", x: 130, y: 230, r: 7, hub: true },
  { id: "n1", x: 300, y: 80, r: 4 },
  { id: "n2", x: 380, y: 190, r: 4 },
  { id: "n3", x: 330, y: 330, r: 4 },
  { id: "n4", x: 190, y: 370, r: 3.5 },
  { id: "n5", x: 70, y: 110, r: 4 },
  { id: "n6", x: 60, y: 300, r: 3.5 },
];

const routes = [
  "M130,230 Q220,60 300,80",
  "M130,230 Q290,140 380,190",
  "M130,230 Q260,340 330,330",
  "M130,230 Q160,340 190,370",
  "M130,230 Q80,150 70,110",
  "M130,230 Q70,270 60,300",
];

function NetworkMap({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 440 440"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a connected network of European business hubs"
    >
      <defs>
        <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint dashed ring behind the hub for quiet geometric grounding */}
      <circle
        cx="130"
        cy="230"
        r="34"
        fill="none"
        stroke="var(--color-secondary)"
        strokeOpacity="0.18"
        strokeDasharray="2 6"
      />

      {routes.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeOpacity={0.55}
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.5 + i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.hub ? "var(--color-secondary)" : "var(--color-primary)"}
          stroke={node.hub ? "none" : "var(--color-secondary)"}
          strokeWidth={node.hub ? 0 : 1}
          filter={node.hub ? "url(#nodeGlow)" : undefined}
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [0, 1.3, 1],
                  opacity: 1,
                }
          }
          transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: "easeOut" }}
        />
      ))}

      {/* Appears after the paths finish drawing: a compact map annotation */}
      <motion.g
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.45,
          delay: reduceMotion ? 0 : 2.2,
          ease: "easeOut",
        }}
      >
        <line
          x1="284"
          y1="190"
          x2="356"
          y2="190"
          stroke="var(--color-secondary)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <text
          x="288"
          y="178"
          fill="var(--color-body)"
          fontSize="9"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="1.4"
        >
          LIVE NETWORK
        </text>
        <text
          x="288"
          y="207"
          fill="var(--color-secondary)"
          fontSize="10"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="1.1"
        >
          06 ACTIVE NODES
        </text>
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const initial = shouldReduceMotion ? "visible" : "hidden";

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <Section className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-24">
      {/* Blueprint grid: quiet technical depth that stays within the brand palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--color-border) 58%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--color-border) 58%, transparent) 1px, transparent 1px),
            linear-gradient(120deg, transparent 0%, color-mix(in srgb, var(--color-secondary) 6%, transparent) 48%, transparent 72%)
          `,
          backgroundPosition: "center center",
          backgroundSize: "72px 72px, 72px 72px, 100% 100%",
          maskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 78%, transparent)",
        }}
      />

      {/* Fine dot-grid atmosphere, fading toward the content edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-body) 35%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(60rem 34rem at 30% 20%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60rem 34rem at 30% 20%, black 30%, transparent 75%)",
        }}
      />

      {/* Data pulses travel along the blueprint grid rather than floating over it */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[calc(50%-72px)] -z-10 h-px w-28 bg-linear-to-r from-transparent via-secondary to-transparent shadow-[0_0_14px_var(--color-secondary)]"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: ["0vw", "112vw"], opacity: [0, 1, 1, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 7.5, repeat: Infinity, repeatDelay: 1.8, ease: "linear" }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8rem] left-[calc(50%+72px)] -z-10 h-28 w-px bg-linear-to-b from-transparent via-secondary/85 to-transparent shadow-[0_0_14px_var(--color-secondary)]"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: ["0vh", "-100vh"], opacity: [0, 1, 1, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : {
                duration: 8.5,
                repeat: Infinity,
                repeatDelay: 2.8,
                delay: 1.4,
                ease: "linear",
              }
        }
      />

      {/* A single focus light gives the network map a composed stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--surface-glow)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-secondary/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-border/70"
      />

      {/* Drafting marks make the background feel intentional, not decorative noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-12 -z-10 hidden h-20 w-px bg-linear-to-b from-transparent via-secondary/45 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-14 left-[7%] -z-10 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-body/45 lg:block"
      >
        BCR / 01 — Growth systems
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: content */}
          <div>
            {/* Eyebrow + drawing hairline */}
            <motion.div
              className="flex items-center gap-3"
              variants={fade}
              initial={initial}
              animate="visible"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
                Europe · Technology · Growth
              </span>
              <motion.span
                className="h-px flex-1 bg-secondary/40"
                style={{ transformOrigin: "left" }}
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* Kinetic headline */}
            <motion.h1
              className={`${fraunces.className} mt-6 text-4xl leading-[1.08] tracking-tight text-heading sm:text-5xl md:text-[3.4rem]`}
              variants={headlineContainer}
              initial={initial}
              animate="visible"
            >
              {headlineWords.map((word) => (
                <span
                  key={word.text}
                  className="mr-[0.28em] inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    variants={wordReveal}
                    className={`inline-block ${word.accent ? "text-gold-gradient italic" : ""}`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg text-body"
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{ delay: 0.55 }}
            >
              Blackcrest Advisory combines strategic thinking with hands-on
              execution across technology, marketing, and sales to drive
              measurable growth for startups, SMEs, and enterprises.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <motion.span
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  className="shadow-[var(--shadow-action)] hover:shadow-[var(--shadow-action-hover)]"
                >
                  Get Started
                </Button>
              </motion.span>
              <motion.span
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                className="inline-block"
              >
                <Button variant="outline" size="md" href="/about">
                  Learn More
                </Button>
              </motion.span>
            </motion.div>

            {/* Report-style stats row */}
            <motion.div
              ref={statsRef}
              className="mt-12 flex flex-wrap border-t border-border/60 pt-8"
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{ delay: 0.85 }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={i > 0 ? "border-l border-border/60" : ""}
                >
                  <StatItem
                    {...stat}
                    active={shouldReduceMotion || statsInView}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: signature network map */}
          <motion.div
            variants={fade}
            initial={initial}
            animate="visible"
            transition={{ delay: 0.3, duration: 0.9 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <NetworkMap reduceMotion={shouldReduceMotion} />
            <p className="mt-2 text-center font-mono text-xs uppercase tracking-[0.2em] text-body">
              Active engagements across Europe
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
