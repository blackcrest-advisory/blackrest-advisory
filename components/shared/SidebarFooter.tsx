"use client";

import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  isCollapsed: boolean;
  userName: string;
  userEmail: string;
  userInitials: string;
  onLogout?: () => void;
  className?: string;
}

export default function SidebarFooter({
  isCollapsed,
  userName,
  userEmail,
  userInitials,
  onLogout = () => {},
  className = "",
}: SidebarFooterProps) {
  //===== Hide footer when sidebar is collapsed =====//
  if (isCollapsed) return null;

  return (
    <div className={cn("px-3 py-4", className)}>
      {/*===== User profile card =====*/}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0"
          style={{ backgroundColor: "var(--color-gold)" }}
        >
          {userInitials}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{ color: "var(--color-heading)" }}
          >
            {userName}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--color-body)" }}
          >
            {userEmail}
          </p>
        </div>
      </div>

      {/*===== Logout button =====*/}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50/10 transition-colors mt-1 text-sm"
        style={{ color: "var(--color-body)" }}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}
