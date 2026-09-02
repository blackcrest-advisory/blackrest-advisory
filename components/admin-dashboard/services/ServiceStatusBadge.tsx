import { cn } from "@/lib/utils/utils";
import type { ServiceStatus } from "@/types/dashboard/admin/servicesType";

const styles: Record<ServiceStatus, string> = {
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  paused: "border-secondary/30 bg-secondary/10 text-secondary",
};

export const ServiceStatusBadge = ({ status }: { status: ServiceStatus }) => (
  <span
    className={cn(
      "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
      styles[status],
    )}
  >
    {status}
  </span>
);
