import { adminNavItems } from "@/constants/adminNavigation";
import { clientNavItems } from "@/constants/clientNavigations";

export const getNavItems = (pathname: string) => {
  return pathname === "/admin/dashboard" ? adminNavItems : clientNavItems;
};
