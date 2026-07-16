export interface Navigation {
  id: number;
  name: string;
  link: string;
}

//client
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
