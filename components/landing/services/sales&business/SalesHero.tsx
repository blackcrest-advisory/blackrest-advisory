import { ArrowRight, Handshake, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const supportAreas = [
  "Clearer commercial priorities",
  "Practical lead and pipeline processes",
  "Useful sales materials and follow-up",
  "Stronger customer relationships",
];

export const SalesHero = () => {
  return (
    <Section className="relative isolate overflow-hidden bg-background py-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-12 h-[28rem] w-[28rem] rounded-full bg-secondary/[0.06] blur-[150px]" />
        <div className="absolute inset-0 hidden opacity-[0.2] lg:block [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:25%_100%]" />
      </div>

      <Container>
        <div className="flex flex-col gap-3 border-x border-b border-border px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Sales &amp; Business Support
            </span>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/55">
            Blackcrest / Commercial support
          </span>
        </div>

        <div className="grid border-x border-border lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)]">
          <div className="px-5 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-secondary">
                Clearer commercial activity
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-heading sm:text-5xl lg:text-[3.55rem] lg:leading-[1.04]">
              Help every customer conversation move forward.
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              Blackcrest helps you organise the sales work around your business:
              understanding the right audience, handling enquiries well, and
              making the next action clear for your team and customers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/start-project" variant="primary" size="md" className="group !rounded-md">
                Discuss your needs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="md" className="!rounded-md">
                Contact Blackcrest
              </Button>
            </div>
          </div>

          <aside className="border-t border-border bg-card px-5 py-8 sm:px-7 lg:border-l lg:border-t-0 lg:px-8 lg:py-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Where we help
              </span>
              <Handshake className="h-4 w-4 text-secondary" />
            </div>

            <div className="mt-7 divide-y divide-border border-y border-border">
              {supportAreas.map((area, index) => (
                <div key={area} className="flex items-center gap-3 py-4">
                  <span className="font-mono text-[10px] font-semibold text-secondary">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium text-heading">{area}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-start gap-3">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <p className="text-sm leading-6 text-muted-foreground">
                We focus on the work that makes your commercial next step more
                manageable, rather than offering a fixed sales package.
              </p>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-x border-t border-border bg-primary px-5 py-4 text-white sm:px-7">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-light">
            A practical path
          </span>
          {["Understand", "Organise", "Support", "Improve"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              {index > 0 && <span className="h-1 w-1 rounded-full bg-gold-light/60" />}
              <span className="text-sm font-medium text-white/75">{step}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
