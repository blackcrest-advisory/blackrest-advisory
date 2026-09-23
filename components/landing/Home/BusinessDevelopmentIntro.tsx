import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import advisoryImage from "@/public/images/business devlopment/after-support-retention/problem.png";

const support = [
  {
    title: "Shape your business idea",
    description:
      "Decide what you will offer, who it is for, and why they would choose you.",
  },
  {
    title: "Plan your first steps",
    description:
      "Set your priorities and prepare a practical plan for getting started.",
  },
  {
    title: "Prepare to reach customers",
    description:
      "Plan how people will find your business and how you will follow up.",
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
              alt="An adviser and a founder turning a complex idea into a clear business message"
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
              Business development
            </p>
            <h2
              id="business-support-heading"
              className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl"
            >
              Start your business
              <br className="hidden sm:block" /> with a clear plan.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-body">
              Starting a business brings a lot of decisions. Blackcrest helps you
              understand your customers, choose your priorities, and plan what
              to do first. You can begin with an idea and work through it with us.
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
              Explore startup support{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
