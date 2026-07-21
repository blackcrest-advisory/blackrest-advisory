import {
  Archive,
  File,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { FileCategory } from "@/types/dashboard/client/filesType";
import { cn } from "@/lib/utils";

interface FileTypeIconProps {
  category: FileCategory;
  className?: string;
}

//===== Icon + accent color mapped per file category =====//
const categoryConfig: Record<
  FileCategory,
  { icon: typeof FileText; wrapperClass: string; iconClass: string }
> = {
  document: {
    icon: FileText,
    wrapperClass: "bg-blue-500/10",
    iconClass: "text-blue-600",
  },
  image: {
    icon: ImageIcon,
    wrapperClass: "bg-purple-500/10",
    iconClass: "text-purple-600",
  },
  video: {
    icon: Video,
    wrapperClass: "bg-orange-500/10",
    iconClass: "text-orange-600",
  },
  archive: {
    icon: Archive,
    wrapperClass: "bg-yellow-500/10",
    iconClass: "text-yellow-600",
  },
  other: {
    icon: File,
    wrapperClass: "bg-[var(--color-muted)]",
    iconClass: "text-body",
  },
};

export const FileTypeIcon = ({
  category,
  className = "",
}: FileTypeIconProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
        config.wrapperClass,
        className,
      )}
    >
      <Icon className={cn("h-4 w-4", config.iconClass)} />
    </span>
  );
};
