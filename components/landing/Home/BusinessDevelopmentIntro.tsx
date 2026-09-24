import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import advisoryImage from "@/public/images/business devlopment/after-support-retention/problem.png";

const support = [
  {
    title: "Understand your business idea",
    description:
      "Get clear on what you want to offer, who it is for, and what problem it solves.",
  },
  {
    title: "Know what comes first",
    description:
      "Set the right priorities and understand the steps needed before you invest time and money.",
  },
  {
    title: "Know who you want to reach",
    description:
      "Identify the right customers and decide how your business will reach and communicate with them.",
  },
];

export default function BusinessDevelopmentIntro() {
  return (
    <section
      id="how-we-help"
      aria-labelledby="business-support-heading"
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Container className="max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <figure className="relative mx-auto w-full max-w-md lg:mx-0">
            <Image
              src={advisoryImage}
              alt="Business owner reviewing challenges and planning the next steps"
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 90vw"
              className="h-auto w-full rounded-2xl"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-secondary/50" />
              Business · Solutions · Partnership
            </figcaption>
          </figure>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
              From idea to direction
            </p>

            <h2
              id="business-support-heading"
              className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl"
            >
              Know what to start.
              <br className="hidden sm:block" /> Know what comes next.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-body">
              Not sure what business to start, who your customer is, or what
              should come first? Blackcrest identifies the key questions, sets
              the priorities, and gives you a practical direction to move
              forward with confidence.
            </p>

            <div className="mt-8 divide-y divide-border border-y border-border">
              {support.map((item, index) => (
                <div key={item.title} className="flex gap-5 py-5">
                  <span className="pt-1 font-mono text-xs text-secondary">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold text-heading">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 max-w-lg text-sm leading-6 text-body">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/services/business-development"
              className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Explore business development{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
