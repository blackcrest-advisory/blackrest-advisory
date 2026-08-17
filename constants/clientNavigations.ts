import { Navigation, NavGroup, NavItem } from "@/types/navigations";
import {
  LayoutDashboard,
  FolderOpen,
  Files,
  Receipt,
  CreditCard,
  Settings,
} from "lucide-react";

export const profileMenu: Navigation[] = [
  {
    id: 1,
    name: "Profile & Settings",
    link: "/client/dashboard/settings",
  },
  {
    id: 2,
    name: "Invoices",
    link: "/client/dashboard/invoices",
  },
  {
    id: 3,
    name: "Payments",
    link: "/client/dashboard/payments",
  },
];

export const clientNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
  { label: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/client/dashboard/projects", icon: FolderOpen },
  {
    label: "Project Request",
    href: "/client/dashboard/project-requests",
    icon: FolderOpen,
  },
    ],
  },
  {
    label: "Manage",
    items: [
  { label: "Files", href: "/client/dashboard/files", icon: Files },
  { label: "Invoices", href: "/client/dashboard/invoices", icon: Receipt },
  { label: "Payments", href: "/client/dashboard/payments", icon: CreditCard },
    ],
  },
  {
    label: "Account",
    items: [
  { label: "Settings", href: "/client/dashboard/settings", icon: Settings },
    ],
  },
];

export const clientNavItems: NavItem[] = clientNavGroups.flatMap(
  (group) => group.items,
);
