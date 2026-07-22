"use client";
import ProfileTrigger from "@/components/shared/ProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { profileMenu } from "@/constants/clientNavigations";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const handleLogout = () => {
    setIsProfileOpen(false);
    console.log("Logout");
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

        <DropdownItem danger onClick={handleLogout}>
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
