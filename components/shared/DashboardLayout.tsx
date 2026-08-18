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
    //===== Dashboard Layout =====//
    <div className="dashboard-shell h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen lg:block">
        <DashboardDesktopSidebar />
      </aside>
      <div
        className={`flex h-screen flex-col bg-background/65 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-20" : "lg:ml-67.5"
        }`}
      >
        <DashboardMainArea key={pathname}>{children}</DashboardMainArea>
      </div>
    </div>
  );
}
