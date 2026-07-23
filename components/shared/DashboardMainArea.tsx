"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import DashboardNavbar from "@/components/shared/DashbaordNavbar";
import DashboardMobileSidebar from "@/components/shared/DashboardMobileSidebar";
import { getCurrentPage } from "@/utils/getCurrentPage";
import { getNavItems } from "@/utils/getNavItems";

interface DashboardMainAreaProps {
  children: React.ReactNode;
}

export default function DashboardMainArea({
  children,
}: DashboardMainAreaProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navItems = getNavItems(pathname);
  const page = getCurrentPage(pathname, navItems)?.label;

  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <>
      <DashboardNavbar
        toggleMobileSidebar={toggleMobileSidebar}
        pageTitle={page || "Dashboard"}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl p-6 md:p-8">{children}</div>
      </main>
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <DashboardMobileSidebar
            isOpen={isMobileSidebarOpen}
            onClose={closeMobileSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
}
