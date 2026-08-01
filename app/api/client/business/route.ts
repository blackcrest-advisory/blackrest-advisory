import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

export async function GET() {
  try {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const business = await prisma.business.findUnique({
      where: {
        userId: sessionUser.id,
      },
    });

    return NextResponse.json(
      { success: true, data: business },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 },
      );
    }

    const {
      businessName,
      industry,
      businessType,
      websiteUrl,
      phone,
      address,
      logoUrl,
      description,
    } = body as Record<string, unknown>;

    if (typeof businessName !== "string" || !businessName) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 },
      );
    }

    const fields = {
      businessName,
      industry:
        typeof industry === "string" || industry === null
          ? industry
          : undefined,
      businessType:
        typeof businessType === "string" || businessType === null
          ? businessType
          : undefined,
      websiteUrl:
        typeof websiteUrl === "string" || websiteUrl === null
          ? websiteUrl
          : undefined,
      phone: typeof phone === "string" || phone === null ? phone : undefined,
      address:
        typeof address === "string" || address === null ? address : undefined,
      logoUrl:
        typeof logoUrl === "string" || logoUrl === null ? logoUrl : undefined,
      description:
        typeof description === "string" || description === null
          ? description
          : undefined,
    };

    const business = await prisma.business.upsert({
      where: {
        userId: sessionUser.id,
      },
      create: {
        userId: sessionUser.id,
        ...fields,
      },
      update: fields,
    });

    return NextResponse.json(
      { success: true, data: business },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
