import { ClipboardCheck, MessagesSquare, Focus } from "lucide-react";
import { Container } from "@/components/ui/Container";

const expectations = [
  { title: "Start with your business", description: "Your goals shape the work.", icon: Focus },
  { title: "Know what is agreed", description: "Clear scope and priorities before we begin.", icon: ClipboardCheck },
  { title: "Stay in the conversation", description: "Direct communication as work progresses.", icon: MessagesSquare },
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
