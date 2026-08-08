"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { Loader } from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";
import { Textarea } from "@/components/ui/TextArea";
import { projectInquiryFormSchema } from "@/lib/validations/inquiryForm";
import { createLeadInquiry } from "@/api-client/admin/leads.api";

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

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "BDT", label: "BDT (৳)" },
];

// Fixed exchange rate (1 USD = 110 BDT)
const EXCHANGE_RATE = 110;

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

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic budget options based on currency
  const getBudgetOptions = (currency: string) => {
    const symbol = currency === "USD" ? "$" : "৳";
    const factor = currency === "USD" ? 1 : EXCHANGE_RATE;

    return budgetRanges.map((range) => {
      const minFormatted = (range.min * factor).toLocaleString("en-US");
      const maxFormatted =
        range.max === Infinity
          ? "+"
          : (range.max * factor).toLocaleString("en-US");
      let label = `${symbol}${minFormatted} – ${symbol}${maxFormatted}`;
      if (range.value === "100k-plus") {
        label = `${symbol}${(100000 * factor).toLocaleString("en-US")}+`;
      }
      return { value: range.value, label };
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

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
    };

    try {
      setLoading(true);
      const data = await createLeadInquiry(payload);
      toast.success(data.message || "Inquiry submitted successfully!");

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

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit inquiry",
      );
    } finally {
      setLoading(false);
    }
  };

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

      {/* form */}
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
              options={currencyOptions}
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
          <label className="block text-sm font-medium text-heading">
            Attachment (optional)
          </label>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.zip,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-body transition hover:bg-muted"
            >
              <Upload className="h-4 w-4" />
              Choose File
            </label>
            {file && (
              <span className="flex items-center gap-1 text-sm text-body">
                {file.name}
                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            )}
          </div>
          <p className="text-xs text-body">
            Accepted: PDF, DOCX, ZIP, JPG, PNG (max 10MB)
          </p>
        </div>

        {/* Agree checkbox */}
        <div className="flex items-center gap-3">
          <Switch checked={formData.agree} onChange={handleSwitchChange} />
          <span className="text-sm text-body">
            I agree to be contacted by the Blackcrest team.
          </span>
        </div>

        <Button size="md" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader size="sm" className="mr-2 border-t-cta-text" />
              Submitting...
            </>
          ) : (
            "Submit Project Inquiry"
          )}
        </Button>
      </form>
    </motion.div>
  );
};
