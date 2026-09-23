import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { businessDevelopmentAreas, type BusinessDevelopmentImage } from "@/content-data/business-development/businessDevelopmentData";

type AreaPageProps = { params: Promise<{ area: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return businessDevelopmentAreas.map((area) => ({ area: area.id }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { area: areaId } = await params;
  const area = businessDevelopmentAreas.find((item) => item.id === areaId);
  if (!area) return {};
  return {
    title: `${area.title}: A Practical Guide | Blackcrest Advisory`,
    description: area.article.intro,
  };
}

const contents = [
  ["example", "An everyday situation"],
  ["understanding", "What it means for business"],
  ["right-for-you", "Where founders get stuck"],
  ["support", "How we help"],
  ["process", "What happens next"],
  ["takeaway", "The takeaway"],
] as const;

const headingClass = "text-2xl font-medium leading-tight tracking-[-0.03em] text-heading sm:text-3xl";
const paragraphClass = "mt-5 text-base leading-8 text-body sm:text-lg sm:leading-9";

export default async function BusinessDevelopmentAreaPage({ params }: AreaPageProps) {
  const { area: areaId } = await params;
  const areaIndex = businessDevelopmentAreas.findIndex((item) => item.id === areaId);
  if (areaIndex === -1) notFound();

  const area = businessDevelopmentAreas[areaIndex];
  const related = [
    businessDevelopmentAreas[(areaIndex + 1) % businessDevelopmentAreas.length],
    businessDevelopmentAreas[(areaIndex + 2) % businessDevelopmentAreas.length],
  ];
  const wordCount = [area.article.title, area.article.intro, ...area.article.scenario,
    area.article.realization, area.article.connection, ...area.article.customerProblem,
    area.article.closing, area.support, area.problem, area.suitableFor, area.outcome,
    ...area.includes, ...area.process]
    .join(" ").split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PageWrapper>
      <Container className="max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-7 text-xs leading-6 text-muted-foreground">
          <Link href="/home" className="hover:text-secondary">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services/business-development" className="hover:text-secondary">Business Development</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-heading">{area.title}</span>
        </nav>

        <article aria-labelledby="article-title">
          <header className="grid items-center gap-10 border-b border-border pb-12 pt-4 sm:pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div>
              <Link href="/services/business-development" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary hover:underline">
                The business development guides · 0{areaIndex + 1}
              </Link>
              <p className="mt-7 text-sm font-medium text-muted-foreground">{area.title}</p>
              <h1 id="article-title" className="mt-3 max-w-3xl text-4xl font-medium leading-[1.12] tracking-[-0.045em] text-heading sm:text-5xl lg:text-6xl">
                {area.article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-body sm:text-lg">{area.article.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-heading">Blackcrest Advisory</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-secondary" />
                <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{readingMinutes} min read</span>
                <span className="rounded-full border border-border px-3 py-1">Practical guide</span>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-sm">
              <Image src={area.images.hero.src} alt={area.images.hero.alt} width={area.images.hero.width} height={area.images.hero.height} preload sizes="(min-width: 1024px) 360px, 90vw" className="h-auto w-full rounded-2xl" />
              <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">{area.images.hero.caption}</figcaption>
            </figure>
          </header>

          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
            <aside className="self-start lg:sticky lg:top-24">
              <nav aria-label="On this page" className="rounded-2xl border border-border bg-muted/20 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">In this guide</p>
                <ol className="mt-4 space-y-1">
                  {contents.map(([id, label], index) => (
                    <li key={id}>
                      <a href={`#${id}`} className="flex min-h-10 items-center gap-3 text-sm text-body transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-secondary">
                        <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>{label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <Link href="/services/business-development" className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-secondary">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All seven guides
              </Link>
            </aside>

            <div className="min-w-0 max-w-3xl">
              <section id="example" className="scroll-mt-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">01 / An everyday situation</p>
                <h2 className={`mt-4 ${headingClass}`}>{area.exampleTitle}</h2>
                {area.article.scenario.map((paragraph) => <p key={paragraph} className={paragraphClass}>{paragraph}</p>)}
                <p className="mt-7 border-l-2 border-secondary pl-6 text-lg font-medium leading-8 text-heading">{area.article.realization}</p>
              </section>

              <ArticleImage image={area.images.scenario} />

              <section id="understanding" className="mt-12 scroll-mt-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">02 / The business connection</p>
                <h2 className={`mt-4 ${headingClass}`}>The same thing happens in business.</h2>
                <p className={paragraphClass}>{area.article.connection}</p>
              </section>

              <section id="right-for-you" className="mt-12 scroll-mt-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">03 / Your starting point</p>
                <h2 className={`mt-4 ${headingClass}`}>Does this sound familiar?</h2>
                <blockquote className="my-7 border-l-2 border-secondary pl-6 font-serif text-2xl italic leading-relaxed text-heading sm:text-3xl">
                  &ldquo;{area.problem}&rdquo;
                </blockquote>
                {area.article.customerProblem.map((paragraph) => <p key={paragraph} className={paragraphClass}>{paragraph}</p>)}
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{area.suitableFor}</p>
              </section>

              <ArticleImage image={area.images.problem} />

              <section id="support" className="mt-12 scroll-mt-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">04 / How Blackcrest helps</p>
                <h2 className={`mt-4 ${headingClass}`}>From the question to the work.</h2>
                <p className={paragraphClass}>{area.support}</p>
                <h3 className="mt-7 text-lg font-medium text-heading">What we work on together</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {area.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-4 text-base leading-7 text-body">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
              </section>


              <section id="process" className="mt-12 scroll-mt-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">05 / The process</p>
                <h2 className={`mt-4 ${headingClass}`}>What happens next?</h2>
                <ol className="mt-7 space-y-6">
                  {area.process.map((step, index) => (
                    <li key={step} className="flex items-start gap-5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-secondary/25 font-mono text-xs text-secondary">0{index + 1}</span>
                      <p className="pt-1 text-base leading-8 text-body">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 text-sm leading-7 text-muted-foreground">We agree the scope, responsibilities, and timing with you before work begins.</p>
              </section>

              <ArticleImage image={area.images.solution} />

              <section id="takeaway" className="mt-12 scroll-mt-28 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">06 / The takeaway</p>
                <h2 className={`mt-4 ${headingClass}`}>What you are working toward.</h2>
                <p className={paragraphClass}>{area.article.closing}</p>
                <p className="mt-5 text-sm leading-7 text-body">{area.outcome}</p>
                <p className="mt-7 border-t border-secondary/20 pt-5 text-sm font-semibold text-heading">Blackcrest Advisory</p>
                <p className="mt-2 font-serif text-xl italic text-secondary">Business · Solutions · Partnership</p>
              </section>

              <div className="mt-10 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-body">Ready to apply this to your business?</p>
                <Link href="/contact#contact-form" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-navy-deep px-6 text-sm font-semibold text-white transition-colors hover:bg-secondary hover:text-secondary-foreground">
                  Talk to Blackcrest <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <section aria-labelledby="related-guides" className="border-t border-border pb-16 pt-10 sm:pb-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="related-guides" className={headingClass}>Keep exploring.</h2>
            <Link href="/services/business-development" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-secondary">All guides <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.id} href={`/services/business-development/${item.id}`} className="group rounded-2xl border border-border p-6 transition-colors hover:border-secondary/50 sm:p-8">
                <p className="text-xs text-secondary">{item.title}</p>
                <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight text-heading">{item.plainTitle}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-secondary">Read the guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </PageWrapper>
  );
}

function ArticleImage({ image }: { image: BusinessDevelopmentImage }) {
  return (
    <figure className="mt-12">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 768px, 95vw" className="h-auto w-full rounded-2xl" />
      <figcaption className="mt-3 border-l border-secondary/40 pl-3 text-xs leading-6 text-muted-foreground">{image.caption}</figcaption>
    </figure>
  );
}
