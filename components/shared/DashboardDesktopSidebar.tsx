"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PanelLeft, PanelLeftClose, Sparkles } from "lucide-react";
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
  const reduceMotion = Boolean(useReducedMotion());

  const desktopCollapsed = useSidebarStore((state) => state.isCollapsed);

  const isCollapsed = mobile ? false : desktopCollapsed;

  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const user = useCurrentUser();

  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <motion.aside
      className="
        relative
        flex h-full
        flex-col
        overflow-hidden
        border-r border-border
        bg-card/95
        text-card-foreground
        shadow-[8px_0_30px_rgba(15,23,42,0.035)]
        backdrop-blur-xl
        dark:shadow-[8px_0_30px_rgba(0,0,0,0.15)]
      "
      animate={{
        width: isCollapsed ? 80 : 270,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {/* top accent */}
      <div
        className="
          pointer-events-none
          absolute left-0 top-0
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary
          via-secondary/40
          to-transparent
        "
      />

      {/* Brand */}
      <div
        className="
          relative
          hidden h-[72px]
          shrink-0
          items-center
          border-b border-border
          px-4
          lg:flex
        "
      >
        {!mobile && isCollapsed ? (
          <div
            className="
              relative mx-auto
              flex h-10 w-10
              cursor-pointer
              items-center justify-center
            "
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
                  className="
                    absolute
                    flex h-9 w-9
                    items-center justify-center
                    border border-border
                    bg-background
                    shadow-[var(--shadow-card)]
                  "
                >
                  <Image
                    src={IMAGE.logo}
                    alt="Blackcrest"
                    width={24}
                    height={24}
                  />
                </motion.div>
              ) : (
                <motion.button
                  key="menu"
                  type="button"
                  variants={scaleFade}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.18 }}
                  onClick={toggleSidebar}
                  className="
                    absolute
                    flex h-9 w-9
                    items-center justify-center
                    border border-secondary/25
                    bg-secondary/[0.06]
                    text-secondary
                    transition-all
                    hover:bg-secondary
                    hover:text-secondary-foreground
                  "
                  aria-label="Expand sidebar"
                >
                  <PanelLeft size={18} className="cursor-e-resize" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div
            className="
              flex w-full
              items-center
              justify-between
              gap-3
            "
          >
            <div
              className="
                flex min-w-0
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  border border-border
                  bg-background
                  shadow-[var(--shadow-card)]
                "
              >
                <Image
                  src={IMAGE.logo}
                  alt="Blackcrest"
                  width={24}
                  height={24}
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    tracking-[-0.015em]
                    text-heading
                  "
                >
                  Blackcrest
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-success" />

                  <p
                    className="
                      truncate
                      font-mono
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.17em]
                      text-muted-foreground
                    "
                  >
                    Workspace
                  </p>
                </div>
              </div>
            </div>

            {!mobile && (
              <button
                type="button"
                onClick={toggleSidebar}
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  border border-border
                  bg-background
                  text-muted-foreground
                  transition-all
                  hover:border-secondary/30
                  hover:bg-secondary/[0.05]
                  hover:text-secondary
                "
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose size={17} className="cursor-w-resize" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* workspace status */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-4">
              <div
                className="
                  border border-secondary/15
                  bg-secondary/[0.035]
                  p-3
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex h-7 w-7
                      shrink-0
                      items-center justify-center
                      bg-secondary/[0.08]
                      text-secondary
                    "
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        font-mono
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-secondary
                      "
                    >
                      Workspace status
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      Everything is operational
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className="
          dashboard-nav-scroll
          flex-1
          overflow-y-auto
          px-3
          py-5
        "
      >
        <div className="space-y-7">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!isCollapsed && (
                <div
                  className="
                    flex items-center
                    justify-between
                    px-3 pb-2
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-muted-foreground/50
                    "
                  >
                    {group.label}
                  </p>

                  <span
                    className="
                      h-px flex-1
                      ml-3
                      bg-border/70
                    "
                  />
                </div>
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
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border">
        <SidebarFooter
          isCollapsed={isCollapsed}
          userName={user?.name ?? ""}
          userEmail={user?.email ?? ""}
          avatarUrl={user?.avatarUrl ?? undefined}
          onLogout={handleLogout}
        />
      </div>
    </motion.aside>
  );
}
