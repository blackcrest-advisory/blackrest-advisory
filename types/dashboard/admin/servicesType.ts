import type { Pillar } from "@prisma/client";

export type ServiceStatus = "active" | "paused";

export type AdminService = {
  id: string;
  name: string;
  pillar: Pillar;
  slug: string;
  description: string;
  status: ServiceStatus;
  startingPrice: string;
  deliveryTime: string;
};
