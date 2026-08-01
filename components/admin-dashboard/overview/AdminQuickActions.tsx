"use client";

import { motion } from "framer-motion";
import { UserPlus, FolderPlus, Receipt, Users, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";

//===== Quick action items =====//
const actions: { label: string; href: string; icon: LucideIcon }[] = [
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
    //===== Quick Actions Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
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
      </Card>
    </motion.div>
  );
};
