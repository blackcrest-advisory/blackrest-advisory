import {
  BadgeDollarSign,
  ChartSpline,
  FileArchive,
  FolderKanban,
  MessageCircle,
  PanelsTopLeft,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

import { Navigation, NavGroup, NavItem } from "@/types/navigations";

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
      {
        label: "Dashboard",
        href: "/client/dashboard",
        icon: PanelsTopLeft,
      },
      {
        label: "Projects",
        href: "/client/dashboard/projects",
        icon: FolderKanban,
      },
      {
        label: "Project Request",
        href: "/client/dashboard/project-requests",
        icon: ChartSpline,
      },
    ],
  },

  {
    label: "Manage",
    items: [
      {
        label: "Files",
        href: "/client/dashboard/files",
        icon: FileArchive,
      },
      {
        label: "Invoices",
        href: "/client/dashboard/invoices",
        icon: ScrollText,
      },
      {
        label: "Payments",
        href: "/client/dashboard/payments",
        icon: BadgeDollarSign,
      },
      {
        label: "Messages",
        href: "/client/dashboard/messages",
        icon: MessageCircle,
      },
    ],
  },

  {
    label: "Account",
    items: [
      {
        label: "Settings",
        href: "/client/dashboard/settings",
        icon: ShieldCheck,
      },
    ],
  },
];

export const clientNavItems: NavItem[] = clientNavGroups.flatMap(
  (group) => group.items,
);
