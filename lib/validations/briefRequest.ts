import { z } from "zod";

export const briefRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  problem: z.string().min(1, "Project description is required"),
  pillar: z.enum([
    "DIGITAL_MARKETING",
    "WEBSITE_DEVELOPMENT",
    "MOBILE_APP",
    "SALES_SUPPORT",
  ]),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  attachments: z.array(z.string()).optional().default([]),
  projectGoals: z.string().optional(),
  targetAudience: z.string().optional(),
  referenceLinks: z.string().optional(),
});
