"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { getUnreadMessageCount } from "@/lib/actions/messages/message.action";

export function MessageBell({ href }: { href: string }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;
    void getUnreadMessageCount().then((result) => {
      if (active && result.success) setUnreadCount(result.data ?? 0);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Link
      href={href}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      aria-label={
        unreadCount > 0 ? `${unreadCount} unread messages` : "Open messages"
      }
    >
      <MessageCircle className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-semibold text-secondary-foreground">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
