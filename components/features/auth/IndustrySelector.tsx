"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shirt, Laptop, HeartPulse, Flower2, Utensils } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, hoverScale } from "@/utils/animations";
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

//===== Industry Selector Component =====//
const IndustrySelector = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  //===== Handle continue navigation =====//
  const handleContinue = () => {
    if (selectedId) {
      router.push("/signup");
    }
  };

  return (
    <div>
      {/*===== Industry Grid =====*/}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7"
      >
        {industries.map(({ id, label, Icon, description }, index) => {
          const isSelected = selectedId === id;
          const isLastOdd =
            index === industries.length - 1 && industries.length % 2 !== 0;

          return (
            <motion.div
              key={id}
              variants={fadeInUp}
              {...hoverScale}
              onClick={() => setSelectedId(id)}
              className={cn(
                "cursor-pointer",
                isLastOdd && "col-span-2 flex justify-center",
              )}
            >
              <Card
                hoverEffect={!isSelected}
                className={cn(
                  "group relative transition-all duration-300",
                  isSelected
                    ? "border-secondary ring-2 ring-secondary/25"
                    : "border-border",
                  isLastOdd && "w-full max-w-sm",
                )}
              >
                {/*===== Selected Checkmark Badge =====*/}
                {isSelected && (
                  <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-secondary shadow-lg shadow-secondary/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-secondary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/*===== Content =====*/}
                <div className="flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div
                    className={`mb-5 rounded-xl p-3.5 transition-colors duration-300 ${
                      isSelected
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-secondary"
                    }`}
                  >
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground">
                    {label}
                  </h3>
                  <p className="mt-2.5 text-sm text-muted-foreground md:text-base">
                    {description}
                  </p>

                  {/* Subtle animated underline on hover */}
                  <div className="mt-4 h-0.5 w-0 rounded-full bg-secondary transition-all duration-300 group-hover:w-8" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/*===== Continue Button =====*/}
      <div className="mt-12 flex flex-col items-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={handleContinue}
          disabled={!selectedId}
          className="px-10"
        >
          Continue to Sign Up →
        </Button>
        {!selectedId && (
          <p className="animate-pulse text-sm text-muted-foreground">
            Please select an industry to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default IndustrySelector;
