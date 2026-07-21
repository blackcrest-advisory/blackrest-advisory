import { FileCategory } from "@/types/dashboard/client/filesType";
import { cn } from "@/lib/utils";

interface FileCategoryBadgeProps {
  category: FileCategory;
  className?: string;
}

//===== Matches the visual pattern of StatusBadge / PriorityBadge =====//
const categoryStyles: Record<FileCategory, string> = {
  document: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  image: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  video: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  archive: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  other:
    "bg-[var(--color-muted)] text-[var(--color-body)] border-[var(--color-border)]",
};

const categoryLabels: Record<FileCategory, string> = {
  document: "Document",
  image: "Image",
  video: "Video",
  archive: "Archive",
  other: "Other",
};

export const FileCategoryBadge = ({
  category,
  className = "",
}: FileCategoryBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        categoryStyles[category],
        className,
      )}
    >
      {categoryLabels[category]}
    </span>
  );
};
