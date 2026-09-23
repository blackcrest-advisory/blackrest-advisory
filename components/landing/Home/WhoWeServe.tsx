import Link from "next/link";
import { ArrowUpRight, Sprout, TrendingUp, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

const stages = [
  {
    label: "Starting out",
    title: "An idea. A lot of questions.",
    description: "You want to start a business but need to decide what to offer, who it is for, and how to get going.",
    priorities: ["Choose a focused niche", "Plan the essentials for launch", "Decide what to do first"],
    href: "/services/business-development/business-setup-plan",
    link: "Find your starting point",
    icon: Sprout,
  },
  {
    label: "Building momentum",
    title: "Customers. Room to grow.",
    description: "You are already operating, but your marketing, enquiries, or follow-up need a clearer direction.",
    priorities: ["Focus your marketing", "Improve the sales journey", "Keep customers coming back"],
    href: "/services/business-development/marketing-growth",
    link: "Explore growth support",
    icon: TrendingUp,
  },
  {
    label: "Taking the next step",
    title: "An established business. A new priority.",
    description: "Your team needs support with a website, app, campaign, or sales improvement that has a clear purpose.",
    priorities: ["Improve a digital experience", "Bring in specialist support", "Deliver an agreed project"],
    href: "#services",
    link: "Find the right service",
    icon: Building2,
  },
];

export default function WhoWeServe() {
  return (
    <section aria-labelledby="business-stages-heading" className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <Container className="max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Who we help</p>
            <h2 id="business-stages-heading" className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.035em] text-heading sm:text-4xl">Where are you in your business?</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-body">Start with the situation that feels familiar. You do not need to know the name of the service yet.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article key={stage.label} className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-3 text-secondary">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]">{stage.label}</p>
                </div>
                <h3 className="mt-6 text-2xl font-medium leading-snug tracking-[-0.03em] text-heading">{stage.title}</h3>
                <p className="mt-4 text-sm leading-7 text-body">{stage.description}</p>
                <ul className="mb-7 mt-6 space-y-3 border-t border-border pt-6">
                  {stage.priorities.map((priority) => (
                    <li key={priority} className="flex items-start gap-3 text-sm leading-6 text-body">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />{priority}
                    </li>
                  ))}
                </ul>
                <Link href={stage.href} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-secondary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                  {stage.link}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
