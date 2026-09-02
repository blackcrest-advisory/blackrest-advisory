import {
  ChartNoAxesCombined,
  ContactRound,
  Landmark,
  LibraryBig,
  MessageCircle,
  PanelsTopLeft,
  ScrollText,
  ShieldEllipsis,
  Sparkles,
  Waypoints,
} from "lucide-react";

import { Navigation, NavGroup, NavItem } from "@/types/navigations";

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

export const adminNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: PanelsTopLeft,
      },
      {
        label: "CRM / Leads",
        href: "/admin/dashboard/leads",
        icon: ContactRound,
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
        icon: Waypoints,
      },
      {
        label: "Projects",
        href: "/admin/dashboard/projects",
        icon: LibraryBig,
      },
      {
        label: "Messages",
        href: "/admin/dashboard/messages",
        icon: MessageCircle,
      },
    ],
  },

  {
    label: "Operations",
    items: [
      {
        label: "Files",
        href: "/admin/dashboard/files",
        icon: Landmark,
      },
      {
        label: "Invoices",
        href: "/admin/dashboard/invoices",
        icon: ScrollText,
      },
      {
        label: "Services",
        href: "/admin/dashboard/services",
        icon: Sparkles,
      },
    ],
  },

  {
    label: "Insights",
    items: [
      {
        label: "Reports",
        href: "/admin/dashboard/reports",
        icon: ChartNoAxesCombined,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/dashboard/settings",
        icon: ShieldEllipsis,
      },
    ],
  },
];

export const adminNavItems: NavItem[] = adminNavGroups.flatMap(
  (group) => group.items,
);
