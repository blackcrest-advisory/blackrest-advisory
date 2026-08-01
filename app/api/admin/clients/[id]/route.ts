import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const client = await prisma.user.findFirst({
      where: {
        id,
        role: "CLIENT",
      },
      omit: {
        password: true,
      },
      include: {
        briefs: true,
        consultations: true,
        projects: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const proposals = await prisma.proposal.findMany({
      where: {
        brief: {
          userId: client.id,
        },
      },
    });

    return NextResponse.json({ ...client, proposals }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
