"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { Fraunces } from "next/font/google";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/* Font                                                                       */
/* -------------------------------------------------------------------------- */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/* Motion                                                                     */
/* -------------------------------------------------------------------------- */

const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const wordReveal: Variants = {
  hidden: {
    y: "110%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Headline                                                                   */
/* -------------------------------------------------------------------------- */

const headlineWords = [
  { text: "Empowering" },
  { text: "European" },
  { text: "Businesses", accent: true },
  { text: "Through" },
  { text: "Technology" },
];

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Clients",
  },
  {
    value: 5,
    suffix: "+",
    label: "Countries",
  },
  {
    value: 99,
    suffix: "%",
    label: "Satisfaction",
  },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

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
    <div className="flex flex-col gap-1 px-5 first:pl-0 sm:px-6">
      <p className="font-mono text-2xl font-medium tabular-nums text-heading">
        {count}
        {suffix}
      </p>

      <p className="text-xs uppercase tracking-wider text-body">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Network data                                                               */
/* -------------------------------------------------------------------------- */

const nodes = [
  {
    id: "hub",
    x: 130,
    y: 230,
    r: 7,
    hub: true,
  },
  {
    id: "n1",
    x: 300,
    y: 80,
    r: 4,
  },
  {
    id: "n2",
    x: 380,
    y: 190,
    r: 4,
  },
  {
    id: "n3",
    x: 330,
    y: 330,
    r: 4,
  },
  {
    id: "n4",
    x: 190,
    y: 370,
    r: 3.5,
  },
  {
    id: "n5",
    x: 70,
    y: 110,
    r: 4,
  },
  {
    id: "n6",
    x: 60,
    y: 300,
    r: 3.5,
  },
];

const routes = [
  "M130,230 Q220,60 300,80",
  "M130,230 Q290,140 380,190",
  "M130,230 Q260,340 330,330",
  "M130,230 Q160,340 190,370",
  "M130,230 Q80,150 70,110",
  "M130,230 Q70,270 60,300",
];

/* -------------------------------------------------------------------------- */
/* Network map                                                                */
/* -------------------------------------------------------------------------- */

function NetworkMap({
  reduceMotion,
  active,
}: {
  reduceMotion: boolean;
  active: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 440 440"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Illustration of a connected network of European business hubs"
      animate={
        reduceMotion
          ? undefined
          : {
              scale: active ? 1.025 : 1,
            }
      }
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <defs>
        {/* Hub glow */}
        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation={active ? "7" : "4"} result="blur" />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Bright active route gradient */}
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor="var(--color-secondary)"
            stopOpacity="0.15"
          />

          <stop
            offset="50%"
            stopColor="var(--color-gold-light)"
            stopOpacity="0.95"
          />

          <stop
            offset="100%"
            stopColor="var(--color-secondary)"
            stopOpacity="0.15"
          />
        </linearGradient>
      </defs>

      {/* ------------------------------------------------------------------ */}
      {/* Hub orbit                                                           */}
      {/* ------------------------------------------------------------------ */}

      <motion.circle
        cx="130"
        cy="230"
        r="34"
        fill="none"
        stroke="var(--color-secondary)"
        strokeWidth="1"
        strokeDasharray="2 6"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
                strokeOpacity: active ? 0.55 : 0.18,
              }
        }
        transition={{
          rotate: {
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          },
          strokeOpacity: {
            duration: 0.4,
          },
        }}
        style={{
          transformOrigin: "130px 230px",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Routes                                                              */}
      {/* ------------------------------------------------------------------ */}

      {routes.map((route, index) => (
        <motion.path
          key={route}
          d={route}
          fill="none"
          stroke={active ? "url(#routeGradient)" : "var(--color-secondary)"}
          strokeWidth={active ? 1.65 : 1.25}
          strokeLinecap="round"
          strokeOpacity={active ? 0.9 : 0.48}
          initial={
            reduceMotion
              ? false
              : {
                  pathLength: 0,
                }
          }
          animate={{
            pathLength: 1,
            opacity: active ? 1 : 0.75,
          }}
          transition={{
            pathLength: {
              duration: 1.1,
              delay: 0.5 + index * 0.12,
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.4,
            },
          }}
        />
      ))}

      {/* ------------------------------------------------------------------ */}
      {/* Traveling packets                                                   */}
      {/* ------------------------------------------------------------------ */}

      {!reduceMotion &&
        routes.slice(0, 4).map((route, index) => (
          <motion.circle
            key={`packet-${index}`}
            r="2.5"
            fill="var(--color-gold-light)"
            filter="url(#nodeGlow)"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: active ? [0, 1, 1, 0] : 0,
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: index * 0.45,
              ease: "linear",
            }}
          >
            <animateMotion
              dur={`${2.6 + index * 0.3}s`}
              repeatCount="indefinite"
              path={route}
            />
          </motion.circle>
        ))}

      {/* ------------------------------------------------------------------ */}
      {/* Nodes                                                               */}
      {/* ------------------------------------------------------------------ */}

      {nodes.map((node, index) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={node.hub ? "var(--color-secondary)" : "var(--color-primary)"}
          stroke={
            node.hub ? "var(--color-gold-light)" : "var(--color-secondary)"
          }
          strokeWidth={1}
          filter={node.hub ? "url(#nodeGlow)" : undefined}
          initial={
            reduceMotion
              ? false
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          animate={
            reduceMotion
              ? {
                  scale: 1,
                  opacity: 1,
                }
              : {
                  scale: active
                    ? node.hub
                      ? [1, 1.35, 1.08]
                      : [1, 1.55, 1]
                    : 1,
                  opacity: 1,
                }
          }
          transition={{
            scale: active
              ? {
                  duration: 1.8,
                  repeat: Infinity,
                  delay: index * 0.11,
                  ease: "easeInOut",
                }
              : {
                  duration: 0.35,
                },
            opacity: {
              duration: 0.5,
              delay: 0.4 + index * 0.1,
            },
          }}
          style={{
            transformOrigin: `${node.x}px ${node.y}px`,
          }}
        />
      ))}

      {/* ------------------------------------------------------------------ */}
      {/* Signal transmission                                                 */}
      {/* ------------------------------------------------------------------ */}

      {!reduceMotion && (
        <>
          <motion.circle
            cx="130"
            cy="230"
            r="9"
            fill="none"
            stroke="var(--color-secondary)"
            animate={
              active
                ? {
                    r: [9, 28],
                    opacity: [0.7, 0],
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          <motion.circle
            cx="130"
            cy="230"
            r="9"
            fill="none"
            stroke="var(--color-gold-light)"
            animate={
              active
                ? {
                    r: [9, 40],
                    opacity: [0.4, 0],
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeOut",
            }}
          />
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Map annotation                                                      */}
      {/* ------------------------------------------------------------------ */}

      <motion.g
        initial={
          reduceMotion
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
                y: 5,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.45,
          delay: reduceMotion ? 0 : 2.2,
          ease: "easeOut",
        }}
      >
        <motion.line
          x1="284"
          y1="190"
          x2="356"
          y2="190"
          stroke="var(--color-secondary)"
          strokeWidth="1"
          animate={{
            strokeOpacity: active ? 0.8 : 0.45,
          }}
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
          {active ? "NETWORK ACTIVE" : "06 ACTIVE NODES"}
        </text>
      </motion.g>
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

const Hero = () => {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const initial = shouldReduceMotion ? "visible" : "hidden";

  /* ---------------------------------------------------------------------- */
  /* Stats                                                                  */
  /* ---------------------------------------------------------------------- */

  const statsRef = useRef<HTMLDivElement>(null);

  const statsInView = useInView(statsRef, {
    once: true,
    margin: "-80px",
  });

  /* ---------------------------------------------------------------------- */
  /* Pointer interaction                                                    */
  /* ---------------------------------------------------------------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  /*
   * Background and foreground intentionally move in opposite directions.
   * This creates a subtle depth/parallax effect.
   */

  const networkX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const networkY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const gridX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);

  const gridY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const spotlightX = useTransform(smoothX, [-0.5, 0.5], ["4%", "66%"]);

  const spotlightY = useTransform(smoothY, [-0.5, 0.5], ["-4%", "54%"]);

  const [networkActive, setNetworkActive] = useState(false);

  const handlePointerMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    if (shouldReduceMotion) return;

    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Section
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="
        group/hero
        relative isolate overflow-hidden
        py-12 sm:py-16 lg:py-24
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Interactive cursor spotlight                                       */}
      {/* ------------------------------------------------------------------ */}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -z-20
            h-[34rem] w-[34rem]
            rounded-full
            opacity-0
            blur-[90px]
            transition-opacity
            duration-700
            group-hover/hero:opacity-100
          "
          style={{
            left: spotlightX,
            top: spotlightY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 11%, transparent), transparent 68%)",
          }}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Blueprint grid                                                     */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-[-12px]
          -z-30 opacity-70
        "
        style={{
          x: shouldReduceMotion ? 0 : gridX,
          y: shouldReduceMotion ? 0 : gridY,

          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(
                in srgb,
                var(--color-border) 58%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in srgb,
                var(--color-border) 58%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              120deg,
              transparent 0%,
              color-mix(
                in srgb,
                var(--color-secondary) 6%,
                transparent
              ) 48%,
              transparent 72%
            )
          `,

          backgroundPosition: "center center",

          backgroundSize: "72px 72px, 72px 72px, 100% 100%",

          maskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 78%, transparent)",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 16%, black 78%, transparent)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Dot field                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-20
          opacity-[0.45]
        "
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

      {/* ------------------------------------------------------------------ */}
      {/* Traveling blueprint signals                                        */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-8rem]
          top-[calc(50%-72px)]
          -z-10
          h-px w-28
          bg-linear-to-r
          from-transparent
          via-secondary
          to-transparent
          shadow-[0_0_14px_var(--color-secondary)]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: ["0vw", "112vw"],
                opacity: [0, 1, 1, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? {
                duration: 0.01,
              }
            : {
                duration: 7.5,
                repeat: Infinity,
                repeatDelay: 1.8,
                ease: "linear",
              }
        }
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-8rem]
          left-[calc(50%+72px)]
          -z-10
          h-28 w-px
          bg-linear-to-b
          from-transparent
          via-secondary/85
          to-transparent
          shadow-[0_0_14px_var(--color-secondary)]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: ["0vh", "-100vh"],
                opacity: [0, 1, 1, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? {
                duration: 0.01,
              }
            : {
                duration: 8.5,
                repeat: Infinity,
                repeatDelay: 2.8,
                delay: 1.4,
                ease: "linear",
              }
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Network stage glow                                                 */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          top-1/2
          -z-10
          h-[28rem] w-[28rem]
          -translate-y-1/2
          rounded-full
          opacity-60
          blur-3xl
        "
        style={{
          background: "var(--surface-glow)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          top-1/2
          -z-10
          h-[34rem] w-[34rem]
          -translate-y-1/2
          rounded-full
          border border-secondary/15
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-6
          top-1/2
          -z-10
          h-[26rem] w-[26rem]
          -translate-y-1/2
          rounded-full
          border border-border/70
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Drafting marks                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-12
          -z-10
          hidden
          h-20 w-px
          bg-linear-to-b
          from-transparent
          via-secondary/45
          to-transparent
          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-14
          left-[7%]
          -z-10
          hidden
          font-mono
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-body/45
          lg:block
        "
      >
        BCR / 01 — Growth systems
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                       */}
      {/* ------------------------------------------------------------------ */}

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------------------------------------------------------- */}
          {/* Left                                                            */}
          {/* ---------------------------------------------------------------- */}

          <div>
            {/* Eyebrow */}

            <motion.div
              className="flex items-center gap-3"
              variants={fade}
              initial={initial}
              animate="visible"
            >
              <span
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-secondary
                "
              >
                Europe · Technology · Growth
              </span>

              <motion.span
                className="h-px flex-1 bg-secondary/40"
                style={{
                  transformOrigin: "left",
                }}
                initial={
                  shouldReduceMotion
                    ? {
                        scaleX: 1,
                      }
                    : {
                        scaleX: 0,
                      }
                }
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* ---------------------------------------------------------------- */}
            {/* Headline                                                         */}
            {/* ---------------------------------------------------------------- */}

            <motion.h1
              className={`
                ${fraunces.className}
                mt-6
                max-w-3xl
                text-4xl
                leading-[1.08]
                tracking-tight
                text-heading
                sm:text-5xl
                md:text-[3.4rem]
              `}
              variants={headlineContainer}
              initial={initial}
              animate="visible"
            >
              {headlineWords.map((word) => (
                <span
                  key={word.text}
                  className="
                    mr-[0.28em]
                    inline-block
                    overflow-hidden
                    align-bottom
                  "
                >
                  <motion.span
                    variants={wordReveal}
                    whileHover={
                      word.accent && !shouldReduceMotion
                        ? {
                            y: -3,
                            skewX: -3,
                          }
                        : undefined
                    }
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      inline-block
                      ${
                        word.accent
                          ? "cursor-default text-gold-gradient italic"
                          : ""
                      }
                    `}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Description */}

            <motion.p
              className="
                mt-6
                max-w-lg
                text-base
                leading-8
                text-body
                sm:text-lg
              "
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{
                delay: 0.55,
              }}
            >
              Blackcrest Advisory combines strategic thinking with hands-on
              execution across technology, marketing, and sales to drive
              measurable growth for startups, SMEs, and enterprises.
            </motion.p>

            {/* ---------------------------------------------------------------- */}
            {/* Buttons                                                          */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{
                delay: 0.7,
              }}
            >
              <motion.span
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="md"
                  href="/signup"
                  className="
                    shadow-[var(--shadow-action)]
                    hover:shadow-[var(--shadow-action-hover)]
                  "
                >
                  Get Started
                </Button>
              </motion.span>

              <motion.span
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="inline-block"
              >
                <Button variant="outline" size="md" href="/about">
                  Learn More
                </Button>
              </motion.span>
            </motion.div>

            {/* ---------------------------------------------------------------- */}
            {/* Stats                                                            */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              ref={statsRef}
              className="
                mt-12
                flex
                flex-wrap
                border-t
                border-border/60
                pt-8
              "
              variants={fadeUp}
              initial={initial}
              animate="visible"
              transition={{
                delay: 0.85,
              }}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={index > 0 ? "border-l border-border/60" : ""}
                >
                  <StatItem
                    {...stat}
                    active={shouldReduceMotion || statsInView}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Right — interactive network                                      */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            variants={fade}
            initial={initial}
            animate="visible"
            transition={{
              delay: 0.3,
              duration: 0.9,
            }}
            style={{
              x: shouldReduceMotion ? 0 : networkX,
              y: shouldReduceMotion ? 0 : networkY,
            }}
            onMouseEnter={() => setNetworkActive(true)}
            onMouseLeave={() => setNetworkActive(false)}
            onFocusCapture={() => setNetworkActive(true)}
            onBlurCapture={() => setNetworkActive(false)}
            className="
              relative
              mx-auto
              aspect-square
              w-full
              max-w-md
            "
          >
            {/* -------------------------------------------------------------- */}
            {/* Outer responsive field                                         */}
            {/* -------------------------------------------------------------- */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-[5%]
                rounded-full
                border
                border-secondary/10
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: networkActive ? [1, 1.04, 1] : 1,

                      opacity: networkActive ? [0.3, 0.75, 0.3] : 0.3,
                    }
              }
              transition={{
                duration: 3,
                repeat: networkActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Rotating coordinate ring */}

            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-[1%]
                  rounded-full
                  border
                  border-dashed
                  border-secondary/[0.08]
                "
                animate={{
                  rotate: networkActive ? 360 : 0,
                }}
                transition={{
                  duration: 28,
                  repeat: networkActive ? Infinity : 0,
                  ease: "linear",
                }}
              />
            )}

            {/* -------------------------------------------------------------- */}
            {/* Corner coordinates                                             */}
            {/* -------------------------------------------------------------- */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: networkActive ? 1 : 0.35,
              }}
              className="
                pointer-events-none
                absolute
                left-[7%]
                top-[8%]
                hidden
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-secondary
                sm:block
              "
            >
              52.5200° N
            </motion.div>

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: networkActive ? 1 : 0.35,
              }}
              className="
                pointer-events-none
                absolute
                bottom-[12%]
                right-[5%]
                hidden
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-secondary
                sm:block
              "
            >
              13.4050° E
            </motion.div>

            {/* -------------------------------------------------------------- */}
            {/* Map                                                            */}
            {/* -------------------------------------------------------------- */}

            <motion.div
              animate={{
                filter: networkActive
                  ? "drop-shadow(0 20px 35px rgb(166 124 39 / 0.12))"
                  : "drop-shadow(0 0px 0px transparent)",
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full w-full"
            >
              <NetworkMap
                reduceMotion={shouldReduceMotion}
                active={networkActive}
              />
            </motion.div>

            {/* -------------------------------------------------------------- */}
            {/* Active state label                                             */}
            {/* -------------------------------------------------------------- */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: networkActive ? 1 : 0,
                y: networkActive ? 0 : 6,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                pointer-events-none
                absolute
                bottom-[7%]
                right-[5%]
                hidden
                items-center
                gap-2
                lg:flex
              "
            >
              <motion.span
                animate={{
                  scale: networkActive ? [1, 1.6, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: networkActive ? Infinity : 0,
                }}
                className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-secondary
                  shadow-[0_0_12px_var(--color-secondary)]
                "
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-secondary
                "
              >
                Network responding
              </span>
            </motion.div>

            {/* -------------------------------------------------------------- */}
            {/* Caption                                                        */}
            {/* -------------------------------------------------------------- */}

            <motion.p
              animate={{
                color: networkActive
                  ? "var(--color-secondary)"
                  : "var(--color-body)",
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                mt-2
                text-center
                font-mono
                text-xs
                uppercase
                tracking-[0.2em]
              "
            >
              Active engagements across Europe
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
