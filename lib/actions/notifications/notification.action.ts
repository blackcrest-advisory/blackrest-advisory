"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { revalidatePath } from "next/cache";

type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

//===== get notifications for current user =====//
export async function getNotifications(limit?: number, unreadOnly?: boolean) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const where: any = { userId: user.id };
    if (unreadOnly) {
      where.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit || 50,
    });

    return { success: true, data: notifications };
  } catch (error: any) {
    console.error("getNotifications error:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch notifications",
    };
  }
}

//===== get unread count =====//
export async function getUnreadCount() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const count = await prisma.notification.count({
      where: {
        userId: user.id,
        isRead: false,
      },
    });

    return { success: true, data: count };
  } catch (error: any) {
    console.error("getUnreadCount error:", error);
    return { success: false, error: error.message || "Failed to get count" };
  }
}

//===== mark single notification as read =====//
export async function markNotificationAsRead(
  notificationId: string,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.notification.update({
      where: {
        id: notificationId,
        userId: user.id, // ensure ownership
      },
      data: { isRead: true },
    });

    revalidatePath("/dashboard/notifications");
    return { success: true, data: { message: "Marked as read" } };
  } catch (error: any) {
    console.error("markNotificationAsRead error:", error);
    return { success: false, error: error.message || "Failed to mark as read" };
  }
}

//===== mark all notifications as read =====//
export async function markAllNotificationsAsRead(): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      data: { isRead: true },
    });

    revalidatePath("/dashboard/notifications");
    return { success: true, data: { message: "All marked as read" } };
  } catch (error: any) {
    console.error("markAllNotificationsAsRead error:", error);
    return {
      success: false,
      error: error.message || "Failed to mark all as read",
    };
  }
}
