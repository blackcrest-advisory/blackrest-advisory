import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Handshake, MessageSquareText, Monitor, Target, TrendingUp, Users, Workflow } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { businessDevelopmentAreas } from "@/content-data/business-development/businessDevelopmentData";

export const metadata: Metadata = {
  title: "Business Development & Startup Advice | Blackcrest Advisory",
  description:
    "Build the right foundation for your business with Blackcrest's Starter Package: business messaging, page setup, customer targeting, marketing, execution, sales, and retention support.",
};

const areaIcons = [MessageSquareText, Monitor, Users, Target, TrendingUp, Workflow, Handshake];
const journey = [
  { title: "Business setup", description: "Clarify your offer, pages, and audience." },
  { title: "Marketing", description: "Build a plan to reach the right people." },
  { title: "Sales", description: "Improve enquiries and follow-up." },
  { title: "Retention", description: "Support customers beyond the sale." },
];
const consultationHref = "/contact#contact-form";
const primaryLink = "inline-flex min-h-12 items-center justify-center gap-3 rounded-[var(--radius-control)] bg-gold-light px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light";

export default function BusinessDevelopmentPage() {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Container>
          <div className="grid lg:min-h-[640px] lg:grid-cols-2">
            <div className="relative z-10 py-12 sm:py-16 lg:py-20 lg:pr-12">
              <Link href="/home" className="inline-flex items-center gap-2 text-xs text-white/65 hover:text-gold-light">
                Home <span aria-hidden="true">/</span> Business development
              </Link>
              <p className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                <Compass className="h-4 w-4" aria-hidden="true" /> Business growth solutions
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl xl:text-6xl">
                Your business idea.<br />
                <span className="text-gold-light">A clearer way forward.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
                Starting a business brings a lot of questions. Blackcrest helps
                you work through them—with advice, a practical plan, and support
                from your first business message to your next customer relationship.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link href={consultationHref} className={primaryLink}>Discuss your business <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                <Link href="#starter-package" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium text-white/85 hover:text-gold-light">See what is included <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
              <p className="mt-6 text-sm text-white/55">For aspiring founders, startups, and growing businesses.</p>
            </div>
            <div className="relative min-h-80 sm:min-h-96 lg:min-h-full">
              <Image src="/images/about_hero_image.avif" alt="An advisory meeting around a table in a contemporary office" fill sizes="(min-width: 1024px) 50vw, 100vw" preload className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent lg:bg-gradient-to-r lg:from-navy-deep/50" />
              <div className="absolute bottom-8 left-6 right-6 border border-white/20 bg-navy-deep/85 p-6 backdrop-blur-sm sm:left-10 sm:right-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light">Your business. Our strategy.</p>
                <p className="mt-3 text-xl leading-8 text-white">Build the right foundation.<br />Create a clear path to growth.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="From business setup to retention" className="border-b border-border bg-muted/40 py-8">
        <Container>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="pt-1 font-mono text-xs text-secondary">0{index + 1}</span>
                <div><p className="font-semibold text-heading">{step.title}</p><p className="mt-1 text-sm leading-6 text-body">{step.description}</p></div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="starter-package" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">The Starter Package</p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-heading sm:text-4xl">Seven areas of support.<br />Built around your next step.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-body">From explaining your idea to keeping your customers, these are the areas we help you work through. We begin with your current situation and agree the priorities and scope together.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {businessDevelopmentAreas.map((area, index) => {
              const Icon = areaIcons[index];
              return (
                <article key={area.id} id={area.id} className={`scroll-mt-28 rounded-[var(--radius-surface)] border border-border bg-card p-6 sm:p-8 ${index === 6 ? "md:col-span-2" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 bg-secondary/5 text-secondary"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                    <span className="font-mono text-sm text-secondary">0{index + 1}</span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">{area.title}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-heading">{area.plainTitle}</h3>
                  <div className={index === 6 ? "mt-5 grid gap-6 md:grid-cols-2" : "mt-5"}>
                    <div>
                      <p className="text-sm italic leading-6 text-muted-foreground">&ldquo;{area.problem}&rdquo;</p>
                      <p className="mt-4 text-sm leading-7 text-body">{area.support}</p>
                    </div>
                    <div className={`flex items-start gap-3 border-t border-border pt-5 ${index === 6 ? "md:border-l md:border-t-0 md:pl-6 md:pt-0" : "mt-6"}`}>
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      <div><p className="text-xs font-semibold text-heading">What we work toward</p><p className="mt-2 text-sm leading-6 text-body">{area.outcome}</p></div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/30 py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">How we begin</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-heading">A conversation.<br />A plan. A practical next step.</h2>
            </div>
            <ol className="space-y-7">
              {[
                ["Tell us where you are", "Share your idea, what you have already tried, and what feels unclear. You do not need a polished brief."],
                ["Agree what matters first", "We discuss your goals, identify the areas where support would help, and agree the scope before work begins."],
                ["Put the plan to work", "We support the agreed actions and review progress with you, adapting the next steps as you learn."],
              ].map(([title, description], index) => (
                <li key={title} className="flex gap-5"><span className="font-mono text-sm text-secondary">0{index + 1}</span><div><h3 className="font-semibold text-heading">{title}</h3><p className="mt-2 text-sm leading-7 text-body">{description}</p></div></li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-center lg:justify-between">
            <div><h2 className="text-2xl font-semibold tracking-tight text-heading">Need help delivering the plan?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-body">Our website, mobile, marketing, and sales services can support the next stage. We agree any additional work with you based on what your business needs.</p></div>
            <Link href="/home#services" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-secondary">Explore our digital & sales services <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-10 max-w-3xl">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-heading">Before you get started</h2>
            {[
              ["Can I speak to you if I only have an idea?", "Yes. We work with people who want to start a business as well as businesses that are already operating. Tell us what you are considering and where you need guidance."],
              ["Is this advice, practical support, or both?", "Both. We help clarify your direction and support agreed work across the seven areas. The exact activities, responsibilities, and timing are discussed before we begin."],
              ["How much does the Starter Package cost?", "Contact us to discuss your business and the support you need. We will agree the scope and pricing with you before work starts."],
            ].map(([question, answer]) => (
              <details key={question} className="border-b border-border py-5"><summary className="cursor-pointer text-base font-medium text-heading focus-visible:outline-2 focus-visible:outline-secondary">{question}</summary><p className="mt-4 text-sm leading-7 text-body">{answer}</p></details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-deep py-16 text-white sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">Let&apos;s start with your business</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">What is the next step you need help with?</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/70">Share your idea or your current challenge. We will help you work out where Blackcrest can support you.</p></div>
            <Link href={consultationHref} className={`${primaryLink} self-start lg:shrink-0`}>Talk to Blackcrest <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
