"use client";

import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebarStore";
import DashboardDesktopSidebar from "@/components/shared/DashboardDesktopSidebar";
import DashboardMainArea from "@/components/shared/DashboardMainArea";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <div
      className="h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen lg:block">
        <DashboardDesktopSidebar />
      </aside>

      {/* Main area – remounts on route change, resetting mobile sidebar state */}
      <div
        className={`flex h-screen flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-20" : "lg:ml-67.5"
        }`}
      >
        <DashboardMainArea key={pathname}>{children}</DashboardMainArea>
      </div>
    </div>
  );
}
