"use client";

import { ArrowUpRight, Clock3, Pause, Play, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AdminService } from "@/types/dashboard/admin/servicesType";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

export function ServicesGrid({ services, onToggleStatus }: { services: AdminService[]; onToggleStatus: (id: string) => void }) {
  if (!services.length) return <div className="rounded-xl border border-dashed border-border py-14 text-center"><p className="font-medium text-heading">No services found</p><p className="mt-1 text-sm text-body">Try a different search or status filter.</p></div>;

  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <Card key={service.id} padding="base" hoverEffect className="flex flex-col"><div className="flex items-start justify-between gap-3"><div><div className="mb-2 flex items-center gap-2"><span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-body">{service.pillar.replaceAll("_", " ")}</span><ServiceStatusBadge status={service.status} /></div><h2 className="text-lg font-semibold text-heading">{service.name}</h2></div><Button variant="ghost" size="sm" className="!rounded-full !p-2" onClick={() => onToggleStatus(service.id)} aria-label={`${service.status === "active" ? "Pause" : "Activate"} ${service.name}`}>{service.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button></div><p className="mt-3 flex-1 text-sm leading-6 text-body">{service.description}</p><div className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4"><Metric icon={Clock3} label="Delivery" value={service.deliveryTime} /><Metric icon={ArrowUpRight} label="Starting price" value={service.startingPrice} /></div><div className="mt-5 flex justify-end"><Button href={`/services/${service.slug}`} variant="outline" size="sm">View public page <ArrowUpRight className="h-4 w-4" /></Button></div></Card>)}</div>;
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div><div className="flex items-center gap-1.5 text-xs text-body"><Icon className="h-3.5 w-3.5 text-secondary" />{label}</div><p className="mt-1 text-sm font-semibold text-heading">{value}</p></div>;
}
