import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [{ receiverId: user.id }, { senderId: user.id }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(messages, { status: 200 });
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

    const bodyData: unknown = await request.json();

    if (typeof bodyData !== "object" || bodyData === null) {
      return NextResponse.json(
        { error: "Receiver ID and body are required" },
        { status: 400 },
      );
    }

    const { receiverId, subject, body, projectId } = bodyData as Record<
      string,
      unknown
    >;

    if (
      typeof receiverId !== "string" ||
      !receiverId ||
      typeof body !== "string" ||
      !body
    ) {
      return NextResponse.json(
        { error: "Receiver ID and body are required" },
        { status: 400 },
      );
    }

    const message = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId,
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
