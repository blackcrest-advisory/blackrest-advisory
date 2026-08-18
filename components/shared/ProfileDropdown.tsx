"use client";

import { logoutUser } from "@/api-client/auth/logout";
import ProfileTrigger from "@/components/shared/ProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { Loader } from "@/components/ui/Loader";
import { profileMenu } from "@/constants/clientNavigations";
import { adminProfileMenu } from "@/constants/adminNavigation";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const user = useCurrentUser();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();

      setIsProfileOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const name = user?.name ?? "User";

  const role =
    user?.role === "SUPER_ADMIN"
      ? "Super Admin"
      : user?.role === "ADMIN"
        ? "Administrator"
        : "Client";

  const menu =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? adminProfileMenu
      : profileMenu;

  useOutsideClick(dropdownContainerRef, isProfileOpen, () =>
    setIsProfileOpen(false),
  );

  return (
    <div ref={dropdownContainerRef} className="relative">
      <ProfileTrigger
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        name={name}
        role={role}
      />

      <Dropdown
        isOpen={isProfileOpen}
        align="end"
        className="
          top-11
          w-[280px]
        "
        contentClassName="
          overflow-hidden
          border border-border
          bg-popover
          p-0
          shadow-[var(--shadow-overlay)]
          before:right-5
        "
      >
        {/* ================================================ */}
        {/* PROFILE HEADER                                   */}
        {/* ================================================ */}

        <div
          className="
            relative
            overflow-hidden
            border-b border-border
            px-4 py-4
          "
        >
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-10 -top-10
              h-24 w-24
              rounded-full
              bg-secondary/[0.08]
              blur-2xl
            "
          />

          <div className="relative z-10 flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                border border-secondary/15
                bg-secondary/[0.05]
                text-secondary
              "
            >
              <UserRound className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-heading
                "
              >
                {name}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground/45
                  "
                >
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================ */}
        {/* MENU                                             */}
        {/* ================================================ */}

        <div className="py-2">
          <div className="px-4 pb-2 pt-1">
            <p
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted-foreground/35
              "
            >
              Account
            </p>
          </div>

          {menu.map((item) => (
            <DropdownItem
              key={item.id}
              href={item.link}
              onClick={() => setIsProfileOpen(false)}
              className="
                mx-2
                flex min-h-10
                items-center
                px-3
                text-sm
                text-foreground/80
                transition-all
                duration-200
                hover:bg-secondary/[0.045]
                hover:text-secondary
              "
            >
              {item.name}
            </DropdownItem>
          ))}
        </div>

        {/* ================================================ */}
        {/* LOGOUT                                           */}
        {/* ================================================ */}

        <div
          className="
            border-t border-border
            bg-muted/15
            p-2
          "
        >
          <DropdownItem
            danger
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="
              flex min-h-10
              items-center
              justify-between
              px-3
            "
          >
            {isLoggingOut ? (
              <div className="flex w-full items-center justify-between gap-3">
                <span className="text-sm font-medium">Logging out...</span>

                <Loader size="sm" />
              </div>
            ) : (
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </div>

                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    opacity-50
                  "
                >
                  Exit
                </span>
              </div>
            )}
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
