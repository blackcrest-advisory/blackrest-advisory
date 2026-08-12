"use client";

//===== imports =====//
import { useState, useEffect, useRef, useTransition } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/actions/notifications/notification.action";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";

interface Notification {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
  type: string;
}

interface NotificationBellProps {
  basePath?: string;
}

export function NotificationBell({
  basePath = "/dashboard/notifications",
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fetchNotifications = async () => {
    try {
      const result = await getNotifications(5, false);
      if (result.success && result.data) {
        setNotifications(result.data);
        const unread = result.data.filter(
          (n: Notification) => !n.isRead,
        ).length;
        setUnreadCount(unread);
      } else {
        // If error, just clear notifications
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  //===== close on outside click =====//
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifications(); // refresh on open
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <Dropdown
        isOpen={isOpen}
        align="end"
        className="w-80"
        contentClassName="before:right-4"
      >
        <div ref={dropdownRef}>
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-sm font-medium text-foreground">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={isPending}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            <ul className="max-h-80 divide-y divide-border overflow-y-auto">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`group relative px-4 py-3 transition-colors hover:bg-muted/50 ${
                    !notification.isRead ? "bg-secondary/5" : ""
                  }`}
                >
                  <Link
                    href={notification.link || "#"}
                    onClick={() => {
                      if (!notification.isRead) {
                        handleMarkRead(notification.id);
                      }
                      setIsOpen(false);
                    }}
                    className="block"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        {notification.body && (
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                            {notification.body}
                          </p>
                        )}
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true },
                          )}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border px-4 py-2">
            <Link
              href={basePath}
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all notifications
            </Link>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
