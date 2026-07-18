"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shirt, Laptop, HeartPulse, Flower2 } from "lucide-react";
import { Industry } from "@/types/industryType";

//industries array with id, label, Icon, and description
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
];

//component for selecting an industry
const IndustrySelector = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedId) {
      router.push("/signup");
    }
  };
  return (
    <div>
      {/* Industry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
        {industries.map(({ id, label, Icon, description }) => {
          const isSelected = selectedId === id;

          return (
            <div
              key={id}
              onClick={() => setSelectedId(id)}
              className="group relative p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--color-card-bg)",
                borderColor: isSelected
                  ? "var(--color-gold)"
                  : "var(--color-card-border)",
                boxShadow: isSelected
                  ? "0 0 0 4px rgba(201, 168, 76, 0.25), 0 8px 30px rgba(0,0,0,0.08)"
                  : "0 4px 6px -1px rgba(0,0,0,0.02)",
              }}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[var(--color-gold)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
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

              <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div
                  className="p-3.5 rounded-xl mb-5 transition-colors duration-300"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--color-gold)"
                      : "var(--color-muted)",
                  }}
                >
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-300"
                    style={{
                      color: isSelected ? "#ffffff" : "var(--color-gold)",
                    }}
                  />
                </div>

                <h3
                  className="text-xl md:text-2xl font-semibold"
                  style={{ color: "var(--color-heading)" }}
                >
                  {label}
                </h3>
                <p
                  className="text-sm md:text-base mt-2.5 max-w-xs"
                  style={{ color: "var(--color-body)" }}
                >
                  {description}
                </p>

                {/* Subtle animated underline on hover */}
                <div className="mt-4 h-0.5 w-0 rounded-full bg-[var(--color-gold)] transition-all duration-300 group-hover:w-8" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <button
          onClick={handleContinue}
          disabled={!selectedId}
          className="px-10 py-3.5 rounded-full font-semibold text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 hover:shadow-lg hover:shadow-[var(--color-gold)]/30"
          style={{
            backgroundColor: "var(--color-cta-bg)",
            color: "var(--color-cta-text)",
          }}
        >
          Continue to Sign Up →
        </button>
        {!selectedId && (
          <p
            className="text-sm animate-pulse"
            style={{ color: "var(--color-body)" }}
          >
            Please select an industry to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default IndustrySelector;
