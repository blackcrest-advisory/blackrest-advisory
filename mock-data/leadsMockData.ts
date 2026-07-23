import { Lead } from "@/types/dashboard/admin/leadTypes";
// import { faker } from "@faker-js/faker"; // not installed, so we'll generate manually
// Since faker is not allowed, we'll use a manual generator with static lists.

const companies = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Oscorp",
  "Cyberdyne",
  "Umbrella Corp",
  "S.H.I.E.L.D.",
  "Aperture",
  "Black Mesa",
  "Vault-Tec",
  "Nuka-Cola",
  "RobCo",
];
const contacts = [
  "John Doe",
  "Jane Smith",
  "Bob Johnson",
  "Alice Williams",
  "Charlie Brown",
  "Diana Prince",
  "Bruce Wayne",
  "Tony Stark",
  "Steve Rogers",
  "Natasha Romanoff",
];
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Energy",
  "Education",
];
const locations = [
  "New York",
  "London",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Toronto",
];
const services = [
  "web-development",
  "mobile-app",
  "digital-marketing",
  "branding",
  "seo",
] as const;
const statuses = [
  "new",
  "contacted",
  "qualified",
  "proposal-sent",
  "negotiation",
  "won",
  "lost",
] as const;
const priorities = ["high", "medium", "low"] as const;
const salesPeople = ["Rasel", "Mostafa", "Soumik", "Nahid", "Shakil"];
const budgets = ["Under $5k", "$5k–10k", "$10k–25k", "$25k+"];

const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateLead = (id: number): Lead => {
  const createdAt = randomDate(new Date(2024, 0, 1), new Date());
  const lastContacted =
    Math.random() > 0.3
      ? randomDate(new Date(2024, 6, 1), new Date())
      : undefined;
  const nextFollowUp =
    Math.random() > 0.5
      ? randomDate(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
      : undefined;
  const numServices = Math.floor(Math.random() * 3) + 1;
  const selectedServices = [];
  const shuffled = [...services];
  for (let i = 0; i < numServices; i++) {
    const idx = Math.floor(Math.random() * shuffled.length);
    selectedServices.push(shuffled.splice(idx, 1)[0]);
  }
  return {
    id: `lead-${String(id).padStart(3, "0")}`,
    companyName: randomItem(companies),
    contactPerson: randomItem(contacts),
    email: `${randomItem(contacts).toLowerCase().replace(" ", ".")}@example.com`,
    phone: `+1-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    industry: randomItem(industries),
    companySize:
      Math.random() > 0.5
        ? `${Math.floor(Math.random() * 500 + 10)} employees`
        : undefined,
    location: randomItem(locations),
    website:
      Math.random() > 0.5
        ? `https://${randomItem(companies).toLowerCase()}.com`
        : undefined,
    services: selectedServices as any,
    status: randomItem(statuses),
    priority: randomItem(priorities),
    budget: Math.random() > 0.4 ? randomItem(budgets) : undefined,
    assignedTo: randomItem(salesPeople),
    lastContacted,
    nextFollowUp,
    notes:
      Math.random() > 0.6
        ? "Interested in full package. Needs quick turnaround."
        : undefined,
    createdAt,
  };
};

export const leadsMockData: Lead[] = Array.from({ length: 20 }, (_, i) =>
  generateLead(i + 1),
);
