import { DashboardWrapper } from "@/components/client-dashboard/main/DashboardWrapper";
import {
  mockActivity,
  mockMilestones,
  mockProjects,
  mockStats,
} from "@/data/mockData";

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
