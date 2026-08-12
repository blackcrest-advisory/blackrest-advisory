"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { updateProjectProgress } from "@/lib/actions/projects/project.action";
import toast from "react-hot-toast";

interface ProjectProgressUpdateProps {
  projectId: string;
  currentProgress: number;
}

export function ProjectProgressUpdate({
  projectId,
  currentProgress,
}: ProjectProgressUpdateProps) {
  const [progress, setProgress] = useState(currentProgress);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateProjectProgress(projectId, progress);
      if (result.success) {
        toast.success("Progress updated");
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update progress");
      }
    });
  };

  if (!isEditing) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
        Update Progress
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="number"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-20 h-8 text-sm"
        disabled={isPending}
      />
      <span className="text-sm text-muted-foreground">%</span>
      <Button type="submit" variant="primary" size="sm" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsEditing(false);
          setProgress(currentProgress);
        }}
        disabled={isPending}
      >
        Cancel
      </Button>
    </form>
  );
}
