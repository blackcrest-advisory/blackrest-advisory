import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const briefs = await prisma.brief.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(briefs, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Title, problem, and pillar are required" },
        { status: 400 },
      );
    }

    const { title, problem, pillar, budget, deadline, attachments } = body as Record<
      string,
      unknown
    >;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof problem !== "string" ||
      !problem.trim() ||
      typeof pillar !== "string" ||
      !Object.values(Pillar).includes(pillar as Pillar)
    ) {
      return NextResponse.json(
        { error: "Title, problem, and pillar are required" },
        { status: 400 },
      );
    }

    const brief = await prisma.brief.create({
      data: {
        userId: user.id,
        title: title.trim(),
        problem: problem.trim(),
        pillar: pillar as Pillar,
        budget: typeof budget === "string" ? budget : null,
        deadline: typeof deadline === "string" ? deadline : null,
        attachments:
          Array.isArray(attachments) &&
          attachments.every((attachment) => typeof attachment === "string")
            ? attachments
            : [],
      },
    });

    return NextResponse.json(brief, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
