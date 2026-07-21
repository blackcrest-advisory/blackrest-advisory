"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";
import {
  NotificationItemConfig,
  NotificationPreferences,
} from "@/types/dashboard/client/settingsType";

interface NotificationsSectionProps {
  preferences: NotificationPreferences;
}

//===== Drives which toggle rows render, in order =====//
const notificationItems: NotificationItemConfig[] = [
  {
    key: "projectUpdates",
    label: "Project Updates",
    description: "Get notified when there's progress on your projects.",
  },
  {
    key: "newMessages",
    label: "New Messages",
    description: "Get notified when the Blackcrest team sends you a message.",
  },
  {
    key: "invoiceReminders",
    label: "Invoice Reminders",
    description: "Get notified about upcoming or overdue invoices.",
  },
  {
    key: "fileUploads",
    label: "File Uploads",
    description: "Get notified when a new file is added to your projects.",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    description: "Receive occasional updates about new Blackcrest services.",
  },
];

export const NotificationsSection = ({
  preferences,
}: NotificationsSectionProps) => {
  const [values, setValues] = useState<NotificationPreferences>(preferences);

  const handleToggle = (
    key: keyof NotificationPreferences,
    checked: boolean,
  ) => {
    setValues((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    toast.success("Notification preferences saved.");
  };

  return (
    <SettingsSectionCard
      title="Notification Preferences"
      description="Choose what you want to be notified about."
      footer={
        <Button variant="primary" size="md" onClick={handleSave}>
          Save Preferences
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-border">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-heading">{item.label}</p>
              <p className="mt-0.5 text-sm text-body">{item.description}</p>
            </div>
            <Switch
              checked={values[item.key]}
              onChange={(checked) => handleToggle(item.key, checked)}
            />
          </div>
        ))}
      </div>
    </SettingsSectionCard>
  );
};
