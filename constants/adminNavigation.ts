import { Navigation, NavItem } from "@/types/navigations";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  FolderOpen,
  CheckSquare,
  UserCog,
  Package,
  Wallet,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export const adminProfileMenu: Navigation[] = [
  {
    id: 1,
    name: "My Profile",
    link: "/admin/profile",
  },
  {
    id: 2,
    name: "Settings",
    link: "/admin/settings",
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
  // {
  //   label: "Tasks",
  //   href: "/admin/dashboard/tasks",
  //   icon: CheckSquare,
  // },
  // {
  //   label: "Resources",
  //   href: "/admin/dashboard/resources",
  //   icon: UserCog,
  // },
  {
    label: "Services",
    href: "/admin/dashboard/services",
    icon: Package,
  },
  // {
  //   label: "Finance",
  //   href: "/admin/dashboard/finance",
  //   icon: Wallet,
  // },
  // {
  //   label: "Messages",
  //   href: "/admin/dashboard/messages",
  //   icon: MessageSquare,
  // },
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
