"use client";

import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export const ProjectsHeader = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">Projects</h1>
      <p className="mt-1 text-sm text-body">Monitor delivery, ownership, budget health, and deadlines across every client engagement.</p>
    </div>
    <Button variant="primary" size="base" onClick={() => toast.success("Project creation will be available when projects are connected to the backend.")}>
      <Plus className="h-4 w-4" /> New Project
    </Button>
  </div>
);
