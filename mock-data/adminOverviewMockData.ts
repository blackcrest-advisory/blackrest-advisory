import {
  AdminStats,
  AdminProject,
  DeadlineItem,
  AdminActivity,
  TeamMember,
  FooterStat,
} from "@/types/dashboard/admin/overviewType";

export const adminStatsMock: AdminStats = {
  totalClients: 48,
  totalClientsChange: 8,
  activeProjects: 23,
  activeProjectsChange: 12,
  newLeads: 15,
  newLeadsChange: 20,
  monthlyRevenue: 84500,
  monthlyRevenueChange: 6,
  pendingTasks: 34,
  overdueInvoices: 4,
};

export const adminProjectsMock: AdminProject[] = [
  {
    id: "prj-1",
    name: "Corporate Website Rebuild",
    clientName: "Nordholm Textiles",
    status: "active",
    priority: "high",
    progress: 65,
    deadline: "Aug 12, 2026",
  },
  {
    id: "prj-2",
    name: "SEO & Content Programme",
    clientName: "Veltra Logistics",
    status: "in-review",
    priority: "medium",
    progress: 40,
    deadline: "Aug 20, 2026",
  },
  {
    id: "prj-3",
    name: "iOS Field Service App",
    clientName: "Baltic Energy Group",
    status: "planning",
    priority: "critical",
    progress: 10,
    deadline: "Sep 02, 2026",
  },
  {
    id: "prj-4",
    name: "CRM & Sales Funnel Setup",
    clientName: "Meridian Consulting",
    status: "on-hold",
    priority: "low",
    progress: 25,
    deadline: "Aug 28, 2026",
  },
];

export const adminDeadlinesMock: DeadlineItem[] = [
  {
    id: "dl-1",
    title: "Website UAT sign-off",
    clientName: "Nordholm Textiles",
    dueDate: "Jul 26",
    type: "project",
  },
  {
    id: "dl-2",
    title: "Invoice #INV-2041 due",
    clientName: "Veltra Logistics",
    dueDate: "Jul 28",
    type: "invoice",
  },
  {
    id: "dl-3",
    title: "App store submission checklist",
    clientName: "Baltic Energy Group",
    dueDate: "Aug 01",
    type: "task",
  },
];

export const adminActivitiesMock: AdminActivity[] = [
  {
    id: "act-1",
    type: "lead",
    title: "New lead received",
    description: "Fenwick Retail Group submitted a discovery request.",
    timestamp: "10 minutes ago",
  },
  {
    id: "act-2",
    type: "invoice",
    title: "Invoice paid",
    description: "Veltra Logistics paid invoice #INV-2038.",
    timestamp: "1 hour ago",
  },
  {
    id: "act-3",
    type: "project",
    title: "Project status updated",
    description: "Corporate Website Rebuild moved to Active.",
    timestamp: "3 hours ago",
  },
  {
    id: "act-4",
    type: "message",
    title: "New client message",
    description: "Baltic Energy Group sent a message regarding scope.",
    timestamp: "5 hours ago",
  },
];

export const teamMembersMock: TeamMember[] = [
  {
    id: "tm-1",
    name: "Elena Kovacs",
    role: "Project Manager",
    activeTasks: 9,
    capacity: 80,
  },
  {
    id: "tm-2",
    name: "Marcus Webb",
    role: "Full-Stack Developer",
    activeTasks: 6,
    capacity: 60,
  },
  {
    id: "tm-3",
    name: "Sara Lindqvist",
    role: "Digital Marketing Lead",
    activeTasks: 11,
    capacity: 95,
  },
];

export const adminFooterStatsMock: FooterStat[] = [
  { label: "Revenue (YTD)", value: "€612K" },
  { label: "Client Retention", value: "94%" },
  { label: "Avg. Project Duration", value: "11 weeks" },
  { label: "Client Satisfaction", value: "4.8 / 5" },
];
