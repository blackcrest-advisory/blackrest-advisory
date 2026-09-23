"use server";

import { PopupAnalyticsEventType } from "@prisma/client";
import { z } from "zod";
import { HOMEPAGE_FORM_PREFIX, HOMEPAGE_INQUIRY_SOURCE } from "@/lib/validations/homepageInquiry";

import { businessHelpOptions } from "@/content-data/business-development/businessHelpFinderData";
import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";

const optionIds = businessHelpOptions.map((option) => option.id) as [
  string,
  ...string[],
];

const popupEventSchema = z.discriminatedUnion("eventType", [
  z.object({
    eventType: z.literal("VIEW"),
    visitorId: z.uuid(),
  }),
  z.object({
    eventType: z.literal("DISMISS"),
    visitorId: z.uuid(),
  }),
  z.object({
    eventType: z.literal("OPTION_CLICK"),
    visitorId: z.uuid(),
    optionId: z.enum(optionIds),
  }),
]);

export type PopupAnalyticsInput = z.infer<typeof popupEventSchema>;

export async function recordPopupEvent(input: PopupAnalyticsInput) {
  const parsed = popupEventSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false } as const;
  }

  const { visitorId, eventType } = parsed.data;
  const optionId =
    eventType === "OPTION_CLICK" ? parsed.data.optionId : undefined;
  const eventKey = [visitorId, eventType, optionId].filter(Boolean).join(":");

  try {
    await prisma.popupAnalyticsEvent.upsert({
      where: { eventKey },
      update: {},
      create: {
        eventKey,
        visitorId,
        eventType: PopupAnalyticsEventType[eventType],
        optionId,
      },
    });

    return { success: true } as const;
  } catch {
    // Analytics must never prevent a visitor from using or leaving the popup.
    return { success: false } as const;
  }
}

export async function getPopupAnalytics() {
  const admin = await getAdminUser();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  const events = await prisma.popupAnalyticsEvent.findMany({
    select: {
      eventKey: true,
      visitorId: true,
      eventType: true,
      optionId: true,
    },
  });

  const enquiries = await prisma.lead.findMany({
    where: { source: HOMEPAGE_INQUIRY_SOURCE, id: { startsWith: HOMEPAGE_FORM_PREFIX } },
    select: { id: true },
  });
  const submittedVisitors = new Set(enquiries.map((lead) => lead.id.slice(HOMEPAGE_FORM_PREFIX.length)));
  // A persisted enquiry also proves a view, even if client analytics were blocked.
  const formViews = new Set(submittedVisitors);
  const formDismissals = new Set<string>();
  for (const event of events) {
    if (!event.eventKey.startsWith(HOMEPAGE_FORM_PREFIX)) continue;
    if (event.eventType === "VIEW") formViews.add(event.visitorId);
    if (event.eventType === "DISMISS") formDismissals.add(event.visitorId);
  }
  const views = new Set<string>();
  const dismissals = new Set<string>();
  const visitorsWhoClicked = new Set<string>();
  const interestVisitors = new Map<string, Set<string>>(
    businessHelpOptions.map((option) => [option.id, new Set<string>()]),
  );

  for (const event of events) {
    if (event.eventKey.startsWith(HOMEPAGE_FORM_PREFIX)) continue;
    if (event.eventType === PopupAnalyticsEventType.VIEW) {
      views.add(event.visitorId);
    }

    if (event.eventType === PopupAnalyticsEventType.DISMISS) {
      dismissals.add(event.visitorId);
    }

    if (
      event.eventType === PopupAnalyticsEventType.OPTION_CLICK &&
      event.optionId
    ) {
      visitorsWhoClicked.add(event.visitorId);
      interestVisitors.get(event.optionId)?.add(event.visitorId);
    }
  }

  const totalViews = views.size;
  const totalSelections = Array.from(interestVisitors.values()).reduce(
    (total, visitors) => total + visitors.size,
    0,
  );

  return {
    form: {
      totalViews: formViews.size,
      totalDismissals: formDismissals.size,
      totalSubmissions: submittedVisitors.size,
      submissionRate: formViews.size
        ? Math.round(submittedVisitors.size / formViews.size * 1000) / 10
        : 0,
    },
    totalViews,
    totalClicks: visitorsWhoClicked.size,
    totalDismissals: dismissals.size,
    clickRate: totalViews
      ? Math.round((visitorsWhoClicked.size / totalViews) * 1000) / 10
      : 0,
    dismissRate: totalViews
      ? Math.round((dismissals.size / totalViews) * 1000) / 10
      : 0,
    interests: businessHelpOptions.map((option) => {
      const count = interestVisitors.get(option.id)?.size ?? 0;

      return {
        id: option.id,
        label: option.label,
        count,
        percentage: totalSelections
          ? Math.round((count / totalSelections) * 1000) / 10
          : 0,
      };
    }),
  };
}
