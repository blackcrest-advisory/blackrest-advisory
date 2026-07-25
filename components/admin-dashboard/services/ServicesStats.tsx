import { CircleDollarSign, FolderKanban, Layers3, UsersRound } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { AdminService } from "@/types/dashboard/admin/servicesType";

export const ServicesStats = ({ services }: { services: AdminService[] }) => {
  const activeServices = services.filter((service) => service.status === "active").length;
  const activeProjects = services.reduce((total, service) => total + service.activeProjects, 0);
  const leads = services.reduce((total, service) => total + service.newLeads, 0);
  const revenue = services.reduce((total, service) => total + service.revenue, 0);
  const stats = [
    { label: "Active services", value: activeServices, note: `${services.length} services in catalog`, icon: Layers3 },
    { label: "Service-led projects", value: activeProjects, note: "Currently being delivered", icon: FolderKanban },
    { label: "New service leads", value: leads, note: "In the current period", icon: UsersRound },
    { label: "Service revenue", value: `€${revenue.toLocaleString()}`, note: "In the current period", icon: CircleDollarSign },
  ];

  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <Card key={stat.label} padding="base"><div className="flex items-start justify-between"><div><p className="text-sm text-body">{stat.label}</p><p className="mt-2 text-2xl font-semibold text-heading">{stat.value}</p><p className="mt-1 text-xs text-body">{stat.note}</p></div><div className="rounded-lg bg-secondary/10 p-2.5 text-secondary"><stat.icon className="h-5 w-5" /></div></div></Card>)}</div>;
};
