"use client";

import { usePathname } from "next/navigation";

import { useSidebarStore } from "@/store/sidebarStore";
import DashboardDesktopSidebar from "@/components/shared/DashboardDesktopSidebar";
import DashboardMainArea from "@/components/shared/DashboardMainArea";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <div
      className="
        dashboard-shell
        relative
        h-screen
        overflow-hidden
        bg-background
        text-foreground
      "
    >
      {/* subtle dashboard grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--color-border) 50%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--color-border) 50%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 45%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 45%)",
        }}
      />

      {/* Desktop sidebar */}
      <aside
        className="
          fixed left-0 top-0 z-40
          hidden h-screen
          lg:block
        "
      >
        <DashboardDesktopSidebar />
      </aside>

      {/* Main shell */}
      <div
        className={`
          relative z-10
          flex h-screen
          min-w-0
          flex-col
          transition-[margin]
          duration-300
          ease-[cubic-bezier(0.32,0.72,0,1)]

          ${isCollapsed ? "lg:ml-20" : "lg:ml-[270px]"}
        `}
      >
        <DashboardMainArea key={pathname}>{children}</DashboardMainArea>
      </div>
    </div>
  );
}
