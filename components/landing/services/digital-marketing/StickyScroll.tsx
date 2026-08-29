"use client";

//===== imports =====//
import { useRef, useState } from "react";

import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowDownRight,
  BarChart3,
  CircleDot,
  Megaphone,
  Search,
  Target,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { IMAGE } from "@/constants/imagesConfig";

//==============================================================//
// TYPES
//==============================================================//

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  shortLabel: string;
  eyebrow: string;
  icon: typeof Search;
}

//==============================================================//
// SERVICES
//==============================================================//

const services: Service[] = [
  {
    id: 1,
    title: "MARKETING DIRECTION",
    shortLabel: "Direction",
    eyebrow: "Clear priorities",
    description:
      "Start by clarifying what you want marketing to support, who you need to reach, and the message that makes the next step easier to understand.",
    image: IMAGE.marketing,
    icon: Megaphone,
  },
  {
    id: 2,
    title: "SEARCH & CONTENT",
    shortLabel: "Search & content",
    eyebrow: "Useful visibility",
    description:
      "Create useful pages and content that explain your offer clearly, support search visibility, and give the right audience a reason to stay engaged.",
    image: IMAGE.seo,
    icon: Search,
  },
  {
    id: 3,
    title: "CAMPAIGNS & LANDING PAGES",
    shortLabel: "Campaigns",
    eyebrow: "Clear action",
    description:
      "Connect campaign activity to focused landing pages and follow-up paths, helping people move from first interest to a clear enquiry, purchase, or conversation.",
    image: IMAGE.management,
    icon: Target,
  },
  {
    id: 4,
    title: "PERFORMANCE REVIEW",
    shortLabel: "Review & refine",
    eyebrow: "Informed improvement",
    description:
      "Review the response to your activity, identify what is useful, and refine the next piece of work with better context instead of guesswork.",
    image: IMAGE.content_marketing,
    icon: BarChart3,
  },
];

//==============================================================//
// STICKY SCROLL
//==============================================================//

