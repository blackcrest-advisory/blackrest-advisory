import { PublicNavigation } from "@/types/navigations/publicNavigations";

export interface NavItem extends PublicNavigation {
  children?: Omit<NavItem, "children">[];
}

export const navLinks: NavItem[] = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Services",
    link: "/services",
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
    name: "Process",
    link: "/process",
  },
  {
    id: 5,
    name: "Why Us",
    link: "/why-us",
  },
  {
    id: 6,
    name: "Engagement",
    link: "/engagement",
  },
  {
    id: 7,
    name: "Contact",
    link: "/contact",
  },
];
