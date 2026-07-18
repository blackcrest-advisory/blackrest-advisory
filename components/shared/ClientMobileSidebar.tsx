"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ClientSidebar from "@/components/shared/ClientSidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientMobileSidebar({
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 h-full w-[280px] z-50 shadow-2xl lg:hidden"
        style={{ backgroundColor: "var(--color-card-bg)" }}
      >
        {/* Close button inside drawer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
          aria-label="Close menu"
        >
          <X size={22} style={{ color: "var(--color-foreground)" }} />
        </button>
        <ClientSidebar />
      </motion.aside>
    </>
  );
}
