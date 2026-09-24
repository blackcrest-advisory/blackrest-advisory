import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import aboutImage from "@/public/images/about_hero_image.png";

const principles = [
  "Know who your customers are and why they would choose you",
  "Focus your time and budget on the work that matters next",
  "Connect your business plan, website, marketing, and sales",
];

export function WhoWeAreSection() {
  return (
    <section id="our-story" aria-labelledby="our-purpose-heading" className="scroll-mt-24 border-y border-border bg-muted/25 py-16 sm:py-20 lg:py-24">
      <Container className="max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="mx-auto w-full max-w-md lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image src={aboutImage} alt="Four people discussing business plans around a meeting table" sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw" className="h-auto w-full" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep/90 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-sm font-medium text-white">
                Business · Solutions · Partnership
              </figcaption>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">The right solution starts with understanding the problem.</p>
          </figure>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Who we are</p>
            <h2 id="our-purpose-heading" className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-heading sm:text-4xl lg:text-5xl">
              Real business problems.<br /><span className="font-serif italic text-secondary">Practical solutions.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-body">
              <p>Blackcrest Advisory provides business solutions for founders and business owners. We identify gaps in your business plan, customer experience, marketing, and sales, then build a clear plan to address them.</p>
              <p>You may have a good idea but no plan to launch it. Your website may get visits but few enquiries. Or people may ask about your service and never hear back. We work through these problems with you and agree what needs to change.</p>
              <p>We turn the agreed plan into action. That can mean a website that makes it easier to enquire, marketing that reaches the right customers, or a sales process that keeps every follow-up on track. Blackcrest manages the work, brings in specialists when needed, and checks quality at each stage.</p>
            </div>

            <ul className="mt-7 divide-y divide-border border-y border-border">
              {principles.map((principle) => (
                <li key={principle} className="flex items-start gap-3 py-4 text-sm leading-6 text-heading">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />{principle}
                </li>
              ))}
            </ul>

            <div id="values" className="mt-8 grid scroll-mt-24 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Target className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">Our mission</p>
                <h3 className="mt-2 text-lg font-semibold text-heading">Solve what holds business back.</h3>
                <p className="mt-3 text-sm leading-7 text-body">Identify the problems that stand in the way of progress and deliver practical solutions built around each business.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Compass className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">Our vision</p>
                <h3 className="mt-2 text-lg font-semibold text-heading">Grow together.</h3>
                <p className="mt-3 text-sm leading-7 text-body">Build lasting business partnerships through sound decisions, quality work, and solutions that meet new challenges as businesses grow.</p>
              </div>
            </div>

            <Link href="/services/business-development" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
              Explore our business solutions <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
