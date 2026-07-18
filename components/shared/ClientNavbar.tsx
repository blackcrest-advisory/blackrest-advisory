import { Menu } from "lucide-react";

import SearchArea from "@/components/search/SearchArea";
import Notification from "@/components/notification/Notification";
import Message from "@/components/message/Message";
import ClientProfileDropdown from "@/components/profile/ClientProfileDropdown";
import ThemeToggle from "@/components/shared/ThemeToggle";

interface NavbarProps {
  toggleMobileSidebar: () => void;
  pageTitle: string;
}

export default function ClientNavbar({
  toggleMobileSidebar,
  pageTitle,
}: NavbarProps) {
  return (
    <header
      className="sticky top-0 z-30 h-16 shrink-0 backdrop-blur-xl shadow-xl "
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-background) 85%, transparent)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6 bg-[var(--color-card-bg)]">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={toggleMobileSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} style={{ color: "var(--color-heading)" }} />
          </button>

          {/* Page Title */}
          <div>
            <h1
              className="text-xl font-semibold"
              style={{ color: "var(--color-heading)" }}
            >
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Center Search */}
        <div className="hidden flex-1 justify-center px-8 lg:flex">
          <div className="w-full max-w-md">
            <SearchArea />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3">
          <Notification />
          <Message />
          <ThemeToggle />
          <ClientProfileDropdown />
        </div>
      </div>
    </header>
  );
}
