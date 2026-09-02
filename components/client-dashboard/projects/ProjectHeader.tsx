"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProjectHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage all your ongoing and past projects in one place.
        </p>
      </div>
      <Button
        href="/client/dashboard/projects/request"
        variant="primary"
        size="sm"
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Request Project
      </Button>
    </motion.div>
  );
}
