"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { SettingsSectionCard } from "@/components/client-dashboard/settings/SettingsSectionCard";
import { updateAdminNotificationPreferences } from "@/lib/actions/settings/admin-settings.action";
import type { AdminNotificationPreferences } from "@/types/dashboard/admin/settingsType";

export type { AdminNotificationPreferences } from "@/types/dashboard/admin/settingsType";

const items: {
  key: keyof AdminNotificationPreferences;
  label: string;
  description: string;
}[] = [
  {
    key: "newLeads",
    label: "New leads",
    description: "Receive an alert when a new prospect submits an enquiry.",
  },
  {
    key: "clientMessages",
    label: "Client messages",
    description: "Stay informed when a client sends a new message.",
  },
  {
    key: "projectDeadlines",
    label: "Project deadlines",
    description: "Get reminders for upcoming delivery dates and overdue work.",
  },
  {
    key: "paymentUpdates",
    label: "Payment updates",
    description:
      "Receive notifications for payments, invoices, and finance activity.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly operations digest",
    description:
      "Receive a weekly summary of pipeline, projects, and client activity.",
  },
];

export const AdminNotificationsSection = ({
  preferences,
}: {
  preferences: AdminNotificationPreferences;
}) => {
  const [values, setValues] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateAdminNotificationPreferences(values);
      toast.success("Notification preferences saved");
    } catch {
      toast.error("Unable to save notification preferences");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSectionCard
      title="Operational Alerts"
      description="Choose the activity that should reach you in the admin workspace."
      footer={
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-border">
        {items.map((item) => (
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
              onChange={(checked) =>
                setValues((current) => ({ ...current, [item.key]: checked }))
              }
            />
          </div>
        ))}
      </div>
    </SettingsSectionCard>
  );
};
