"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { updateProjectProgress } from "@/lib/actions/projects/project.action";

//===== types =====//
interface ProjectProgressUpdateProps {
  projectId: string;
  currentProgress: number;
}

export function ProjectProgressUpdate({
  projectId,
  currentProgress,
}: ProjectProgressUpdateProps) {
  //===== state =====//
  const [progress, setProgress] = useState(currentProgress);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== submit =====//
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

  //===== cancel =====//
  const handleCancel = () => {
    setIsEditing(false);
    setProgress(currentProgress);
  };

  //===== default state =====//
  if (!isEditing) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsEditing(true)}
        className="
          w-full
          !rounded-md
          border-secondary/20
          bg-secondary/[0.025]
          text-heading
          hover:border-secondary/30
          hover:bg-secondary/[0.06]
          sm:w-auto
        "
      >
        <Pencil className="h-3.5 w-3.5" />

        <span className="ml-2">Update Progress</span>
      </Button>
    );
  }

  //===== edit state =====//
  return (
    <form
      onSubmit={handleSubmit}
      className="
        border border-border
        bg-background/40
        p-3
      "
    >
      {/* ====================================================== */}
      {/* LABEL                                                  */}
      {/* ====================================================== */}

      <div
        className="
          mb-2.5
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-secondary
            "
          >
            Manual update
          </span>

          <p
            className="
              mt-0.5
              text-xs
              text-muted-foreground
            "
          >
            Set project completion
          </p>
        </div>

        <span
          className="
            h-1.5 w-1.5
            rounded-full
            bg-secondary
          "
        />
      </div>

      {/* ====================================================== */}
      {/* CONTROL                                                */}
      {/* ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2
          "
        >
          <Input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="
              h-9
              min-w-0
              flex-1
              text-sm
              sm:w-20
              sm:flex-none
            "
            disabled={isPending}
          />

          <span
            className="
              shrink-0
              text-xs
              font-medium
              text-muted-foreground
            "
          >
            %
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isPending}
            className="
              flex-1
              !rounded-md
              sm:flex-none
            "
          >
            <Check className="h-3.5 w-3.5" />

            <span className="ml-1.5">{isPending ? "Saving..." : "Save"}</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            disabled={isPending}
            className="
              flex-1
              !rounded-md
              text-muted-foreground
              sm:flex-none
            "
          >
            <X className="h-3.5 w-3.5" />

            <span className="ml-1.5">Cancel</span>
          </Button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* RANGE                                                  */}
      {/* ====================================================== */}

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-3
          border-t border-border
          pt-2.5
        "
      >
        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.13em]
            text-muted-foreground/35
          "
        >
          Minimum 0%
        </span>

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.13em]
            text-muted-foreground/35
          "
        >
          Maximum 100%
        </span>
      </div>
    </form>
  );
}
