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
import { cn } from "@/lib/utils/utils";
import { scaleFade } from "@/lib/utils/animations";
import DashboardSidebarItems from "@/components/shared/DashboardSidebarItems";
import { getNavGroups, isNavItemActive } from "@/lib/utils/getNavItems";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { logoutUser } from "@/api-client/auth/logout";

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

  //===== Handle logout =====//
  const handleLogout = async () => {
    if (isLoggingOut) return;

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

  const navGroups = getNavGroups(pathname);

  return (
    //===== Desktop Sidebar =====//
    <motion.aside
      className={cn(
        "flex h-full flex-col overflow-hidden border-r border-border bg-card backdrop-blur-sm",
      )}
      animate={{ width: isCollapsed ? 80 : 270 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      {/*===== Logo area =====*/}
      <div
        className={cn(
          "relative h-16 items-center justify-center border-b border-border px-6 hidden lg:flex",
        )}
      >
        {!mobile && isCollapsed ? (
          <div
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center"
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
                    className="cursor-e-resize transition-transform hover:scale-110"
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Image src={IMAGE.logo} alt="Blackcrest" width={28} height={28} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-wide text-foreground">Blackcrest</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
              </div>
            </div>
            {!mobile && (
              <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <PanelLeft size={20} className="cursor-e-resize" />
              </button>
            )}
          </div>
        )}
      </div>

      {/*===== Navigation =====*/}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.label}
              </p>
            )}
            {group.items.map((item) => (
              <DashboardSidebarItems
                key={item.href}
                item={item}
                isActive={isNavItemActive(pathname, item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        ))}
      </nav>

      {/*===== Footer =====*/}
      <SidebarFooter
        isCollapsed={isCollapsed}
        userName={user?.name ?? ""}
        userEmail={user?.email ?? ""}
        avatarUrl={user?.avatarUrl ?? undefined}
        onLogout={handleLogout}
      />
    </motion.aside>
  );
}
