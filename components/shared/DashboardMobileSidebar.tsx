"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, CircleDot } from "lucide-react";
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
  const reduceMotion = Boolean(useReducedMotion());

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
      {/*===== BACKDROP =====*/}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.2,
        }}
        className="fixed inset-0 z-40 bg-navy-deep/60 backdrop-blur-[3px] lg:hidden"
        onClick={onClose}
      />

      {/*===== DRAWER =====*/}

      <motion.aside
        initial={{
          x: reduceMotion ? 0 : "-100%",
          opacity: reduceMotion ? 1 : 0.96,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: reduceMotion ? 0 : "-100%",
          opacity: reduceMotion ? 1 : 0.96,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                damping: 28,
                stiffness: 320,
                mass: 0.9,
              }
        }
        className="fixed left-0 top-0 z-50 flex h-dvh w-[min(88vw,320px)] flex-col overflow-hidden border-r border-border bg-card/98 text-card-foreground shadow-[var(--shadow-overlay)] backdrop-blur-xl lg:hidden"
      >
        {/* top brand signal */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent"
        />

        {/* subtle workspace background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />

        {/*===== HEADER =====*/}

        <div
          className="relative z-10 flex h-[72px] shrink-0 items-center justify-between border-b border-border px-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Logo />

            <div className="hidden min-w-0 xs:block">
              <p
                className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/50"
              >
                Workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-muted-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:border-secondary/30 hover:bg-secondary/[0.05] hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/*===== WORKSPACE STATUS =====*/}

        <div className="relative z-10 px-4 pt-4">
          <div
            className="border border-secondary/15 bg-secondary/[0.035] p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center bg-secondary/[0.08]"
              >
                <CircleDot className="h-3.5 w-3.5 text-secondary" />
              </div>

              <div className="min-w-0">
                <p
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
                >
                  Blackcrest workspace
                </p>

                <p
                  className="mt-0.5 truncate text-[11px] text-muted-foreground"
                >
                  Everything is operational
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*===== NAVIGATION =====*/}

        <nav
          className="dashboard-nav-scroll relative z-10 flex-1 overflow-y-auto overscroll-contain px-3 py-5"
        >
          <div className="space-y-7">
            {navGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <div
                  className="flex items-center gap-3 px-3 pb-2"
                >
                  <p
                    className="shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50"
                  >
                    {group.label}
                  </p>

                  <span className="h-px flex-1 bg-border/70" />
                </div>

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
          </div>
        </nav>

        {/*===== FOOTER =====*/}

        <div
          className="relative z-10 shrink-0 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)]"
        >
          <SidebarFooter
            isCollapsed={false}
            userName={user?.name ?? "Client"}
            userEmail={user?.email ?? ""}
            avatarUrl={user?.avatarUrl ?? undefined}
            onLogout={handleLogout}
          />
        </div>
      </motion.aside>
    </>
  );
}
