"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-base font-medium border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      <Printer className="h-4 w-4" />
      Print
    </button>
  );
}
