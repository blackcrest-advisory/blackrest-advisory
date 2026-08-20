"use client";

//===== imports =====//
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Camera, Mail, Phone, Save, UserRound } from "lucide-react";
import toast from "react-hot-toast";

import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { updateClientProfile } from "@/api-client/client/settings.api";
import { uploadFile } from "@/api-client/upload/upload.api";

import type { ClientProfile } from "@/types/dashboard/client/settingsType";

//===== props =====//
interface ProfileSectionProps {
  profile: ClientProfile;
}

//==============================================================//
// PROFILE SECTION
//==============================================================//

export const ProfileSection = ({ profile }: ProfileSectionProps) => {
  const router = useRouter();
  const user = useCurrentUser();

  const [formValues, setFormValues] = useState<ClientProfile>(() => ({
    ...profile,
    fullName: user?.name ?? profile.fullName,
    email: user?.email ?? profile.email,
  }));

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile.avatarUrl,
  );

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  //===== Handles a text field change for any profile input =====//
  const handleFieldChange = (field: keyof ClientProfile, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //===== Generates a local preview URL the moment a new photo is picked =====//
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  //===== Save profile changes =====//
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const uploadedAvatar = avatarFile
        ? await uploadFile(avatarFile)
        : undefined;

      await updateClientProfile({
        name: formValues.fullName,
        companyName: formValues.companyName,
        phone: formValues.phone,
        jobTitle: formValues.jobTitle,
        avatarUrl: uploadedAvatar?.url ?? formValues.avatarUrl,
      });

      if (uploadedAvatar) {
        setAvatarFile(null);

        setAvatarPreview(uploadedAvatar.url);

        setFormValues((current) => ({
          ...current,
          avatarUrl: uploadedAvatar.url,
        }));
      }

      toast.success("Profile updated successfully");

      router.refresh();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ====================================================== */}
      {/* TOP SIGNAL                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-28 bg-gradient-to-r from-secondary/60 to-transparent"
      />

      {/* ====================================================== */}
      {/* HEADER                                                */}
      {/* ====================================================== */}

      <div
        className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
        >
          <UserRound className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Personal identity
          </span>

          <h2
            className="mt-1 text-base font-semibold text-heading"
          >
            Profile Information
          </h2>

          <p
            className="mt-1 text-xs leading-5 text-muted-foreground"
          >
            Update your personal and company details.
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* IDENTITY PANEL                                       */}
      {/* ====================================================== */}

      <div
        className="border-b border-border bg-background/20 px-5 py-5 sm:px-6"
      >
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Avatar src={avatarPreview} name={formValues.fullName} size="lg" />

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold text-heading"
            >
              {formValues.fullName}
            </p>

            <p
              className="mt-1 truncate text-xs text-muted-foreground"
            >
              {formValues.email}
            </p>

            {formValues.companyName && (
              <div
                className="mt-2 inline-flex items-center gap-2 rounded-md border border-secondary/15 bg-secondary/[0.04] px-2.5 py-1"
              >
                <Building2 className="h-3 w-3 text-secondary" />

                <span
                  className="max-w-[220px] truncate font-mono text-[7px] font-semibold uppercase tracking-[0.11em] text-secondary"
                >
                  {formValues.companyName}
                </span>
              </div>
            )}
          </div>

          <label
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-heading transition-colors hover:border-secondary/30 hover:text-secondary"
          >
            <Camera className="h-3.5 w-3.5" />

            {avatarFile ? "Photo selected" : "Change Photo"}

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* ====================================================== */}
      {/* PROFILE FIELDS                                       */}
      {/* ====================================================== */}

      <div
        className="grid min-w-0 gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6"
      >
        <ProfileField label="Full Name">
          <Input
            value={formValues.fullName}
            onChange={(event) =>
              handleFieldChange("fullName", event.target.value)
            }
          />
        </ProfileField>

        <ProfileField label="Email Address" icon={Mail}>
          <Input
            type="email"
            value={formValues.email}
            onChange={(event) => handleFieldChange("email", event.target.value)}
          />
        </ProfileField>

        <ProfileField label="Phone Number" icon={Phone}>
          <Input
            type="tel"
            value={formValues.phone}
            onChange={(event) => handleFieldChange("phone", event.target.value)}
          />
        </ProfileField>

        <ProfileField label="Job Title">
          <Input
            value={formValues.jobTitle}
            onChange={(event) =>
              handleFieldChange("jobTitle", event.target.value)
            }
          />
        </ProfileField>

        <div className="min-w-0 sm:col-span-2">
          <ProfileField label="Company Name">
            <Input
              value={formValues.companyName}
              onChange={(event) =>
                handleFieldChange("companyName", event.target.value)
              }
            />
          </ProfileField>
        </div>
      </div>

      {/* ====================================================== */}
      {/* FOOTER                                                */}
      {/* ====================================================== */}

      <div
        className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div
          className="flex items-center gap-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
          >
            Client profile
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isSaving}
          className="!rounded-md"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </section>
  );
};

//==============================================================//
// PROFILE FIELD
//==============================================================//

function ProfileField({
  label,
  children,
}: {
  label: string;
  icon?: typeof UserRound;
  children: React.ReactNode;
}) {
  return (
    <label
      className="block min-w-0"
    >
      <span
        className="mb-1.5 block text-xs font-semibold text-heading"
      >
        {label}
      </span>

      {children}
    </label>
  );
}
