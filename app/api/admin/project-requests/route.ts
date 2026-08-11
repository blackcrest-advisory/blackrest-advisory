import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const briefs = await prisma.brief.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const requests = briefs.map((brief) => ({
      id: brief.id,
      clientName: brief.user.name,
      companyName: brief.user.companyName ?? "",
      title: brief.title,
      pillar: brief.pillar,
      status: brief.status,
      submittedAt: brief.createdAt.toISOString(),
    }));

    return NextResponse.json(requests, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
