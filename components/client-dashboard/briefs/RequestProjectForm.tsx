"use client";

import { useActionState, useTransition } from "react";
import { Brief, PILLAR } from "@/types/projectBrief";
import { createBrief } from "@/lib/actions/briefs/brief.action";

// Initial form state (before any submission)
const initialState = {
  success: false,
  error: "",
  brief: null,
};

export function BriefForm() {
  // useActionState (Next.js 15+) – manages the result of the server action
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // Build the payload from FormData
      const payload: Brief = {
        title: formData.get("title") as string,
        problem: formData.get("problem") as string,
        pillar: formData.get("pillar") as PILLAR,
        budget: formData.get("budget") as string | null,
        deadline: formData.get("deadline") as string | null,
        attachments: [], // handle file uploads separately if needed
        projectGoals: formData.get("projectGoals") as string | null,
        targetAudience: formData.get("targetAudience") as string | null,
        referenceLinks: formData.get("referenceLinks") as string | null,
      };

      const result = await createBrief(payload);
      return result; // { success, error, brief }
    },
    initialState,
  );

  // Or use useTransition for older Next.js versions
  // const [isPending, startTransition] = useTransition();
  // const [result, setResult] = useState(initialState);
  // const handleSubmit = (e) => { ... }

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      <div>
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="problem">Problem *</label>
        <textarea
          id="problem"
          name="problem"
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="pillar">Pillar *</label>
        <select
          id="pillar"
          name="pillar"
          required
          className="border p-2 w-full"
        >
          <option value="DIGITAL_MARKETING">Digital Marketing</option>
          <option value="WEBSITE_DEVELOPMENT">Website Development</option>
          <option value="MOBILE_APP">Mobile App</option>
          <option value="SALES_SUPPORT">Sales Support</option>
          <option value="MIXED">Mixed</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget">Budget ($)</label>
        <input
          type="number"
          id="budget"
          name="budget"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="projectGoals">Project Goals</label>
        <textarea
          id="projectGoals"
          name="projectGoals"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="targetAudience">Target Audience</label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="referenceLinks">Reference Links</label>
        <input
          type="url"
          id="referenceLinks"
          name="referenceLinks"
          className="border p-2 w-full"
        />
      </div>

      {/* Display errors or success */}
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.success && (
        <p className="text-green-500">Brief created successfully!</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit Brief"}
      </button>
    </form>
  );
}
