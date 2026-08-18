"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Flower2,
  HeartPulse,
  Laptop,
  Shirt,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/utils";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import type { Industry } from "@/types/industryType";

//===== Industries array =====//
const industries: Industry[] = [
  {
    id: "fashion",
    label: "Fashion Tech",
    Icon: Shirt,
    description:
      "Cutting-edge solutions for apparel, luxury brands, and retail-tech ecosystems.",
  },
  {
    id: "it",
    label: "IT & Software",
    Icon: Laptop,
    description:
      "End-to-end tools for SaaS platforms, development teams, and digital infrastructure.",
  },
  {
    id: "medical",
    label: "Medical Industry",
    Icon: HeartPulse,
    description:
      "Compliant and precise software for healthcare providers, labs, and pharma.",
  },
  {
    id: "beauty",
    label: "Beauty Industry",
    Icon: Flower2,
    description:
      "Innovative platforms for cosmetics, wellness brands, and personal care services.",
  },
  {
    id: "restaurant",
    label: "Restaurant & Cafe",
    Icon: Utensils,
    description:
      "Digital solutions for restaurants, cafes, food chains, and hospitality businesses.",
  },
];

const IndustrySelector = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const router = useRouter();
  const reduceMotion = Boolean(useReducedMotion());

  //===== Handle continue navigation =====//
  const handleContinue = () => {
    const selectedItem = industries.find((item) => item.id === selectedId);

    if (selectedItem) {
      router.push(`/signup?industry=${encodeURIComponent(selectedItem.label)}`);
    }
  };

  const selectedIndustry = industries.find(
    (industry) => industry.id === selectedId,
  );

  return (
    <div className="w-full">
      {/* ====================================================== */}
      {/* INDUSTRY GRID                                          */}
      {/* ====================================================== */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          md:gap-6
        "
      >
        {industries.map(({ id, label, Icon, description }, index) => {
          const isSelected = selectedId === id;

          const isLastOdd =
            index === industries.length - 1 && industries.length % 2 !== 0;

          return (
            <motion.button
              key={id}
              type="button"
              variants={fadeInUp}
              onClick={() => setSelectedId(id)}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.01,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.985,
                    }
              }
              aria-pressed={isSelected}
              className={cn(
                `
                  group relative
                  min-h-[290px]
                  overflow-hidden
                  rounded-[1.35rem]
                  border
                  bg-card
                  p-6
                  text-left
                  shadow-[var(--shadow-card)]
                  transition-[border-color,background-color,box-shadow]
                  duration-500

                  hover:border-secondary/35
                  hover:shadow-[var(--shadow-card-hover)]

                  sm:p-7
                  lg:min-h-[305px]
                `,
                isSelected
                  ? `
                    border-secondary
                    bg-secondary/[0.045]
                    shadow-[var(--shadow-gold-glow)]
                  `
                  : "border-border",
                isLastOdd &&
                  `
                    sm:col-span-2
                    sm:mx-auto
                    sm:w-full
                    sm:max-w-[calc(50%-0.75rem)]
                  `,
              )}
            >
              {/* ================================================== */}
              {/* SOFT HOVER GLOW                                    */}
              {/* ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-secondary/[0.07]
                  opacity-0
                  blur-3xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* ================================================== */}
              {/* LARGE DECORATIVE NUMBER                            */}
              {/* ================================================== */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-8
                  -right-2
                  select-none
                  font-mono
                  text-[8rem]
                  font-semibold
                  leading-none
                  tracking-[-0.1em]
                  text-foreground/[0.025]
                  transition-all
                  duration-700

                  group-hover:-translate-x-2
                  group-hover:-translate-y-2
                  group-hover:text-secondary/[0.06]
                "
              >
                0{index + 1}
              </span>

              {/* ================================================== */}
              {/* TOP META                                           */}
              {/* ================================================== */}

              <div
                className="
                  relative z-10
                  flex items-start
                  justify-between
                  gap-4
                "
              >
                <span
                  className={cn(
                    `
                      font-mono
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      transition-colors
                      duration-300
                    `,
                    isSelected ? "text-secondary" : "text-muted-foreground/45",
                  )}
                >
                  Industry / 0{index + 1}
                </span>

                {/* selected / hover action */}
                {isSelected ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: reduceMotion ? 1 : 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 24,
                    }}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-secondary
                      text-secondary-foreground
                      shadow-[var(--shadow-gold-glow)]
                    "
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border
                      bg-background
                      text-muted-foreground/30
                      transition-all
                      duration-300

                      group-hover:border-secondary/40
                      group-hover:bg-secondary/[0.05]
                      group-hover:text-secondary
                    "
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>

              {/* ================================================== */}
              {/* ICON                                               */}
              {/* ================================================== */}

              <div
                className={cn(
                  `
                    relative z-10
                    mt-8
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-xl
                    border
                    transition-all
                    duration-500
                  `,
                  isSelected
                    ? `
                      border-secondary
                      bg-secondary
                      text-secondary-foreground
                      shadow-[var(--shadow-gold-glow)]
                    `
                    : `
                      border-secondary/15
                      bg-secondary/[0.06]
                      text-secondary

                      group-hover:-translate-y-1
                      group-hover:border-secondary/35
                      group-hover:bg-secondary
                      group-hover:text-secondary-foreground
                    `,
                )}
              >
                <Icon
                  className="
                    h-6
                    w-6
                    transition-transform
                    duration-500
                    group-hover:-rotate-3
                    group-hover:scale-110
                  "
                  strokeWidth={1.8}
                />
              </div>

              {/* ================================================== */}
              {/* CONTENT                                            */}
              {/* ================================================== */}

              <div className="relative z-10 mt-7">
                <h3
                  className={cn(
                    `
                      text-xl
                      font-semibold
                      tracking-[-0.025em]
                      transition-colors
                      duration-300
                      sm:text-2xl
                    `,
                    isSelected
                      ? "text-secondary"
                      : "text-heading group-hover:text-secondary",
                  )}
                >
                  {label}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-sm
                    leading-7
                    text-muted-foreground
                  "
                >
                  {description}
                </p>
              </div>

              {/* ================================================== */}
              {/* BOTTOM ACTION                                      */}
              {/* ================================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  flex
                  items-center
                  justify-between
                  border-t
                  border-border
                  px-6
                  py-4
                  transition-colors
                  duration-300

                  group-hover:border-secondary/20
                  group-hover:bg-secondary/[0.025]

                  sm:px-7
                "
              >
                <span
                  className={cn(
                    `
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      transition-colors
                      duration-300
                    `,
                    isSelected
                      ? "text-secondary"
                      : `
                        text-muted-foreground/45
                        group-hover:text-foreground
                      `,
                  )}
                >
                  {isSelected ? "Selected" : "Select industry"}
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.14em]
                    text-muted-foreground/30
                  "
                >
                  BCR
                </span>
              </div>

              {/* ================================================== */}
              {/* MOVING HOVER LIGHT                                 */}
              {/* ================================================== */}

              {!reduceMotion && !isSelected && (
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[70%]
                    w-[45%]
                    rotate-[15deg]
                    bg-gradient-to-r
                    from-transparent
                    via-secondary/[0.05]
                    to-transparent
                    opacity-0
                    blur-xl
                    transition-all
                    duration-1000

                    group-hover:left-[120%]
                    group-hover:opacity-100
                  "
                />
              )}

              {/* ================================================== */}
              {/* SELECTED CORNER ACCENT                             */}
              {/* ================================================== */}

              {isSelected && (
                <motion.div
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  className="
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    w-full
                    origin-left
                    bg-gradient-to-r
                    from-secondary
                    via-secondary/50
                    to-transparent
                  "
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ====================================================== */}
      {/* CONTINUE AREA                                         */}
      {/* ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
        }}
        className="
          mt-8
          flex
          flex-col
          gap-5
          border-t
          border-border
          pt-6

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* selection state */}
        <div>
          <p
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-muted-foreground/40
            "
          >
            Selection status
          </p>

          <div className="mt-1 flex items-center gap-2">
            {selectedId && (
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-success
                "
              />
            )}

            <p
              className={cn(
                `
                  text-sm
                  font-medium
                `,
                selectedId ? "text-heading" : "text-muted-foreground",
              )}
            >
              {selectedIndustry
                ? selectedIndustry.label
                : "Choose the closest industry match"}
            </p>
          </div>
        </div>

        {/* continue button */}
        <Button
          variant="primary"
          size="md"
          onClick={handleContinue}
          disabled={!selectedId}
          className="
            group
            min-w-[210px]
            justify-center
          "
        >
          Continue to Sign Up
          <ArrowUpRight
            className="
              ml-2
              h-4
              w-4
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Button>
      </motion.div>

      {/* helper */}
      {!selectedId && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            mt-3
            text-xs
            text-muted-foreground

            sm:text-right
          "
        >
          Select one industry to continue.
        </motion.p>
      )}
    </div>
  );
};

export default IndustrySelector;
