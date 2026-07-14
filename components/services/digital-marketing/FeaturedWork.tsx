"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/buttons/Button";
import Image from "next/image";
import { projects } from "@/content/digital-marketing/clientDeliveryProjectsData";

export default function FeaturedWork() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-card-bg/40 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-secondary font-medium tracking-wider uppercase text-sm">
            Featured Work
          </span>
          <h2 className="text-heading text-3xl md:text-4xl font-bold mt-2">
            Browse Through Our Case Study Portfolio
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            See how we positively impacted growth and bottom-line revenue for
            our clients.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 lg:p-10 rounded-2xl border border-border/40">
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center text-body/30">
                      <Image
                        height={300}
                        width={300}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="text-heading text-2xl md:text-3xl font-bold">
                        {project.title}
                      </h3>
                      <p className="text-body leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary" size="sm">
                          View Website
                        </Button>
                        <Button variant="outline" size="sm">
                          View Case Study
                        </Button>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                        {project.metrics.map((metric, i) => (
                          <div key={i}>
                            <div className="text-secondary text-2xl font-bold">
                              {metric.value}
                            </div>
                            <div className="text-body text-xs leading-tight">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 p-3 rounded-full bg-background border border-border/60 shadow-lg hover:bg-secondary/5 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-heading" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 p-3 rounded-full bg-background border border-border/60 shadow-lg hover:bg-secondary/5 transition-colors"
          >
            <ArrowRight className="h-5 w-5 text-heading" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-8 bg-secondary"
                  : "w-2 bg-border/60 hover:bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
