"use client";

import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

interface SidebarFooterProps {
  isCollapsed: boolean;
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  onLogout?: () => void;
  className?: string;
}

export default function SidebarFooter({
  isCollapsed,
  userName,
  userEmail,
  avatarUrl,
  onLogout = () => {},
  className = "",
}: SidebarFooterProps) {
  //===== Hide footer when sidebar is collapsed =====//
  if (isCollapsed) return null;

  return (
    <div className={cn("px-3 py-4", className)}>
      {/*===== User profile card =====*/}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
        <Avatar
          src={avatarUrl}
          name={userName}
          size="sm"
          className="h-8 w-8 text-sm"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-foreground">
            {userName}
          </p>
          <p className="text-xs truncate text-muted-foreground">{userEmail}</p>
        </div>
      </div>

      {/*===== Logout button =====*/}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50/10 transition-colors mt-1 text-sm text-muted-foreground"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}
