"use client";

//===== imports =====//
import { useState } from "react";
import { Fingerprint, KeyRound, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { updateAdminPassword } from "@/lib/actions/settings/admin-settings.action";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

//===== initial state =====//
const emptyPasswords = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

//==============================================================//
// ADMIN SECURITY SECTION
//==============================================================//

export const AdminSecuritySection = () => {
  const [passwords, setPasswords] = useState(emptyPasswords);

  const [isUpdating, setIsUpdating] = useState(false);

  //===== save =====//
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
    <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      {/* top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/55 via-secondary/15 to-transparent"
      />

      {/*===== HEADER =====*/}

      <div className="border-b border-border px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <Fingerprint className="h-4 w-4" />
          </div>

          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Access security
            </span>

            <h2 className="mt-1 text-base font-semibold text-heading">
              Sign-in & Security
            </h2>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Use a strong, unique password to protect access to client and
          operational data.
        </p>
      </div>

      {/*===== SECURITY STATE =====*/}

      <div className="flex items-center gap-3 border-b border-border bg-success/[0.025] px-5 py-3">
        <ShieldCheck className="h-3.5 w-3.5 text-success" />

        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-success">
          Administrator access protected
        </span>
      </div>

      {/*===== PASSWORD FIELDS =====*/}

      <div className="space-y-4 px-5 py-5">
        {(["currentPassword", "newPassword", "confirmPassword"] as const).map(
          (field) => (
            <label
              key={field}
              className="flex flex-col gap-1.5 text-xs font-semibold text-heading"
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

        <div className="flex items-start gap-2 border-l-2 border-secondary/30 bg-secondary/[0.025] px-3 py-2.5">
          <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />

          <p className="text-[10px] leading-4 text-muted-foreground">
            Passwords must contain at least 8 characters.
          </p>
        </div>
      </div>

      {/*===== FOOTER =====*/}

      <div className="border-t border-border bg-muted/10 px-5 py-4">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full !rounded-md"
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </section>
  );
};
