"use client";

import { logoutUser } from "@/api-client/auth/logout";
import ProfileTrigger from "@/components/shared/ProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { Loader } from "@/components/ui/Loader";
import { profileMenu } from "@/constants/clientNavigations";
import { adminProfileMenu } from "@/constants/adminNavigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <div className="relative cursor-pointer">
      <ProfileTrigger
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        name={name}
        role={role}
      />

      <Dropdown
        isOpen={isProfileOpen}
        align="end"
        className="top-9"
        contentClassName="before:right-4"
      >
        {menu.map((item) => (
          <DropdownItem
            key={item.id}
            href={item.link}
            onClick={() => setIsProfileOpen(false)}
          >
            {item.name}
          </DropdownItem>
        ))}

        <DropdownItem danger onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <div className="flex items-center gap-2">
              <span className="ml-2">Logging out...</span> <Loader size="sm" />
            </div>
          ) : (
            "Logout"
          )}
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
