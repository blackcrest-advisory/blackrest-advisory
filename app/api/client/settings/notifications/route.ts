import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Notification preferences are required" },
        { status: 400 },
      );
    }

    const { notificationPreferences } = body as Record<string, unknown>;

    if (
      typeof notificationPreferences !== "object" ||
      notificationPreferences === null ||
      Array.isArray(notificationPreferences)
    ) {
      return NextResponse.json(
        { error: "Notification preferences are required" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        notificationPreferences:
          notificationPreferences as Prisma.InputJsonObject,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
