"use client";

//===== imports =====//
import { useState } from "react";
import {
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Save,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import type { PasswordChangePayload } from "@/types/dashboard/client/settingsType";

import { updateClientPassword } from "@/api-client/client/settings.api";

//==============================================================//
// INITIAL PASSWORD STATE
//==============================================================//

const initialPasswordState: PasswordChangePayload = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

//==============================================================//
// SECURITY SECTION
//==============================================================//

export const SecuritySection = () => {
  const [passwordForm, setPasswordForm] =
    useState<PasswordChangePayload>(initialPasswordState);

  const [isUpdating, setIsUpdating] = useState(false);

  //===== field change =====//
  const handleFieldChange = (
    field: keyof PasswordChangePayload,
    value: string,
  ) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //===== update password =====//
  const handleSave = async () => {
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

    setIsUpdating(true);

    try {
      await updateClientPassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      toast.success("Password updated successfully");

      setPasswordForm(initialPasswordState);
    } catch (error: unknown) {
      let message = "Failed to update password";

      if (typeof error === "object" && error !== null && "response" in error) {
        const response = error as {
          response?: {
            data?: unknown;
          };
        };

        const responseData = response.response?.data;

        if (
          typeof responseData === "object" &&
          responseData !== null &&
          "error" in responseData &&
          typeof responseData.error === "string"
        ) {
          message = responseData.error;
        }
      }

      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      {/*===== TOP SIGNAL =====*/}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/60 via-secondary/20 to-transparent"
      />

      {/*===== HEADER =====*/}

      <div className="border-b border-border px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.045] text-secondary">
            <Fingerprint className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Private access
            </span>

            <h2 className="mt-1 text-base font-semibold text-heading">
              Security
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Change your password to keep your account secure.
            </p>
          </div>
        </div>
      </div>

      {/*===== SECURITY STATUS =====*/}

      <div className="border-b border-border bg-background/20 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-success/15 bg-success/[0.04] text-success">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-xs font-semibold text-heading">
              Password protected
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
              Use a unique password that you do not use for other accounts.
            </p>
          </div>
        </div>
      </div>

      {/*===== PASSWORD FORM =====*/}

      <div className="space-y-5 px-5 py-5">
        <SecurityField label="Current Password" icon={LockKeyhole}>
          <Input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(event) =>
              handleFieldChange("currentPassword", event.target.value)
            }
          />
        </SecurityField>

        <SecurityField label="New Password" icon={KeyRound}>
          <Input
            type="password"
            value={passwordForm.newPassword}
            onChange={(event) =>
              handleFieldChange("newPassword", event.target.value)
            }
          />
        </SecurityField>

        <SecurityField label="Confirm New Password" icon={ShieldCheck}>
          <Input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(event) =>
              handleFieldChange("confirmPassword", event.target.value)
            }
          />
        </SecurityField>

        {/*===== PASSWORD NOTE =====*/}

        <div className="flex items-start gap-2.5 border-l-2 border-secondary/35 bg-secondary/[0.025] px-3 py-3">
          <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />

          <div>
            <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-secondary">
              Password requirement
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
              Your new password must contain at least 8 characters.
            </p>
          </div>
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
          <Save className="h-4 w-4" />

          {isUpdating ? "Updating..." : "Update Password"}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success"/>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
            Secure client access
          </span>
        </div>
      </div>
    </section>
  );
};

//==============================================================//
// SECURITY FIELD
//==============================================================//

function SecurityField({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof LockKeyhole;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <div className="mb-1.5 flex items-center gap-2">
        <Icon className="h-3 w-3 text-secondary" />

        <span className="text-xs font-semibold text-heading">
          {label}
        </span>
      </div>

      {children}
    </label>
  );
}
