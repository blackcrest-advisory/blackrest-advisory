import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || !["ADMIN", "SUPER_ADMIN"].includes(currentUser.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 });
    }
    const { currentPassword, newPassword, confirmPassword } = body as Record<string, unknown>;
    if (
      typeof currentPassword !== "string" ||
      !currentPassword ||
      typeof newPassword !== "string" ||
      !newPassword ||
      typeof confirmPassword !== "string" ||
      !confirmPassword
    ) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 });
    }
    if (newPassword.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    if (newPassword !== confirmPassword) return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: currentUser.id }, select: { password: true } });
    if (!user?.password || !(await bcrypt.compare(currentPassword, user.password))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    await prisma.user.update({ where: { id: currentUser.id }, data: { password: await bcrypt.hash(newPassword, 12) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to update password" }, { status: 500 });
  }
}
