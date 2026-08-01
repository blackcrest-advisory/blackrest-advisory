import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bodyData: unknown = await request.json();

    if (typeof bodyData !== "object" || bodyData === null) {
      return NextResponse.json({ error: "Body is required" }, { status: 400 });
    }

    const { subject, body, projectId } = bodyData as Record<string, unknown>;

    if (typeof body !== "string" || !body) {
      return NextResponse.json({ error: "Body is required" }, { status: 400 });
    }

    const admin = await prisma.user.findFirst({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "No admin available" },
        { status: 500 },
      );
    }

    const message = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: admin.id,
        subject:
          typeof subject === "string" || subject === null ? subject : undefined,
        body,
        projectId:
          typeof projectId === "string" || projectId === null
            ? projectId
            : undefined,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
