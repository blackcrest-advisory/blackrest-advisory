import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const brief = await prisma.brief.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!brief) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(brief, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
