import {
  Activity,
  Milestone,
  Project,
  Stats,
} from "@/types/dashboard/DemoType";

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "SEO Optimisation",
    service: "Digital Marketing",
    progress: 80,
    daysLeft: 14,
    status: "on-track",
  },
  {
    id: 2,
    name: "Website Redesign",
    service: "Web Development",
    progress: 60,
    daysLeft: 21,
    status: "review",
  },
  {
    id: 3,
    name: "Mobile App Development",
    service: "Mobile Apps",
    progress: 40,
    daysLeft: 35,
    status: "in-progress",
  },
];

export const mockMilestones: Milestone[] = [
  { date: "Today", title: "Project Review Meeting", time: "2:00 PM" },
  { date: "Tomorrow", title: "SEO Report Delivery", time: "End of Day" },
  { date: "This Week", title: "Website Prototype Review", time: "Friday" },
  { date: "Next Week", title: "Mobile App Beta Launch", time: "Monday" },
];

export const mockActivity: Activity[] = [
  {
    iconName: "file",
    text: 'New file uploaded: "Q2 Marketing Strategy.pdf"',
    time: "2h ago",
  },
  {
    iconName: "message",
    text: "Team replied to your message",
    time: "4h ago",
  },
  {
    iconName: "check",
    text: 'Milestone completed: "Homepage Design"',
    time: "1d ago",
  },
  {
    iconName: "dollar",
    text: "Invoice #INV-2026-004 paid",
    time: "2d ago",
  },
  {
    iconName: "trending",
    text: "Monthly report available",
    time: "3d ago",
  },
];

export const mockStats: Stats = {
  activeProjects: 4,
  leadsGenerated: 1247,
  conversionRate: 18.4,
  revenueImpact: 124000,
  change: {
    leads: "+12%",
    conversion: "+2.1%",
    revenue: "+8%",
  },
};
