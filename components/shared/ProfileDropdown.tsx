"use client";

import { logoutUser } from "@/api-client/auth/logout";
import ProfileTrigger from "@/components/shared/ProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { Loader } from "@/components/ui/Loader";
import { profileMenu } from "@/constants/clientNavigations";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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

  const name = pathname === "/admin/dashboard" ? "Admin User" : "Client User";
  const role = pathname === "/admin/dashboard" ? "Admin" : "Client";

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
        {profileMenu.map((item) => (
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
