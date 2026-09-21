"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Handshake,
  Lightbulb,
  Users,
  X,
} from "lucide-react";
import { businessHelpOptions } from "@/content-data/business-development/businessHelpFinderData";
import {
  recordPopupEvent,
  type PopupAnalyticsInput,
} from "@/lib/actions/popup-analytics/popup-analytics.action";

type PopupTrackingEvent =
  | { eventType: "VIEW" }
  | { eventType: "DISMISS" }
  | { eventType: "OPTION_CLICK"; optionId: string };

const POPUP_SEEN_KEY = "blackcrest-business-help-popup-seen";
let popupSeenInMemory = false;

function hasSeenPopup() {
  if (popupSeenInMemory) return true;

  try {
    return window.localStorage.getItem(POPUP_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

const optionIcons = {
  plan: Lightbulb,
  website: Globe2,
  customers: Users,
  sales: Handshake,
};

export default function BusinessHelpFinder() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visitorIdRef = useRef<string | null>(null);

  const getVisitorId = useCallback(() => {
    if (visitorIdRef.current) return visitorIdRef.current;

    const storageKey = "blackcrest-popup-visitor-id";
    let visitorId = window.crypto.randomUUID();

    try {
      const storedId = window.localStorage.getItem(storageKey);
      visitorId = storedId ?? visitorId;
      if (!storedId) window.localStorage.setItem(storageKey, visitorId);
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }

    visitorIdRef.current = visitorId;

    return visitorId;
  }, []);

  const track = useCallback(
    (event: PopupTrackingEvent) => {
      return recordPopupEvent({
        ...event,
        visitorId: getVisitorId(),
      } as PopupAnalyticsInput);
    },
    [getVisitorId],
  );

  const dismiss = useCallback(() => {
    void track({ eventType: "DISMISS" });
    setIsOpen(false);
  }, [track]);

  useEffect(() => {
    if (hasSeenPopup()) return;

    const timer = setTimeout(() => {
      // Check again in case another tab showed it during the delay.
      if (hasSeenPopup()) return;

      popupSeenInMemory = true;
      try {
        window.localStorage.setItem(POPUP_SEEN_KEY, "true");
      } catch {
        // The in-memory flag still prevents repeats during client navigation.
      }

      setIsOpen(true);
      void track({ eventType: "VIEW" }).catch(() => undefined);
    }, 700);
    return () => clearTimeout(timer);
  }, [track]);

  return (
    <Dialog
      open={isOpen}
      onClose={dismiss}
      initialFocus={closeButtonRef}
      className="relative z-[100]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-navy-deep/80 backdrop-blur-md transition-opacity duration-300 data-closed:opacity-0 motion-reduce:transition-none"
      />

      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
        <DialogPanel
          transition
          className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-card text-foreground shadow-[0_36px_100px_rgb(0_0_0/0.42)] transition duration-300 data-closed:translate-y-4 data-closed:scale-[0.98] data-closed:opacity-0 motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)]"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={dismiss}
            aria-label="Close business help popup"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:border-secondary/40 hover:text-heading focus-visible:outline-2 focus-visible:outline-secondary sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

            <div className="px-5 pb-6 pt-7 sm:p-8">
              <p className="pr-12 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Choose one option
              </p>

              <DialogTitle
                className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.035em] text-heading sm:text-3xl"
              >
                What would you like help with?
              </DialogTitle>

              <Description className="mt-3 text-sm leading-6 text-body">
                Select the option that feels closest to your situation.
              </Description>

              <div className="mt-7 space-y-3">
                {businessHelpOptions.map((option, index) => {
                  const Icon = optionIcons[option.id];

                  return (
                    <Link
                      key={option.id}
                      href={option.href}
                      onClick={async (event) => {
                        event.preventDefault();
                        setIsOpen(false);
                        await track({
                          eventType: "OPTION_CLICK",
                          optionId: option.id,
                        });
                        router.push(option.href);
                      }}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-background px-4 py-4 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/[0.045] hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                      <span className="font-mono text-[9px] text-muted-foreground/55">0{index + 1}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-secondary/20 bg-secondary/[0.06] text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-heading">{option.label}</span>
                        <span className="mt-1 block text-xs leading-5 text-body">{option.description}</span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-secondary transition-colors group-hover:bg-secondary/10">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/services/business-development"
                  onClick={dismiss}
                  className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-heading hover:text-secondary"
                >
                  Not sure? See all business support
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={dismiss}
                  className="min-h-10 self-start text-xs text-muted-foreground underline-offset-4 hover:text-heading hover:underline sm:self-auto"
                >
                  Maybe later
                </button>
              </div>
            </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
