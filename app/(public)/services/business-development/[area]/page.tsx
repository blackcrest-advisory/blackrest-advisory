import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ImageIcon,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { businessDevelopmentAreas } from "@/content-data/business-development/businessDevelopmentData";

type AreaPageProps = {
  params: Promise<{ area: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return businessDevelopmentAreas.map((area) => ({ area: area.id }));
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area: areaId } = await params;
  const area = businessDevelopmentAreas.find((item) => item.id === areaId);

  if (!area) return {};

  return {
    title: `${area.title} | Blackcrest Advisory`,
    description: `${area.plainTitle} ${area.support}`,
  };
}

export default async function BusinessDevelopmentAreaPage({
  params,
}: AreaPageProps) {
  const { area: areaId } = await params;
  const areaIndex = businessDevelopmentAreas.findIndex(
    (item) => item.id === areaId,
  );

  if (areaIndex === -1) notFound();

  const area = businessDevelopmentAreas[areaIndex];
  const previousArea = businessDevelopmentAreas[areaIndex - 1];
  const nextArea = businessDevelopmentAreas[areaIndex + 1];

  return (
    <PageWrapper>
      <section className="relative overflow-hidden bg-navy-deep py-12 text-white sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-gold-light/10" />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/55">
            <Link href="/home" className="hover:text-gold-light">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services/business-development" className="hover:text-gold-light">Business Development</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">{area.title}</span>
          </nav>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                Starter Package / 0{areaIndex + 1}
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {area.plainTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                {area.support}
              </p>
            </div>

            <div className="border-l border-gold-light/25 pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">This service</p>
              <p className="mt-3 text-2xl font-semibold leading-tight">{area.title}</p>
              <p className="mt-4 text-sm leading-6 text-white/60">One of seven connected parts of the Blackcrest Starter Package.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-8 sm:py-10">
        <Container>
          <ImagePlaceholder
            label={`${area.title} article image`}
            brief={area.imageBrief}
          />
        </Container>
      </section>

      <article>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Understanding the idea</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-heading sm:text-4xl">
                What is {area.title}?
              </h2>

              <div className="mt-9 border-l-2 border-secondary bg-muted/30 px-6 py-6 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">A simple example</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-heading">{area.exampleTitle}</h3>
                <p className="mt-4 text-base leading-8 text-body">{area.example}</p>
              </div>

              <p className="mt-9 text-lg leading-9 text-body">{area.meaning}</p>

              <div className="mt-10 rounded-[var(--radius-surface)] bg-navy-deep p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">How Blackcrest helps</p>
                <p className="mt-4 text-lg leading-8 text-white/80">{area.support}</p>
                <p className="mt-6 border-t border-white/15 pt-5 text-sm font-semibold tracking-wide text-gold-light">
                  Blackcrest Advisory — Strategy. Execution. Growth.
                </p>
              </div>
            </div>

            <aside className="self-start border-t border-border pt-6 lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">The real problem</p>
              <blockquote className="mt-4 text-xl font-medium leading-8 tracking-[-0.02em] text-heading">
                &ldquo;{area.problem}&rdquo;
              </blockquote>
              <p className="mt-6 border-t border-border pt-5 text-sm leading-7 text-body">{area.suitableFor}</p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">The result</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-heading">What changes<br />for your business?</h2>
              <p className="mt-5 text-base leading-8 text-body">{area.outcome}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">What is included</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {area.includes.map((item) => (
                  <div key={item} className="flex min-h-24 items-start gap-3 rounded-[var(--radius-surface)] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    <p className="text-sm font-medium leading-6 text-heading">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-heading sm:text-4xl">Simple steps. Clear progress.</h2>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {area.process.map((step, index) => (
              <li key={step} className="rounded-[var(--radius-surface)] border border-border bg-card p-6">
                <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                <p className="mt-5 text-base font-medium leading-7 text-heading">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      </article>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="flex flex-col gap-5 border-b border-border pb-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/services/business-development" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-heading hover:text-secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All seven areas
            </Link>

            <div className="flex flex-wrap items-center gap-4">
              {previousArea && (
                <Link href={`/services/business-development/${previousArea.id}`} className="text-sm text-muted-foreground hover:text-heading">
                  Previous: {previousArea.title}
                </Link>
              )}
              {nextArea && (
                <Link href={`/services/business-development/${nextArea.id}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary">
                  Next: {nextArea.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-deep py-16 text-white sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Talk to Blackcrest
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Need help with {area.title.toLowerCase()}?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">Tell us what you are working through. We will help you understand the next useful step.</p>
            </div>
            <Link href="/contact#contact-form" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-[var(--radius-control)] bg-gold-light px-6 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-white">
              Discuss your business
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}

function ImagePlaceholder({ label, brief }: { label: string; brief: string }) {
  return (
    <div className="relative flex aspect-[16/7] min-h-64 items-center justify-center overflow-hidden rounded-[var(--radius-surface)] border border-dashed border-secondary/40 bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 49.7%, var(--color-border) 50%, transparent 50.3%), linear-gradient(45deg, transparent 49.7%, var(--color-border) 50%, transparent 50.3%)",
        }}
      />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-secondary/25 bg-card text-secondary shadow-[var(--shadow-card)]">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Image placeholder</p>
        <p className="mt-2 text-sm font-medium text-heading">{label}</p>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">Suggested image: {brief}</p>
      </div>
    </div>
  );
}
