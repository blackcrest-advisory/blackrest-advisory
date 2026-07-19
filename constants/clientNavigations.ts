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
    name: "My Profile",
    link: "/client/profile",
  },
  {
    id: 2,
    name: "Account Settings",
    link: "/client/account",
  },
  {
    id: 3,
    name: "Billing",
    link: "/client/billing",
  },
];

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/client/dashboard/projects", icon: FolderOpen },
  //   { label: "Project Details", href: "/client/dashboard/project-details", icon: FileText },
  { label: "Files", href: "/client/dashboard/files", icon: Files },
  {
    label: "Messages",
    href: "/client/dashboard/messages",
    icon: MessageSquare,
  },
  { label: "Invoices", href: "/client/dashboard/invoices", icon: Receipt },
  { label: "Payments", href: "/client/dashboard/payments", icon: CreditCard },
  { label: "Settings", href: "/client/dashboard/settings", icon: Settings },
];
