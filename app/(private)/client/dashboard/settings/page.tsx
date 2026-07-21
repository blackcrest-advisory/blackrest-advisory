import { SettingsPageHeader } from "@/components/client-dashboard/settings/SettingsPageHeader";
import { ProfileSection } from "@/components/client-dashboard/settings/ProfileSection";
import { SecuritySection } from "@/components/client-dashboard/settings/SecuritySection";
import { NotificationsSection } from "@/components/client-dashboard/settings/NotificationsSection";
import {
  mockClientProfile,
  mockNotificationPreferences,
} from "@/mock-data/settingsMockData";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsPageHeader />

      <ProfileSection profile={mockClientProfile} />
      <SecuritySection />
      <NotificationsSection preferences={mockNotificationPreferences} />
    </div>
  );
}
