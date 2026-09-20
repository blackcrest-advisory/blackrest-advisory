"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Globe2,
  Handshake,
  Lightbulb,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { businessHelpOptions } from "@/content-data/business-development/businessHelpFinderData";

const optionIcons = {
  plan: Lightbulb,
  website: Globe2,
  customers: Users,
  sales: Handshake,
};

export default function BusinessHelpFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      initialFocus={closeButtonRef}
      className="relative z-[100]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-navy-deep/80 backdrop-blur-md transition-opacity duration-300 data-closed:opacity-0 motion-reduce:transition-none"
      />

      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <DialogPanel
          transition
          className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-card text-foreground shadow-[0_36px_100px_rgb(0_0_0/0.42)] transition duration-300 data-closed:translate-y-4 data-closed:scale-[0.98] data-closed:opacity-0 motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)]"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close business help popup"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-secondary/40 hover:text-heading focus-visible:outline-2 focus-visible:outline-secondary sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="grid md:min-h-[590px] md:grid-cols-[0.78fr_1.22fr]">
            <div className="relative overflow-hidden bg-navy-deep px-6 py-6 text-white sm:px-9 md:py-10">
              <div aria-hidden="true" className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-gold-light/10" />
              <div aria-hidden="true" className="absolute -left-20 -top-20 h-56 w-56 rounded-full border border-gold-light/10" />
              <div aria-hidden="true" className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/2 translate-y-1/2 rounded-full bg-gold-light/10 blur-3xl" />

              <div className="relative flex h-full flex-col">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                  <Compass className="h-4 w-4" aria-hidden="true" />
                  Blackcrest Advisory
                </p>

                <div className="mt-10 hidden h-12 w-12 items-center justify-center rounded-full border border-gold-light/30 bg-gold-light/10 text-gold-light md:flex">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>

                <p className="mt-5 text-2xl font-semibold leading-[1.12] tracking-[-0.04em] md:mt-6 md:text-4xl">
                  Your challenge.
                  <span className="block text-gold-light">A clearer next step.</span>
                </p>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/65 md:mt-5 md:leading-7">
                  You do not need to know the name of the service. Start with the problem you want to solve.
                </p>

                <ul className="mt-8 hidden space-y-3 text-xs text-white/65 md:block">
                  {["Simple choices", "Clear direction", "Practical business support"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gold-light/30 text-gold-light">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto hidden border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/35 md:block">
                  Strategy · Execution · Growth
                </p>
              </div>
            </div>

            <div className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8 md:p-10 md:pt-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Choose one option
              </p>

              <DialogTitle
                className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.035em] text-heading sm:text-3xl"
              >
                What would you like help with?
              </DialogTitle>

              <Description className="mt-3 text-sm leading-6 text-body">
                Select the option that feels closest to your situation.
              </Description>

              <div className="mt-7 space-y-3">
                {businessHelpOptions.map((option, index) => {
                  const Icon = optionIcons[option.id];

                  return (
                    <Link
                      key={option.id}
                      href={option.href}
                      onClick={() => setIsOpen(false)}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-background px-4 py-4 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/[0.045] hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                      <span className="font-mono text-[9px] text-muted-foreground/55">0{index + 1}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/[0.06] text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-heading">{option.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-body">{option.description}</span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-secondary transition-colors group-hover:bg-secondary/10">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/services/business-development"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-heading hover:text-secondary"
                >
                  Not sure? See all business support
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="min-h-10 self-start text-xs text-muted-foreground underline-offset-4 hover:text-heading hover:underline sm:self-auto"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
