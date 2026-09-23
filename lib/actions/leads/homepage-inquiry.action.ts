"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import {
  businessNeeds, homepageInquirySchema, homepageFormEventSchema,
  HOMEPAGE_INQUIRY_SOURCE, HOMEPAGE_FORM_PREFIX,
} from "@/lib/validations/homepageInquiry";

export async function recordHomepageFormEvent(input: unknown) {
  const parsed = homepageFormEventSchema.safeParse(input);
  if (!parsed.success) return { success: false };
  const { visitorId, eventType } = parsed.data;
  try {
    await prisma.popupAnalyticsEvent.upsert({
      where: { eventKey: `${HOMEPAGE_FORM_PREFIX}${visitorId}:${eventType}` },
      update: {},
      create: { eventKey: `${HOMEPAGE_FORM_PREFIX}${visitorId}:${eventType}`, visitorId, eventType },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function submitHomepageInquiry(input: unknown): Promise<
  { success: true } | { success: false; error: string }
> {
  const parsed = homepageInquirySchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };
  const data = parsed.data;
  // The unique lead ID makes double clicks, retries and multiple tabs idempotent.
  const id = `${HOMEPAGE_FORM_PREFIX}${data.visitorId}`;
  const needLabel = businessNeeds.find((need) => need.value === data.need)!.label;
  const problem = `Business stage: ${data.businessStage}\nHelp needed: ${needLabel}${data.message ? `\n\n${data.message}` : ""}`;

  try {
    await prisma.lead.create({
      data: {
        id, name: data.name, email: data.email,
        companyName: data.companyName || null, industry: data.industry,
        phone: data.phone || null, problem,
        services: data.need === "not-sure" ? [] : [data.need],
        status: "NEW", source: HOMEPAGE_INQUIRY_SOURCE,
        notes: JSON.stringify({
          projectTitle: "Homepage business enquiry", businessStage: data.businessStage,
          sourceLabel: "Homepage enquiry form",
        }),
      },
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      try {
        const existing = await prisma.lead.findUnique({ where: { id }, select: { id: true } });
        if (existing) return { success: true };
      } catch { /* Return a retryable error without exposing database details. */ }
    }
    return { success: false, error: "We couldn't save your enquiry. Please try again. Your answers are still here." };
  }

  // A saved lead remains successful even when an ancillary service is unavailable.
  try {
    after(async () => {
      await Promise.allSettled([
        (async () => {
          const admins = await prisma.user.findMany({
            where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } }, select: { id: true },
          });
          if (admins.length) await prisma.notification.createMany({
            data: admins.map((admin) => ({
              userId: admin.id, type: "REQUEST_RECEIVED" as const,
              title: "New homepage enquiry",
              body: `${data.name}${data.companyName ? ` from ${data.companyName}` : ""} asked about ${needLabel.toLowerCase()}.`,
              link: `/admin/dashboard/leads/${id}`,
            })),
          });
          revalidatePath("/admin/dashboard/notifications");
        })(),
        (async () => {
          const { sendNewLeadAlert } = await import("@/lib/services/email/email.service");
          await sendNewLeadAlert(data.name, data.email, problem);
        })(),
        recordHomepageFormEvent({ visitorId: data.visitorId, eventType: "VIEW" }),
      ]);
    });
    revalidatePath("/admin/dashboard/leads");
    revalidatePath("/admin/dashboard/popup-analytics");
  } catch { /* Follow-up failures must not invite duplicate submissions. */ }
  return { success: true };
}
