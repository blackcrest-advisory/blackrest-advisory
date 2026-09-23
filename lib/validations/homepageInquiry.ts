import { z } from "zod";

export const HOMEPAGE_INQUIRY_SOURCE = "homepage_enquiry";
export const HOMEPAGE_FORM_PREFIX = "homepage-enquiry-v1:";

export const businessIndustries = [
  "Retail & ecommerce", "Food & hospitality", "Professional services",
  "Technology", "Healthcare & wellbeing", "Construction & property",
  "Education", "Other", "Not sure yet",
] as const;

export const businessStages = ["Idea stage", "Starting a business", "Already operating"] as const;

export const businessNeeds = [
  { value: "business-development", label: "Business planning & advice" },
  { value: "web-development", label: "Website" },
  { value: "mobile-app", label: "Mobile application" },
  { value: "digital-marketing", label: "Marketing & finding customers" },
  { value: "sales-support", label: "Sales support" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const homepageInquirySchema = z.object({
  visitorId: z.uuid(),
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(254),
  companyName: z.string().trim().max(160).default(""),
  industry: z.enum(businessIndustries, { error: "Please choose your type of business." }),
  businessStage: z.enum(businessStages, { error: "Please choose your business stage." }),
  need: z.enum(businessNeeds.map((need) => need.value), { error: "Please choose the help you need." }),
  message: z.string().trim().max(2000).default(""),
  phone: z.string().trim().max(40).default(""),
  // Hidden from visitors; ordinary enquiries leave this field empty.
  websiteConfirm: z.string().max(0).default(""),
});

export type HomepageInquiryInput = z.infer<typeof homepageInquirySchema>;

export const homepageFormEventSchema = z.object({
  visitorId: z.uuid(),
  eventType: z.enum(["VIEW", "DISMISS"]),
});
