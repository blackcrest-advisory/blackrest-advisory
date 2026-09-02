"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { fadeInUp } from "@/lib/utils/animations";

export const SupportSection = () => {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-secondary/[0.09] blur-[100px]"
      />

      {/* secondary soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-[20%] h-56 w-56 rounded-full bg-primary/[0.05] blur-[90px]"
      />

      {/* architectural pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] lg:block"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              var(--color-border) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "12.5% 100%",
        }}
      />

      {/* top gold signal */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent"/>

      <div className="relative z-10 grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-7 lg:py-7 xl:px-8">
        {/*===== RELATIONSHIP SIDE =====*/}

        <div className="flex min-w-0 items-start gap-4 sm:gap-5">
          {/* avatar */}
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center border border-secondary/20 bg-secondary/[0.04] p-1 shadow-[var(--shadow-card)]">
              <Avatar
                name="Blackcrest Support"
                size="md"
                className="h-full w-full text-lg"
              />
            </div>

            {/* active status */}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center border-2 border-card bg-success">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {/* metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Blackcrest support
              </span>

              <span className="h-px w-7 bg-secondary/30" />
            </div>

            <div className="mt-2">
              <p className="text-xs font-medium text-muted-foreground">
                Contact Blackcrest
              </p>

              <h3 className="mt-0.5 text-xl font-semibold tracking-[-0.025em] text-heading sm:text-2xl">
                Support for your project
              </h3>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Contact us for project coordination, questions about your work,
              or help with your Blackcrest account.
            </p>

            {/* contact details */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
              <div className="flex min-w-0 items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-secondary"/>

                <span className="truncate text-xs text-foreground/75">
                  careselenite@gmail.com
                </span>
              </div>

              <span className="hidden h-3 w-px bg-border sm:block"/>

              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-secondary"/>

                <span className="text-xs text-foreground/75">
                  +88 01647-660300
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*===== ACTION PANEL =====*/}

        <div className="border-t border-border pt-5 lg:min-w-[310px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                Direct access
              </p>

              <p className="mt-1 text-sm font-semibold text-heading">
                Get in touch
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Button
              href="tel:+8801647660300"
              variant="primary"
              size="sm"
              className="group w-full justify-between"
            >
              <span className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                Call Blackcrest
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.12em] opacity-60">
                Call
              </span>
            </Button>

            <Button
              href="mailto:careselenite@gmail.com"
              variant="outline"
              size="sm"
              className="group w-full justify-between"
            >
              <span className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Email
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/50">
                Email
              </span>
            </Button>
          </div>

          {/* availability */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Contact details
              </span>
            </div>

            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-secondary">
              Blackcrest
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
