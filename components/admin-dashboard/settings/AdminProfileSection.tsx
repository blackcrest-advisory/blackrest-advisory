"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, Camera, Mail, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { updateAdminProfile } from "@/lib/actions/settings/admin-settings.action";
import { uploadFile } from "@/api-client/upload/upload.api";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";
import type { AdminSettings } from "@/types/dashboard/admin/settingsType";

export type AdminProfile = AdminSettings["profile"];

export const AdminProfileSection = ({ profile }: { profile: AdminProfile }) => {
  const router = useRouter();
  const [values, setValues] = useState(profile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile.avatarUrl,
  );
  const [isSaving, setIsSaving] = useState(false);

  //===== Update a single field =====//
  const updateField = (
    field: "fullName" | "phone" | "jobTitle",
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

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

  //===== Save profile changes =====//
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
        setValues((current) => ({ ...current, avatarUrl: uploadedAvatar.url }));
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
    <SettingsSectionCard
      title="Administrator Profile"
      description="Keep your contact details current for team coordination and account recovery."
      footer={
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        {/*===== Avatar & Role =====*/}
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          <Avatar src={avatarPreview} name={values.fullName} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {values.fullName}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {values.email}
            </p>
          </div>
          <label className="ml-auto flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary">
            <Camera className="h-4 w-4" />
            {avatarFile ? "Image selected" : "Change photo"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={isSaving}
            />
          </label>
          <div className="hidden items-center gap-2 rounded-md bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary sm:flex">
            <Shield className="h-3.5 w-3.5" />
            {values.role === "SUPER_ADMIN" ? "Super Admin" : "Administrator"}
          </div>
        </div>

        {/*===== Editable Fields =====*/}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <p id="work-email-help" className="text-xs text-muted-foreground">
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
      </div>
    </SettingsSectionCard>
  );
};

//===== Field wrapper =====//
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
    {label}
    {children}
  </label>
);
