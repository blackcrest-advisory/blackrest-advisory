"use client";

//===== imports =====//
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/actions/notifications/notification.action";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
  type: string;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const result = await getNotifications(100, false);
      if (result.success && result.data) {
        setNotifications(result.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = (notificationId: string) => {
    startTransition(async () => {
      await markNotificationAsRead(notificationId);
      await fetchNotifications();
      router.refresh();
    });
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      await fetchNotifications();
      router.refresh();
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Notifications
        </h1>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={isPending}
          >
            <CheckCheck className="mr-1 h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="py-16 text-center">
          <p className="text-muted-foreground">No notifications yet.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors ${!notification.isRead ? "border-secondary/50 bg-secondary/5" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {notification.title}
                  </p>
                  {notification.body && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.body}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkRead(notification.id)}
                    className="flex-shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-white transition-colors"
                    disabled={isPending}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
              {notification.link && (
                <Link
                  href={notification.link}
                  className="mt-3 inline-block text-sm text-secondary hover:underline"
                  onClick={() => {
                    if (!notification.isRead) {
                      handleMarkRead(notification.id);
                    }
                  }}
                >
                  View →
                </Link>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
