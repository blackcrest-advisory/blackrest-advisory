"use client";

import { ChevronDown } from "lucide-react";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { Avatar } from "@/components/ui/Avatar";

interface ClientProfileTriggerProps {
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name?: string;
  role?: string;
}

const ProfileTrigger = ({
  isProfileOpen,
  setIsProfileOpen,
  name,
  role,
}: ClientProfileTriggerProps) => {
  const user = useCurrentUser();
  const displayName = user?.name ?? name ?? "Client";

  return (
    <button
      onClick={() => setIsProfileOpen((prev) => !prev)}
      className="flex items-center gap-2 rounded-full p-1.5 hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <Avatar
        src={user?.avatarUrl ?? undefined}
        name={displayName}
        size="sm"
      />

      <div className="hidden lg:flex flex-col items-start">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-heading)" }}
        >
          {displayName}
        </span>

        <span className="text-xs" style={{ color: "var(--color-body)" }}>
          {role}
        </span>
      </div>

      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${
          isProfileOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default ProfileTrigger;
