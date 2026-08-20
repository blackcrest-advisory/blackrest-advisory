import DashboardLayout from "@/components/shared/DashboardLayout";
import { CurrentUserProvider } from "@/app/providers/CurrentUserProvider";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getDashboardUser } from "@/lib/data/users";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const currentUser = user ? await getDashboardUser(user.id) : null;

  return (
    <CurrentUserProvider user={currentUser}>
      <DashboardLayout>{children}</DashboardLayout>
    </CurrentUserProvider>
  );
}
