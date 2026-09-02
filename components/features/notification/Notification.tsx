"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { supabaseAnon } from "@/lib/supabase/client";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationItem,
} from "@/api-client/notifications.api";

const Notification = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(containerRef, isOpen, () => setIsOpen(false));

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const payload = await fetchNotifications();
      setNotifications(payload.notifications);
      setUnreadCount(payload.unreadCount);
    } catch {
      // ignore fetch failures for notification widget
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const channel = supabaseAnon
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notification",
          filter: `userId=eq.${currentUser.id}`,
        },
        (payload) => {
          const newNotification = payload.new as NotificationItem;
          setNotifications((previous) => [newNotification, ...previous]);
          setUnreadCount((count) => count + 1);
        },
      )
      .subscribe();

    return () => {
      void supabaseAnon.removeChannel(channel);
    };
  }, [currentUser]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickNotification = async (notification: NotificationItem) => {
    if (!notification.isRead) {
      await markNotificationRead(notification.id);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id ? { ...item, isRead: true } : item,
        ),
      );
      setUnreadCount((count) => Math.max(0, count - 1));
    }

    if (notification.link) {
      router.push(notification.link);
      setIsOpen(false);
    }
  };

  const unreadBadge =
    unreadCount > 0 ? (
      <span className="absolute top-0 right-0 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
    ) : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative p-2 rounded-full hover:bg-muted/50 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} style={{ color: "var(--color-body)" }} />
        {unreadBadge}
      </button>

      <Dropdown
        isOpen={isOpen}
        align="end"
        className="w-[320px]"
        contentClassName="before:left-auto before:right-4"
      >
        <div className="px-4 py-3 border-b border-border flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Notifications
            </p>
            <p className="text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>
          <button
            type="button"
            disabled={!notifications.length}
            className="text-xs font-medium text-secondary hover:text-secondary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
            onClick={loadNotifications}
          >
            Refresh
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-6 text-sm text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                onClick={() => void handleClickNotification(notification)}
                className={
                  notification.isRead ? "bg-transparent" : "bg-secondary/5"
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {notification.body}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                  )}
                </div>
              </DropdownItem>
            ))
          )}
        </div>

        <div className="px-4 py-3 border-t border-border">
          <button
            type="button"
            disabled={unreadCount === 0}
            onClick={async () => {
              try {
                await markAllNotificationsRead();
                setNotifications((prev) =>
                  prev.map((item) => ({ ...item, isRead: true })),
                );
                setUnreadCount(0);
              } catch {
                // ignore failures
              }
            }}
            className="w-full rounded-xl bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
          >
            Mark all as read
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notification;
