import { PublicNavigation } from "@/types/navigations/publicNavigations";

export interface NavItem extends PublicNavigation {
  children?: Omit<NavItem, "children">[];
}

export const navLinks: NavItem[] = [
  {
    id: 1,
    name: "Home",
    link: "/home",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Services",
    link: "#",
    children: [
      {
        id: 31,
        name: "Digital Marketing",
        link: "/services/digital-marketing",
      },
      {
        id: 32,
        name: "Website Development",
        link: "/services/website-development",
      },
      {
        id: 33,
        name: "Mobile Applications",
        link: "/services/mobile-applications",
      },
      {
        id: 34,
        name: "Sales & Business Support",
        link: "/services/sales-support",
      },
    ],
  },
  {
    id: 4,
    name: "Engagement",
    link: "/engagement",
  },
  {
    id: 5,
    name: "Contact",
    link: "/contact",
  },
];
