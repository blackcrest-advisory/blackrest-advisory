"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, Check, Circle, Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

import {
  addMilestone,
  toggleMilestone,
  deleteMilestone,
} from "@/lib/actions/projects/project.action";

//===== types =====//
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
  //===== state =====//
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== add milestone =====//
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

  //===== toggle milestone =====//
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

  //===== request delete =====//
  const handleDelete = (milestoneId: string) => {
    setDeleteId(milestoneId);
  };

  //===== confirm delete =====//
  const confirmDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteMilestone(deleteId);

      if (result.success) {
        toast.success("Milestone deleted");

        setDeleteId(null);

        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete milestone");
      }
    });
  };

  //===== cancel add =====//
  const cancelAdd = () => {
    setIsAdding(false);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <>
      <div className="space-y-4">
        {/*===== MILESTONE LIST =====*/}

        {milestones.length === 0 ? (
          <div
            className="flex min-h-[150px] flex-col items-center justify-center border border-dashed border-border bg-background/20 px-5 py-8 text-center"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
            >
              <Circle className="h-3.5 w-3.5" />
            </div>

            <p
              className="mt-3 text-sm font-medium text-heading"
            >
              No milestones yet
            </p>

            <p
              className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground"
            >
              Add delivery milestones to track the project through each stage.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border border border-border">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.id}
                className={`
                  relative
                  px-4 py-4
                  transition-colors
                  sm:px-5

                  ${
                    milestone.isCompleted
                      ? "bg-success/[0.025]"
                      : "bg-background/20"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/*===== SEQUENCE =====*/}

                  <div
                    className="hidden w-7 shrink-0 pt-1 font-mono text-[8px] font-semibold text-muted-foreground/25 sm:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/*===== TOGGLE =====*/}

                  {!readonly && (
                    <button
                      type="button"
                      onClick={() => handleToggle(milestone.id)}
                      disabled={isPending}
                      aria-label={
                        milestone.isCompleted
                          ? "Mark milestone incomplete"
                          : "Mark milestone complete"
                      }
                      className={`
                        mt-0.5
                        flex h-5 w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded
                        border
                        transition-colors

                        ${
                          milestone.isCompleted
                            ? `
                                border-success
                                bg-success
                                text-primary-foreground
                              `
                            : `
                                border-border
                                bg-card
                                text-transparent
                                hover:border-secondary/40
                              `
                        }

                        ${isPending ? "cursor-not-allowed opacity-60" : ""}
                      `}
                    >
                      {milestone.isCompleted && <Check className="h-3 w-3" />}
                    </button>
                  )}

                  {/*===== CONTENT =====*/}

                  <div className="min-w-0 flex-1">
                    <div
                      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={`
                              text-sm
                              font-semibold

                              ${
                                milestone.isCompleted
                                  ? "text-muted-foreground line-through"
                                  : "text-heading"
                              }
                            `}
                          >
                            {milestone.title}
                          </p>

                          {milestone.isCompleted && (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-md border border-success/20 bg-success/[0.06] px-2 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-success"
                            >
                              <span className="h-1 w-1 rounded-full bg-current" />
                              Complete
                            </span>
                          )}
                        </div>

                        {milestone.description && (
                          <p
                            className="mt-1.5 whitespace-pre-wrap text-xs leading-5 text-muted-foreground"
                          >
                            {milestone.description}
                          </p>
                        )}
                      </div>

                      {/* delete */}
                      {!readonly && (
                        <button
                          type="button"
                          onClick={() => handleDelete(milestone.id)}
                          disabled={isPending}
                          aria-label="Delete milestone"
                          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-md text-muted-foreground transition-colors hover:bg-destructive/[0.06] hover:text-destructive disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    {/*===== META =====*/}

                    {milestone.dueDate && (
                      <div
                        className="mt-3 flex items-center gap-2 border-t border-border pt-3"
                      >
                        <CalendarDays className="h-3.5 w-3.5 text-secondary" />

                        <span
                          className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/40"
                        >
                          Due
                        </span>

                        <span
                          className="text-[11px] font-medium text-muted-foreground"
                        >
                          {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/*===== ADD MILESTONE =====*/}

        {!readonly &&
          (isAdding ? (
            <form
              onSubmit={handleAdd}
              className="relative border border-border bg-background/30"
            >
              {/* top signal */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/60 via-secondary/15 to-transparent"
              />

              {/* form header */}
              <div
                className="flex items-start justify-between gap-4 border-b border-border px-4 py-3.5 sm:px-5"
              >
                <div>
                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
                  >
                    Delivery sequence
                  </span>

                  <h3
                    className="mt-0.5 text-sm font-semibold text-heading"
                  >
                    Add Milestone
                  </h3>

                  <p
                    className="mt-1 text-xs text-muted-foreground"
                  >
                    Add another checkpoint to the project delivery plan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={cancelAdd}
                  disabled={isPending}
                  aria-label="Close milestone form"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/40 hover:text-heading disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* fields */}
              <div
                className="space-y-4 px-4 py-4 sm:px-5"
              >
                <Field label="Milestone title" required>
                  <Input
                    placeholder="Milestone title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                    required
                  />
                </Field>

                <Field label="Description">
                  <Textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isPending}
                    rows={2}
                    className="min-h-[80px]"
                  />
                </Field>

                <Field label="Due date">
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    disabled={isPending}
                  />
                </Field>
              </div>

              {/* actions */}
              <div
                className="flex flex-col-reverse gap-2 border-t border-border bg-muted/10 px-4 py-3 sm:flex-row sm:justify-end sm:px-5"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={cancelAdd}
                  disabled={isPending}
                  className="!rounded-md"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isPending}
                  className="!rounded-md"
                >
                  <Plus className="h-3.5 w-3.5" />

                  <span className="ml-1.5">
                    {isPending ? "Adding..." : "Add Milestone"}
                  </span>
                </Button>
              </div>
            </form>
          ) : (
            <div
              className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Delivery plan
                </span>

                <p
                  className="mt-1 text-xs text-muted-foreground"
                >
                  Add another milestone to the project timeline.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
                className="w-full !rounded-md border-secondary/20 hover:border-secondary/30 hover:bg-secondary/[0.05] sm:w-auto"
              >
                <Plus className="h-3.5 w-3.5" />

                <span className="ml-1.5">Add Milestone</span>
              </Button>
            </div>
          ))}
      </div>

      {/*===== DELETE CONFIRMATION =====*/}

      <ConfirmationModal
        isOpen={deleteId !== null}
        onClose={() => {
          if (!isPending) {
            setDeleteId(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Delete Milestone"
        description="Are you sure you want to delete this milestone? This action cannot be undone."
        confirmLabel="Delete Milestone"
        cancelLabel="Cancel"
        isPending={isPending}
        tone="danger"
      />
    </>
  );
}

//==============================================================//
// FIELD
//==============================================================//

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="mb-2 flex items-center gap-1 text-xs font-semibold text-heading"
      >
        {label}

        {required && <span className="text-destructive">*</span>}
      </div>

      {children}
    </div>
  );
}
