import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface SettingsSectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

//===== Shared shell for every settings section: header, body, optional footer =====//
export const SettingsSectionCard = ({
  title,
  description,
  children,
  footer,
}: SettingsSectionCardProps) => {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-6 py-5">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="px-6 py-6">{children}</div>

      {footer && (
        <div className="flex justify-end border-t border-border bg-muted/30 px-6 py-4">
          {footer}
        </div>
      )}
    </Card>
  );
};
