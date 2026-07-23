"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";
import { ClientProfile } from "@/types/dashboard/client/settingsType";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import axios from "@/api-client/client";

interface ProfileSectionProps {
  profile: ClientProfile;
}

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
  const [isSaving, setIsSaving] = useState(false);

  //===== Handles a text field change for any profile input =====//
  const handleFieldChange = (field: keyof ClientProfile, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  //===== Generates a local preview URL the moment a new photo is picked =====//
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await axios.patch("/api/client/profile", {
        name: formValues.fullName,
        companyName: formValues.companyName,
        phone: formValues.phone,
        jobTitle: formValues.jobTitle,
      });
      toast.success("Profile updated successfully");
      router.refresh();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      title="Profile Information"
      description="Update your personal and company details."
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
        <div className="flex items-center gap-4">
          <Avatar src={avatarPreview} name={formValues.fullName} size="lg" />

          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-secondary/40 hover:text-secondary">
            <Camera className="h-4 w-4" />
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-heading">
              Full Name
            </label>
            <Input
              value={formValues.fullName}
              onChange={(event) =>
                handleFieldChange("fullName", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-heading">
              Email Address
            </label>
            <Input
              type="email"
              value={formValues.email}
              onChange={(event) =>
                handleFieldChange("email", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-heading">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formValues.phone}
              onChange={(event) =>
                handleFieldChange("phone", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-heading">
              Job Title
            </label>
            <Input
              value={formValues.jobTitle}
              onChange={(event) =>
                handleFieldChange("jobTitle", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-heading">
              Company Name
            </label>
            <Input
              value={formValues.companyName}
              onChange={(event) =>
                handleFieldChange("companyName", event.target.value)
              }
            />
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
};
