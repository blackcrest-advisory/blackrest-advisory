"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Flag,
  Link2,
  Send,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";
import { Loader } from "@/components/ui/Loader";
import { FileSelector } from "@/components/shared/FileSelector";
import { briefRequestSchema } from "@/lib/validations/briefRequest";
import { createBrief } from "@/lib/actions/briefs/brief.action";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";
import { Brief, PILLAR } from "@/types/projectBrief";

const pillarOptions: { value: PILLAR; label: string }[] = [
  { value: "WEBSITE_DEVELOPMENT", label: "Website Development" },
  { value: "MOBILE_APP", label: "Mobile App" },
  { value: "DIGITAL_MARKETING", label: "Digital Marketing" },
  { value: "SALES_SUPPORT", label: "Sales & Support" },
];

type BriefFormData = Omit<Brief, "attachments"> & {
  budget: string;
  deadline: string;
  currency: string;
  projectGoals?: string;
  targetAudience?: string;
  referenceLinks?: string;
};

export const RequestProjectForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<BriefFormData>({
    title: "",
    problem: "",
    pillar: "WEBSITE_DEVELOPMENT",
    budget: "",
    deadline: "",
    currency: "EUR",
    projectGoals: "",
    targetAudience: "",
    referenceLinks: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      pillar: value as PILLAR,
    }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      currency: value,
    }));
  };

  const validate = () => {
    const result = briefRequestSchema.safeParse({
      ...formData,
      attachments: [],
    });

    if (!result.success) {
      const firstError = result.error.issues[0];

      toast.error(firstError.message);

      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      //===== Upload files =====//
      let attachmentUrls: string[] = [];

      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const uploadData = new FormData();

          uploadData.append("file", file);
          uploadData.append("bucket", "briefs");

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

          return result.url;
        });

        attachmentUrls = await Promise.all(uploadPromises);
      }

      //===== Submit brief =====//
      const result = await createBrief({
        ...formData,
        attachments: attachmentUrls,
      });

      if (!result.success) {
        toast.error(result.error);

        return;
      }

      toast.success("Project request submitted successfully.");

      router.push("/client/dashboard/project-requests");
      router.refresh();
    } catch (error: unknown) {
      console.error("Submit error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit project request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/*===== Page header =====*/}
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              New Project Brief
            </span>
            <span className="h-px w-10 bg-secondary/35" />
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
            Request a New Project
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Share your project requirements with the Blackcrest team so we can
            understand the scope, objectives, timeline, and commercial context.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Client brief
        </div>
      </div>

      {/*===== Brief workspace =====*/}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/*===== Main form =====*/}
        <div className="space-y-6">
          {/*===== Project overview =====*/}
          <section className="relative overflow-visible border border-border bg-card shadow-[var(--shadow-card)]">
            <span className="absolute left-0 top-0 h-[2px] w-24 bg-secondary" />

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-secondary" />

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    01 / Project Overview
                  </span>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Define the core project and delivery expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
              <FieldGroup
                icon={FileText}
                label="Project title"
                hint="A clear name for this project"
              >
                <Input
                  name="title"
                  placeholder="Project title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FieldGroup>

              <FieldGroup
                icon={Sparkles}
                label="Service"
                hint="Primary Blackcrest capability"
              >
                <div className="relative z-30">
                  <Select
                    options={pillarOptions}
                    value={formData.pillar}
                    onChange={handleSelectChange}
                    className="w-full"
                  />
                </div>
              </FieldGroup>

              <FieldGroup
                icon={CircleDollarSign}
                label="Estimated budget"
                hint="Optional working budget"
              >
                <div className="flex gap-3">
                  <Input
                    name="budget"
                    placeholder="Estimated budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="min-w-0 flex-1"
                  />

                  <div className="relative z-20 w-28 shrink-0">
                    <Select
                      options={CURRENCY_OPTIONS}
                      value={formData.currency}
                      onChange={handleCurrencyChange}
                      className="w-full"
                    />
                  </div>
                </div>
              </FieldGroup>

              <FieldGroup
                icon={CalendarDays}
                label="Target deadline"
                hint="Preferred project completion date"
              >
                <Input
                  name="deadline"
                  type="date"
                  placeholder="Target deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </FieldGroup>
            </div>
          </section>

          {/*===== Project requirements =====*/}
          <section className="relative border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-secondary" />

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    02 / Requirements
                  </span>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Explain the challenge, context, and what needs to be
                    delivered.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <label className="mb-3 block text-xs font-medium text-heading">
                Project requirements
              </label>

              <Textarea
                name="problem"
                placeholder="Describe your project requirements"
                value={formData.problem}
                onChange={handleChange}
                required
                className="min-h-[200px]"
              />

              <div className="mt-3 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-secondary" />
                <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                  Include the current problem, expected deliverables, and
                  important constraints
                </span>
              </div>
            </div>
          </section>

          {/*===== Strategic context =====*/}
          <section className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Flag className="h-4 w-4 text-secondary" />

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    03 / Strategic Context
                  </span>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Give us the context behind the project and the outcome you
                    want.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
              <FieldGroup
                icon={Target}
                label="Project goals"
                hint="What should this project achieve?"
              >
                <Textarea
                  name="projectGoals"
                  placeholder="What do you want to achieve with this project?"
                  value={formData.projectGoals}
                  onChange={handleChange}
                  className="min-h-[130px]"
                />
              </FieldGroup>

              <FieldGroup
                icon={UserRound}
                label="Target audience"
                hint="Who is this project primarily for?"
              >
                <Textarea
                  name="targetAudience"
                  placeholder="Who is the primary audience for this project?"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="min-h-[130px]"
                />
              </FieldGroup>

              <div className="lg:col-span-2">
                <FieldGroup
                  icon={Link2}
                  label="Reference links"
                  hint="Examples, inspiration, competitors, or related websites"
                >
                  <Input
                    name="referenceLinks"
                    placeholder="https://example.com"
                    value={formData.referenceLinks}
                    onChange={handleChange}
                  />
                </FieldGroup>
              </div>
            </div>
          </section>

          {/*===== Attachments =====*/}
          <section className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-secondary" />

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    04 / Attachments
                  </span>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add supporting documents, screenshots, specifications, or
                    reference material.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <FileSelector
                files={selectedFiles}
                onFilesChange={setSelectedFiles}
                disabled={submitting}
                maxFiles={5}
                maxSizeMB={10}
              />
            </div>
          </section>
        </div>

        {/*===== Submission panel =====*/}
        <aside className="min-w-0">
          <div className="space-y-4 xl:sticky xl:top-24">
            <div className="border border-border bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
              <div className="border-b border-primary-foreground/10 px-5 py-5">
                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
                  Project Brief
                </span>

                <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-primary-foreground">
                  Ready for review.
                </h2>

                <p className="mt-2 text-xs leading-5 text-primary-foreground/55">
                  Your request will be sent directly to the Blackcrest team for
                  review.
                </p>
              </div>

              <div className="divide-y divide-primary-foreground/10">
                <BriefStep number="01" label="Define the project" />
                <BriefStep number="02" label="Explain the requirements" />
                <BriefStep number="03" label="Add strategic context" />
                <BriefStep number="04" label="Attach supporting files" />
              </div>

              <div className="border-t border-primary-foreground/10 p-5">
                <Button
                  type="submit"
                  size="md"
                  disabled={submitting}
                  className="group w-full !justify-between !rounded-md"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      Submitting
                      <Loader size="sm" />
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Submit Project Request
                      </span>

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/*===== Submission note =====*/}
            <div className="border border-border bg-muted/15 px-4 py-4">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
                Before submitting
              </span>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Make sure the project title and requirements clearly describe
                what you need. Additional detail helps the team review your
                request efficiently.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
};

//===== Field group =====//
function FieldGroup({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: typeof FileText;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div>
          <label className="block text-xs font-medium text-heading">
            {label}
          </label>

          <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground">
            {hint}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}

//===== Brief step =====//
function BriefStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <span className="font-mono text-[7px] font-semibold text-gold-light/60">
        {number}
      </span>

      <span className="text-xs font-medium text-primary-foreground/65">
        {label}
      </span>
    </div>
  );
}
