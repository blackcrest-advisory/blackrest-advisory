import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await prisma.message.count({
      where: {
        receiverId: admin.id,
        status: "UNREAD",
      },
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
