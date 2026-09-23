import Link from "next/link";
import { ArrowUpRight, Globe2, Smartphone, Megaphone, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";

const services = [
  {
    title: "Website development",
    description: "Give your new business a place online where customers can learn about you, get in touch, or buy.",
    scope: "Business websites · E-commerce · Web applications",
    icon: Globe2,
    href: "/services/website-development",
  },
  {
    title: "Mobile applications",
    description: "If your business needs an app, we help turn the idea into something your customers can use.",
    scope: "iOS & Android · App design · Product improvements",
    icon: Smartphone,
    href: "/services/mobile-applications",
  },
  {
    title: "Digital marketing",
    description: "Introduce your business to the right people and give them a reason to get in touch.",
    scope: "Search & content · Paid campaigns · Performance review",
    icon: Megaphone,
    href: "/services/digital-marketing",
  },
  {
    title: "Sales & business support",
    description: "Keep track of enquiries, follow up with potential customers, and build lasting relationships.",
    scope: "Sales processes · CRM support · Customer retention",
    icon: Handshake,
    href: "/services/sales-support",
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-navy-deep py-16 text-white sm:py-24">
      <Container className="max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">Services for your startup</p>
            <h2 id="services-heading" className="mt-5 text-3xl font-medium leading-[1.15] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Get your business ready.<br /><span className="font-serif italic text-gold-light">Start reaching customers.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-8 text-white/65">From your first website to your launch marketing, choose the support your business needs now. We can help you decide where to start.</p>
            <Link href="/start-project" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-light hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
              Tell us what you need <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-t border-white/15">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href} className="group flex gap-4 border-b border-white/15 py-7 transition-colors hover:bg-white/[0.025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:gap-6 sm:py-8">
                  <span className="hidden pt-1.5 font-mono text-[11px] text-white/35 sm:block">0{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-gold-light" strokeWidth={1.5} aria-hidden="true" />
                      <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{service.title}</h3>
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">{service.description}</p>
                    <p className="mt-4 text-xs leading-6 text-gold-light/85">{service.scope}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold-light transition-colors group-hover:border-gold-light group-hover:bg-gold-light group-hover:text-navy-deep">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