export default function StickyScroll() {
  const shouldReduceMotion = useReducedMotion();

  const [activeService, setActiveService] = useState(0);

  return (
    <Section className="relative isolate bg-background py-16 sm:py-20 lg:py-28">
      {/*===== BACKGROUND ARCHITECTURE =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        {/* main vertical divider */}
        <div className="absolute left-[34%] top-0 hidden h-full w-px bg-border/45 lg:block" />

        {/* architectural grid */}
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:88px_100%] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />

        {/* gold ambient glow */}
        <div className="absolute -left-40 top-[10%] h-[420px] w-[420px] rounded-full bg-secondary/[0.05] blur-[140px]" />

        {/* navy ambient glow */}
        <div className="absolute -right-40 bottom-[12%] h-[420px] w-[420px] rounded-full bg-primary/[0.045] blur-[140px]" />
      </div>

      <Container>
        {/*===== SECTION TOP =====*/}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between lg:mb-16"
        >
          <div className="flex items-center gap-3">
            <CircleDot className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
              02 / Marketing support
            </span>

            <span className="h-px w-10 bg-secondary/35" />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground/55">
            Explore the work
          </span>
        </motion.div>

        {/*===== STICKY EXPERIENCE =====*/}

        <div className="grid min-w-0 items-start gap-12 lg:grid-cols-[minmax(270px,0.36fr)_minmax(0,0.64fr)] lg:gap-12 xl:grid-cols-[minmax(320px,0.34fr)_minmax(0,0.66fr)] xl:gap-20">
          {/*===== LEFT / STICKY INDEX =====*/}

          <aside className="min-w-0 self-start lg:sticky lg:top-28">
            <div>
              {/*===== INTRO =====*/}

              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                  Focused capabilities
                </span>

                <h2 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-heading sm:text-4xl lg:text-[46px] xl:text-[52px]">
                  The work behind
                  <span className="block text-secondary">
                    clearer marketing.
                  </span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-body">
                  Every business needs a different mix. These are the practical
                  areas we can connect around your goal, audience, and next
                  step.
                </p>
              </div>

              {/*===== ACTIVE INDEX =====*/}

              <div className="mt-9 hidden border-y border-border lg:block">
                {services.map((service, index) => {
                  const isActive = activeService === index;

                  const Icon = service.icon;

                  return (
                    <div
                      key={service.id}
                      className={`
                          relative
                          flex
                          items-center
                          gap-3
                          border-b
                          border-border
                          py-3.5
                          last:border-b-0
                          transition-all
                          duration-300

                          ${isActive ? "pl-3" : "pl-0"}
                        `}
                    >
                      {/* active rail */}
                      <span
                        aria-hidden="true"
                        className={`
                            absolute
                            bottom-2 left-0 top-2
                            w-[2px]
                            bg-secondary
                            transition-opacity
                            duration-300

                            ${isActive ? "opacity-100" : "opacity-0"}
                          `}
                      />

                      {/* number */}
                      <span
                        className={`
                            font-mono
                            text-[9px]
                            font-semibold
                            transition-colors

                            ${
                              isActive
                                ? "text-secondary"
                                : "text-muted-foreground/30"
                            }
                          `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* icon */}
                      <Icon
                        className={`
                            h-3.5 w-3.5
                            shrink-0
                            transition-colors

                            ${
                              isActive
                                ? "text-secondary"
                                : "text-muted-foreground/25"
                            }
                          `}
                      />

                      {/* label */}
                      <span
                        className={`
                            min-w-0
                            truncate
                            text-xs
                            font-medium
                            transition-colors

                            ${
                              isActive
                                ? "text-heading"
                                : "text-muted-foreground/45"
                            }
                          `}
                      >
                        {service.shortLabel}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/*===== PROGRESS =====*/}

              <div className="mt-6 hidden lg:block">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/55">
                    Capability index
                  </span>

                  <span className="font-mono text-[9px] font-semibold text-secondary">
                    {String(activeService + 1).padStart(2, "0")}/
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-3 h-px overflow-hidden bg-border">
                  <motion.div
                    className="h-full bg-secondary"
                    animate={{
                      width: `${
                        ((activeService + 1) / services.length) * 100
                      }%`,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/*===== RIGHT / CAPABILITY CHAPTERS =====*/}

          <div className="min-w-0">
            {services.map((service, index) => (
              <CapabilityChapter
                key={service.id}
                service={service}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
                onActiveService={setActiveService}
              />
            ))}
          </div>
        </div>

        {/*===== BOTTOM STATEMENT =====*/}

        <div className="mt-12 grid border-y border-border bg-card md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:mt-20">
          <div className="px-5 py-5 sm:px-6">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-secondary">
              Built around your next step
            </span>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              There is no fixed marketing package. We focus on the work that
              helps your message, customer journey, and commercial priorities
              become clearer.
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-border px-5 py-4 md:border-l md:border-t-0 sm:px-6">
            <ArrowDownRight className="h-4 w-4 text-secondary" />

            <span className="whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/55">
              Clarity before activity
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

//==============================================================//
// CAPABILITY CHAPTER
//==============================================================//

function CapabilityChapter({
  service,
  index,
  shouldReduceMotion,
  onActiveService,
}: {
  service: Service;
  index: number;
  shouldReduceMotion: boolean | null;
  onActiveService: (index: number) => void;
}) {
  const chapterRef = useRef<HTMLElement | null>(null);

  const Icon = service.icon;

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={chapterRef}
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 35,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.16,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      onViewportEnter={() => onActiveService(index)}
      className="relative min-w-0 border-b border-border py-8 first:pt-0 last:border-b-0 lg:min-h-[76vh] lg:py-14 xl:min-h-[82vh]"
    >
      {/*===== MOBILE INDEX =====*/}

      <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
        <span className="font-mono text-[9px] font-semibold text-secondary">
          {String(index + 1).padStart(2, "0")}/
          {String(services.length).padStart(2, "0")}
        </span>

        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/55">
          {service.eyebrow}
        </span>
      </div>

      {/*===== IMAGE STAGE =====*/}

      <div className="relative min-h-[380px] overflow-hidden border border-border bg-primary shadow-[var(--shadow-card)] sm:min-h-[480px] xl:min-h-[520px]">
        {/* image */}
        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="
              (max-width: 1024px) 100vw,
              65vw
            "
            className="object-cover"
          />
        </motion.div>

        {/* cinematic bottom fade */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-navy-deep/10"
        />

        {/* alternating directional shade */}
        <div
          aria-hidden="true"
          className={`
            absolute inset-0

            ${
              isEven
                ? "bg-gradient-to-r from-navy-deep/65 via-transparent to-transparent"
                : "bg-gradient-to-l from-navy-deep/65 via-transparent to-transparent"
            }
          `}
        />

        {/* technical grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]"
        />

        {/*===== TITLE =====*/}

        <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-white/15 bg-navy-deep/70 text-gold-light backdrop-blur-md">
                <Icon className="h-3.5 w-3.5" />
              </div>

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                {service.eyebrow}
              </span>
            </div>

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60">
              {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          <motion.span
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    width: 0,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    width: 42,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            aria-hidden="true"
            className="mb-3 block h-px bg-gold-light"
          />

          <h3 className="max-w-3xl text-2xl font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl xl:text-[44px]">
            {service.title}
          </h3>
        </div>

        {/* corner marker */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-gold-light/45"
        />
      </div>

      {/*===== DESCRIPTION =====*/}

      <div className="grid min-w-0 gap-5 border-x border-b border-border bg-card px-5 py-5 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8 lg:px-7 lg:py-6">
        {/* chapter number */}
        <div className="flex items-center gap-3 lg:items-start">
          <span className="font-mono text-[9px] font-semibold text-secondary">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-7 bg-secondary/30 lg:mt-1.5" />
        </div>

        {/* copy */}
        <div className="min-w-0">
          <p className="max-w-3xl text-sm leading-7 text-body sm:text-base sm:leading-8">
            {service.description}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/55">
              {service.shortLabel}
              {" / "}
              Digital Growth Capability
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
