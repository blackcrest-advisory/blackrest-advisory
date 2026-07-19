import { ProposalStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      throw new Error("Invalid request body");
    }

    const { content, amount, currency, status } = body as Record<
      string,
      unknown
    >;
    const { id } = await params;
    const proposal = await prisma.proposal.update({
      where: {
        id,
      },
      data: {
        content: typeof content === "string" ? content : undefined,
        amount:
          typeof amount === "number" || amount === null ? amount : undefined,
        currency: typeof currency === "string" ? currency : undefined,
        status:
          typeof status === "string" &&
          Object.values(ProposalStatus).includes(status as ProposalStatus)
            ? (status as ProposalStatus)
            : undefined,
        sentAt: status === "SENT" ? new Date() : undefined,
      },
    });

    return NextResponse.json(proposal, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
