import { ConsultationType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import { sendConsultationConfirmation } from "@/lib/services/email.service";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const consultations = await prisma.consultation.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return NextResponse.json(consultations, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Scheduled date is required" },
        { status: 400 },
      );
    }

    const { scheduledAt, type, notes } = body as Record<string, unknown>;

    if (typeof scheduledAt !== "string" || !scheduledAt.trim()) {
      return NextResponse.json(
        { error: "Scheduled date is required" },
        { status: 400 },
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        userId: user.id,
        scheduledAt: new Date(scheduledAt),
        type:
          typeof type === "string" &&
          Object.values(ConsultationType).includes(type as ConsultationType)
            ? (type as ConsultationType)
            : undefined,
        notes: typeof notes === "string" ? notes : null,
        status: "PENDING",
      },
    });
    void sendConsultationConfirmation(
      user.email,
      user.name,
      consultation.scheduledAt.toISOString(),
      consultation.type,
    );

    return NextResponse.json(consultation, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
