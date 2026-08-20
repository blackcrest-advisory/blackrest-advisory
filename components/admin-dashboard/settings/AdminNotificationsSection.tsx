"use client";

//===== imports =====//
import { useState } from "react";
import {
  BellRing,
  CalendarClock,
  CircleDollarSign,
  Mail,
  MessageSquareText,
  UsersRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

import { updateAdminNotificationPreferences } from "@/lib/actions/settings/admin-settings.action";

import type { AdminNotificationPreferences } from "@/types/dashboard/admin/settingsType";

export type { AdminNotificationPreferences } from "@/types/dashboard/admin/settingsType";

//===== notification items =====//
const items: {
  key: keyof AdminNotificationPreferences;
  label: string;
  description: string;
  icon: typeof BellRing;
}[] = [
  {
    key: "newLeads",
    label: "New leads",
    description: "Receive an alert when a new prospect submits an enquiry.",
    icon: UsersRound,
  },
  {
    key: "clientMessages",
    label: "Client messages",
    description: "Stay informed when a client sends a new message.",
    icon: MessageSquareText,
  },
  {
    key: "projectDeadlines",
    label: "Project deadlines",
    description: "Get reminders for upcoming delivery dates and overdue work.",
    icon: CalendarClock,
  },
  {
    key: "paymentUpdates",
    label: "Payment updates",
    description:
      "Receive notifications for payments, invoices, and finance activity.",
    icon: CircleDollarSign,
  },
  {
    key: "weeklyDigest",
    label: "Weekly operations digest",
    description:
      "Receive a weekly summary of pipeline, projects, and client activity.",
    icon: Mail,
  },
];

//==============================================================//
// ADMIN NOTIFICATIONS SECTION
//==============================================================//

export const AdminNotificationsSection = ({
  preferences,
}: {
  preferences: AdminNotificationPreferences;
}) => {
  //===== state =====//
  const [values, setValues] = useState(preferences);

  const [isSaving, setIsSaving] = useState(false);

  //===== save =====//
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
    <section
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== TOP SIGNAL =====*/}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-28 bg-secondary/45"
      />

      {/*===== HEADER =====*/}

      <div
        className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
        >
          <BellRing className="h-4 w-4" />
        </div>

        <div>
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Alert matrix
          </span>

          <h2
            className="mt-1 text-base font-semibold text-heading"
          >
            Operational Alerts
          </h2>

          <p
            className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground"
          >
            Choose the activity that should reach you in the admin workspace.
          </p>
        </div>
      </div>

      {/*===== ALERT LIST =====*/}

      <div className="divide-y divide-border">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="grid gap-4 px-5 py-4 transition-colors hover:bg-secondary/[0.015] sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-center sm:px-6"
            >
              {/* icon */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background/50 text-secondary"
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              {/* content */}
              <div className="min-w-0">
                <div
                  className="flex flex-wrap items-center gap-2"
                >
                  <span
                    className="font-mono text-[7px] font-semibold text-muted-foreground/30"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p
                    className="text-sm font-semibold text-heading"
                  >
                    {item.label}
                  </p>
                </div>

                <p
                  className="mt-1 max-w-2xl text-xs leading-5 text-body"
                >
                  {item.description}
                </p>
              </div>

              {/* control */}
              <div
                className="flex items-center justify-between gap-3 sm:justify-end"
              >
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35 sm:hidden"
                >
                  {values[item.key] ? "Enabled" : "Disabled"}
                </span>

                <Switch
                  checked={values[item.key]}
                  onChange={(checked) =>
                    setValues((current) => ({
                      ...current,
                      [item.key]: checked,
                    }))
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
          >
            Notification controls available
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={isSaving}
          className="!rounded-md"
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </section>
  );
};
