import DashboardLayout from "@/components/shared/DashboardLayout";
import { CurrentUserProvider } from "@/app/providers/CurrentUserProvider";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const currentUser = user
    ? await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatarUrl: true,
        },
      })
    : null;

  return (
    <CurrentUserProvider user={currentUser}>
      <DashboardLayout>{children}</DashboardLayout>
    </CurrentUserProvider>
  );
}
