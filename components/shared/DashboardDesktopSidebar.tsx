"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { IMAGE } from "@/constants/imagesConfig";
import { useSidebarStore } from "@/store/sidebarStore";
import SidebarFooter from "@/components/shared/SidebarFooter";
import { cn } from "@/lib/utils";
import { scaleFade } from "@/utils/animations";
import DashboardSidebarItems from "@/components/shared/DashboardSidebarItems";
import { getNavItems } from "@/utils/getNavItems";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { logoutUser } from "@/api-client/auth.api";

interface ClientSidebarProps {
  mobile?: boolean;
}

export default function DashboardDesktopSidebar({
  mobile = false,
}: ClientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const desktopCollapsed = useSidebarStore((state) => state.isCollapsed);
  const isCollapsed = mobile ? false : desktopCollapsed;
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const user = useCurrentUser();

  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logoutUser();
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out");
      setIsLoggingOut(false);
    }
  };

  const navItems = getNavItems(pathname);

  return (
    <motion.aside
      className={cn(
        "h-full flex flex-col overflow-hidden shadow-xl",
        "bg-(--color-card-bg) border-r border-(--color-border)",
      )}
      animate={{ width: isCollapsed ? 80 : 270 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      {/*===== Logo area =====*/}
      <div
        className={cn(
          "relative items-center justify-center h-16 px-6 hidden lg:flex",
          "border-b border-(--color-border)",
        )}
      >
        {!mobile && isCollapsed ? (
          <div
            className="relative flex items-center justify-center w-10 h-10 cursor-pointer"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <AnimatePresence mode="wait">
              {!isLogoHovered ? (
                <motion.div
                  key="logo"
                  variants={scaleFade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.18 }}
                  className="absolute"
                >
                  <Image src={IMAGE.logo} alt="Logo" width={28} height={28} />
                </motion.div>
              ) : (
                <motion.button
                  key="menu"
                  variants={scaleFade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.18 }}
                  onClick={toggleSidebar}
                  className="absolute flex items-center justify-center"
                >
                  <PanelLeft
                    size={22}
                    className="hover:scale-110 transition-transform cursor-e-resize"
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Image src={IMAGE.logo} alt="Logo" width={28} height={28} />
            {!mobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <PanelLeft size={20} className="cursor-e-resize" />
              </button>
            )}
          </div>
        )}
      </div>

      {/*===== Navigation =====*/}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DashboardSidebarItems
              key={item.href}
              item={item}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/*===== Footer =====*/}
      <SidebarFooter
        isCollapsed={isCollapsed}
        userName={user?.name ?? "Client"}
        userEmail={user?.email ?? ""}
        avatarUrl={user?.avatarUrl ?? undefined}
        onLogout={handleLogout}
      />
    </motion.aside>
  );
}
