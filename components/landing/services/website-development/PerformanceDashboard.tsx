"use client";

//===== imports =====//
import {
  Activity,
  CheckCircle2,
  Clock3,
  Eye,
  Gauge,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// METRICS
//==============================================================//

const metrics = [
  {
    label: "Performance",
    value: "99",
    numericValue: 99,
    unit: "",
    description: "Speed, runtime efficiency & responsiveness",
    icon: Zap,
  },
  {
    label: "SEO",
    value: "100",
    numericValue: 100,
    unit: "",
    description: "Search structure, metadata & discoverability",
    icon: Search,
  },
  {
    label: "Accessibility",
    value: "100",
    numericValue: 100,
    unit: "",
    description: "Inclusive UX, semantics & keyboard support",
    icon: Eye,
  },
  {
    label: "Best Practices",
    value: "98",
    numericValue: 98,
    unit: "",
    description: "Security, standards & implementation quality",
    icon: CheckCircle2,
  },
];

//==============================================================//
// WEB VITALS
//==============================================================//

const webVitals = [
  {
    label: "Load Time",
    value: "0.9",
    unit: "s",
    description: "Fast initial page delivery",
    icon: Clock3,
  },
  {
    label: "CLS",
    value: "0.01",
    unit: "",
    description: "Minimal visual layout shift",
    icon: Activity,
  },
];

//==============================================================//
// PERFORMANCE DASHBOARD
//==============================================================//

export default function PerformanceDashboard() {
  return (
    <Section
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:96px_100%] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        />

        {/* restrained ambience */}
        <div
          className="absolute -right-40 top-[12%] h-[360px] w-[360px] rounded-full bg-secondary/[0.045] blur-[140px]"
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* HEADER                                              */}
        {/* ==================================================== */}

        <div
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16 lg:pb-14"
        >
          <div>
            <div className="flex items-center gap-3">
              <Gauge className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                06 / Performance Audit
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            >
              Performance is treated as an engineering requirement, not a
              finishing touch.
            </p>
          </div>

          <div>
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[58px]"
            >
              Built to score well.
              <span className="block text-secondary">
                Built to feel even faster.
              </span>
            </h2>

            <p
              className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8"
            >
              We optimise structure, rendering, assets, accessibility and
              delivery so every website performs reliably across real devices
              and real network conditions.
            </p>
          </div>
        </div>

        {/* ==================================================== */}
        {/* AUDIT BOARD                                         */}
        {/* ==================================================== */}

        <div
          className="mt-10 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] lg:mt-14"
        >
          {/* board header */}
          <div
            className="flex flex-col gap-3 border-b border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Quality report
              </span>
            </div>

            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary"
            >
              Production benchmark
            </span>
          </div>

          {/* ================================================== */}
          {/* MAIN SCORE GRID                                   */}
          {/* ================================================== */}

          <div
            className="grid md:grid-cols-2 xl:grid-cols-4"
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <article
                  key={metric.label}
                  className="group relative min-w-0 border-b border-r border-border px-5 py-6 transition-colors duration-300 hover:bg-muted/10 md:px-6 xl:border-b-0"
                >
                  {/* top accent */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[2px] w-10 bg-secondary"
                  />

                  {/* index + icon */}
                  <div
                    className="flex items-start justify-between gap-4"
                  >
                    <span
                      className="font-mono text-[7px] font-semibold text-secondary/55"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* score */}
                  <div className="mt-8">
                    <div className="flex items-end gap-2">
                      <span
                        className="text-5xl font-semibold leading-none tracking-[-0.055em] text-heading sm:text-6xl"
                      >
                        {metric.value}
                      </span>

                      {metric.unit && (
                        <span
                          className="pb-1 text-sm font-medium text-muted-foreground"
                        >
                          {metric.unit}
                        </span>
                      )}
                    </div>

                    <h3
                      className="mt-4 text-sm font-semibold text-heading"
                    >
                      {metric.label}
                    </h3>

                    <p
                      className="mt-2 text-xs leading-5 text-muted-foreground"
                    >
                      {metric.description}
                    </p>
                  </div>

                  {/* score rail */}
                  <div className="mt-7">
                    <div
                      className="flex items-center justify-between gap-3"
                    >
                      <span
                        className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/30"
                      >
                        Score
                      </span>

                      <span
                        className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-success"
                      >
                        Excellent
                      </span>
                    </div>

                    <div
                      className="mt-2 h-[3px] overflow-hidden bg-muted"
                    >
                      <div
                        className="h-full bg-secondary"
                        style={{
                          width: `${metric.numericValue}%`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* WEB VITALS                                        */}
          {/* ================================================== */}

          <div
            className="grid border-t border-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            {webVitals.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <article
                  key={metric.label}
                  className={`
                    min-w-0
                    px-5 py-6
                    md:px-6

                    ${
                      index === 0
                        ? "border-b border-border lg:border-b-0 lg:border-r"
                        : ""
                    }
                  `}
                >
                  <div
                    className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary"
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <span
                            className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary"
                          >
                            Core Web Vital
                          </span>

                          <h3
                            className="mt-1 text-sm font-semibold text-heading"
                          >
                            {metric.label}
                          </h3>
                        </div>
                      </div>

                      <p
                        className="mt-3 text-xs leading-5 text-muted-foreground"
                      >
                        {metric.description}
                      </p>
                    </div>

                    <div
                      className="flex items-end gap-2 sm:text-right"
                    >
                      <span
                        className="text-4xl font-semibold tracking-[-0.05em] text-heading"
                      >
                        {metric.value}
                      </span>

                      {metric.unit && (
                        <span
                          className="pb-1 text-sm text-muted-foreground"
                        >
                          {metric.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ==================================================== */}
        {/* QUALITY SUMMARY                                     */}
        {/* ==================================================== */}

        <div
          className="mt-6 grid overflow-hidden border border-border bg-card md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch"
        >
          <div
            className="grid gap-5 px-5 py-5 sm:grid-cols-3 sm:px-6"
          >
            <SummaryItem icon={Zap} label="PageSpeed" value="98+" />

            <SummaryItem
              icon={ShieldCheck}
              label="Quality"
              value="Production Ready"
            />

            <SummaryItem
              icon={Sparkles}
              label="Approach"
              value="Performance First"
            />
          </div>

          <div
            className="flex items-center border-t border-border bg-primary px-5 py-5 text-white md:border-l md:border-t-0 sm:px-6"
          >
            <div>
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light"
              >
                Performance standard
              </span>

              <p
                className="mt-2 max-w-[260px] text-xs leading-5 text-white/42"
              >
                Fast enough to benchmark. Stable enough for production.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* FOOTER                                              */}
        {/* ==================================================== */}

        <div
          className="mt-8 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Measure → Diagnose → Optimise → Validate
          </span>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30"
          >
            Blackcrest / Performance Engineering
          </span>
        </div>
      </Container>
    </Section>
  );
}

//==============================================================//
// SUMMARY ITEM
//==============================================================//

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-secondary" />

        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35"
        >
          {label}
        </span>
      </div>

      <p
        className="mt-2 text-xs font-semibold text-heading"
      >
        {value}
      </p>
    </div>
  );
}
