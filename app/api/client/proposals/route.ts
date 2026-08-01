import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const proposals = await prisma.proposal.findMany({
      where: {
        brief: {
          userId: user.id,
        },
      },
      include: {
        brief: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const sentProposalIds = proposals
      .filter((proposal) => proposal.status === "SENT")
      .map((proposal) => proposal.id);

    if (sentProposalIds.length > 0) {
      await prisma.proposal.updateMany({
        where: {
          id: {
            in: sentProposalIds,
          },
          status: "SENT",
        },
        data: {
          status: "VIEWED",
        },
      });
    }

    const updatedProposals = proposals.map((proposal) =>
      proposal.status === "SENT"
        ? { ...proposal, status: "VIEWED" as const }
        : proposal,
    );

    return NextResponse.json(updatedProposals, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
