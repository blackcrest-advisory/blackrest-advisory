//===== imports =====//
import { AdminSettingsHeader } from "@/components/admin-dashboard/settings/AdminSettingsHeader";
import { AdminNotificationsSection } from "@/components/admin-dashboard/settings/AdminNotificationsSection";
import { AdminProfileSection } from "@/components/admin-dashboard/settings/AdminProfileSection";
import { AdminSecuritySection } from "@/components/admin-dashboard/settings/AdminSecuritySection";

import { getAdminSettings } from "@/lib/actions/settings/admin-settings.action";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div className="relative space-y-6">
      {/*===== SETTINGS HEADER =====*/}

      <AdminSettingsHeader />

      {/*===== SETTINGS WORKSPACE =====*/}

      <div
        className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)] xl:items-start"
      >
        {/*===== MAIN SETTINGS =====*/}

        <div className="min-w-0 space-y-6">
          <AdminProfileSection profile={settings.profile} />

          <AdminNotificationsSection preferences={settings.preferences} />
        </div>

        {/*===== SECURITY RAIL =====*/}

        <aside
          className="min-w-0 space-y-6 xl:sticky xl:top-4"
        >
          <AdminSecuritySection />
        </aside>
      </div>
    </div>
  );
}
