import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const message = await prisma.message.findFirst({
      where: {
        id,
        receiverId: user.id,
      },
    });

    if (!message) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: message.id,
      },
      data: {
        status: "READ",
      },
    });

    return NextResponse.json(updatedMessage, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
