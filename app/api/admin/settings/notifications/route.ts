import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !["ADMIN", "SUPER_ADMIN"].includes(currentUser.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const preferences = typeof body === "object" && body !== null ? (body as Record<string, unknown>).notificationPreferences : null;
    if (typeof preferences !== "object" || preferences === null || Array.isArray(preferences)) {
      return NextResponse.json({ error: "Notification preferences are required" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { notificationPreferences: preferences as Prisma.InputJsonObject },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to save notification preferences" }, { status: 500 });
  }
}
