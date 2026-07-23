"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { IMAGE } from "@/constants/imagesConfig";
import { navItems } from "@/constants/clientNavigations";
import { useSidebarStore } from "@/store/sidebarStore";
import ClientSidebarItem from "@/components/shared/ClientSidebarItems";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { logoutUser } from "@/api-client/auth.api";

interface ClientSidebarProps {
  mobile?: boolean;
}

export default function ClientDesktopSidebar({
  mobile = false,
}: ClientSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const desktopCollapsed = useSidebarStore((state) => state.isCollapsed);
  const isCollapsed = mobile ? false : desktopCollapsed;
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const user = useCurrentUser();
  const initials =
    user?.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "C";

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

  return (
    <motion.aside
      className="h-full flex flex-col lg:borde bg- overflow-hidden shadow-xl bg-[var(--color-card-bg)]"
      animate={{ width: isCollapsed ? 80 : 270 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Logo */}
      <div
        className="relative items-center justify-center h-16 px-6 hidden lg:flex"
        style={{ borderColor: "var(--color-border)" }}
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
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.18 }}
                  className="absolute"
                >
                  <Image src={IMAGE.logo} alt="Logo" width={28} height={28} />
                </motion.div>
              ) : (
                <motion.button
                  key="menu"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
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

      {/* Navigation */}
      <nav className="lg:flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ClientSidebarItem
              key={item.href}
              item={item}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4">
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: "var(--color-gold)" }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--color-heading)" }}
                >
                  {user?.name ?? "Client"}
                </p>

                <p
                  className="text-xs truncate"
                  style={{ color: "var(--color-body)" }}
                >
                  {user?.email ?? ""}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50/10 transition-colors mt-1 text-sm"
              style={{ color: "var(--color-body)" }}
            >
              <LogOut size={18} />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </>
        )}
      </div>
    </motion.aside>
  );
}
