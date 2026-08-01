"use client";

import { motion } from "framer-motion";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { AdminSettingsHeader } from "@/components/admin-dashboard/settings/AdminSettingsHeader";
import {
  AdminNotificationsSection,
  type AdminNotificationPreferences,
} from "@/components/admin-dashboard/settings/AdminNotificationsSection";
import { AdminProfileSection } from "@/components/admin-dashboard/settings/AdminProfileSection";
import { AdminSecuritySection } from "@/components/admin-dashboard/settings/AdminSecuritySection";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

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
    //===== Admin Settings Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            {/*===== Header =====*/}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <AdminSettingsHeader />
            </motion.div>

            {/*===== Settings Sections =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
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
              </motion.div>

              <motion.div variants={fadeInUp}>
                <AdminSecuritySection />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <AdminNotificationsSection preferences={preferences} />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
