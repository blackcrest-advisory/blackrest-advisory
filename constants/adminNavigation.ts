import { Navigation, NavItem } from "@/types/navigations";
import {
  LayoutDashboard,
  UserPlus,
  Briefcase,
  FolderOpen,
  Package,
  Files,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";

export const adminProfileMenu: Navigation[] = [
  {
    id: 1,
    name: "Profile & Settings",
    link: "/admin/dashboard/settings",
  },
  {
    id: 2,
    name: "Reports",
    link: "/admin/dashboard/reports",
  },
];

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "CRM / Leads",
    href: "/admin/dashboard/leads",
    icon: UserPlus,
  },
  // {
  //   label: "Clients",
  //   href: "/admin/dashboard/clients",
  //   icon: Users,
  // },
  // {
  //   label: "Sales",
  //   href: "/admin/dashboard/sales",
  //   icon: Briefcase,
  // },
  {
    label: "Project Requests",
    href: "/admin/dashboard/project-requests",
    icon: Briefcase,
  },
  {
    label: "Projects",
    href: "/admin/dashboard/projects",
    icon: FolderOpen,
  },
  {
    label: "Files",
    href: "/admin/dashboard/files",
    icon: Files,
  },
  {
    label: "Invoices",
    href: "/admin/dashboard/invoices",
    icon: Receipt,
  },
  {
    label: "Services",
    href: "/admin/dashboard/services",
    icon: Package,
  },
  {
    label: "Reports",
    href: "/admin/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
];
