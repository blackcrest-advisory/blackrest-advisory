"use client";

import { UserPlus, FolderPlus, Receipt, Users, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
}

const actions: QuickAction[] = [
  { label: "Add New Lead", href: "/admin/dashboard/leads/new", icon: UserPlus },
  {
    label: "Create Project",
    href: "/admin/dashboard/projects/new",
    icon: FolderPlus,
  },
  {
    label: "New Invoice",
    href: "/admin/dashboard/finance/invoices/new",
    icon: Receipt,
  },
  { label: "Add Client", href: "/admin/dashboard/clients/new", icon: Users },
];

export const AdminQuickActions = () => {
  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <h3 className="mb-4 text-lg font-semibold text-[var(--color-heading)]">
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            href={action.href}
            variant="outline"
            size="md"
            className="w-full justify-start gap-3"
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
