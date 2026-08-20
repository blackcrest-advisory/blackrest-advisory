"use client";

import { useState, FormEvent, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  FileText,
  Info,
  Layers3,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Loader } from "@/components/ui/Loader";
import { Textarea } from "@/components/ui/TextArea";

import toast from "react-hot-toast";

import { projectInquiryFormSchema } from "@/lib/validations/inquiryForm";
import {
  projectTypeToService,
  type ProjectType,
} from "@/lib/validations/leadRequest";

import { createLeadInquiry } from "@/lib/actions/leads/lead.action";
import { FileSelector } from "@/components/shared/FileSelector";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

const projectTypeOptions = [
  { value: "web-application", label: "Web Application" },
  { value: "mobile-application", label: "Mobile Application" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "sales-support", label: "SALES & SUPPORT" },
];

const createInitialFormData = () => ({
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  projectTitle: "",
  projectType: "web-application" as ProjectType,
  industry: "it",
  budget: "under-10k",
  timeline: "1-month",
  currency: "USD",
  description: "",
  agree: false,
});

const industryOptions = [
  { value: "fashion", label: "Fashion Tech" },
  { value: "it", label: "IT & Software" },
  { value: "medical", label: "Medical Industry" },
  { value: "beauty", label: "Beauty Industry" },
  { value: "restaurant", label: "Restaurant & Cafe" },
];

const budgetRanges = [
  { value: "under-10k", min: 0, max: 10000, label: "Under 10,000" },
  { value: "10k-25k", min: 10000, max: 25000, label: "10,000 – 25,000" },
  { value: "25k-50k", min: 25000, max: 50000, label: "25,000 – 50,000" },
  { value: "50k-100k", min: 50000, max: 100000, label: "50,000 – 100,000" },
  { value: "100k-plus", min: 100000, max: Infinity, label: "100,000+" },
];

const timelineOptions = [
  { value: "1-month", label: "1 Month" },
  { value: "2-3-months", label: "2–3 Months" },
  { value: "4-6-months", label: "4–6 Months" },
  { value: "6-12-months", label: "6–12 Months" },
  { value: "12-plus", label: "12+ Months" },
];

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "CHF":
      return "CHF";
    case "BDT":
      return "৳";
    default:
      return "$";
  }
};

