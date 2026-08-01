import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalLeads,
      newLeads,
      activeProjects,
      pendingProposals,
      totalClients,
      pendingConsultations,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          status: "NEW",
        },
      }),
      prisma.project.count({
        where: {
          status: "ACTIVE",
        },
      }),
      prisma.proposal.count({
        where: {
          status: {
            in: ["SENT", "VIEWED"],
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "CLIENT",
        },
      }),
      prisma.consultation.count({
        where: {
          status: "PENDING",
        },
      }),
    ]);

    return NextResponse.json(
      {
        totalLeads,
        newLeads,
        activeProjects,
        pendingProposals,
        totalClients,
        pendingConsultations,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
