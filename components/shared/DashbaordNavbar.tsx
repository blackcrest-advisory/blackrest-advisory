"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import SearchArea from "@/components/features/search/SearchArea";
import Notification from "@/components/features/notification/Notification";
import Message from "@/components/features/message/Message";
import ThemeToggle from "@/components/shared/ThemeToggle";
import ProfileDropdown from "@/components/shared/ProfileDropdown";

interface NavbarProps {
  toggleMobileSidebar: () => void;
  pageTitle: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMessages?: boolean;
  showProfile?: boolean;
  className?: string;
}

export default function DashboardNavbar({
  toggleMobileSidebar,
  pageTitle,
  showSearch = true,
  showNotifications = true,
  showMessages = true,
  showProfile = true,
  className = "",
}: NavbarProps) {
  return (
    //===== Dashboard Navbar =====//
    <header
      className={cn(
        "sticky top-0 z-30 h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex h-full items-center justify-between bg-card px-4 md:px-6">
        {/*===== Left – mobile menu + page title =====*/}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/*===== Center Search – conditionally shown =====*/}
        {showSearch && (
          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <div className="w-full max-w-md">
              <SearchArea />
            </div>
          </div>
        )}

        {/*===== Right – conditionally shown items =====*/}
        <div className="flex items-center gap-2 md:gap-3">
          {showNotifications}
          {showMessages && <Message />}
          <ThemeToggle />
          {showProfile && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}