export const ProjectInquiryForm = () => {
  const reduceMotion = Boolean(useReducedMotion());

  const [formData, setFormData] = useState(createInitialFormData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const getBudgetOptions = (currency: string) => {
    const symbol = getCurrencySymbol(currency);

    return budgetRanges.map((range) => {
      const minFormatted = range.min.toLocaleString("en-US");
      const maxFormatted =
        range.max === Infinity ? "+" : range.max.toLocaleString("en-US");

      return {
        value: range.value,
        label: `${symbol}${minFormatted} – ${symbol}${maxFormatted}`,
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agree: checked,
    }));
  };

  const validate = (): boolean => {
    const result = projectInquiryFormSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error(firstError.message);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    startTransition(async () => {
      try {
        let attachmentUrl: string | undefined;

        if (selectedFiles.length > 0) {
          const file = selectedFiles[0];

          setUploading(true);

          const uploadData = new FormData();
          uploadData.append("file", file);
          uploadData.append("bucket", "leads");

          const response = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });

          const result: unknown = await response.json();

          if (
            !response.ok ||
            typeof result !== "object" ||
            result === null ||
            !("url" in result) ||
            typeof result.url !== "string"
          ) {
            const message =
              typeof result === "object" &&
              result !== null &&
              "error" in result &&
              typeof result.error === "string"
                ? result.error
                : "Failed to upload attachment";

            throw new Error(message);
          }

          attachmentUrl = result.url;
          setUploading(false);
        }

        const payload = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || undefined,
          companyName: formData.companyName || undefined,
          industry: formData.industry,
          projectType: formData.projectType,
          projectTitle: formData.projectTitle,
          budget: formData.budget,
          timeline: formData.timeline,
          currency: formData.currency,
          description: formData.description,
          services: [projectTypeToService[formData.projectType]],
          source: "website_inquiry",
          attachmentUrl,
        };

        const result = await createLeadInquiry(payload);

        if (!result.success) {
          toast.error(result.error || "Failed to submit inquiry");
          return;
        }

        toast.success(result.data.message || "Inquiry submitted successfully!");

        setFormData(createInitialFormData());
        setSelectedFiles([]);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit",
        );

        setUploading(false);
      }
    });
  };

  const isSubmitting = isPending || uploading;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]"
    >
      {/* top signal */}
      <motion.div
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-secondary via-secondary/45 to-transparent"
      />

      {/* header */}
      <div
        className="border-b border-border px-6 py-7 sm:px-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-secondary" />

              <span
                className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Project brief
              </span>
            </div>

            <h2
              className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl"
            >
              Start your project inquiry
            </h2>

            <p
              className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground"
            >
              Share enough context for us to understand the opportunity. You can
              refine the details with us later.
            </p>
          </div>

          <div
            className="border border-secondary/20 bg-secondary/[0.05] px-3 py-2"
          >
            <span
              className="font-mono text-[8px] uppercase tracking-[0.16em] text-secondary"
            >
              BCR / Inquiry
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ====================================================== */}
        {/* 01 BUSINESS INFORMATION                                */}
        {/* ====================================================== */}

        <FormSection
          number="01"
          title="Business Information"
          description="Tell us who we’ll be speaking with."
          icon={Info}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required>
              <Input
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Company name">
              <Input
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Business email" required>
              <Input
                name="email"
                type="email"
                placeholder="Business Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Phone number">
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Field>
          </div>
        </FormSection>

        {/* ====================================================== */}
        {/* 02 PROJECT INFORMATION                                 */}
        {/* ====================================================== */}

        <FormSection
          number="02"
          title="Project Information"
          description="Define the shape of the opportunity."
          icon={Layers3}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Project title" required>
              <Input
                name="projectTitle"
                placeholder="Project Title *"
                value={formData.projectTitle}
                onChange={handleChange}
                required
              />
            </Field>

            <Field label="Project type">
              <Select
                options={projectTypeOptions}
                value={formData.projectType}
                onChange={(val) => handleSelectChange("projectType", val)}
              />
            </Field>

            <Field label="Industry">
              <Select
                options={industryOptions}
                value={formData.industry}
                onChange={(val) => handleSelectChange("industry", val)}
              />
            </Field>

            <Field label="Budget">
              <Select
                options={getBudgetOptions(formData.currency)}
                value={formData.budget}
                onChange={(val) => handleSelectChange("budget", val)}
              />
            </Field>

            <Field label="Timeline">
              <Select
                options={timelineOptions}
                value={formData.timeline}
                onChange={(val) => handleSelectChange("timeline", val)}
              />
            </Field>

            <Field label="Currency">
              <Select
                options={CURRENCY_OPTIONS}
                value={formData.currency}
                onChange={(val) => handleSelectChange("currency", val)}
              />
            </Field>
          </div>

          <div className="mt-6">
            <Field label="Project vision & requirements" required>
              <Textarea
                name="description"
                placeholder="Tell us about your project vision, goals, and any specific requirements... *"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                required
                className="resize-none"
              />
            </Field>
          </div>
        </FormSection>

        {/* ====================================================== */}
        {/* 03 SUPPORTING MATERIAL                                 */}
        {/* ====================================================== */}

        <FormSection
          number="03"
          title="Supporting Material"
          description="Optional context that helps us understand the project faster."
          icon={FileText}
        >
          <FileSelector
            files={selectedFiles}
            onFilesChange={setSelectedFiles}
            disabled={isSubmitting}
            maxFiles={1}
            maxSizeMB={10}
            label="Attachment (optional)"
          />

          <div
            className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"
          >
            <CheckCircle2
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
            />

            <span>Accepted: PDF, DOCX, ZIP, JPG, PNG — maximum 10MB.</span>
          </div>
        </FormSection>

        {/* ====================================================== */}
        {/* AGREEMENT + SUBMIT                                     */}
        {/* ====================================================== */}

        <div
          className="border-t border-border bg-muted/25 px-6 py-6 sm:px-8"
        >
          <div
            className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-start gap-3">
              <Switch
                checked={formData.agree}
                onChange={handleSwitchChange}
                disabled={isSubmitting}
              />

              <div>
                <p
                  className="text-sm font-medium text-foreground"
                >
                  I agree to be contacted by the Blackcrest team.
                </p>

                <p
                  className="mt-1 max-w-lg text-xs leading-5 text-muted-foreground"
                >
                  We&apos;ll use the details you provide to review your inquiry
                  and follow up about the project.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="group w-full justify-center lg:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader size="sm" className="mr-2 border-t-cta-text" />

                  {uploading ? "Uploading..." : "Submitting..."}
                </>
              ) : (
                <>
                  Submit Project Inquiry
                  <Send
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </Button>
          </div>

          <div
            className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
          >
            <span
              className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
            >
              Business context → Project scope → Review
            </span>

            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
              />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.15em] text-success"
              >
                Inquiry system ready
              </span>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

function FormSection({
  number,
  title,
  description,
  icon: Icon,
  children,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section
      className="grid border-b border-border px-6 py-8 sm:px-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-10"
    >
      <div className="mb-6 lg:mb-0">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary"
          >
            <Icon className="h-4 w-4" />
          </div>

          <span
            className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
          >
            {number}
          </span>
        </div>

        <h3
          className="mt-4 text-base font-semibold tracking-[-0.02em] text-heading"
        >
          {title}
        </h3>

        <p
          className="mt-2 max-w-[220px] text-xs leading-6 text-muted-foreground"
        >
          {description}
        </p>
      </div>

      <div>{children}</div>
    </section>
  );
}

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
      <label
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}

        {required && <span className="ml-1 text-secondary">*</span>}
      </label>

      {children}
    </div>
  );
}
