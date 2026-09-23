import { ClipboardCheck, MessagesSquare, Focus } from "lucide-react";
import { Container } from "@/components/ui/Container";

const expectations = [
  { title: "Your idea comes first", description: "Advice shaped around the business you want to start.", icon: Focus },
  { title: "A clear plan", description: "Know what to focus on and what comes next.", icon: ClipboardCheck },
  { title: "Support along the way", description: "Work with a team you can talk to.", icon: MessagesSquare },
];

export default function TrustedBy() {
  return (
    <section aria-label="What to expect from Blackcrest" className="border-b border-border bg-muted/25">
      <Container className="max-w-7xl">
        <ul className="grid divide-y divide-border py-3 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-7">
          {expectations.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex items-start gap-4 py-5 md:px-6 md:py-1 md:first:pl-0 md:last:pr-0">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-secondary" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-heading">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-body">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
