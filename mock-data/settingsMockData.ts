import {
  ClientProfile,
  NotificationPreferences,
} from "@/types/dashboard/client/settingsType";

//===== Dummy logged-in client profile until account API is wired =====//
export const mockClientProfile: ClientProfile = {
  fullName: "Ayesha Rahman",
  email: "ayesha.rahman@novatrade.com",
  phone: "+880 1711-223344",
  companyName: "NovaTrade Ltd.",
  jobTitle: "Operations Director",
  avatarUrl: undefined,
};

//===== Dummy notification preferences until account API is wired =====//
export const mockNotificationPreferences: NotificationPreferences = {
  projectUpdates: true,
  newMessages: true,
  invoiceReminders: true,
  fileUploads: false,
  marketingEmails: false,
};
