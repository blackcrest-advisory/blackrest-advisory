"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Clock3,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const MapSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-48 bottom-[-14rem] h-[36rem] w-[36rem] opacity-45"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 hidden opacity-[0.14] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                London / Headquarters
              </span>

              <span className="h-px w-12 bg-secondary/40" />
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl">
              Find Blackcrest
              <span className="block text-muted-foreground">
                in the heart of London.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
            }}
            className="max-w-xl text-sm leading-7 text-body sm:text-base lg:justify-self-end"
          >
            Our London base puts us close to one of Europe&apos;s most active
            business and technology ecosystems, while our delivery model remains
            international and flexible.
          </motion.p>
        </div>

        {/* Main locator */}
        <div className="grid border-b border-border lg:grid-cols-[0.38fr_0.62fr]">
          {/* Info panel */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-12 lg:pr-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/50">
                  Office profile
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-heading">
                  London
                </h3>
              </div>

              <span className="font-mono text-[8px] text-secondary">
                BCR / LDN
              </span>
            </div>

            <div className="mt-8 border-t border-border">
              {/* Address */}
              <div className="flex gap-4 border-b border-border py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
                  <Building2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                    Address
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-heading">
                    101 Bishopsgate
                  </p>

                  <p className="text-sm leading-6 text-muted-foreground">
                    London EC2M 3AB
                    <br />
                    United Kingdom
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 border-b border-border py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
                  <Clock3 className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    By appointment
                  </p>

                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    Meetings can be arranged in person or remotely.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                    Contact
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    hello@blackcrestadvisory.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                href="https://www.google.com/maps/search/?api=1&query=101+Bishopsgate+London+EC2M+3AB"
                className="group"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Get directions
                <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              <Button variant="outline" size="sm" href="/contact">
                Arrange a meeting
              </Button>
            </div>

            <div className="mt-8 border-l border-secondary/30 pl-4">
              <p className="text-xs leading-6 text-muted-foreground">
                Visiting is optional. Blackcrest works with clients across
                Europe through a remote-first, internationally connected model.
              </p>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[500px] overflow-hidden bg-muted sm:min-h-[560px] lg:min-h-[620px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.905402439892!2d-0.081784!3d51.515102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876034c4fe4c20d%3A0x9d93f8440d6b5b5b!2sBishopsgate%2C%20London!5e0!3m2!1sen!2suk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blackcrest Advisory London Office"
              className="absolute inset-0 h-full w-full grayscale-[0.15] contrast-[0.95]"
            />

            {/* subtle map framing */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/50" />

            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 border border-border/70 bg-background/85 px-3 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_var(--color-secondary)]"/>

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground">
                London HQ
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-5 right-5 hidden font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/60 sm:block">
              51.5151° N / 0.0818° W
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            London is our primary base, but our work and client relationships
            extend across Europe.
          </p>

          <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40">
            London
            <span className="text-secondary">→</span>
            Europe
            <span className="text-secondary">→</span>
            Remote delivery
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
