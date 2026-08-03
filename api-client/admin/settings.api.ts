import client from "@/api-client/base.axios";

export interface AdminNotificationPreferences {
  newLeads: boolean;
  clientMessages: boolean;
  projectDeadlines: boolean;
  paymentUpdates: boolean;
  weeklyDigest: boolean;
}

export type AdminProfileUpdatePayload = {
  name: string;
  phone: string;
  jobTitle: string;
};

export type AdminPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function updateAdminNotificationPreferences(
  preferences: AdminNotificationPreferences,
) {
  await client.patch("/api/admin/settings/notifications", {
    notificationPreferences: preferences,
  });
}

export async function updateAdminProfile(payload: AdminProfileUpdatePayload) {
  await client.patch("/api/admin/settings/profile", payload);
}

export async function updateAdminPassword(payload: AdminPasswordPayload) {
  await client.post("/api/admin/settings/password", payload);
}
