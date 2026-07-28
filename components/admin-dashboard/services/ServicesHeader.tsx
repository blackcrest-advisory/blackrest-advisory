"use client";

import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export const ServicesHeader = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-heading sm:text-3xl">Services</h1>
      <p className="mt-1 text-sm text-body">Manage the Blackcrest service catalog and see which offers are generating demand and revenue.</p>
    </div>
    <Button variant="primary" size="base" onClick={() => toast.success("Service creation will be available when the catalog is connected to the backend.")}>
      <Plus className="h-4 w-4" /> Add Service
    </Button>
  </div>
);
