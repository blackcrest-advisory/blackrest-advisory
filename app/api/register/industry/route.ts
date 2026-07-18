import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "User ID and industry are required" },
        { status: 400 },
      );
    }

    const { userId, industry } = body as Record<string, unknown>;

    if (
      typeof userId !== "string" ||
      !userId.trim() ||
      typeof industry !== "string" ||
      !industry.trim()
    ) {
      return NextResponse.json(
        { error: "User ID and industry are required" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        industry,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
