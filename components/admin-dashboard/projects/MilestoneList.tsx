"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Check, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  addMilestone,
  toggleMilestone,
  deleteMilestone,
} from "@/lib/actions/projects/project.action";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  isCompleted: boolean;
  completedAt: Date | null;
  sortOrder: number;
}

interface MilestoneListProps {
  projectId: string;
  milestones: Milestone[];
  readonly?: boolean;
}

export function MilestoneList({
  projectId,
  milestones,
  readonly = false,
}: MilestoneListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    startTransition(async () => {
      const result = await addMilestone(projectId, {
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      });
      if (result.success) {
        toast.success("Milestone added");
        setIsAdding(false);
        setTitle("");
        setDescription("");
        setDueDate("");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to add milestone");
      }
    });
  };

  const handleToggle = (milestoneId: string) => {
    startTransition(async () => {
      const result = await toggleMilestone(milestoneId);
      if (result.success) {
        toast.success("Milestone updated");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update milestone");
      }
    });
  };

  const handleDelete = (milestoneId: string) => {
    if (!confirm("Delete this milestone?")) return;
    startTransition(async () => {
      const result = await deleteMilestone(milestoneId);
      if (result.success) {
        toast.success("Milestone deleted");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete milestone");
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* List */}
      {milestones.length === 0 ? (
        <p className="text-sm text-muted-foreground">No milestones yet.</p>
      ) : (
        <ul className="space-y-2">
          {milestones.map((milestone) => (
            <li
              key={milestone.id}
              className={`flex items-start gap-3 rounded-lg border border-border p-3 transition-colors ${
                milestone.isCompleted ? "bg-muted/30" : ""
              }`}
            >
              {!readonly && (
                <button
                  onClick={() => handleToggle(milestone.id)}
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    milestone.isCompleted
                      ? "bg-secondary border-secondary text-white"
                      : "border-muted-foreground hover:border-secondary"
                  }`}
                  disabled={isPending}
                >
                  {milestone.isCompleted && <Check className="h-3 w-3" />}
                </button>
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    milestone.isCompleted
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {milestone.title}
                </p>
                {milestone.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {milestone.description}
                  </p>
                )}
                {milestone.dueDate && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Due: {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                  </p>
                )}
              </div>
              {!readonly && (
                <button
                  onClick={() => handleDelete(milestone.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Add form */}
      {!readonly &&
        (isAdding ? (
          <form
            onSubmit={handleAdd}
            className="mt-4 space-y-3 rounded-lg border border-border p-4"
          >
            <Input
              placeholder="Milestone title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              required
            />
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={2}
            />
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isPending}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isPending}
              >
                {isPending ? "Adding..." : "Add"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setTitle("");
                  setDescription("");
                  setDueDate("");
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Milestone
          </Button>
        ))}
    </div>
  );
}
