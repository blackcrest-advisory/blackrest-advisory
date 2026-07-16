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
      className="sticky top-0 z-50 border-b backdrop-blur-md bg-opacity-80"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={22} style={{ color: "var(--color-foreground)" }} />
          </button>

          <h1 className="text-xl font-semibold text-accent">
            {pageTitle}
          </h1>
        </div>

        {/* search */}
        <SearchArea />

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Notification />

          {/* Messages */}
          <Message />

          {/* dark/light mode toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <ClientProfileDropdown />
        </div>
      </div>
    </header>
  );
}
