"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import {
  leadRequestSchema,
  projectTypeToPillar,
  projectTypeToService,
} from "@/lib/validations/leadRequest";
import { sendNewLeadAlert } from "@/lib/services/email/email.service";
import { revalidatePath } from "next/cache";
import { Lead, NotificationType, Pillar } from "@prisma/client";

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function createLeadInquiry(
  input: unknown,
): Promise<ActionResult<{ message: string; lead: Lead }>> {
  try {
    const result = leadRequestSchema.safeParse(input);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return { success: false, error: firstError.message };
    }

    const {
      name,
      email,
      phone,
      companyName,
      industry,
      projectType,
      projectTitle,
      budget,
      timeline,
      currency,
      description,
      services,
      source,
      attachmentUrl,
    } = result.data;

    // 2. Map projectType to Pillar enum
    const pillar = projectType
      ? (projectTypeToPillar[projectType] as Pillar | undefined) || null
      : null;

    // 3. Store extra metadata (projectTitle, timeline, currency, attachmentUrl)
    const extraMetadata = {
      projectTitle,
      timeline,
      currency,
      attachmentUrl: attachmentUrl || null,
    };
    const notes = JSON.stringify(extraMetadata);

    // 4. Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone || null,
        companyName: companyName || null,
        industry: industry || null,
        companySize: null,
        location: null,
        website: null,
        pillar: pillar,
        services: projectType ? [projectTypeToService[projectType]] : services || [],
        problem: description.trim(),
        source: source || "website_inquiry",
        status: "NEW",
        budget: budget || null,
        notes: notes,
        lastContacted: null,
        nextFollowUp: null,
      },
    });

    // 5. Create an in-app notification for every admin
    const adminUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
      },
    });

    if (adminUsers.length > 0) {
      await prisma.notification.createMany({
        data: adminUsers.map((admin) => ({
          userId: admin.id,
          type: NotificationType.REQUEST_RECEIVED,
          title: "New lead inquiry received",
          body: `${lead.name} submitted an inquiry${lead.companyName ? ` from ${lead.companyName}` : ""}.`,
          link: "/admin/dashboard/leads",
        })),
      });
    }

    // 6. Send email alert to admin
    await sendNewLeadAlert(name, email, description);

    // 7. Revalidate the admin pages
    revalidatePath("/admin/dashboard/leads");
    revalidatePath("/admin/dashboard/notifications");

    return {
      success: true,
      data: {
        message:
          "Your inquiry has been submitted successfully! We will get back to you within one business day.",
        lead,
      },
    };
  } catch (error: unknown) {
    console.error("createLeadInquiry error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit inquiry",
    };
  }
}
