"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";
import { PasswordChangePayload } from "@/types/dashboard/client/settingsType";

const initialPasswordState: PasswordChangePayload = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const SecuritySection = () => {
  const [passwordForm, setPasswordForm] =
    useState<PasswordChangePayload>(initialPasswordState);

  const handleFieldChange = (
    field: keyof PasswordChangePayload,
    value: string,
  ) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  //===== Basic client-side validation before the placeholder submit =====//
  const handleSave = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    toast.success("Password updated successfully.");
    setPasswordForm(initialPasswordState);
  };

  return (
    <SettingsSectionCard
      title="Security"
      description="Change your password to keep your account secure."
      footer={
        <Button variant="primary" size="md" onClick={handleSave}>
          Update Password
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:max-w-md">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Current Password
          </label>
          <Input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(event) =>
              handleFieldChange("currentPassword", event.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            New Password
          </label>
          <Input
            type="password"
            value={passwordForm.newPassword}
            onChange={(event) =>
              handleFieldChange("newPassword", event.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Confirm New Password
          </label>
          <Input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(event) =>
              handleFieldChange("confirmPassword", event.target.value)
            }
          />
        </div>
      </div>
    </SettingsSectionCard>
  );
};
