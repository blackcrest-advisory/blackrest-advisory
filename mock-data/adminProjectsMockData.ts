import type { AdminProject } from "@/types/dashboard/admin/projectsType";

// TODO: Replace with project, proposal, budget, task, and team assignment data from the backend.
export const adminProjectsMock: AdminProject[] = [
  { id: "prj-001", name: "Commerce Growth Platform", clientName: "Northstar Commerce", service: "Website Development", status: "active", priority: "high", manager: "Ariana Rahman", progress: 72, budget: 28000, budgetSpent: 19400, deadline: "Aug 12, 2026", health: "on-track", lastActivity: "2 hours ago" },
  { id: "prj-002", name: "Demand Generation Sprint", clientName: "Vertex Labs", service: "Digital Marketing", status: "active", priority: "medium", manager: "David Chen", progress: 48, budget: 14500, budgetSpent: 8100, deadline: "Aug 05, 2026", health: "at-risk", lastActivity: "Yesterday" },
  { id: "prj-003", name: "Patient Portal Experience", clientName: "MediCore Health", service: "Web Application", status: "in-review", priority: "critical", manager: "Maya Islam", progress: 90, budget: 42000, budgetSpent: 39000, deadline: "Jul 31, 2026", health: "at-risk", lastActivity: "3 hours ago" },
  { id: "prj-004", name: "Outbound Sales Enablement", clientName: "Kiteworks", service: "Sales Support", status: "planning", priority: "medium", manager: "Ariana Rahman", progress: 15, budget: 18000, budgetSpent: 1200, deadline: "Sep 10, 2026", health: "on-track", lastActivity: "Jul 23, 2026" },
  { id: "prj-005", name: "Investor Mobile App", clientName: "Axis Capital", service: "Mobile Application", status: "on-hold", priority: "high", manager: "David Chen", progress: 38, budget: 36000, budgetSpent: 15400, deadline: "Aug 20, 2026", health: "at-risk", lastActivity: "Jul 17, 2026" },
  { id: "prj-006", name: "Brand & Content Refresh", clientName: "Luma Beauty", service: "Branding", status: "active", priority: "low", manager: "Maya Islam", progress: 64, budget: 9500, budgetSpent: 5300, deadline: "Aug 28, 2026", health: "on-track", lastActivity: "5 hours ago" },
  { id: "prj-007", name: "Marketplace SEO Recovery", clientName: "Harbor & Co.", service: "SEO", status: "active", priority: "critical", manager: "Ariana Rahman", progress: 56, budget: 12000, budgetSpent: 9800, deadline: "Jul 27, 2026", health: "overdue", lastActivity: "4 days ago" },
  { id: "prj-008", name: "Learning Hub MVP", clientName: "Edify Group", service: "Web Application", status: "completed", priority: "medium", manager: "David Chen", progress: 100, budget: 22000, budgetSpent: 21600, deadline: "Jul 18, 2026", health: "on-track", lastActivity: "Jul 18, 2026" },
];
