import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AdminSettingsHeader } from "@/components/admin-dashboard/settings/AdminSettingsHeader";
import {
  AdminNotificationsSection,
} from "@/components/admin-dashboard/settings/AdminNotificationsSection";
import { AdminProfileSection } from "@/components/admin-dashboard/settings/AdminProfileSection";
import { AdminSecuritySection } from "@/components/admin-dashboard/settings/AdminSecuritySection";
import { getAdminSettings } from "@/lib/actions/settings/admin-settings.action";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    //===== Admin Settings Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            {/*===== Header =====*/}
            <div>
              <AdminSettingsHeader />
            </div>

            {/*===== Settings Sections =====*/}
            <div className="flex flex-col gap-6">
              <div>
                <AdminProfileSection
                  profile={settings.profile}
                />
              </div>

              <div>
                <AdminSecuritySection />
              </div>

              <div>
                <AdminNotificationsSection preferences={settings.preferences} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
