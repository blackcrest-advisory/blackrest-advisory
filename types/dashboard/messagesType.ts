export type MessageParticipant = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  companyName: string | null;
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

export type DashboardMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string | null;
  body: string;
  projectId: string | null;
  status: "UNREAD" | "READ";
  createdAt: string;
  sender: MessageParticipant;
  receiver: MessageParticipant;
};

export type MessageProject = {
  id: string;
  title: string;
};
