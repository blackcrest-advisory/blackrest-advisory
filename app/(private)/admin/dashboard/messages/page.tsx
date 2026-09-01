import { redirect } from "next/navigation";

import { MessagesWorkspace } from "@/components/shared/MessagesWorkspace";
import { getAdminMessagesData } from "@/lib/data/messages";
import { getAdminUser } from "@/lib/utils/admin-utils";

export default async function AdminMessagesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const messages = await getAdminMessagesData();

  return <MessagesWorkspace viewer="ADMIN" viewerId={admin.id} messages={messages} />;
}
