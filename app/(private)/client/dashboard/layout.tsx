import ClientDashboardLayout from "@/components/shared/ClientDashboardLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}
