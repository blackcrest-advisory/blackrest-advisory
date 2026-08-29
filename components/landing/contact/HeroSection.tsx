"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const startingPoints = [
  "A project you want to launch or improve",
  "A digital challenge that needs clearer direction",
  "A question about the right next step",
];

const contactChannels = [
  {
    label: "Email",
    value: "careselenite@gmail.com",
    href: "mailto:careselenite@gmail.com",
    icon: Mail,
  },
  {
    label: "Call",
    value: "+88 01647-660300",
    href: "tel:+8801647660300",
    icon: Phone,
  },
  {
    label: "Visit",
    value: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps/search/?api=1&query=Level-6%2C+Building-1%2C+Golden+Shower%2C+Mazar+Road%2C+Dhaka-1216%2C+Bangladesh",
    icon: MapPin,
  },
];

export const HeroSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative isolate overflow-hidden bg-navy-deep py-0 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-48 -top-36 h-[38rem] w-[38rem]"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.18), transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "25% 100%",
          }}
        />
        <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      <Container className="relative py-8 sm:py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="flex items-center justify-between border-b border-white/10 pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-[9px]">
              Blackcrest / Contact
            </span>
          </div>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">
            Dhaka, Bangladesh
          </span>
        </motion.div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-14">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0 : 0.65 }}
          >
            <div className="flex items-center gap-3">
              <MessageSquareText className="h-4 w-4 text-gold-light" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                Start a conversation
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-[clamp(2.6rem,4.4vw,4.55rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Tell us what you are
              <span className="block text-white/40">trying to move forward.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
              You do not need a perfect brief. Share the challenge, project, or
              idea in front of you, and we will help you identify a practical
              next step.
            </p>

            <Button
              variant="primary"
              size="md"
              href="#contact-form"
              className="group mt-7 bg-secondary text-navy-deep hover:bg-gold-light"
            >
              Send an enquiry
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Button>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.6 }}
            className="border border-white/12 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-7"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.19em] text-white/40">
              A useful first message can be simple
            </p>

            <div className="mt-5 border-t border-white/10">
              {startingPoints.map((point, index) => (
                <div key={point} className="flex items-start gap-4 border-b border-white/10 py-4 last:border-none">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-gold-light">
                    <Check className="h-3 w-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-6 text-white/75">{point}</p>
                  </div>
                  <span className="font-mono text-[8px] text-white/25">0{index + 1}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 border-l border-secondary/50 pl-4 text-xs leading-6 text-white/45">
              Context is enough to begin. We can work out the right scope and
              support together.
            </p>
          </motion.aside>
        </div>

        <div className="grid border-t border-white/10 sm:grid-cols-3">
          {contactChannels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <motion.a
                key={channel.label}
                href={channel.href}
                target={channel.label === "Visit" ? "_blank" : undefined}
                rel={channel.label === "Visit" ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.35 + index * 0.07 }}
                className={`group flex items-center gap-3 py-5 transition-colors hover:text-gold-light sm:px-5 ${index > 0 ? "sm:border-l sm:border-white/10" : "sm:pl-0"}`}
              >
                <Icon className="h-4 w-4 shrink-0 text-secondary" />
                <div className="min-w-0">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                    {channel.label}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-white/75 transition-colors group-hover:text-gold-light">
                    {channel.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
