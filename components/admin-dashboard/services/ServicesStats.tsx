import { CheckCircle2, CirclePause, Layers3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { AdminService } from "@/types/dashboard/admin/servicesType";

export function ServicesStats({ services }: { services: AdminService[] }) {
  const activeServices = services.filter((service) => service.status === "active").length;
  const stats = [
    { label: "Catalog services", value: services.length, note: "Blackcrest core offerings", icon: Layers3 },
    { label: "Active", value: activeServices, note: "Enabled catalog services", icon: CheckCircle2 },
    { label: "Paused", value: services.length - activeServices, note: "Disabled in the catalog", icon: CirclePause },
  ];
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{stats.map((stat) => <Card key={stat.label} padding="base"><div className="flex items-start justify-between"><div><p className="text-sm text-body">{stat.label}</p><p className="mt-2 text-2xl font-semibold text-heading">{stat.value}</p><p className="mt-1 text-xs text-body">{stat.note}</p></div><div className="rounded-lg bg-secondary/10 p-2.5 text-secondary"><stat.icon className="h-5 w-5" /></div></div></Card>)}</div>;
}
