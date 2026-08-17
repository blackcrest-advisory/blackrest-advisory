import { Navigation, NavItem } from "@/types/navigations";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Files,
  MessageSquare,
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

export const clientNavItems: NavItem[] = [
  { label: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/client/dashboard/projects", icon: FolderOpen },
  {
    label: "Project Request",
    href: "/client/dashboard/project-requests",
    icon: FolderOpen,
  },
  { label: "Files", href: "/client/dashboard/files", icon: Files },
  // {
  //   label: "Messages",
  //   href: "/client/dashboard/messages",
  //   icon: MessageSquare,
  // },
  { label: "Invoices", href: "/client/dashboard/invoices", icon: Receipt },
  { label: "Payments", href: "/client/dashboard/payments", icon: CreditCard },
  { label: "Settings", href: "/client/dashboard/settings", icon: Settings },
];
