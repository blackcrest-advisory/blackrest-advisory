"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpRight,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  CircleCheck,
  Inbox,
} from "lucide-react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/actions/notifications/notification.action";
import { Button } from "@/components/ui/Button";

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
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  //===== Fetch notifications =====//
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
    } finally {
      setLoading(false);
    }
  };

  //===== Initial load =====//
  useEffect(() => {
    let isCurrent = true;

    void getNotifications(100, false)
      .then((result) => {
        if (!isCurrent) return;

        setNotifications(result.success && result.data ? result.data : []);
      })
      .catch((error) => {
        if (!isCurrent) return;

        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  //===== Mark notification read =====//
  const handleMarkRead = (notificationId: string) => {
    startTransition(async () => {
      await markNotificationAsRead(notificationId);
      await fetchNotifications();
      router.refresh();
    });
  };

  //===== Mark all read =====//
  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      await fetchNotifications();
      router.refresh();
    });
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;
  const readCount = notifications.length - unreadCount;

  if (loading) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Page header =====*/}
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Client Activity
            </span>
            <span className="h-px w-10 bg-secondary/35" />
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Stay informed about project activity, account updates, invoices, and
            messages from the Blackcrest team.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={isPending}
            className="!rounded-md"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/*===== Activity summary =====*/}
      <div className="grid border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        <SummaryItem
          icon={Bell}
          label="All notifications"
          value={String(notifications.length).padStart(2, "0")}
        />

        <SummaryItem
          icon={BellRing}
          label="Unread"
          value={String(unreadCount).padStart(2, "0")}
          bordered
        />

        <SummaryItem
          icon={CircleCheck}
          label="Read"
          value={String(readCount).padStart(2, "0")}
          bordered
        />
      </div>

      {/*===== Notification inbox =====*/}
      <div className="relative border border-border bg-card shadow-[var(--shadow-card)]">
        <span className="absolute left-0 top-0 h-[2px] w-28 bg-secondary" />

        {/*===== Inbox header =====*/}
        <div className="flex flex-col gap-4 border-b border-border px-4 pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Activity Inbox
            </span>

            <p className="mt-1 text-sm text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
                : "You are all caught up"}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
            <span
              className={`h-1.5 w-1.5 rounded-full ${unreadCount > 0 ? "bg-secondary" : "bg-success"}`}
            />
            {notifications.length} total
          </div>
        </div>

        {/*===== Empty state =====*/}
        {notifications.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
              <Inbox className="h-4 w-4" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-heading">
              No notifications yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Project updates, invoice activity, and important account messages
              will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={`group relative transition-colors ${
                  notification.isRead
                    ? "bg-card hover:bg-muted/10"
                    : "bg-secondary/[0.035] hover:bg-secondary/[0.055]"
                }`}
              >
                {!notification.isRead && (
                  <span className="absolute bottom-0 left-0 top-0 w-[2px] bg-secondary" />
                )}

                <div className="flex items-start gap-4 px-4 py-5 sm:px-5">
                  {/*===== State indicator =====*/}
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border ${
                      notification.isRead
                        ? "border-border bg-muted/20 text-muted-foreground"
                        : "border-secondary/20 bg-secondary/[0.06] text-secondary"
                    }`}
                  >
                    {notification.isRead ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <BellRing className="h-4 w-4" />
                    )}
                  </div>

                  {/*===== Notification content =====*/}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2
                            className={`text-sm font-semibold ${notification.isRead ? "text-heading" : "text-secondary"}`}
                          >
                            {notification.title}
                          </h2>

                          {!notification.isRead && (
                            <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-secondary">
                              New
                            </span>
                          )}
                        </div>

                        {notification.body && (
                          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                            {notification.body}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 whitespace-nowrap font-mono text-[7px] font-medium uppercase tracking-[0.1em] text-muted-foreground/35">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    {/*===== Notification actions =====*/}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition-colors hover:text-heading"
                          onClick={() => {
                            if (!notification.isRead) {
                              handleMarkRead(notification.id);
                            }
                          }}
                        >
                          View details
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </Link>
                      )}

                      {!notification.isRead && (
                        <button
                          type="button"
                          onClick={() => handleMarkRead(notification.id)}
                          disabled={isPending}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-heading disabled:pointer-events-none disabled:opacity-50"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/*===== Inbox footer =====*/}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/10 px-4 py-3 sm:px-5">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
              Notification history
            </span>

            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
              {unreadCount === 0
                ? "All read"
                : `${unreadCount} awaiting review`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

//===== Summary item =====//
function SummaryItem({
  icon: Icon,
  label,
  value,
  bordered = false,
}: {
  icon: typeof Bell;
  label: string;
  value: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 px-5 py-5 ${bordered ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
    >
      <div>
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
          {label}
        </span>

        <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading">
          {value}
        </p>
      </div>

      <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

//===== Notifications skeleton =====//
function NotificationsSkeleton() {
  return (
    <div className="min-w-0 max-w-full space-y-6">
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-px w-10" />
          </div>

          <Skeleton className="mt-4 h-8 w-44" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
        </div>

        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      <div className="grid border border-border bg-card sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-5 px-5 py-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
          >
            <div>
              <Skeleton className="h-2 w-20" />
              <Skeleton className="mt-3 h-8 w-10" />
            </div>

            <Skeleton className="h-9 w-9 border border-border" />
          </div>
        ))}
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border px-5 py-5">
          <Skeleton className="h-2 w-24" />
          <Skeleton className="mt-3 h-4 w-32" />
        </div>

        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-start gap-4 px-5 py-5">
              <Skeleton className="h-9 w-9 shrink-0 border border-border" />

              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-3 h-3 w-full max-w-xl" />
                <Skeleton className="mt-2 h-3 w-3/4 max-w-md" />
                <Skeleton className="mt-4 h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 ${className}`} />;
}
