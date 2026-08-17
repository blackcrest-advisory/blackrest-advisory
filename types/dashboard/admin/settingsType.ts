export type AdminNotificationPreferences = {
  newLeads: boolean;
  clientMessages: boolean;
  projectDeadlines: boolean;
  paymentUpdates: boolean;
  weeklyDigest: boolean;
};

export type AdminSettings = {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    avatarUrl?: string;
    role: string;
  };
  preferences: AdminNotificationPreferences;
};
