"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Mail, MapPin, Sparkles } from "lucide-react";

import { navLinks } from "@/constants/publicNavigations";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export default function Footer() {
  const servicesItem = navLinks.find((item) => item.name === "Services");
  const servicesLinks = servicesItem?.children || [];

  const companyLinks = navLinks.filter(
    (item) => item.name !== "Services" && item.name !== "Home",
  );

  const currentYear = new Date().getFullYear();

  return (
    <Section className="relative overflow-hidden bg-navy-deep py-0 text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46rem 24rem at 78% 10%, rgb(166 124 39 / 0.12), transparent 68%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.6) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.6) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Large footer rings */}
        <motion.div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full border border-white/[0.04]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-[18rem] w-[18rem] rounded-full border border-gold/[0.09]"
          animate={{ rotate: -360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Traveling signal */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[-10rem] top-[38%] h-px w-36 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_14px_rgb(166_124_39/0.5)]"
          animate={{
            x: ["0vw", "115vw"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative">
        {/* Top statement */}
        <div className="border-b border-white/10 py-12 sm:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-gold-light" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  Blackcrest Advisory
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.55 }}
                className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl"
              >
                Strategy, technology and growth
                <span className="block text-white/35">
                  built to move business forward.
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="max-w-lg text-sm leading-7 text-white/55 sm:text-base"
            >
              We work with ambitious businesses across Europe to create better
              digital systems, stronger customer experiences, and measurable
              commercial growth.
            </motion.p>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-12 sm:py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-1.5">
              <span className="text-2xl font-semibold tracking-[-0.03em] text-white">
                Blackcrest
              </span>

              <motion.span
                whileHover={{ scale: 1.4 }}
                className="text-2xl font-semibold text-gold"
              >
                .
              </motion.span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Empowering European businesses through technology, marketing,
              commercial strategy, and hands-on execution.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Strategy", "Technology", "Growth"].map((item) => (
                <span
                  key={item}
                  className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <FooterColumn title="Services">
            {servicesLinks.map((item) => (
              <FooterLink key={item.id} href={item.link} label={item.name} />
            ))}
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            {companyLinks.map((item) => (
              <FooterLink key={item.id} href={item.link} label={item.name} />
            ))}
          </FooterColumn>

          {/* Contact */}
          <div>
            <FooterTitle>Get in touch</FooterTitle>

            <div className="mt-5 space-y-4">
              <ContactItem
                icon={Mail}
                label="Email"
                value="hello@blackcrestadvisory.com"
                href="mailto:hello@blackcrestadvisory.com"
              />

              <ContactItem
                icon={Globe2}
                label="Website"
                value="blackcrestadvisory.com"
                href="https://www.blackcrestadvisory.com"
              />

              <ContactItem
                icon={MapPin}
                label="Location"
                value="Europe · Remote"
              />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/30">
              © {currentYear} Blackcrest Advisory. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/privacy"
                className="text-white/35 transition-colors hover:text-gold-light"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-white/35 transition-colors hover:text-gold-light"
              >
                Terms
              </Link>

              <span className="hidden h-1 w-1 rounded-full bg-gold/50 sm:block" />

              <div className="flex items-center gap-2 text-white/35">
                <span>Built for</span>
                <span className="font-medium text-white/60">Europe</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer pieces                                                              */
/* -------------------------------------------------------------------------- */

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
      {children}
    </h3>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>

      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
    >
      <span className="relative">
        {label}

        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
      </span>

      <ArrowUpRight className="h-3 w-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
    </Link>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold/15 bg-gold/[0.06] text-gold-light transition-colors duration-300 group-hover:bg-gold/10">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/25">
          {label}
        </p>

        <p className="mt-1 break-words text-sm text-white/55 transition-colors duration-300 group-hover:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}
