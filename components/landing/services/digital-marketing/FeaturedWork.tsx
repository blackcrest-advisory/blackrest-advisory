"use client";

//===== imports =====//
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CircleDot,
  ExternalLink,
  Layers3,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { projects } from "@/content-data/digital-marketing/clientDeliveryProjectsData";

//==============================================================//
// FEATURED WORK
//==============================================================//

export default function FeaturedWork() {
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 32,
    },
    [Autoplay({ delay: 4000 })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  //===== Keep active project synchronized with Embla =====//
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const currentProject = projects[selectedIndex];

  return (
    <Section
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/*===== BACKGROUND ARCHITECTURE =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:92px_100%] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
        />

        <div
          className="absolute -left-40 top-[20%] h-[420px] w-[420px] rounded-full bg-secondary/[0.06] blur-[140px]"
        />

        <div
          className="absolute -right-32 bottom-[5%] h-[380px] w-[380px] rounded-full bg-primary/[0.05] blur-[140px]"
        />
      </div>

      <Container>
        {/*===== EDITORIAL HEADER =====*/}

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
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16 lg:pb-14"
        >
          {/* label */}
          <div>
            <div
              className="flex items-center gap-3"
            >
              <Layers3 className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                04 / Featured Work
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            >
              Selected client work where strategy, creative execution, and
              performance thinking came together.
            </p>
          </div>

          {/* headline */}
          <div>
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[58px]"
            >
              Work designed to
              <span className="block text-secondary">
                move the business forward.
              </span>
            </h2>
          </div>
        </motion.div>

        {/*===== CASE STUDY REEL =====*/}

        <div className="mt-10 lg:mt-14">
          {/* top controls */}
          <div
            className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Client delivery archive
              </span>
            </div>

            <div
              className="flex items-center gap-3"
            >
              <span
                className="font-mono text-[8px] font-semibold tracking-[0.16em] text-heading"
              >
                {String(selectedIndex + 1).padStart(2, "0")}
              </span>

              <span className="h-px w-8 bg-border" />

              <span
                className="font-mono text-[8px] tracking-[0.16em] text-muted-foreground/35"
              >
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/*===== MAIN CANVAS =====*/}

          <div
            className="relative min-w-0 overflow-hidden border border-border bg-primary shadow-[var(--shadow-overlay)]"
          >
            {/* carousel viewport */}
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="min-w-0 flex-[0_0_100%]"
                  >
                    <article
                      className="grid min-h-[640px] lg:grid-cols-[minmax(0,1.3fr)_minmax(370px,0.7fr)]"
                    >
                      {/*===== IMAGE STAGE =====*/}

                      <div
                        className="relative min-h-[430px] overflow-hidden lg:min-h-[640px]"
                      >
                        <motion.div
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : selectedIndex === index
                                ? {
                                    scale: 1,
                                  }
                                : {
                                    scale: 1.05,
                                  }
                          }
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="
                                (max-width: 1024px) 100vw,
                                65vw
                              "
                            className="object-cover"
                          />
                        </motion.div>

                        {/* cinematic overlays */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/10 to-navy-deep/15"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-r from-navy-deep/30 via-transparent to-navy-deep/35"
                        />

                        {/* grid */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black)]"
                        />

                        {/* project marker */}
                        <div
                          className="absolute left-5 top-5 flex items-center gap-3 sm:left-6 sm:top-6"
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center border border-white/15 bg-navy-deep/55 backdrop-blur"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                          </span>

                          <div>
                            <span
                              className="block font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                            >
                              Selected work
                            </span>

                            <span
                              className="mt-1 block font-mono text-[7px] uppercase tracking-[0.13em] text-white/35"
                            >
                              Case / {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/*===== IMAGE BOTTOM TITLE =====*/}

                        <div
                          className="absolute bottom-0 left-0 right-0 px-5 pb-6 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8"
                        >
                          <div
                            className="flex items-center gap-2"
                          >
                            <CircleDot className="h-3 w-3 text-gold-light" />

                            <span
                              className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                            >
                              Client impact
                            </span>
                          </div>

                          <h3
                            className="mt-3 max-w-2xl text-2xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl"
                          >
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/*===== PROJECT INTELLIGENCE =====*/}

                      <div
                        className="relative flex min-w-0 flex-col border-t border-white/10 bg-navy-deep lg:border-l lg:border-t-0"
                      >
                        {/* top status */}
                        <div
                          className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6"
                        >
                          <div
                            className="flex items-center gap-2"
                          >
                            <BarChart3 className="h-3.5 w-3.5 text-gold-light" />

                            <span
                              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/45"
                            >
                              Project intelligence
                            </span>
                          </div>

                          <span
                            className="font-mono text-[7px] uppercase tracking-[0.14em] text-gold-light"
                          >
                            Active case
                          </span>
                        </div>

                        {/* description */}
                        <div
                          className="flex-1 px-5 py-6 sm:px-6 lg:py-8"
                        >
                          <AnimatePresence mode="wait">
                            {selectedIndex === index && (
                              <motion.div
                                key={project.title}
                                initial={
                                  shouldReduceMotion
                                    ? undefined
                                    : {
                                        opacity: 0,
                                        y: 16,
                                      }
                                }
                                animate={
                                  shouldReduceMotion
                                    ? undefined
                                    : {
                                        opacity: 1,
                                        y: 0,
                                      }
                                }
                                exit={
                                  shouldReduceMotion
                                    ? undefined
                                    : {
                                        opacity: 0,
                                        y: -8,
                                      }
                                }
                                transition={{
                                  duration: 0.45,
                                }}
                              >
                                <span
                                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                                >
                                  The work
                                </span>

                                <p
                                  className="mt-4 text-sm leading-7 text-white/55"
                                >
                                  {project.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* buttons */}
                          <div
                            className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
                          >
                            <Button
                              variant="primary"
                              size="sm"
                              className="group w-full !rounded-md xl:w-auto"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              View Website
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="group w-full !rounded-md border-white/20 text-white hover:bg-white/5 xl:w-auto"
                            >
                              View Case Study
                              <ArrowUpRight
                                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </Button>
                          </div>
                        </div>

                        {/*===== METRICS =====*/}

                        <div
                          className="border-t border-white/10"
                        >
                          <div
                            className="flex items-center justify-between px-5 py-3 sm:px-6"
                          >
                            <span
                              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/30"
                            >
                              Performance outcomes
                            </span>

                            <ArrowUpRight className="h-3 w-3 text-gold-light/50" />
                          </div>

                          <div
                            className="grid grid-cols-3 border-t border-white/10"
                          >
                            {project.metrics.map((metric, metricIndex) => (
                              <div
                                key={metricIndex}
                                className="min-w-0 border-r border-white/10 px-3 py-5 last:border-r-0 sm:px-4"
                              >
                                <motion.div
                                  initial={
                                    shouldReduceMotion
                                      ? undefined
                                      : {
                                          opacity: 0,
                                          y: 12,
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
                                  }}
                                  transition={{
                                    delay: metricIndex * 0.08,
                                  }}
                                >
                                  <span
                                    className="block text-xl font-semibold tracking-[-0.04em] text-gold-light sm:text-2xl"
                                  >
                                    {metric.value}
                                  </span>

                                  <span
                                    className="mt-1.5 block text-[9px] leading-4 text-white/35"
                                  >
                                    {metric.label}
                                  </span>
                                </motion.div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/*===== AUTOPLAY PROGRESS =====*/}

            {!shouldReduceMotion && (
              <motion.div
                key={selectedIndex}
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-30 h-[2px] bg-gold-light shadow-[0_0_18px_rgba(232,207,143,0.4)]"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 4,
                  ease: "linear",
                }}
              />
            )}

            {/* corner markers */}
            <span
              aria-hidden="true"
              className="absolute left-3 top-3 z-20 h-5 w-5 border-l border-t border-gold-light/45"
            />

            <span
              aria-hidden="true"
              className="absolute right-3 top-3 z-20 h-5 w-5 border-r border-t border-gold-light/45"
            />
          </div>

          {/*===== CONTROLS =====*/}

          <div
            className="mt-5 grid gap-4 border-b border-border pb-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center"
          >
            {/* arrows */}
            <div
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={scrollPrev}
                className="group flex h-11 w-11 items-center justify-center border border-border bg-card text-heading transition-all duration-300 hover:border-secondary/40 hover:text-secondary"
                aria-label="Previous slide"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </button>

              <button
                type="button"
                onClick={scrollNext}
                className="group flex h-11 w-11 items-center justify-center border border-border bg-card text-heading transition-all duration-300 hover:border-secondary/40 hover:text-secondary"
                aria-label="Next slide"
              >
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            </div>

            {/*===== PROJECT NAVIGATION =====*/}

            <div
              className="flex min-w-0 items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((project, index) => {
                const isActive = selectedIndex === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`
                        group
                        relative
                        min-w-0
                        flex-1
                        border-t
                        pt-3
                        text-left
                        transition-colors
                        duration-300

                        ${
                          isActive
                            ? "border-secondary"
                            : "border-border hover:border-secondary/40"
                        }
                      `}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span
                      className={`
                          block
                          font-mono
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.13em]

                          ${
                            isActive
                              ? "text-secondary"
                              : "text-muted-foreground/30"
                          }
                        `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`
                          mt-1
                          hidden
                          truncate
                          text-[10px]
                          font-medium
                          transition-colors
                          sm:block

                          ${
                            isActive
                              ? "text-heading"
                              : "text-muted-foreground/45"
                          }
                        `}
                    >
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* current state */}
            <div
              className="hidden items-center gap-2 md:flex"
            >
              <CircleDot className="h-3 w-3 text-secondary" />

              <AnimatePresence mode="wait">
                <motion.span
                  key={currentProject?.title}
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: 5,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: -5,
                        }
                  }
                  className="max-w-[150px] truncate font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/40"
                >
                  {currentProject?.title}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/*===== FOOTER SIGNAL =====*/}

        <div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Strategy made visible through outcomes.
          </span>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30"
          >
            Explore / Compare / Continue
          </span>
        </div>
      </Container>
    </Section>
  );
}
