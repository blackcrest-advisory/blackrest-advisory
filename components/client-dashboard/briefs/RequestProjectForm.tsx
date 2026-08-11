"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";
import { briefRequestSchema } from "@/lib/validations/briefRequest";
import { Brief, PILLAR } from "@/types/projectBrief";
import { createBrief } from "@/lib/actions/briefs/brief.action";
import { Loader } from "@/components/ui/Loader";

const pillarOptions: { value: PILLAR; label: string }[] = [
  {
    value: "WEBSITE_DEVELOPMENT",
    label: "Website Development",
  },
  {
    value: "MOBILE_APP",
    label: "Mobile App",
  },
  {
    value: "DIGITAL_MARKETING",
    label: "Digital Marketing",
  },
  {
    value: "SALES_SUPPORT",
    label: "Sales & Support",
  },
];

type BriefFormData = Omit<Brief, "attachments"> & {
  budget: string;
  deadline: string;
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
    projectGoals: "",
    targetAudience: "",
    referenceLinks: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    const fileUrls: string[] = [];

    for (let i = 0; i < files.length; i += 1) {
      fileUrls.push(files[i].name);
    }

    setAttachments((prev) => [...prev, ...fileUrls]);
    event.target.value = "";
  };

  const removeAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment !== name));
  };

  const validate = () => {
    const result = briefRequestSchema.safeParse({
      ...formData,
      attachments,
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
      const result = await createBrief({
        ...formData,
        attachments,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Project request submitted successfully.");
      router.push("/client/dashboard/project-requests");
      router.refresh();
    } catch (error) {
      console.error("Submit project request error:", error);
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
    <form onSubmit={handleSubmit}>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Request a New Project
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Send your project requirements to the Blackcrest team and we will
            review it within one business day.
          </p>
        </div>

        {/* Project Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Input
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Select
            options={pillarOptions}
            value={formData.pillar}
            onChange={handleSelectChange}
          />

          <Input
            name="budget"
            placeholder="Estimated budget"
            value={formData.budget}
            onChange={handleChange}
          />

          <Input
            name="deadline"
            type="date"
            placeholder="Target deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        {/* Project Description */}
        <div className="mt-6">
          <Textarea
            name="problem"
            placeholder="Describe your project requirements"
            value={formData.problem}
            onChange={handleChange}
            required
            className="min-h-[220px]"
          />
        </div>

        {/* Additional Information */}
        <div className="mt-6 space-y-6">
          <Textarea
            name="projectGoals"
            placeholder="Project goals – what do you want to achieve with this project?"
            value={formData.projectGoals}
            onChange={handleChange}
            className="min-h-[100px]"
          />

          <Textarea
            name="targetAudience"
            placeholder="Target audience – who is the primary audience for this project?"
            value={formData.targetAudience}
            onChange={handleChange}
            className="min-h-[100px]"
          />

          <Input
            name="referenceLinks"
            placeholder="Reference websites / links (e.g., https://example.com)"
            value={formData.referenceLinks}
            onChange={handleChange}
          />
        </div>

        {/* Attachments */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-body">
            Attachments
          </label>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground"
          />

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3"
                >
                  <span className="truncate text-sm text-foreground">
                    {attachment}
                  </span>

                  <button
                    type="button"
                    className="text-sm font-medium text-destructive hover:text-destructive/80"
                    onClick={() => removeAttachment(attachment)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
          >
            {submitting ? (
              <>
                {" "}
                <span>Submitting</span> <Loader size="sm" />{" "}
              </>
            ) : (
              "Submit Project Request"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
