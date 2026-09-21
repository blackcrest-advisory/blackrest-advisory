import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Handshake, MessageSquareText, Monitor, Plus, Target, TrendingUp, Users, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { businessDevelopmentAreas } from "@/content-data/business-development/businessDevelopmentData";

export const metadata: Metadata = {
  title: "Business Development & Startup Advice | Blackcrest Advisory",
  description:
    "Clear direction and practical support for your business. Explore messaging, online presence, customer targeting, marketing, sales, and retention.",
};

const cardContent = {
  "business-language": { title: "Clarify your offer", summary: "Explain what you do in words your customers understand.", icon: MessageSquareText },
  "page-setup": { title: "Build your online presence", summary: "Make your business pages clear, complete, and easy to use.", icon: Monitor },
  "buyer-persona": { title: "Find your ideal customer", summary: "Focus on the people who are most likely to need your offer.", icon: Users },
  "marketing-strategy": { title: "Plan your marketing", summary: "Choose the right channels and priorities for your budget.", icon: Target },
  "execution-growth": { title: "Put your plan into action", summary: "Turn ideas into clear tasks, priorities, and progress.", icon: TrendingUp },
  "sales-funnel": { title: "Improve your sales process", summary: "Help interested people take the next step toward buying.", icon: Workflow },
  retention: { title: "Keep customers coming back", summary: "Build stronger relationships with thoughtful after-sales support.", icon: Handshake },
};

const steps = [
  { title: "Share your starting point", description: "Tell us about your idea, your business, or what feels stuck." },
  { title: "Choose what matters first", description: "Together, we agree the priorities, scope, and cost." },
  { title: "Take the next step", description: "We support the work and review progress with you." },
];

const questions = [
  ["Can I start with just an idea?", "Yes. You do not need a finished plan. We help you clarify your idea and decide where to begin."],
  ["Do I need all seven areas?", "We start with your situation and agree the areas of support that make sense for your business."],
  ["What does it cost?", "Pricing depends on the support you need. We agree the scope and cost with you before work begins."],
];

const primaryLink = "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold-light px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";

export default function BusinessDevelopmentPage() {
  return (
    <PageWrapper>
      <section className="overflow-hidden bg-navy-deep text-white">
        <Container className="max-w-7xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 pt-7 text-xs text-white/60">
            <Link href="/home" className="transition-colors hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white/85">Business Development</span>
          </nav>

          <div className="grid items-center gap-12 pb-14 pt-12 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                <span aria-hidden="true" className="h-px w-8 bg-gold-light/60" />
                Business Development
              </p>
              <h1 className="mt-6 max-w-2xl text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                A clear direction.<br />
                <span className="font-serif italic text-gold-light">A stronger business.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/70">
                From your first idea to your next stage of growth, we help you
                decide what matters and put it into action.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link href="/contact#contact-form" className={primaryLink}>
                  Discuss your business <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="#starter-package" className="inline-flex min-h-12 items-center gap-3 text-sm text-white/80 transition-colors hover:text-gold-light">
                  Explore our support <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-10 border-t border-white/15 pt-5 text-xs tracking-wide text-white/50">
                For new founders, startups, and growing businesses.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="relative aspect-[5/4] overflow-hidden rounded-t-[5rem] rounded-br-2xl rounded-bl-2xl lg:aspect-[4/5]">
                <Image
                  src="/images/about_hero_image.avif"
                  alt="Business advisers discussing a plan around an office table"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  preload
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">The Blackcrest approach</p>
                  <p className="mt-3 max-w-xs text-2xl font-medium leading-snug tracking-tight">
                    Thoughtful advice.<br />Practical next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="starter-package" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="max-w-7xl">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">The Starter Package</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.035em] text-heading sm:text-4xl">
                Where do you need support?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-body">
              Seven ways to move your business forward.
              Choose an area to explore how we can help.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessDevelopmentAreas.map((area, index) => {
              const card = cardContent[area.id];
              const Icon = card.icon;

              return (
                <Link
                  key={area.id}
                  id={area.id}
                  href={`/services/business-development/${area.id}`}
                  className="group flex scroll-mt-28 flex-col rounded-2xl border border-border/80 bg-card p-6 transition-[border-color,box-shadow] duration-200 hover:border-secondary/50 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-secondary" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-mono text-[10px] text-muted-foreground/60">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-medium tracking-[-0.025em] text-heading">{card.title}</h3>
                  <p className="mb-6 mt-3 max-w-sm text-sm leading-6 text-body">{card.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-secondary">
                    Explore support
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}

            <div className="flex flex-col justify-center rounded-2xl bg-muted/40 p-7 sm:p-9 lg:col-span-2">
              <p className="text-2xl font-medium tracking-[-0.025em] text-heading">Not sure where to begin?</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-body">
                Start with a conversation. We will help you identify the support that fits your business.
              </p>
              <Link href="/contact#contact-form" className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-secondary hover:underline">
                Let&apos;s talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border/70 bg-muted/25 py-16 sm:py-20">
        <Container className="max-w-7xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Working together</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-heading sm:text-4xl">A simple start. A shared plan.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-border pt-5">
                <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                <h3 className="mt-5 text-lg font-medium tracking-tight text-heading">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">A little clarity</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-heading sm:text-4xl">Before we begin.</h2>
            </div>
            <div className="border-t border-border">
              {questions.map(([question, answer]) => (
                <details key={question} className="group border-b border-border py-5">
                  <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-5 font-medium text-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary [&::-webkit-details-marker]:hidden">
                    {question}
                    <Plus className="h-4 w-4 shrink-0 text-secondary transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="mt-4 max-w-xl pr-8 text-sm leading-7 text-body">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-7xl">
          <div className="flex flex-col justify-between gap-8 rounded-3xl bg-navy-deep p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:p-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">Your next chapter</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">Let&apos;s move your business forward.</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">Bring your idea or your current challenge. We will work out the next step together.</p>
            </div>
            <Link href="/contact#contact-form" className={`${primaryLink} shrink-0 self-start lg:self-auto`}>
              Talk to Blackcrest <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
