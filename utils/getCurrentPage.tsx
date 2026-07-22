import { NavItem } from "@/types/navigations";

export function getCurrentPage(pathname: string, navigation: NavItem[]) {
  return navigation.find((item) => item.href === pathname);
}
