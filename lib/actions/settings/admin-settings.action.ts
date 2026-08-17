"use server";

import bcrypt from "bcryptjs";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";
import type {
  AdminNotificationPreferences,
  AdminSettings,
} from "@/types/dashboard/admin/settingsType";

const defaultPreferences: AdminNotificationPreferences = {
  newLeads: true,
  clientMessages: true,
  projectDeadlines: true,
  paymentUpdates: true,
  weeklyDigest: true,
};

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

function parsePreferences(value: unknown): AdminNotificationPreferences {
  const stored =
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};

  return {
    newLeads:
      typeof stored.newLeads === "boolean"
        ? stored.newLeads
        : defaultPreferences.newLeads,
    clientMessages:
      typeof stored.clientMessages === "boolean"
        ? stored.clientMessages
        : defaultPreferences.clientMessages,
    projectDeadlines:
      typeof stored.projectDeadlines === "boolean"
        ? stored.projectDeadlines
        : defaultPreferences.projectDeadlines,
    paymentUpdates:
      typeof stored.paymentUpdates === "boolean"
        ? stored.paymentUpdates
        : defaultPreferences.paymentUpdates,
    weeklyDigest:
      typeof stored.weeklyDigest === "boolean"
        ? stored.weeklyDigest
        : defaultPreferences.weeklyDigest,
  };
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const admin = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: {
      name: true,
      email: true,
      phone: true,
      jobTitle: true,
      avatarUrl: true,
      role: true,
      notificationPreferences: true,
    },
  });
  if (!user) throw new Error("Administrator account not found");

  return {
    profile: {
      fullName: user.name,
      email: user.email,
      phone: user.phone ?? "",
      jobTitle: user.jobTitle ?? "",
      avatarUrl: user.avatarUrl ?? undefined,
      role: user.role,
    },
    preferences: parsePreferences(user.notificationPreferences),
  };
}

export async function updateAdminProfile(input: {
  name: string;
  phone: string;
  jobTitle: string;
  avatarUrl?: string;
}) {
  const admin = await requireAdmin();
  if (
    typeof input?.name !== "string" ||
    typeof input.phone !== "string" ||
    typeof input.jobTitle !== "string" ||
    (input.avatarUrl !== undefined && typeof input.avatarUrl !== "string")
  ) {
    throw new Error("Invalid profile data");
  }
  const name = input.name.trim();
  if (!name) throw new Error("Full name is required");

  await prisma.user.update({
    where: { id: admin.id },
    data: {
        name,
        phone: input.phone.trim() || null,
        jobTitle: input.jobTitle.trim() || null,
        avatarUrl: input.avatarUrl,
    },
  });
  revalidatePath("/admin/dashboard/settings");
}

export async function updateAdminNotificationPreferences(
  input: AdminNotificationPreferences,
) {
  const admin = await requireAdmin();
  if (
    typeof input?.newLeads !== "boolean" ||
    typeof input.clientMessages !== "boolean" ||
    typeof input.projectDeadlines !== "boolean" ||
    typeof input.paymentUpdates !== "boolean" ||
    typeof input.weeklyDigest !== "boolean"
  ) {
    throw new Error("Invalid notification preferences");
  }
  const preferences: AdminNotificationPreferences = {
    newLeads: input.newLeads,
    clientMessages: input.clientMessages,
    projectDeadlines: input.projectDeadlines,
    paymentUpdates: input.paymentUpdates,
    weeklyDigest: input.weeklyDigest,
  };

  await prisma.user.update({
    where: { id: admin.id },
    data: { notificationPreferences: preferences as Prisma.InputJsonObject },
  });
  revalidatePath("/admin/dashboard/settings");
}

export async function updateAdminPassword(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const admin = await requireAdmin();
  if (
    typeof input?.currentPassword !== "string" ||
    typeof input.newPassword !== "string" ||
    typeof input.confirmPassword !== "string"
  ) {
    throw new Error("Invalid password data");
  }
  if (!input.currentPassword || !input.newPassword || !input.confirmPassword)
    throw new Error("Please complete all password fields");
  if (input.newPassword.length < 8)
    throw new Error("Your new password must be at least 8 characters");
  if (input.newPassword !== input.confirmPassword)
    throw new Error("The new passwords do not match");

  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: { password: true },
  });
  if (!user?.password)
    throw new Error("Password sign-in is unavailable for this account");
  if (!(await bcrypt.compare(input.currentPassword, user.password)))
    throw new Error("Current password is incorrect");

  await prisma.user.update({
    where: { id: admin.id },
    data: { password: await bcrypt.hash(input.newPassword, 12) },
  });
}
