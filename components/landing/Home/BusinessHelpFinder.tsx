"use client";

import { useCallback, useEffect, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowRight, CheckCircle2, LoaderCircle, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { recordHomepageFormEvent, submitHomepageInquiry } from "@/lib/actions/leads/homepage-inquiry.action";
import { businessIndustries, businessNeeds, businessStages, homepageInquirySchema } from "@/lib/validations/homepageInquiry";
import { createHomepageInquiryState, INQUIRY_SUBMITTED_KEY } from "@/lib/utils/homepageInquiryState";

const visit = createHomepageInquiryState();
const initialValues = { name: "", email: "", companyName: "", industry: "", businessStage: "", need: "", message: "", phone: "", websiteConfirm: "" };
const selectClass = "min-h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20";

function storage() {
  try { return window.localStorage; } catch { return undefined; }
}

export default function BusinessHelpFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const submitting = useRef(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const track = useCallback((eventType: "VIEW" | "DISMISS") => {
    void recordHomepageFormEvent({ visitorId: visit.visitorId(storage()), eventType }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (visit.hasSubmitted(storage())) { setSubmitted(true); return; }
      if (!visit.shouldOpen(storage())) return;
      visit.markShown();
      setIsOpen(true);
      track("VIEW");
    }, 1500);
    const syncSubmission = (event: StorageEvent) => {
      if (event.key === INQUIRY_SUBMITTED_KEY && event.newValue === "true") {
        visit.markSubmitted();
        setSubmitted(true);
        setIsOpen(false);
      }
    };
    window.addEventListener("storage", syncSubmission);
    return () => { window.clearTimeout(timer); window.removeEventListener("storage", syncSubmission); };
  }, [track]);

  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  useEffect(() => { if (submitted && isOpen) successRef.current?.focus(); }, [submitted, isOpen]);

  function changeField(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function dismiss() {
    if (submitting.current) return;
    if (!submitted) track("DISMISS");
    visit.markShown();
    setIsOpen(false);
  }

  function reopen() {
    if (visit.hasSubmitted(storage())) { setSubmitted(true); return; }
    visit.markShown();
    setIsOpen(true);
    track("VIEW");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const result = homepageInquirySchema.safeParse({ ...values, visitorId: visit.visitorId(storage()) });
    if (!result.success) { setError(result.error.issues[0].message); return; }
    submitting.current = true;
    setError("");
    startTransition(async () => {
      try {
        const response = await submitHomepageInquiry(result.data);
        if (!response.success) { setError(response.error); return; }
        visit.markSubmitted(storage());
        setSubmitted(true);
        setValues(initialValues);
      } catch {
        setError("We couldn't send your enquiry. Please check your connection and try again. Your answers are still here.");
      } finally { submitting.current = false; }
    });
  }

  return (
    <>
      {!submitted && (
        <div className="border-t border-border bg-muted/30 px-5 py-6 text-center">
          <Button variant="outline" onClick={reopen}>
            <MessageSquare className="h-4 w-4" aria-hidden="true" /> Tell us about your business
          </Button>
        </div>
      )}
      <Dialog open={isOpen} onClose={dismiss} initialFocus={closeButtonRef} className="public-site relative z-[100]">
        <DialogBackdrop transition className="fixed inset-0 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0 motion-reduce:transition-none" />
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6">
          <DialogPanel transition className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card text-foreground shadow-[var(--shadow-overlay)] transition duration-200 data-closed:translate-y-4 data-closed:opacity-0 motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)]">
            <button ref={closeButtonRef} type="button" disabled={isPending} onClick={dismiss} aria-label="Close business enquiry form" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-heading disabled:opacity-50">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="p-5 pt-7 sm:p-8">
              <p className="pr-12 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">A practical first step</p>
              <DialogTitle className="mt-3 pr-10 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
                {submitted ? "Thank you for getting in touch" : "Tell us about your business"}
              </DialogTitle>
              <Description className="mt-3 text-sm leading-6 text-body">
                {submitted ? "Your enquiry has been received. Our team will contact you using the details you provided." : "Share a few details so we can understand what you need and discuss the right next step. No account needed."}
              </Description>
              {submitted ? (
                <div ref={successRef} tabIndex={-1} role="status" className="mt-7 rounded-xl border border-secondary/20 bg-secondary/5 p-6 focus:outline-none">
                  <CheckCircle2 className="h-8 w-8 text-secondary" aria-hidden="true" />
                  <p className="mt-3 text-sm text-body">You can keep exploring Blackcrest while we review your enquiry.</p>
                  <Button onClick={dismiss} className="mt-5">Continue browsing <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6" aria-busy={isPending}>
                  <p className="mb-4 text-xs text-muted-foreground">Fields marked * are required.</p>
                  <fieldset disabled={isPending} className="grid gap-4 sm:grid-cols-2 disabled:opacity-70">
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-name"><span>Your name *</span><Input id="enquiry-name" name="name" autoComplete="name" required maxLength={120} value={values.name} onChange={changeField} /></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-email"><span>Email address *</span><Input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={changeField} /></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-company"><span>Business name <span className="font-normal text-muted-foreground">(optional)</span></span><Input id="enquiry-company" name="companyName" autoComplete="organization" maxLength={160} placeholder="Leave blank if you are still planning" value={values.companyName} onChange={changeField} /></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-industry"><span>Type of business *</span><select id="enquiry-industry" name="industry" required className={selectClass} value={values.industry} onChange={changeField}><option value="" disabled>Select your industry</option>{businessIndustries.map((industry) => <option key={industry}>{industry}</option>)}</select></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-stage"><span>Business stage *</span><select id="enquiry-stage" name="businessStage" required className={selectClass} value={values.businessStage} onChange={changeField}><option value="" disabled>Select your stage</option>{businessStages.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading" htmlFor="enquiry-need"><span>What do you need help with? *</span><select id="enquiry-need" name="need" required className={selectClass} value={values.need} onChange={changeField}><option value="" disabled>Choose an option</option>{businessNeeds.map((need) => <option key={need.value} value={need.value}>{need.label}</option>)}</select></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading sm:col-span-2" htmlFor="enquiry-phone"><span>Phone number <span className="font-normal text-muted-foreground">(optional)</span></span><Input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={changeField} /></label>
                    <label className="space-y-1.5 text-sm font-medium text-heading sm:col-span-2" htmlFor="enquiry-message"><span>Anything else we should know? <span className="font-normal text-muted-foreground">(optional)</span></span><Textarea id="enquiry-message" name="message" rows={3} maxLength={2000} placeholder="A little about your idea, challenge, or goal" value={values.message} onChange={changeField} /></label>
                    <div className="hidden" aria-hidden="true"><label htmlFor="enquiry-confirm">Leave this field empty</label><input id="enquiry-confirm" name="websiteConfirm" tabIndex={-1} autoComplete="off" value={values.websiteConfirm} onChange={changeField} /></div>
                  </fieldset>
                  {error && <p ref={errorRef} tabIndex={-1} role="alert" className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">We will use these details to respond to your enquiry. Submitting this form does not sign you up for marketing emails.</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <button type="button" disabled={isPending} onClick={dismiss} className="min-h-11 text-sm text-muted-foreground underline-offset-4 hover:text-heading hover:underline disabled:opacity-50">Maybe later</button>
                    <Button type="submit" disabled={isPending} size="md">{isPending ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Sending enquiry?</> : <>Send enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}</Button>
                  </div>
                </form>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
