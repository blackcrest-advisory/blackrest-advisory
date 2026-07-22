import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FilesPageHeaderProps {
  onUploadClick: () => void;
}

export const FilesPageHeader = ({ onUploadClick }: FilesPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-heading sm:text-3xl">
          Files
        </h1>
        <p className="mt-1 text-sm text-body">
          Manage all project files in one place.
        </p>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={onUploadClick}
        className="w-full sm:w-auto"
      >
        <Upload className="h-4 w-4" />
        Upload File
      </Button>
    </div>
  );
};
