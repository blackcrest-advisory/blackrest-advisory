"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Logo from "@/components/shared/Logo";
import SidebarFooter from "@/components/shared/SidebarFooter";
import DashboardSidebarItems from "@/components/shared/DashboardSidebarItems";
import { getNavGroups, isNavItemActive } from "@/lib/utils/getNavItems";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { logoutUser } from "@/api-client/auth/logout";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardMobileSidebar({
  isOpen,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useCurrentUser();

  const navGroups = getNavGroups(pathname);

  //===== Prevent body scroll when open =====//
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

  //===== Handle logout =====//
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/*===== Backdrop =====*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/*===== Drawer =====*/}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col bg-card shadow-2xl lg:hidden"
      >
        {/*===== Header =====*/}
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/*===== Navigation =====*/}
        <nav className="dashboard-nav-scroll flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{group.label}</p>
              {group.items.map((item) => (
              <DashboardSidebarItems
                key={item.href}
                item={item}
                isActive={isNavItemActive(pathname, item.href)}
                isCollapsed={false}
              />
              ))}
            </div>
          ))}
        </nav>

        {/*===== Footer =====*/}
        <SidebarFooter
          isCollapsed={false}
          userName={user?.name ?? "Client"}
          userEmail={user?.email ?? ""}
          avatarUrl={user?.avatarUrl ?? undefined}
          onLogout={handleLogout}
        />
      </motion.aside>
    </>
  );
}
