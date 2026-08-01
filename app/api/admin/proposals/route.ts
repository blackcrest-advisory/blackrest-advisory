import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Brief ID and content are required" },
        { status: 400 },
      );
    }

    const { briefId, content, amount, currency } = body as Record<
      string,
      unknown
    >;

    if (
      typeof briefId !== "string" ||
      !briefId.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return NextResponse.json(
        { error: "Brief ID and content are required" },
        { status: 400 },
      );
    }

    const proposal = await prisma.$transaction(async (transaction) => {
      const createdProposal = await transaction.proposal.create({
        data: {
          briefId,
          adminId: admin.id,
          content: content.trim(),
          amount:
            typeof amount === "number" || amount === null ? amount : undefined,
          currency: typeof currency === "string" ? currency : undefined,
          status: "DRAFT",
        },
      });

      await transaction.brief.update({
        where: {
          id: briefId,
        },
        data: {
          status: "ASSIGNED",
        },
      });

      return createdProposal;
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
