import client from "@/api-client/client";
import type {
  ClientProfile,
  NotificationPreferences,
  PasswordChangePayload,
} from "@/types/dashboard/client/settingsType";

export type ClientProfileUpdatePayload = {
  name: string;
  companyName: string;
  phone: string;
  jobTitle: string;
  avatarUrl?: string;
};

export async function updateClientNotificationPreferences(
  preferences: NotificationPreferences,
) {
  await client.patch("/api/client/settings/notifications", {
    notificationPreferences: preferences,
  });
}

export async function updateClientProfile(payload: ClientProfileUpdatePayload) {
  await client.patch("/api/client/profile", payload);
}

export async function updateClientPassword(payload: PasswordChangePayload) {
  await client.post("/api/client/settings/password", payload);
}
