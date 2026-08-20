"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import DashboardNavbar from "@/components/shared/DashbaordNavbar";
import DashboardMobileSidebar from "@/components/shared/DashboardMobileSidebar";
import { getCurrentPage } from "@/lib/utils/getCurrentPage";
import { getNavItems } from "@/lib/utils/getNavItems";

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

      <main
        className="relative flex-1 min-w-0 max-w-full overflow-y-auto overscroll-contain"
      >
        {/* top workspace glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-12rem] h-[30rem] w-[70%] -translate-x-1/2 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--color-secondary) 6%, transparent), transparent 68%)",
          }}
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full min-w-0 max-w-[1600px] px-4 py-5 sm:px-5 md:px-6 md:py-6 lg:px-7 xl:px-8 2xl:px-10"
        >
          {children}
        </motion.div>
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
