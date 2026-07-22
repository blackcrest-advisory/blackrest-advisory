"use client";

import { ChevronDown, User } from "lucide-react";

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
  return (
    <button
      onClick={() => setIsProfileOpen((prev) => !prev)}
      className="flex items-center gap-2 rounded-full p-1.5 hover:bg-muted/50 transition-colors cursor-pointer"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)] text-white">
        <User size={18} />
      </div>

      <div className="hidden lg:flex flex-col items-start">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-heading)" }}
        >
          {name}
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
