import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { sendWelcomeEmail } from "@/lib/services/email.service";

function toLowerCaseString(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const email = toLowerCaseString(lead.email);
    if (!email) {
      return NextResponse.json(
        { error: "Lead email is required to convert to client" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.role !== "CLIENT") {
      return NextResponse.json(
        {
          error:
            "A user with this email already exists with elevated permissions. Please use a different client email.",
        },
        { status: 409 },
      );
    }

    const user = existingUser
      ? await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            role: "CLIENT",
            name: lead.name || existingUser.name,
            companyName: lead.companyName || existingUser.companyName,
            phone: lead.phone || existingUser.phone,
            industry: lead.industry || existingUser.industry,
          },
        })
      : await prisma.user.create({
          data: {
            name: lead.name,
            email,
            role: "CLIENT",
            companyName: lead.companyName ?? undefined,
            phone: lead.phone ?? undefined,
            industry: lead.industry ?? undefined,
            password: null,
          },
        });

    const existingNotes = lead.notes ? JSON.parse(lead.notes) : {};
    const conversionMetadata = {
      ...existingNotes,
      convertedToUserId: user.id,
      convertedAt: new Date().toISOString(),
      convertedBy: admin.id,
    };

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: "CONVERTED",
        notes: JSON.stringify(conversionMetadata),
      },
    });

    void sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error("Error sending welcome email:", error);
    });

    return NextResponse.json({ lead: updatedLead, user }, { status: 200 });
  } catch (error) {
    console.error("Lead conversion error:", error);
    return NextResponse.json(
      { error: "Something went wrong while converting the lead" },
      { status: 500 },
    );
  }
}
