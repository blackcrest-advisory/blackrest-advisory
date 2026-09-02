import client from "@/api-client/base.axios";

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body?: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export async function fetchNotifications(
  unreadOnly = false,
): Promise<{ notifications: NotificationItem[]; unreadCount: number }> {
  const response = await client.get<{
    success: boolean;
    data: NotificationItem[];
    unreadCount: number;
  }>("/api/notifications", {
    params: {
      unread: unreadOnly ? "true" : undefined,
    },
  });

  return {
    notifications: response.data.data,
    unreadCount: response.data.unreadCount,
  };
}

export async function markNotificationRead(id: string) {
  await client.patch(`/api/notifications/${id}/read`);
}

export async function markAllNotificationsRead() {
  await client.patch("/api/notifications/read-all");
}
