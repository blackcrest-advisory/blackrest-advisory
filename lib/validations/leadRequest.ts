import { z } from "zod";

export const projectTypeValues = [
  "web-application",
  "mobile-application",
  "digital-marketing",
  "sales-support",
] as const;

export type ProjectType = (typeof projectTypeValues)[number];

// Map frontend projectType values to Prisma Pillar enum
export const projectTypeToPillar: Record<ProjectType, string> = {
  "web-application": "WEBSITE_DEVELOPMENT",
  "mobile-application": "MOBILE_APP",
  "digital-marketing": "DIGITAL_MARKETING",
  "sales-support": "SALES_SUPPORT",
};

// Map each project type to the service shown in the admin leads dashboard.
export const projectTypeToService: Record<ProjectType, string> = {
  "web-application": "web-development",
  "mobile-application": "mobile-app",
  "digital-marketing": "digital-marketing",
  "sales-support": "sales-support",
};

// Schema for the API request payload
export const leadRequestSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  projectType: z.enum(projectTypeValues).optional(),
  projectTitle: z.string().min(1, "Project title is required."),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  currency: z.string().optional(),
  description: z.string().min(1, "Project description is required."),
  services: z.array(z.string()).optional(),
  source: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

export type LeadRequestData = z.infer<typeof leadRequestSchema>;
