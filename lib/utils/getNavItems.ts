import { adminNavGroups, adminNavItems } from "@/constants/adminNavigation";
import { clientNavGroups, clientNavItems } from "@/constants/clientNavigations";

export const getNavItems = (pathname: string) => {
  return pathname.startsWith("/admin") ? adminNavItems : clientNavItems;
};

export const getNavGroups = (pathname: string) =>
  pathname.startsWith("/admin") ? adminNavGroups : clientNavGroups;

export const isNavItemActive = (pathname: string, href: string) => {
  const isDashboardRoot =
    href === "/admin/dashboard" || href === "/client/dashboard";

  return pathname === href || (!isDashboardRoot && pathname.startsWith(`${href}/`));
};
