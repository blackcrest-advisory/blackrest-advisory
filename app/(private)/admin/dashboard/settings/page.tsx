import { redirect } from "next/navigation";
import { AdminSettingsHeader } from "@/components/admin-dashboard/settings/AdminSettingsHeader";
import {
  AdminNotificationsSection,
  type AdminNotificationPreferences,
} from "@/components/admin-dashboard/settings/AdminNotificationsSection";
import { AdminProfileSection } from "@/components/admin-dashboard/settings/AdminProfileSection";
import { AdminSecuritySection } from "@/components/admin-dashboard/settings/AdminSecuritySection";

const defaultPreferences: AdminNotificationPreferences = {
  newLeads: true,
  clientMessages: true,
  projectDeadlines: true,
  paymentUpdates: true,
  weeklyDigest: true,
};

export default function AdminSettingsPage() {
  // TODO: Replace with getCurrentUser() and database data when admin settings are connected to the backend.
  const currentUser = {
    id: "admin-demo-001",
    name: "Ariana Rahman",
    email: "ariana@blackcrest.co",
    phone: "+880 1712 345 678",
    jobTitle: "Operations Director",
    avatarUrl: undefined,
    role: "SUPER_ADMIN",
  };
  const preferences: AdminNotificationPreferences = defaultPreferences;

  return (
    <div className="flex flex-col gap-6">
      <AdminSettingsHeader />
      <AdminProfileSection
        profile={{
          fullName: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          jobTitle: currentUser.jobTitle,
          avatarUrl: currentUser.avatarUrl,
          role: currentUser.role,
        }}
      />
      <AdminSecuritySection />
      <AdminNotificationsSection preferences={preferences} />
    </div>
  );
}
