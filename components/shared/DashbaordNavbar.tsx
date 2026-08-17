"use client";

import { Menu } from "lucide-react";
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
    //===== Dashboard Navbar =====//
    <header
      className={cn(
        "sticky top-0 z-30 h-16 shrink-0 border-b border-border/60 bg-card/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/*===== Left – mobile menu + page title =====*/}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
              Workspace
            </p>
            <h1 className="text-xl font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/*===== Center Search – conditionally shown =====*/}
        {/*===== Right – conditionally shown items =====*/}
        <div className="flex items-center gap-2 md:gap-3">
          {showNotifications && (
            <NotificationBell basePath={notificationPath} />
          )}
          <ThemeToggle />
          <span className="mx-1 hidden h-7 w-px bg-border sm:block" />
          {showProfile && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}
