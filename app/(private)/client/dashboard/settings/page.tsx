import { SettingsPageHeader } from "@/components/client-dashboard/settings/SettingsPageHeader";
import { ProfileSection } from "@/components/client-dashboard/settings/ProfileSection";
import { SecuritySection } from "@/components/client-dashboard/settings/SecuritySection";
import { NotificationsSection } from "@/components/client-dashboard/settings/NotificationsSection";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import type {
  ClientProfile,
  NotificationPreferences,
} from "@/types/dashboard/client/settingsType";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      companyName: true,
      jobTitle: true,
      avatarUrl: true,
      notificationPreferences: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const profile: ClientProfile = {
    fullName: user.name,
    email: user.email,
    phone: user.phone ?? "",
    companyName: user.companyName ?? "",
    jobTitle: user.jobTitle ?? "",
    avatarUrl: user.avatarUrl ?? undefined,
  };

  const defaultPreferences: NotificationPreferences = {
    projectUpdates: true,
    newMessages: true,
    invoiceReminders: true,
    fileUploads: false,
    marketingEmails: false,
  };
  const storedPreferences =
    typeof user.notificationPreferences === "object" &&
    user.notificationPreferences !== null &&
    !Array.isArray(user.notificationPreferences)
      ? (user.notificationPreferences as Record<string, unknown>)
      : null;
  const preferences: NotificationPreferences = storedPreferences
    ? {
        projectUpdates:
          typeof storedPreferences.projectUpdates === "boolean"
            ? storedPreferences.projectUpdates
            : defaultPreferences.projectUpdates,
        newMessages:
          typeof storedPreferences.newMessages === "boolean"
            ? storedPreferences.newMessages
            : defaultPreferences.newMessages,
        invoiceReminders:
          typeof storedPreferences.invoiceReminders === "boolean"
            ? storedPreferences.invoiceReminders
            : defaultPreferences.invoiceReminders,
        fileUploads:
          typeof storedPreferences.fileUploads === "boolean"
            ? storedPreferences.fileUploads
            : defaultPreferences.fileUploads,
        marketingEmails:
          typeof storedPreferences.marketingEmails === "boolean"
            ? storedPreferences.marketingEmails
            : defaultPreferences.marketingEmails,
      }
    : defaultPreferences;

  return (
    <div className="flex flex-col gap-6">
      <SettingsPageHeader />

      <ProfileSection profile={profile} />
      <SecuritySection />
      <NotificationsSection preferences={preferences} />
    </div>
  );
}
