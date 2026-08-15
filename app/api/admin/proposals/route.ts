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
        { error: "Brief ID, scope, deliverables, and timeline are required" },
        { status: 400 },
      );
    }

    const { briefId, scope, deliverables, timeline, amount, currency, terms } =
      body as Record<string, unknown>;

    if (
      typeof briefId !== "string" ||
      !briefId.trim() ||
      typeof scope !== "string" ||
      !scope.trim() ||
      typeof deliverables !== "string" ||
      !deliverables.trim() ||
      typeof timeline !== "string" ||
      !timeline.trim()
    ) {
      return NextResponse.json(
        { error: "Brief ID, scope, deliverables, and timeline are required" },
        { status: 400 },
      );
    }

    const proposal = await prisma.$transaction(async (transaction) => {
      const createdProposal = await transaction.proposal.create({
        data: {
          briefId,
          adminId: admin.id,
          scope: scope.trim(),
          deliverables: deliverables.trim(),
          timeline: timeline.trim(),
          amount:
            typeof amount === "number" || amount === null ? amount : undefined,
          currency: typeof currency === "string" ? currency : undefined,
          terms:
            typeof terms === "string" || terms === null ? terms : undefined,
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
