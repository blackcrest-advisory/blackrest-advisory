"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  ShieldAlert,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;

  tone?: "default" | "danger" | "success" | "warning";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isPending = false,
  tone = "default",
}: ConfirmationModalProps) {
  //===== tone config =====//
  const toneConfig = {
    default: {
      icon: CircleAlert,
      eyebrow: "Confirmation required",
      accent: "text-secondary",
      border: "border-secondary/20",
      background: "bg-secondary/[0.06]",
      glow: "bg-secondary/[0.07]",
      line: "from-secondary via-secondary/50 to-transparent",
      dot: "bg-secondary",
      confirmVariant: "primary" as const,
    },

    danger: {
      icon: AlertTriangle,
      eyebrow: "Destructive action",
      accent: "text-destructive",
      border: "border-destructive/20",
      background: "bg-destructive/[0.06]",
      glow: "bg-destructive/[0.07]",
      line: "from-destructive via-destructive/50 to-transparent",
      dot: "bg-destructive",
      confirmVariant: "destructive" as const,
    },

    success: {
      icon: CheckCircle2,
      eyebrow: "Confirm update",
      accent: "text-success",
      border: "border-success/20",
      background: "bg-success/[0.06]",
      glow: "bg-success/[0.07]",
      line: "from-success via-success/50 to-transparent",
      dot: "bg-success",
      confirmVariant: "primary" as const,
    },

    warning: {
      icon: ShieldAlert,
      eyebrow: "Review action",
      accent: "text-warning",
      border: "border-warning/20",
      background: "bg-warning/[0.06]",
      glow: "bg-warning/[0.07]",
      line: "from-warning via-warning/50 to-transparent",
      dot: "bg-warning",
      confirmVariant: "primary" as const,
    },
  };

  const config = toneConfig[tone];

  const Icon = config.icon;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        {/* ==================================================== */}
        {/* BACKDROP                                             */}
        {/* ==================================================== */}

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed inset-0
              bg-navy-deep/70
              backdrop-blur-[3px]
            "
          />
        </Transition.Child>

        {/* ==================================================== */}
        {/* MODAL                                                */}
        {/* ==================================================== */}

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className="
              flex min-h-full
              items-center
              justify-center
              p-4
              sm:p-6
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-2 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-[0.98]"
            >
              <Dialog.Panel
                className="
                  relative
                  w-full
                  max-w-md
                  transform
                  overflow-hidden
                  border border-border
                  bg-card
                  shadow-[var(--shadow-overlay)]
                  transition-all
                "
              >
                {/* top signal */}
                <div
                  className={cn(
                    `
                      absolute left-0 top-0
                      h-[2px] w-full
                      bg-gradient-to-r
                    `,
                    config.line,
                  )}
                />

                {/* ambient glow */}
                <div
                  aria-hidden="true"
                  className={cn(
                    `
                      pointer-events-none
                      absolute -right-20 -top-20
                      h-44 w-44
                      rounded-full
                      blur-[80px]
                    `,
                    config.glow,
                  )}
                />

                {/* ================================================== */}
                {/* HEADER                                             */}
                {/* ================================================== */}

                <div
                  className="
                    relative z-10
                    flex
                    items-start
                    gap-4
                    border-b border-border
                    px-5 py-5
                    sm:px-6
                  "
                >
                  <div
                    className={cn(
                      `
                        flex h-10 w-10
                        shrink-0
                        items-center
                        justify-center
                        border
                      `,
                      config.border,
                      config.background,
                      config.accent,
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert
                        className={cn("h-3.5 w-3.5", config.accent)}
                      />

                      <span
                        className={cn(
                          `
                            font-mono
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                          `,
                          config.accent,
                        )}
                      >
                        {config.eyebrow}
                      </span>
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="
                        mt-2
                        text-lg
                        font-semibold
                        tracking-[-0.025em]
                        text-heading
                      "
                    >
                      {title}
                    </Dialog.Title>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isPending}
                    aria-label="Close confirmation dialog"
                    className="
                      flex h-8 w-8
                      shrink-0
                      items-center
                      justify-center
                      border border-transparent
                      text-muted-foreground
                      transition-colors
                      hover:border-border
                      hover:bg-muted/30
                      hover:text-heading
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* ================================================== */}
                {/* BODY                                               */}
                {/* ================================================== */}

                <div
                  className="
                    relative z-10
                    px-5 py-5
                    sm:px-6
                  "
                >
                  <p
                    className="
                      max-w-prose
                      text-sm
                      leading-6
                      text-muted-foreground
                    "
                  >
                    {description}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      border-t border-border
                      pt-4
                    "
                  >
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", config.dot)}
                    />

                    <span
                      className="
                        font-mono
                        text-[7px]
                        uppercase
                        tracking-[0.15em]
                        text-muted-foreground/40
                      "
                    >
                      Review before continuing
                    </span>
                  </div>
                </div>

                {/* ================================================== */}
                {/* ACTIONS                                            */}
                {/* ================================================== */}

                <div
                  className="
                    relative z-10
                    flex
                    flex-col-reverse
                    gap-2
                    border-t border-border
                    bg-muted/15
                    px-5 py-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-end
                    sm:px-6
                  "
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    disabled={isPending}
                    className="w-full sm:w-auto"
                  >
                    {cancelLabel}
                  </Button>

                  <Button
                    variant={config.confirmVariant}
                    size="sm"
                    onClick={onConfirm}
                    disabled={isPending}
                    className="w-full sm:w-auto"
                  >
                    {isPending ? "Processing..." : confirmLabel}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
