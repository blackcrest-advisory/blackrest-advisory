import { AdminDashboardWrapper } from "@/components/admin-dashboard/overview/AdminDashboardWrapper";
import {
  adminStatsMock,
  adminProjectsMock,
  adminDeadlinesMock,
  adminActivitiesMock,
  teamMembersMock,
  adminFooterStatsMock,
} from "@/mock-data/adminOverviewMockData";

export default function page() {
  return (
    <AdminDashboardWrapper
      adminName="Admin"
      stats={adminStatsMock}
      projects={adminProjectsMock}
      deadlines={adminDeadlinesMock}
      activities={adminActivitiesMock}
      teamMembers={teamMembersMock}
      footerStats={adminFooterStatsMock}
    />
  );
}
