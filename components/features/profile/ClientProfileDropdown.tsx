"use client";
import ClientProfileTrigger from "@/components/features/profile/ClientProfileTrigger";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { profileMenu } from "@/constants/clientNavigations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutUser } from "@/api-client/auth.api";

const ClientProfileDropdown = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsProfileOpen(false);
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
          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default ClientProfileDropdown;
