"use client";

import { useState, FormEvent, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Loader } from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";
import { projectInquiryFormSchema } from "@/lib/validations/inquiryForm";
import { createLeadInquiry } from "@/lib/actions/leads/lead.action";
import { FileSelector } from "@/components/shared/FileSelector";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

// Options for Select
const projectTypeOptions = [
  { value: "web-application", label: "Web Application" },
  { value: "mobile-application", label: "Mobile Application" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "sales-support", label: "SALES & SUPPORT" },
];

const industryOptions = [
  { value: "fashion", label: "Fashion Tech" },
  { value: "it", label: "IT & Software" },
  { value: "medical", label: "Medical Industry" },
  { value: "beauty", label: "Beauty Industry" },
  { value: "restaurant", label: "Restaurant & Cafe" },
];

// Budget ranges (values in USD)
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

// Currency symbol mapping
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
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    projectTitle: "",
    projectType: "web-application",
    industry: "it",
    budget: "under-10k",
    timeline: "1-month",
    currency: "USD",
    description: "",
    agree: false,
  });

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agree: checked }));
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

        // Upload file if present using the API route
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
          services: [],
          source: "website_inquiry",
          attachmentUrl,
        };

        const result = await createLeadInquiry(payload);

        if (!result.success) {
          toast.error(result.error || "Failed to submit inquiry");
          return;
        }

        toast.success(result.data.message || "Inquiry submitted successfully!");

        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          projectTitle: "",
          projectType: "web-application",
          industry: "it",
          budget: "under-10k",
          timeline: "1-month",
          currency: "USD",
          description: "",
          agree: false,
        });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-border bg-card-bg p-6 shadow-sm md:p-8"
    >
      <h2 className="mb-6 text-2xl font-bold text-heading">
        Project Inquiry Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-body">
            Business Information
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Business Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-body">
            Project Information
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="projectTitle"
              placeholder="Project Title *"
              value={formData.projectTitle}
              onChange={handleChange}
              required
            />
            <Select
              options={projectTypeOptions}
              value={formData.projectType}
              onChange={(val) => handleSelectChange("projectType", val)}
            />
            <Select
              options={industryOptions}
              value={formData.industry}
              onChange={(val) => handleSelectChange("industry", val)}
            />
            <Select
              options={getBudgetOptions(formData.currency)}
              value={formData.budget}
              onChange={(val) => handleSelectChange("budget", val)}
            />
            <Select
              options={timelineOptions}
              value={formData.timeline}
              onChange={(val) => handleSelectChange("timeline", val)}
            />
            <Select
              options={CURRENCY_OPTIONS}
              value={formData.currency}
              onChange={(val) => handleSelectChange("currency", val)}
            />
          </div>
          <Textarea
            name="description"
            placeholder="Tell us about your project vision, goals, and any specific requirements... *"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* File Attachment */}
        <div className="space-y-2">
          <FileSelector
            files={selectedFiles}
            onFilesChange={setSelectedFiles}
            disabled={isSubmitting}
            maxFiles={1}
            maxSizeMB={10}
            label="Attachment (optional)"
          />
          <p className="text-xs text-body">
            Accepted: PDF, DOCX, ZIP, JPG, PNG (max 10MB)
          </p>
        </div>

        {/* Agree checkbox */}
        <div className="flex items-center gap-3">
          <Switch
            checked={formData.agree}
            onChange={handleSwitchChange}
            disabled={isSubmitting}
          />
          <span className="text-sm text-body">
            I agree to be contacted by the Blackcrest team.
          </span>
        </div>

        <Button
          size="md"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader size="sm" className="mr-2 border-t-cta-text" />
              {uploading ? "Uploading..." : "Submitting..."}
            </>
          ) : (
            "Submit Project Inquiry"
          )}
        </Button>
      </form>
    </motion.div>
  );
};
