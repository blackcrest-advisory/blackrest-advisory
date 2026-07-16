"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import ClientSidebar from "@/components/shared/ClientSidebar";
import ClientNavbar from "@/components/shared/ClientNavbar";
import ClientMobileSidebar from "@/components/shared/ClientMobileSidebar";
import { useSidebarStore } from "@/store/sidebarStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function ClientDashboardLayout({
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div
      className="h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* ================= Desktop Sidebar ================= */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen lg:block">
        <ClientSidebar />
      </aside>

      {/* ================= Main Area ================= */}
      <div
        className={`flex h-screen flex-col transition-all duration-300 ease-in-out
        ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[270px]"}`}
      >
        {/* Navbar */}
        <ClientNavbar
          toggleMobileSidebar={toggleMobileSidebar}
          pageTitle={getPageTitle(pathname)}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-6 md:p-8">{children}</div>
        </main>
      </div>

      {/* ================= Mobile Sidebar ================= */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <ClientMobileSidebar
            isOpen={isMobileSidebarOpen}
            onClose={closeMobileSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function getPageTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  const lastSegment = segments[segments.length - 1];

  if (!lastSegment) return "Dashboard";

  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
