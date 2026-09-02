"use server";

import { Pillar } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";
import type { AdminService } from "@/types/dashboard/admin/servicesType";

const defaultServices = [
  {
    pillar: Pillar.WEBSITE_DEVELOPMENT,
    slug: "website-development",
    name: "Website Development",
    shortDescription:
      "High-performance websites and web applications for growing B2B companies.",
  },
  {
    pillar: Pillar.MOBILE_APP,
    slug: "mobile-applications",
    name: "Mobile Applications",
    shortDescription:
      "Reliable mobile products for customer, team, and operational workflows.",
  },
  {
    pillar: Pillar.DIGITAL_MARKETING,
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortDescription:
      "Demand generation, search, content, and performance marketing programmes.",
  },
  {
    pillar: Pillar.SALES_SUPPORT,
    slug: "sales-support",
    name: "Sales & Business Support",
    shortDescription:
      "Sales operations and pipeline support that helps teams convert more opportunities.",
  },
] as const;

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");
}

async function ensureDefaultServices() {
  await Promise.all(
    defaultServices.map((service, index) =>
      prisma.service.upsert({
        where: { pillar: service.pillar },
        update: {},
        create: { ...service, sortOrder: index },
      }),
    ),
  );
}

function toAdminService(service: {
  id: string;
  pillar: Pillar;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  isActive: boolean;
  startingPrice: { toString(): string } | null;
  currency: string;
  deliveryTime: string | null;
}): AdminService {
  return {
    id: service.id,
    pillar: service.pillar,
    slug: service.slug,
    name: service.name,
    description:
      service.description ||
      service.shortDescription ||
      "No summary has been added yet.",
    status: service.isActive ? "active" : "paused",
    startingPrice: service.startingPrice
      ? `${service.currency} ${service.startingPrice.toString()}`
      : "Contact for pricing",
    deliveryTime: service.deliveryTime || "To be defined",
  };
}

export async function getAdminServices(): Promise<AdminService[]> {
  await requireAdmin();
  await ensureDefaultServices();

  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return services.map(toAdminService);
}

export async function toggleAdminServiceStatus(
  serviceId: string,
): Promise<AdminService> {
  await requireAdmin();

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error("Service not found");

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: { isActive: !service.isActive },
  });

  revalidatePath("/admin/dashboard/services");
  return toAdminService(updatedService);
}
