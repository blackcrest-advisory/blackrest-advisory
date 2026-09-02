import { z } from "zod";

export const projectInquiryFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  projectTitle: z.string().min(1, "Project title is required."),
  projectType: z.string().default("web-application"),
  industry: z.string().default("it"),
  budget: z.string().default("under-10k"),
  timeline: z.string().default("1-month"),
  currency: z.string().default("USD"),
  description: z.string().min(1, "Project description is required."),
  agree: z.boolean().refine(val => val === true, {
    message: "You must agree to be contacted.",
  }),
});

export type ProjectInquiryFormData = z.infer<typeof projectInquiryFormSchema>;