"use client";

//===== imports =====//
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Camera,
  Mail,
  Shield,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { updateAdminProfile } from "@/lib/actions/settings/admin-settings.action";
import { uploadFile } from "@/api-client/upload/upload.api";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import type { AdminSettings } from "@/types/dashboard/admin/settingsType";

//===== types =====//
export type AdminProfile = AdminSettings["profile"];

//==============================================================//
// ADMIN PROFILE SECTION
//==============================================================//

export const AdminProfileSection = ({ profile }: { profile: AdminProfile }) => {
  //===== state =====//
  const router = useRouter();

  const [values, setValues] = useState(profile);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile.avatarUrl,
  );

  const [isSaving, setIsSaving] = useState(false);

  //===== field update =====//
  const updateField = (
    field: "fullName" | "phone" | "jobTitle",
    value: string,
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  //===== avatar =====//
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");

      event.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile image must be 5MB or smaller");

      event.target.value = "";

      return;
    }

    setAvatarFile(file);

    setAvatarPreview(URL.createObjectURL(file));

    event.target.value = "";
  };

  //===== save =====//
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const uploadedAvatar = avatarFile ? await uploadFile(avatarFile) : null;

      await updateAdminProfile({
        name: values.fullName,
        phone: values.phone,
        jobTitle: values.jobTitle,
        avatarUrl: uploadedAvatar?.url ?? values.avatarUrl,
      });

      if (uploadedAvatar) {
        setAvatarFile(null);

        setAvatarPreview(uploadedAvatar.url);

        setValues((current) => ({
          ...current,
          avatarUrl: uploadedAvatar.url,
        }));
      }

      router.refresh();

      toast.success("Admin profile updated");
    } catch {
      toast.error("Unable to update your profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      {/* top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-24 bg-secondary/55"
      />

      {/*===== HEADER =====*/}

      <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary">
          <UserRound className="h-4 w-4" />
        </div>

        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
            Account identity
          </span>

          <h2 className="mt-1 text-base font-semibold text-heading">
            Administrator Profile
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
            Keep your contact details current for team coordination and account
            recovery.
          </p>
        </div>
      </div>

      {/*===== PROFILE IDENTITY =====*/}

      <div className="border-b border-border bg-background/20 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar src={avatarPreview} name={values.fullName} size="lg" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-heading">
              {values.fullName}
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {values.email}
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-secondary/15 bg-secondary/[0.05] px-2.5 py-1 font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-secondary">
              <Shield className="h-3 w-3" />

              {values.role === "SUPER_ADMIN" ? "Super Admin" : "Administrator"}
            </div>
          </div>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-heading transition-colors hover:border-secondary/30 hover:text-secondary">
            <Camera className="h-3.5 w-3.5" />

            {avatarFile ? "Image selected" : "Change photo"}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={isSaving}
            />
          </label>
        </div>
      </div>

      {/*===== FIELDS =====*/}

      <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <Field label="Full Name">
          <Input
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
        </Field>

        <Field label="Work Email">
          <Input
            value={values.email}
            icon={Mail}
            readOnly
            aria-describedby="work-email-help"
          />

          <p
            id="work-email-help"
            className="text-[10px] leading-4 text-muted-foreground"
          >
            Email changes are managed by the account owner.
          </p>
        </Field>

        <Field label="Phone Number">
          <Input
            type="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>

        <Field label="Job Title">
          <Input
            icon={BriefcaseBusiness}
            value={values.jobTitle}
            onChange={(event) => updateField("jobTitle", event.target.value)}
          />
        </Field>
      </div>

      {/*===== FOOTER =====*/}

      <div className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40">
            Profile information
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isSaving}
          className="!rounded-md"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </section>
  );
};

//==============================================================//
// FIELD
//==============================================================//

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold text-heading">
    {label}

    {children}
  </label>
);
