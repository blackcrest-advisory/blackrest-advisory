import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const unread = new URL(request.url).searchParams.get("unread");
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: {
          userId: user.id,
          ...(unread === "true" ? { isRead: false } : {}),
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      }),
      prisma.notification.count({
        where: {
          userId: user.id,
          isRead: false,
        },
      }),
    ]);

    return NextResponse.json(
      { success: true, data: notifications, unreadCount },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
