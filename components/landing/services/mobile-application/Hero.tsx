"use client";

//===== imports =====//
import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";

import {
  ArrowRight,
  Bell,
  Check,
  CircleDot,
  CreditCard,
  Fingerprint,
  MapPin,
  MessageCircle,
  Moon,
  Radio,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { IMAGE } from "@/constants/imagesConfig";

//==============================================================//
// CAPABILITIES
//==============================================================//

const capabilities = [
  "iOS & Android",
  "Cross-platform",
  "Native Performance",
  "Secure by Design",
];

//==============================================================//
// FEATURE MODULES
//==============================================================//

const featureModules = [
  {
    label: "Push",
    detail: "Notifications",
    icon: Bell,
    position: "left-2 top-[13%] sm:left-[5%]",
  },
  {
    label: "Secure",
    detail: "Authentication",
    icon: Fingerprint,
    position: "right-2 top-[12%] sm:right-[4%]",
  },
  {
    label: "Real-time",
    detail: "Messaging",
    icon: MessageCircle,
    position: "left-0 top-[44%] sm:left-[1%]",
  },
  {
    label: "Payments",
    detail: "Transactions",
    icon: CreditCard,
    position: "right-0 top-[42%] sm:right-[1%]",
  },
  {
    label: "Location",
    detail: "GPS Services",
    icon: MapPin,
    position: "bottom-[9%] left-[5%]",
  },
  {
    label: "Offline",
    detail: "Connectivity",
    icon: Wifi,
    position: "bottom-[8%] right-[5%]",
  },
];

//==============================================================//
// MOBILE APPLICATION HERO
//==============================================================//

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-background py-0"
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* soft vertical guides */}
        <div
          className="absolute left-[7%] top-0 h-full w-px bg-border/45"
        />

        <div
          className="absolute right-[7%] top-0 h-full w-px bg-border/45"
        />

        {/* subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(var(--color-border)_0.8px,transparent_0.8px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        />

        {/* restrained glow */}
        <div
          className="absolute -right-28 top-[12%] h-[440px] w-[440px] rounded-full bg-secondary/[0.06] blur-[150px]"
        />

        <div
          className="absolute -left-32 bottom-[5%] h-[380px] w-[380px] rounded-full bg-primary/[0.045] blur-[150px]"
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* TOP RAIL                                            */}
        {/* ==================================================== */}

        <div
          className="flex flex-col gap-3 border-x border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
        >
          <div
            className="flex items-center gap-3"
          >
            <CircleDot
              className="h-3.5 w-3.5 text-secondary"
            />

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
            >
              Mobile Product Engineering
            </span>
          </div>

          <div
            className="flex items-center gap-5"
          >
            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35"
            >
              iOS / Android
            </span>

            <span
              className="hidden font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary sm:block"
            >
              Mobile / 01
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* HERO                                                */}
        {/* ==================================================== */}

        <div
          className="grid min-w-0 border-x border-border lg:min-h-[720px] lg:grid-cols-[minmax(0,0.9fr)_minmax(500px,1.1fr)]"
        >
          {/* ================================================== */}
          {/* LEFT CONTENT                                      */}
          {/* ================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -28,
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
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-w-0 flex-col justify-center border-b border-border px-5 py-14 sm:px-7 sm:py-16 lg:border-b-0 lg:border-r lg:px-8 lg:py-20 xl:px-10"
          >
            {/* eyebrow */}
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <div
                className="flex h-8 w-8 items-center justify-center border border-secondary/20 bg-secondary/[0.045] text-secondary"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </div>

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                Mobile Applications
              </span>

              <span
                className="h-px w-10 bg-secondary/35"
              />
            </div>

            {/* ================================================== */}
            {/* HEADLINE                                          */}
            {/* ================================================== */}

            <h1
              className="mt-8 max-w-[760px] text-[42px] font-semibold leading-[0.97] tracking-[-0.06em] text-heading sm:text-[56px] lg:text-[60px] xl:text-[68px]"
            >
              Built for the
              <span
                className="block text-secondary"
              >
                moments between taps.
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-sm leading-7 text-body sm:text-base sm:leading-8"
            >
              From first concept to App Store release, Blackcrest designs and
              engineers mobile products that feel intuitive, perform reliably,
              and create meaningful experiences on every screen.
            </p>

            {/* ================================================== */}
            {/* CAPABILITIES                                      */}
            {/* ================================================== */}

            <div
              className="mt-7 grid max-w-lg grid-cols-2 gap-x-5 gap-y-3"
            >
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-2"
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center border border-secondary/25 text-secondary"
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>

                  <span
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {capability}
                  </span>
                </div>
              ))}
            </div>

            {/* ================================================== */}
            {/* CTA                                               */}
            {/* ================================================== */}

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                href="#contact"
                size="md"
                className="group w-full !rounded-md sm:w-auto"
              >
                Start Your App
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="outline"
                size="md"
                href="#work"
                className="w-full !rounded-md sm:w-auto"
              >
                See Our Work
              </Button>
            </div>

            {/* ================================================== */}
            {/* PRODUCT SIGNALS                                   */}
            {/* ================================================== */}

            <div
              className="mt-9 grid grid-cols-2 border-y border-border"
            >
              <div
                className="border-r border-border py-4 pr-4"
              >
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35"
                >
                  Experience
                </span>

                <p
                  className="mt-2 text-xs font-semibold text-heading"
                >
                  Touch-first UX
                </p>
              </div>

              <div
                className="py-4 pl-4"
              >
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35"
                >
                  Engineering
                </span>

                <p
                  className="mt-2 text-xs font-semibold text-heading"
                >
                  Native-feeling performance
                </p>
              </div>
            </div>

            {/* original stats */}
            <div
              className="mt-6 flex flex-wrap items-center gap-5"
            >
              <div>
                <span
                  className="text-sm font-semibold text-secondary"
                >
                  4.9★
                </span>

                <span
                  className="ml-2 text-xs text-muted-foreground"
                >
                  App Store
                </span>
              </div>

              <span
                className="h-5 w-px bg-border"
              />

              <div>
                <span
                  className="text-sm font-semibold text-secondary"
                >
                  10M+
                </span>

                <span
                  className="ml-2 text-xs text-muted-foreground"
                >
                  Downloads
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* RIGHT / INTERACTION LAB                           */}
          {/* ================================================== */}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.96,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[650px] overflow-hidden bg-muted/10 px-4 py-8 sm:px-6 sm:py-10 lg:min-h-0 lg:px-8 lg:py-12"
          >
            {/* ================================================= */}
            {/* LAB GRID                                         */}
            {/* ================================================= */}

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px]"
            />

            {/* spotlight */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/[0.07] blur-[110px]"
            />

            {/* ================================================= */}
            {/* MAIN INTERACTION FRAME                           */}
            {/* ================================================= */}

            <div
              className="relative mx-auto h-full min-h-[570px] max-w-[650px] border border-border bg-background/60 backdrop-blur-sm"
            >
              {/* =============================================== */}
              {/* FRAME HEADER                                    */}
              {/* =============================================== */}

              <div
                className="flex items-center justify-between gap-4 border-b border-border bg-background/70 px-4 py-3 sm:px-5"
              >
                <div
                  className="flex items-center gap-3"
                >
                  <Radio className="h-3.5 w-3.5 text-secondary" />

                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/45"
                  >
                    Interaction environment
                  </span>
                </div>

                <div
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-success"
                  />

                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/35"
                  >
                    Live
                  </span>
                </div>
              </div>

              {/* =============================================== */}
              {/* PHONE STAGE                                     */}
              {/* =============================================== */}

              <div
                className="relative flex min-h-[510px] items-center justify-center overflow-hidden px-4 py-12"
              >
                {/* feature modules */}
                {featureModules.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.label}
                      initial={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              scale: 0.9,
                            }
                      }
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 1,
                              scale: 1,
                            }
                      }
                      transition={{
                        delay: 0.4 + index * 0.08,
                        duration: 0.45,
                      }}
                      className={`
                          absolute
                          z-20
                          hidden
                          w-[132px]
                          border border-border
                          bg-card/95
                          px-3 py-3
                          shadow-[var(--shadow-card)]
                          backdrop-blur
                          sm:block
                          ${feature.position}
                        `}
                    >
                      <div
                        className="flex items-center gap-3"
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                          <span
                            className="block text-[10px] font-semibold text-heading"
                          >
                            {feature.label}
                          </span>

                          <span
                            className="mt-0.5 block truncate font-mono text-[6px] uppercase tracking-[0.1em] text-muted-foreground/35"
                          >
                            {feature.detail}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* ============================================= */}
                {/* CONNECTOR LINES                               */}
                {/* ============================================= */}

                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 500"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
                >
                  <path
                    d="
                      M300 250 L110 95
                      M300 250 L490 95
                      M300 250 L95 245
                      M300 250 L505 235
                      M300 250 L125 420
                      M300 250 L475 420
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />

                  {!shouldReduceMotion && (
                    <>
                      <motion.circle
                        r="3"
                        fill="currentColor"
                        className="text-secondary"
                        animate={{
                          cx: [300, 110, 300],
                          cy: [250, 95, 250],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      <motion.circle
                        r="3"
                        fill="currentColor"
                        className="text-secondary"
                        animate={{
                          cx: [300, 505, 300],
                          cy: [250, 235, 250],
                        }}
                        transition={{
                          duration: 5,
                          delay: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </>
                  )}
                </svg>

                {/* ============================================= */}
                {/* PHONE                                         */}
                {/* ============================================= */}

                <div
                  className="relative z-10 flex items-center justify-center"
                >
                  {/* phone glow */}
                  <div
                    aria-hidden="true"
                    className="absolute h-[330px] w-[220px] rounded-full bg-secondary/[0.1] blur-[80px]"
                  />

                  {/* touch rings */}
                  {!shouldReduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute -right-5 top-[38%] h-14 w-14 rounded-full border border-secondary/25"
                      animate={{
                        scale: [0.7, 1.5, 0.7],
                        opacity: [0, 0.65, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                      }}
                    />
                  )}

                  {/* device frame */}
                  <div
                    className="relative overflow-hidden rounded-[32px] border-[5px] border-primary bg-primary p-[3px] shadow-[0_28px_70px_rgba(10,22,40,0.24)]"
                  >
                    <div
                      className="relative overflow-hidden rounded-[24px] bg-card"
                    >
                      <Image
                        src={IMAGE.mobileHero}
                        alt="Mobile application interface"
                        width={280}
                        height={560}
                        priority
                        className="h-[360px] w-[190px] object-cover sm:h-[410px] sm:w-[215px]"
                      />

                      {/* subtle image treatment */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
                      />
                    </div>

                    {/* speaker */}
                    <div
                      className="absolute left-1/2 top-2 z-20 h-1.5 w-12 -translate-x-1/2 rounded-full bg-primary"
                    />
                  </div>

                  {/* gesture indicator */}
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: [0, -18, 0],
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-7 left-1/2 z-20 -translate-x-1/2"
                  >
                    <span
                      className="block h-1 w-12 rounded-full bg-secondary/60"
                    />
                  </motion.div>
                </div>

                {/* ============================================= */}
                {/* MOBILE FEATURES                               */}
                {/* ============================================= */}

                <div
                  className="absolute bottom-5 left-4 right-4 z-20 grid grid-cols-3 gap-2 sm:hidden"
                >
                  <MobileFeature icon={Bell} label="Push" />

                  <MobileFeature icon={MessageCircle} label="Chat" />

                  <MobileFeature icon={CreditCard} label="Payments" />
                </div>
              </div>

              {/* =============================================== */}
              {/* SYSTEM FOOTER                                   */}
              {/* =============================================== */}

              <div
                className="grid grid-cols-3 border-t border-border"
              >
                <DeviceMetric label="Platforms" value="iOS + Android" />

                <DeviceMetric label="Experience" value="Touch First" />

                <DeviceMetric label="Security" value="Protected" />
              </div>
            </div>

            {/* frame corners */}
            <span
              aria-hidden="true"
              className="absolute left-1 top-1 h-5 w-5 border-l border-t border-secondary/30"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1 h-5 w-5 border-b border-r border-secondary/30"
            />
          </motion.div>
        </div>

        {/* ==================================================== */}
        {/* BOTTOM PRODUCT RAIL                                 */}
        {/* ==================================================== */}

        <div
          className="grid border-x border-t border-border sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        >
          <div
            className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8"
          >
            <Smartphone
              className="h-3.5 w-3.5 text-secondary"
            />

            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40"
            >
              Discover → Design → Build → Test → Release
            </span>
          </div>

          <div
            className="flex items-center gap-3 border-t border-border px-4 py-4 sm:border-l sm:border-t-0 sm:px-6"
          >
            <ShieldCheck
              className="h-3.5 w-3.5 text-secondary"
            />

            <span
              className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35"
            >
              Built for real-world use
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;

//==============================================================//
// MOBILE FEATURE
//==============================================================//

function MobileFeature({
  icon: Icon,
  label,
}: {
  icon: typeof Bell;
  label: string;
}) {
  return (
    <div
      className="border border-border bg-card/95 px-2 py-2.5 text-center backdrop-blur"
    >
      <Icon
        className="mx-auto h-3.5 w-3.5 text-secondary"
      />

      <span
        className="mt-1.5 block text-[9px] font-medium text-heading"
      >
        {label}
      </span>
    </div>
  );
}

//==============================================================//
// DEVICE METRIC
//==============================================================//

function DeviceMetric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="min-w-0 border-r border-border px-3 py-3.5 last:border-r-0 sm:px-4"
    >
      <span
        className="block truncate font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/30"
      >
        {label}
      </span>

      <span
        className="mt-2 block truncate text-[10px] font-semibold text-heading"
      >
        {value}
      </span>
    </div>
  );
}
