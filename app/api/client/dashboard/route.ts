import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [briefs, activeProjects, pendingConsultations, pendingProposals] =
    await Promise.all([
      prisma.brief.count({
        where: {
          userId: user.id,
        },
      }),
      prisma.project.count({
        where: {
          userId: user.id,
          status: "ACTIVE",
        },
      }),
      prisma.consultation.count({
        where: {
          userId: user.id,
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
        },
      }),
      prisma.proposal.count({
        where: {
          brief: {
            userId: user.id,
          },
          status: {
            in: ["SENT", "VIEWED"],
          },
        },
      }),
    ]);

  return NextResponse.json(
    {
      briefs,
      activeProjects,
      pendingConsultations,
      pendingProposals,
    },
    { status: 200 },
  );
}
