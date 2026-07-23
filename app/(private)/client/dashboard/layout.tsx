import DashboardLayout from "@/components/shared/DashboardLayout";
import { CurrentUserProvider } from "@/app/providers/CurrentUserProvider";
import { getCurrentUser } from "@/lib/auth-utils";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <CurrentUserProvider user={user}>
      <DashboardLayout>{children}</DashboardLayout>
    </CurrentUserProvider>
  );
}
