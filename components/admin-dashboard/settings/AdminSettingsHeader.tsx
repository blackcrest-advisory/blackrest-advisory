import { ShieldCheck } from "lucide-react";

export const AdminSettingsHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
          Admin Settings
        </h1>
        <p className="mt-1 text-sm text-body">
          Manage your administrator profile, sign-in security, and operational alerts.
        </p>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
        <ShieldCheck className="h-4 w-4" />
        Secure administrator account
      </div>
    </div>
  );
};
