"use client";
import ClientProfileTrigger from "@/components/features/profile/ClientProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { profileMenu } from "@/constants/clientNavigations";
import { useState } from "react";

const ClientProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    console.log("Logout");
  };
  return (
    <div className="relative cursor-pointer">
      <ClientProfileTrigger
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
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

export default ClientProfileDropdown;
