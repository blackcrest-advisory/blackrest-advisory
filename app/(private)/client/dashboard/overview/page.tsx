import { DashboardWrapper } from "@/components/client-dashboard/overview/DashboardWrapper";
import {
  mockActivity,
  mockMilestones,
  mockProjects,
  mockStats,
} from "@/mock-data/overviewMockData";

export default function page() {
  return (
    <DashboardWrapper
      stats={mockStats}
      projects={mockProjects}
      milestones={mockMilestones}
      activities={mockActivity}
      clientName="John"
      companyName="Selenite Care"
    />
  );
}
