"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { businessChallenges } from "@/content-data/business-development/businessDevelopmentData";

export default function BusinessDevelopmentIntro() {
  const [selected, setSelected] = useState(0);
  const challenge = businessChallenges[selected];

  return (
    <Section id="how-we-help" className="scroll-mt-24 border-b border-border bg-muted/30 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Business development
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl">
              Your next step starts with the right help.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-body">
              Blackcrest advises people starting a business and helps existing
              businesses move forward. Together, we turn your questions into a
              clear plan—and support you in putting it into practice.
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <span className="text-5xl font-light tracking-tight text-secondary">07</span>
              <p className="max-w-64 text-sm leading-6 text-body">
                Connected areas of support, from business setup to customer retention.
              </p>
            </div>
            <Link href="/services/business-development" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-heading underline decoration-secondary/50 underline-offset-8 hover:text-secondary">
              Discover the Starter Package <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-surface)] border border-border bg-card shadow-[var(--shadow-card)]">
            <fieldset className="p-6 pb-0 sm:p-8 sm:pb-0">
              <legend className="sr-only">What do you need help with?</legend>
              <p aria-hidden="true" className="mb-4 text-sm font-semibold text-heading">What do you need help with?</p>
              <div className="flex flex-col gap-2">
                {businessChallenges.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected === index}
                    aria-controls="business-challenge-detail"
                    onClick={() => setSelected(index)}
                    className={`flex min-h-12 items-center justify-between gap-4 rounded-[var(--radius-control)] border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${selected === index ? "border-secondary bg-secondary/10 text-heading" : "border-border text-body hover:border-secondary/50 hover:bg-muted/50"}`}
                  >
                    {item.label}
                    <ArrowRight className={`h-4 w-4 shrink-0 ${selected === index ? "text-secondary" : "text-muted-foreground"}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
            <div id="business-challenge-detail" aria-live="polite" aria-atomic="true" className="p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">How Blackcrest can help</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-heading sm:text-2xl">{challenge.title}</h3>
              <p className="mt-3 text-sm leading-6 text-body">{challenge.description}</p>
              <ul className="mt-5 space-y-2">
                {challenge.steps.map((step) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-body">
                    <Check className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{step}
                  </li>
                ))}
              </ul>
              <Link href={challenge.href} className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90">
                {challenge.linkLabel}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
