// components/landing/start-project/InfoCard.tsx
import { Mail, Phone, Clock } from "lucide-react";

const features = [
  "Senior development team",
  "Transparent communication",
  "Dedicated project manager",
  "Secure development process",
  "Scalable architecture",
  "Long-term support",
];

export const InfoCard = () => {
  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card-bg/70 backdrop-blur-sm p-6 shadow-sm md:p-8">
      <h3 className="mb-6 text-xl font-semibold text-heading">
        Why Choose Blackcrest
      </h3>
      <ul className="space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-body"
          >
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-secondary" />
            {feature}
          </li>
        ))}
      </ul>

      <hr className="my-6 border-border" />

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-body">
            Estimated Response Time
          </h4>
          <p className="mt-1 text-heading">
            We typically respond within one business day.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-body">
            Contact
          </h4>
          <div className="flex items-center gap-2 text-sm text-body">
            <Mail className="h-4 w-4" />
            <span>hello@blackcrestadvisory.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-body">
            <Phone className="h-4 w-4" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-body">
            <Clock className="h-4 w-4" />
            <span>Mon–Fri, 9:00 AM – 6:00 PM EST</span>
          </div>
        </div>
      </div>
    </div>
  );
};
