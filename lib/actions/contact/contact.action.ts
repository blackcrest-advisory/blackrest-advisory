"use server";

import { Pillar } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import {
  sendContactFormConfirmation,
  sendNewLeadAlert,
} from "@/lib/services/email.service";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  companyName: z.string().trim().optional(),
  pillar: z.nativeEnum(Pillar).optional(),
  problem: z.string().trim().min(1, "Message is required"),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;

type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

export async function createContactLead(
  input: ContactFormInput,
): Promise<ContactActionResult> {
  const result = contactFormSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Invalid contact details",
    };
  }

  try {
    const { name, email, phone, companyName, pillar, problem } = result.data;

    await prisma.lead.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        companyName: companyName || null,
        pillar: pillar ?? null,
        services: [],
        problem,
        source: "Contact Form",
        status: "NEW",
      },
    });

    void sendNewLeadAlert(name, email, problem);
    void sendContactFormConfirmation(email, name);

    return { success: true };
  } catch (error: unknown) {
    console.error("createContactLead error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
