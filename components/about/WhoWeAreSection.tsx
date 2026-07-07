"use client";

import { Section } from "@/components/ui/Section";
import { IMAGE } from "@/constant/imagesConfig";
import Image from "next/image";

export const WhoWeAreSection = () => {
  return (
    <Section id="our-story" className="bg-muted">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4 md:px-10 max-w-9xl mx-auto">
        {/* Left – text content */}
        <div>
          <span className="text-sm font-semibold tracking-widest uppercase text-secondary">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primary dark:text-white relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-16 after:h-1 after:bg-secondary after:rounded">
            More Than a Digital Agency
          </h2>
          <p className="mt-8 text-body dark:text-body leading-relaxed">
            Blackcrest Advisory is a professional B2B International Digital
            Solutions company dedicated to helping European businesses thrive in
            an increasingly digital world. We operate as a full‑service digital
            agency <strong>and</strong> long‑term business growth partner —
            combining strategic thinking with hands‑on execution across
            technology, marketing, and sales.
          </p>
          <p className="mt-4 text-body dark:text-body leading-relaxed">
            We work with startups, SMEs, and enterprise organisations across
            Europe, delivering tailored digital transformation programmes that
            generate measurable results. Our model is built on long‑term
            partnerships, not one‑off transactions —{" "}
            <strong className="text-secondary">
              we succeed when our clients succeed.
            </strong>
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Mission
              </h4>
              <p className="text-sm text-body dark:text-body mt-1 leading-relaxed">
                Empower businesses with innovative digital solutions, strategic
                marketing, advanced technology, and professional sales support
                that drive sustainable growth.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Vision
              </h4>
              <p className="text-sm text-body dark:text-body mt-1 leading-relaxed">
                Become a trusted global B2B digital solutions partner for
                European businesses, providing world‑class services that stand
                alongside the best in the industry.
              </p>
            </div>
          </div>
        </div>

        {/* Right – image with floating badge */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={IMAGE.aboutHeroImage}
              alt="Blackcrest Advisory team collaboration"
              width={800}
              height={600}
              className="aspect-[4/3] h-auto w-full object-cover"
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary" />
          </div>
          {/* Floating badge – always visible, repositioned for mobile */}
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-card/90 backdrop-blur-sm rounded-xl shadow-xl px-4 py-3 md:px-6 md:py-4 border border-border">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">⭐</span>
              <div>
                <p className="text-sm md:text-base font-bold text-white dark:text-white">
                  4.9 / 5.0
                </p>
                <p className="text-xs md:text-sm text-white dark:text-body">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
