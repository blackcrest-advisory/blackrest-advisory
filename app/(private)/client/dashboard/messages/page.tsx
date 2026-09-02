import { redirect } from "next/navigation";

import { MessagesWorkspace } from "@/components/shared/MessagesWorkspace";
import { getClientMessagesData } from "@/lib/data/messages";
import { getCurrentUser } from "@/lib/utils/auth-utils";

export default async function ClientMessagesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "CLIENT") redirect("/login");

  const { messages, projects } = await getClientMessagesData(user.id);

  return (
    <MessagesWorkspace
      viewer="CLIENT"
      viewerId={user.id}
      messages={messages}
      projects={projects}
    />
  );
}
