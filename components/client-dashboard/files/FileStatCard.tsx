import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface FileStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subLabel?: string;
  progressPercent?: number;
}

export const FileStatCard = ({
  icon: Icon,
  label,
  value,
  subLabel,
  progressPercent,
}: FileStatCardProps) => {
  return (
    <Card padding="base" hoverEffect>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-body">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-heading">{value}</p>
          {subLabel && <p className="mt-1 text-xs text-body">{subLabel}</p>}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
          <Icon className="h-5 w-5 text-secondary" />
        </span>
      </div>

      {typeof progressPercent === "number" && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      )}
    </Card>
  );
};
