import { ArrowRight, ChartNoAxesCombined, Lightbulb, Settings2, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  { number: "01", title: "Understand the situation", description: "Start with your offer, audience, current customer journey, and the commercial task that needs attention.", icon: Lightbulb },
  { number: "02", title: "Organise the next steps", description: "Create a simple process for handling leads, follow-up, information, and responsibilities.", icon: Settings2 },
  { number: "03", title: "Support the work in practice", description: "Put the right materials, tools, and support in place so the process is useful in everyday work.", icon: UsersRound },
  { number: "04", title: "Review and improve", description: "Use what you learn from conversations and activity to decide what should be improved next.", icon: ChartNoAxesCombined },
];

export const SalesProcess = () => {
  return (
    <Section className="relative overflow-hidden bg-muted/20">
      <Container>
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">03 / How we work</span>
            <span className="h-px w-10 bg-secondary/40" />
          </div>
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">A simple process for more considered commercial work.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">We keep the work visible and practical: understand what is happening, put a useful structure in place, then keep improving with the context you gain.</p>
          </div>
        </div>

        <div className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className={`relative min-w-0 border-b border-border py-8 sm:px-6 lg:min-h-[285px] lg:border-b-0 lg:px-7 ${index > 0 ? "lg:border-l" : ""} ${index === 0 ? "lg:pl-0" : ""} ${index === steps.length - 1 ? "lg:pr-0" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xl font-semibold tracking-[-0.05em] text-secondary">{step.number}</span>
                  <Icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="mt-10 text-lg font-semibold tracking-[-0.025em] text-heading">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-5 border border-border bg-primary px-5 py-6 text-white sm:px-7 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">Start with a useful conversation</span>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Tell us where sales or customer support feels difficult. We can help you identify a clear and realistic next step.</p>
          </div>
          <Button href="/start-project" variant="primary" size="md" className="group shrink-0 !rounded-md">
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </Section>
  );
};
