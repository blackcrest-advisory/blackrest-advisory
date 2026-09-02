import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { NotificationsPage } from "@/components/shared/NotificationsPage";

export default async function ClientNotificationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-w-0 max-w-full">
      <NotificationsPage />
    </div>
  );
}
