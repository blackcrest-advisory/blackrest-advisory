import {
  Project,
  Industry,
  ServiceType,
  ProjectStatus,
  ProjectPriority,
} from "@/types/dashboard/client/projectsType";

export const industries: Industry[] = [
  "Fashion Tech",
  "IT & Software",
  "Medical Industry",
  "Beauty Industry",
  "Manufacturing / Industrial",
  "Fintech",
  "E-commerce",
  "Education",
];

export const serviceTypes: ServiceType[] = [
  "Website Development",
  "Web Application",
  "Mobile Application",
  "Digital Marketing",
  "SEO",
  "Branding",
  "UI/UX Design",
  "Sales & Marketing",
  "Business Consultation",
  "Custom Enterprise Solutions",
];

export const statuses: ProjectStatus[] = [
  "active",
  "completed",
  "on-hold",
  "planning",
  "in-review",
];
export const priorities: ProjectPriority[] = [
  "low",
  "medium",
  "high",
  "critical",
];

const teamMembers = [
  { id: "1", name: "Alice Chen", avatar: "AC" },
  { id: "2", name: "Bob Smith", avatar: "BS" },
  { id: "3", name: "Carla Delgado", avatar: "CD" },
  { id: "4", name: "David Kim", avatar: "DK" },
  { id: "5", name: "Elena Rossi", avatar: "ER" },
];

const randomDate = (start: Date, days: number) => {
  const d = new Date(start);
  d.setDate(d.getDate() + Math.floor(Math.random() * days));
  return d;
};

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Luxe Fashion E‑commerce Platform",
    clientCompany: "Velvet & Co.",
    industry: "Fashion Tech",
    serviceType: "Website Development",
    status: "active",
    priority: "high",
    budget: 75000,
    timeline: {
      start: new Date("2025-11-01"),
      end: new Date("2026-04-30"),
    },
    progress: 72,
    assignedTeam: [teamMembers[0], teamMembers[2], teamMembers[4]],
    dueDate: new Date("2026-04-30"),
    lastUpdated: new Date("2026-03-10"),
  },
  {
    id: "2",
    name: "Hospital ERP System",
    clientCompany: "MediCore Group",
    industry: "Medical Industry",
    serviceType: "Custom Enterprise Solutions",
    status: "active",
    priority: "critical",
    budget: 210000,
    timeline: {
      start: new Date("2025-09-15"),
      end: new Date("2026-08-15"),
    },
    progress: 45,
    assignedTeam: [teamMembers[1], teamMembers[3], teamMembers[0]],
    dueDate: new Date("2026-08-15"),
    lastUpdated: new Date("2026-03-12"),
  },
  {
    id: "3",
    name: "Mobile Banking App",
    clientCompany: "Finwise Bank",
    industry: "Fintech",
    serviceType: "Mobile Application",
    status: "in-review",
    priority: "high",
    budget: 120000,
    timeline: {
      start: new Date("2026-01-10"),
      end: new Date("2026-05-20"),
    },
    progress: 95,
    assignedTeam: [teamMembers[0], teamMembers[1], teamMembers[3]],
    dueDate: new Date("2026-05-20"),
    lastUpdated: new Date("2026-03-14"),
  },
  {
    id: "4",
    name: "Beauty Booking Platform",
    clientCompany: "Glow Studio",
    industry: "Beauty Industry",
    serviceType: "Web Application",
    status: "planning",
    priority: "medium",
    budget: 45000,
    timeline: {
      start: new Date("2026-04-01"),
      end: new Date("2026-06-30"),
    },
    progress: 0,
    assignedTeam: [teamMembers[2], teamMembers[4]],
    dueDate: new Date("2026-06-30"),
    lastUpdated: new Date("2026-03-01"),
  },
  {
    id: "5",
    name: "SEO & Content Overhaul",
    clientCompany: "TechSphere Inc.",
    industry: "IT & Software",
    serviceType: "SEO",
    status: "completed",
    priority: "medium",
    budget: 28000,
    timeline: {
      start: new Date("2025-08-01"),
      end: new Date("2026-02-28"),
    },
    progress: 100,
    assignedTeam: [teamMembers[3], teamMembers[0]],
    dueDate: new Date("2026-02-28"),
    lastUpdated: new Date("2026-03-01"),
  },
  {
    id: "6",
    name: "Brand Identity & Marketing Campaign",
    clientCompany: "Nova Beauty",
    industry: "Beauty Industry",
    serviceType: "Branding",
    status: "active",
    priority: "low",
    budget: 32000,
    timeline: {
      start: new Date("2026-02-15"),
      end: new Date("2026-05-15"),
    },
    progress: 30,
    assignedTeam: [teamMembers[1], teamMembers[2]],
    dueDate: new Date("2026-05-15"),
    lastUpdated: new Date("2026-03-10"),
  },
  {
    id: "7",
    name: "Manufacturing ERP – Production Module",
    clientCompany: "Industrial Flow Ltd.",
    industry: "Manufacturing / Industrial",
    serviceType: "Custom Enterprise Solutions",
    status: "on-hold",
    priority: "high",
    budget: 180000,
    timeline: {
      start: new Date("2025-10-01"),
      end: new Date("2026-07-01"),
    },
    progress: 60,
    assignedTeam: [
      teamMembers[0],
      teamMembers[1],
      teamMembers[3],
      teamMembers[4],
    ],
    dueDate: new Date("2026-07-01"),
    lastUpdated: new Date("2026-02-20"),
  },
  {
    id: "8",
    name: "UI/UX Redesign for SaaS Dashboard",
    clientCompany: "DataViz Corp",
    industry: "IT & Software",
    serviceType: "UI/UX Design",
    status: "planning",
    priority: "medium",
    budget: 40000,
    timeline: {
      start: new Date("2026-05-01"),
      end: new Date("2026-07-15"),
    },
    progress: 0,
    assignedTeam: [teamMembers[2], teamMembers[4]],
    dueDate: new Date("2026-07-15"),
    lastUpdated: new Date("2026-03-05"),
  },
];
