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
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
    }

    const { name, phone, jobTitle } = body as Record<string, unknown>;
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: typeof name === "string" && name.trim() ? name.trim() : undefined,
        phone: typeof phone === "string" ? phone : undefined,
        jobTitle: typeof jobTitle === "string" ? jobTitle : undefined,
      },
      select: { name: true, phone: true, jobTitle: true },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Unable to update profile" }, { status: 500 });
  }
}
