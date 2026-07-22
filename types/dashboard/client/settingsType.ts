//===== Editable profile fields shown in the Profile section =====//
export interface ClientProfile {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  avatarUrl?: string;
}

//===== Toggle-based notification preferences =====//
export interface NotificationPreferences {
  projectUpdates: boolean;
  newMessages: boolean;
  invoiceReminders: boolean;
  fileUploads: boolean;
  marketingEmails: boolean;
}

//===== Payload shape for the change-password form =====//
export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//===== Config entry used to render each notification toggle row =====//
export interface NotificationItemConfig {
  key: keyof NotificationPreferences;
  label: string;
  description: string;
}
