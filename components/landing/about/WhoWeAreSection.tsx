import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import aboutImage from "@/public/images/about_hero_image.png";

const principles = [
  "Understand the customer before shaping the offer",
  "Choose priorities that fit your time and resources",
  "Turn advice into clear, practical actions",
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
                Business · Growth · Solution
              </figcaption>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">A clear conversation is a useful place to start.</p>
          </figure>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Who we are</p>
            <h2 id="our-purpose-heading" className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-heading sm:text-4xl lg:text-5xl">
              Business support,<br /><span className="font-serif italic text-secondary">from the beginning.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-body">
              <p>Blackcrest Advisory helps people starting a business make sense of the decisions in front of them. We also support existing businesses when their direction, marketing, or customer journey needs attention.</p>
              <p>Our starting point is your problem. Perhaps you have an idea but no clear audience, a product that is difficult to explain, or a plan you are struggling to put into action. We work with you to understand what is missing and decide what to do next.</p>
              <p>Business development connects that thinking to practical work. When your plan calls for a website, app, marketing, or sales support, we can bring those services together around the same goal.</p>
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
                <h3 className="mt-2 text-lg font-semibold text-heading">Make starting clearer.</h3>
                <p className="mt-3 text-sm leading-7 text-body">Help new founders understand their customers, organise the essentials, and take informed steps toward a working business.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Compass className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">Our vision</p>
                <h3 className="mt-2 text-lg font-semibold text-heading">Support the journey.</h3>
                <p className="mt-3 text-sm leading-7 text-body">Be a trusted source of practical guidance as people build, learn, and develop their businesses over time.</p>
              </div>
            </div>

            <Link href="/services/business-development" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
              Explore our business development support <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
