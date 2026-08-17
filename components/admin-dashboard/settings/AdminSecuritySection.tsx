"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateAdminPassword } from "@/lib/actions/settings/admin-settings.action";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";

const emptyPasswords = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const AdminSecuritySection = () => {
  const [passwords, setPasswords] = useState(emptyPasswords);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.error("Please complete all password fields.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      toast.error("Your new password must be at least 8 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("The new passwords do not match.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateAdminPassword(passwords);
      setPasswords(emptyPasswords);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update password",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SettingsSectionCard
      title="Sign-in & Security"
      description="Use a strong, unique password to protect access to client and operational data."
      footer={
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </Button>
      }
    >
      <div className="grid max-w-md grid-cols-1 gap-4">
        {(["currentPassword", "newPassword", "confirmPassword"] as const).map(
          (field) => (
            <label
              key={field}
              className="flex flex-col gap-1.5 text-sm font-medium text-heading"
            >
              {field === "currentPassword"
                ? "Current Password"
                : field === "newPassword"
                  ? "New Password"
                  : "Confirm New Password"}
              <Input
                type="password"
                value={passwords[field]}
                onChange={(event) =>
                  setPasswords((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
              />
            </label>
          ),
        )}
      </div>
    </SettingsSectionCard>
  );
};
