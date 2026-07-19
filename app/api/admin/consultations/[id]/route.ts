import { ConsultationStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      throw new Error("Invalid request body");
    }

    const { status, meetingLink, notes, duration } = body as Record<
      string,
      unknown
    >;
    const { id } = await params;
    const consultation = await prisma.consultation.update({
      where: {
        id,
      },
      data: {
        status:
          typeof status === "string" &&
          Object.values(ConsultationStatus).includes(
            status as ConsultationStatus,
          )
            ? (status as ConsultationStatus)
            : undefined,
        meetingLink:
          typeof meetingLink === "string" || meetingLink === null
            ? meetingLink
            : undefined,
        notes:
          typeof notes === "string" || notes === null ? notes : undefined,
        duration:
          typeof duration === "number" || duration === null
            ? duration
            : undefined,
      },
    });

    return NextResponse.json(consultation, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
