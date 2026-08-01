"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { projects } from "@/content-data/digital-marketing/clientDeliveryProjectsData";
import { fadeInUp } from "@/lib/utils/animations";
import { motion } from "framer-motion";

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
    //===== Featured Work Carousel Section =====//
    <Section className="border-border/50 bg-card">
      <Container>
        {/*===== Section header =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            Featured Work
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Browse Through Our Case Study Portfolio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See how we positively impacted growth and bottom-line revenue for
            our clients.
          </p>
        </motion.div>

        {/*===== Carousel =====*/}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <Card
                    padding="lg"
                    hoverEffect
                    className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
                  >
                    {/*===== Project image =====*/}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/*===== Project content =====*/}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
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

                      {/*===== Metrics =====*/}
                      <div className="grid grid-cols-3 gap-4 border-t border-border/30 pt-4">
                        {project.metrics.map((metric, i) => (
                          <div key={i}>
                            <div className="text-2xl font-bold text-secondary">
                              {metric.value}
                            </div>
                            <div className="text-xs leading-tight text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/*===== Navigation buttons =====*/}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full border border-border/60 bg-background p-3 shadow-lg transition-colors hover:bg-muted lg:-translate-x-6"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full border border-border/60 bg-background p-3 shadow-lg transition-colors hover:bg-muted lg:translate-x-6"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/*===== Dots =====*/}
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-8 bg-secondary"
                  : "w-2 bg-border/60 hover:bg-border"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
