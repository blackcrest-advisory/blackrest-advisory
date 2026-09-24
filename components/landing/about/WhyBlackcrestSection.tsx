import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { whyData } from "@/content-data/about/aboutData";

const questions = [
  "I have an idea. Where do I start?",
  "People visit my website. Why don't they get in touch?",
  "How do I turn more enquiries into customers?",
];

export function WhyBlackcrestSection() {
  return (
    <section id="why-blackcrest" aria-labelledby="why-blackcrest-heading" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <Container className="max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Why Blackcrest</p>
            <h2 id="why-blackcrest-heading" className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-heading sm:text-4xl">
              Clear decisions.<br /><span className="font-serif italic text-secondary">Responsible delivery.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-body">Your time, money, and business deserve careful thought. We explain our recommendations, agree the work with you, and keep you involved as it moves forward.</p>
            <div className="mt-7 rounded-2xl bg-navy-deep p-6 text-white sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">Does this sound familiar?</p>
              <ul className="mt-4 divide-y divide-white/15">
                {questions.map((question) => (
                  <li key={question} className="py-4 text-base leading-7 text-white/85">{question}</li>
                ))}
              </ul>
              <Link href="/contact#contact-form" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-light hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
                Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div>
            <div className="divide-y divide-border border-y border-border">
              {whyData.map((item) => (
                <article key={item.title} className="flex items-start gap-5 py-7 sm:py-8">
                  <div aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/5">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-heading">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-body sm:text-base">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-border bg-muted/25 p-5 text-sm leading-7 text-body">Before work begins, we agree what we will do, who is responsible, what it will cost, and the expected timeline. You know what you are paying for and what happens next.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
