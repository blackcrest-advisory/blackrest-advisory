"use client";

import { Menu, PanelTop } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import ThemeToggle from "@/components/shared/ThemeToggle";
import ProfileDropdown from "@/components/shared/ProfileDropdown";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";

interface NavbarProps {
  toggleMobileSidebar: () => void;
  pageTitle: string;
  showNotifications?: boolean;
  showProfile?: boolean;
  className?: string;
}

export default function DashboardNavbar({
  toggleMobileSidebar,
  pageTitle,
  showNotifications = true,
  showProfile = true,
  className = "",
}: NavbarProps) {
  const currentUser = useCurrentUser();

  const notificationPath =
    currentUser?.role === "CLIENT"
      ? "/client/dashboard/notifications"
      : "/admin/dashboard/notifications";

  return (
    <header
      className={cn(
        `
          sticky top-0 z-30
          h-[72px]
          shrink-0
          border-b border-border
          bg-card/95
          text-card-foreground
          shadow-[0_1px_0_color-mix(in_srgb,var(--color-border)_70%,transparent)]
          backdrop-blur-xl
          supports-[backdrop-filter]:bg-card/90
        `,
        className,
      )}
    >
      {/* subtle top brand signal */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"
      />

      {/* subtle bottom signal */}
      <div
        className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-28 bg-gradient-to-r from-secondary via-secondary/50 to-transparent"
      />

      <div
        className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10"
      >
        {/*===== LEFT =====*/}

        <div className="flex min-w-0 items-center gap-3">
          {/* mobile menu */}
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background text-muted-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:border-secondary/30 hover:bg-secondary/[0.05] hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          {/* context block */}
          <div className="min-w-0">
            <div className="hidden items-center gap-2 sm:flex">
              <PanelTop className="h-3 w-3 text-secondary" />

              <p
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/45"
              >
                Blackcrest Workspace
              </p>
            </div>

            <div className="mt-0.5 flex items-center gap-3">
              <h1
                className="truncate text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl"
              >
                {pageTitle}
              </h1>

              <span
                className="hidden h-1.5 w-1.5 rounded-full bg-success sm:block"
              />
            </div>
          </div>
        </div>

        {/*===== RIGHT =====*/}

        <div className="flex shrink-0 items-center gap-2">
          {/* utility group */}
          <div
            className="flex items-center gap-1 border border-border bg-background/70 p-1 shadow-[var(--shadow-control-inset)]"
          >
            {showNotifications && (
              <div
                className="flex h-9 w-9 items-center justify-center"
              >
                <NotificationBell basePath={notificationPath} />
              </div>
            )}

            <div
              className="flex h-9 w-9 items-center justify-center"
            >
              <ThemeToggle />
            </div>
          </div>

          {/* separator */}
          <span
            className="mx-1 hidden h-8 w-px bg-border sm:block"
          />

          {/* profile */}
          {showProfile && (
            <div
              className="flex items-center rounded-[var(--radius-control)] transition-colors"
            >
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
