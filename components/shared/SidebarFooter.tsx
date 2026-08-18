"use client";

import { LogOut, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils/utils";
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
  // Keep existing behavior
  if (isCollapsed) return null;

  return (
    <div
      className={cn(
        `
          bg-card/95
          px-3 py-4
          backdrop-blur-xl
        `,
        className,
      )}
    >
      {/* Account identity */}
      <div
        className="
          relative
          overflow-hidden
          border border-border
          bg-background/70
          p-3
          shadow-[var(--shadow-card)]
        "
      >
        {/* subtle glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-10 -top-10
            h-24 w-24
            rounded-full
            bg-secondary/[0.07]
            blur-2xl
          "
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar
              src={avatarUrl}
              name={userName}
              size="sm"
              className="h-9 w-9 text-sm"
            />

            <span
              className="
                absolute -bottom-0.5 -right-0.5
                h-2.5 w-2.5
                rounded-full
                border-2 border-background
                bg-success
              "
            />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-sm
                font-semibold
                tracking-[-0.01em]
                text-heading
              "
            >
              {userName}
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-[11px]
                text-muted-foreground
              "
            >
              {userEmail}
            </p>
          </div>
        </div>

        {/* account meta */}
        <div
          className="
            relative z-10
            mt-3
            flex items-center
            justify-between
            border-t border-border
            pt-3
          "
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-muted-foreground/45
              "
            >
              Secure session
            </span>
          </div>

          <span
            className="
              h-1.5 w-1.5
              rounded-full
              bg-success
            "
          />
        </div>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="
          group
          mt-2
          flex min-h-10
          w-full
          items-center
          justify-between
          gap-3
          px-3 py-2
          text-sm
          font-medium
          text-muted-foreground
          transition-all
          duration-200

          hover:bg-destructive/[0.06]
          hover:text-destructive

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring/50
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-7 w-7
              items-center justify-center
              text-muted-foreground
              transition-colors
              duration-200
              group-hover:text-destructive
            "
          >
            <LogOut className="h-[17px] w-[17px]" />
          </div>

          <span>Logout</span>
        </div>

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.14em]
            text-muted-foreground/30
            transition-colors
            group-hover:text-destructive/60
          "
        >
          Exit
        </span>
      </button>
    </div>
  );
}
