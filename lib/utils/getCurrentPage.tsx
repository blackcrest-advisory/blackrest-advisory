import { NavItem } from "@/types/navigations";
import { isNavItemActive } from "@/lib/utils/getNavItems";

export function getCurrentPage(pathname: string, navigation: NavItem[]) {
  return navigation.find((item) => isNavItemActive(pathname, item.href));
}
