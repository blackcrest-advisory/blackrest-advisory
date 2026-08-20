"use server";

//===== imports =====//
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

//===== client profile =====//
export type ClientProfileUpdateInput = {
  name: string;
  companyName: string;
  phone: string;
  jobTitle: string;
  avatarUrl?: string;
};

//===== updates the authenticated client's profile =====//
export async function updateClientProfile(
  input: ClientProfileUpdateInput,
) {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT") {
    throw new Error("Unauthorized");
  }

  if (
    typeof input?.name !== "string" ||
    typeof input.companyName !== "string" ||
    typeof input.phone !== "string" ||
    typeof input.jobTitle !== "string" ||
    (input.avatarUrl !== undefined && typeof input.avatarUrl !== "string")
  ) {
    throw new Error("Invalid profile data");
  }

  const name = input.name.trim();

  if (!name) {
    throw new Error("Full name is required");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      companyName: input.companyName.trim() || null,
      phone: input.phone.trim() || null,
      jobTitle: input.jobTitle.trim() || null,
      avatarUrl: input.avatarUrl,
    },
  });

  revalidatePath("/client/dashboard/settings");
}
