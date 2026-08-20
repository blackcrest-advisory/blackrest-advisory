"use server";

//===== imports =====//
import bcrypt from "bcryptjs";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import type {
  NotificationPreferences,
  PasswordChangePayload,
} from "@/types/dashboard/client/settingsType";

//===== verifies the request belongs to a client =====//
async function requireClient() {
  const user = await getCurrentUser();

  if (!user || user.role !== "CLIENT") {
    throw new Error("Unauthorized");
  }

  return user;
}

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
  const user = await requireClient();

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

//===== updates the authenticated client's notification preferences =====//
export async function updateClientNotificationPreferences(
  input: NotificationPreferences,
) {
  const user = await requireClient();

  if (
    typeof input?.projectUpdates !== "boolean" ||
    typeof input.newMessages !== "boolean" ||
    typeof input.invoiceReminders !== "boolean" ||
    typeof input.fileUploads !== "boolean" ||
    typeof input.marketingEmails !== "boolean"
  ) {
    throw new Error("Invalid notification preferences");
  }

  const preferences: NotificationPreferences = {
    projectUpdates: input.projectUpdates,
    newMessages: input.newMessages,
    invoiceReminders: input.invoiceReminders,
    fileUploads: input.fileUploads,
    marketingEmails: input.marketingEmails,
  };

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      notificationPreferences: preferences as unknown as Prisma.InputJsonObject,
    },
  });

  revalidatePath("/client/dashboard/settings");
}

//===== updates the authenticated client's password =====//
export async function updateClientPassword(input: PasswordChangePayload) {
  const user = await requireClient();

  if (
    typeof input?.currentPassword !== "string" ||
    typeof input.newPassword !== "string" ||
    typeof input.confirmPassword !== "string"
  ) {
    throw new Error("Invalid password data");
  }

  if (!input.currentPassword || !input.newPassword || !input.confirmPassword) {
    throw new Error("Please complete all password fields");
  }

  if (input.newPassword.length < 8) {
    throw new Error("Your new password must be at least 8 characters");
  }

  if (input.newPassword !== input.confirmPassword) {
    throw new Error("The new passwords do not match");
  }

  const client = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      password: true,
    },
  });

  if (!client?.password) {
    throw new Error("Password sign-in is unavailable for this account");
  }

  if (!(await bcrypt.compare(input.currentPassword, client.password))) {
    throw new Error("Current password is incorrect");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await bcrypt.hash(input.newPassword, 12),
    },
  });
}
