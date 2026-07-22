"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import ClientDesktopSidebar from "@/components/shared/DashboardDesktopSidebar";
import Logo from "@/components/shared/Logo";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardMobileSidebar({
  isOpen,
  onClose,
}: MobileSidebarProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden "
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 h-full w-[280px] z-50 shadow-2xl lg:hidden bg-background"
      >
        {/* Close button inside drawer */}
        <div className="relative flex justify-between mt-4 px-2">
          <Logo />

          <div className="flex items-center gap-2">
            <Search size="20" />
            <button
              onClick={onClose}
              className="flex items- justify-between cursor-pointer"
            >
              <X size={22} style={{ color: "var(--color-foreground)" }} />
            </button>
          </div>
        </div>

        <div className="h-full">
          <ClientDesktopSidebar />
        </div>
      </motion.aside>
    </>
  );
}
