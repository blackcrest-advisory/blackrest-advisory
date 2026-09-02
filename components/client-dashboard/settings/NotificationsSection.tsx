"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import {
  BellRing,
  FileUp,
  Mail,
  MessageCircleMore,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";

import {
  type NotificationItemConfig,
  type NotificationPreferences,
} from "@/types/dashboard/client/settingsType";

import { updateClientNotificationPreferences } from "@/lib/actions/settings/client-settings.action";

//===== props =====//
interface NotificationsSectionProps {
  preferences: NotificationPreferences;
}

//==============================================================//
// NOTIFICATION ITEMS
//==============================================================//

const notificationItems: Array<
  NotificationItemConfig & {
    icon: typeof BellRing;
    eyebrow: string;
  }
> = [
  {
    key: "projectUpdates",
    label: "Project Updates",
    description: "Get notified when there's progress on your projects.",
    icon: BellRing,
    eyebrow: "Delivery",
  },
  {
    key: "newMessages",
    label: "New Messages",
    description: "Get notified when the Blackcrest team sends you a message.",
    icon: MessageCircleMore,
    eyebrow: "Communication",
  },
  {
    key: "invoiceReminders",
    label: "Invoice Reminders",
    description: "Get notified about upcoming or overdue invoices.",
    icon: ReceiptText,
    eyebrow: "Billing",
  },
  {
    key: "fileUploads",
    label: "File Uploads",
    description: "Get notified when a new file is added to your projects.",
    icon: FileUp,
    eyebrow: "Documents",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    description: "Receive occasional updates about new Blackcrest services.",
    icon: Sparkles,
    eyebrow: "Blackcrest",
  },
];

//==============================================================//
// NOTIFICATIONS SECTION
//==============================================================//

export const NotificationsSection = ({
  preferences,
}: NotificationsSectionProps) => {
  const [values, setValues] = useState<NotificationPreferences>(preferences);
  const [isPending, startTransition] = useTransition();

  //===== toggle =====//
  const handleToggle = (
    key: keyof NotificationPreferences,
    checked: boolean,
  ) => {
    const updatedPreferences = {
      ...values,
      [key]: checked,
    };

    setValues(updatedPreferences);

    startTransition(async () => {
      try {
        await updateClientNotificationPreferences(updatedPreferences);
      } catch {
        toast.error("Failed to save preference");
      }
    });
  };

  //===== save =====//
  const handleSave = () => {
    toast.success("Notification preferences saved.");
  };

  return (
    <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      {/*===== HEADER =====*/}

      <div className="grid gap-5 border-b border-border px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Communication preferences
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-heading">
            Stay informed on what matters
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground">
            Choose the project, billing, document, and Blackcrest updates you
            want to receive.
          </p>
        </div>

        <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/35">
            Active preferences
          </span>

          <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-heading">
            {Object.values(values).filter(Boolean).length}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / {notificationItems.length}
            </span>
          </p>
        </div>
      </div>

      {/*===== PREFERENCES =====*/}

      <div className="grid min-w-0 md:grid-cols-2">
        {notificationItems.map((item, index) => {
          const Icon = item.icon;
          const checked = values[item.key];

          return (
            <div
              key={item.key}
              className={`
                  group
                  relative
                  min-w-0
                  border-b border-border
                  px-5 py-5
                  transition-colors
                  hover:bg-secondary/[0.018]
                  sm:px-6

                  ${index % 2 === 0 ? "md:border-r" : ""}
                `}
            >
              {/* enabled rail */}
              <span
                aria-hidden="true"
                className={`
                    absolute
                    bottom-4 left-0 top-4
                    w-[2px]
                    transition-colors

                    ${checked ? "bg-secondary/65" : "bg-transparent"}
                  `}
              />

              <div className="flex items-start gap-3">
                <div
                  className={`
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      transition-colors

                      ${
                        checked
                          ? "border-secondary/20 bg-secondary/[0.055] text-secondary"
                          : "border-border bg-background text-muted-foreground"
                      }
                    `}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                        {item.eyebrow}
                      </span>

                      <h3 className="mt-1 text-sm font-semibold text-heading">
                        {item.label}
                      </h3>
                    </div>

                    <Switch
                      checked={values[item.key]}
                      onChange={(checked) => handleToggle(item.key, checked)}
                      disabled={isPending}
                    />
                  </div>

                  <p className="mt-2 max-w-md text-xs leading-5 text-body">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`
                          h-1.5 w-1.5
                          rounded-full

                          ${checked ? "bg-success" : "bg-muted-foreground/25"}
                        `}
                    />

                    <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
                      {checked ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*===== FOOTER =====*/}

      <div className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-medium text-heading">
            Your communication preferences
          </p>

          <p className="mt-1 text-[10px] text-muted-foreground">
            Changes to individual toggles are saved as you update them.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="w-full !rounded-md sm:w-auto"
        >
          <BellRing className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </section>
  );
};
