import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import {
  sendContactFormConfirmation,
  sendNewLeadAlert,
} from "@/lib/services/email.service";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Name, email, and problem are required" },
        { status: 400 },
      );
    }

    const { name, email, phone, companyName, pillar, problem } = body as Record<
      string,
      unknown
    >;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof problem !== "string" ||
      !problem.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and problem are required" },
        { status: 400 },
      );
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedProblem = problem.trim();

    await prisma.lead.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        phone: typeof phone === "string" ? phone : null,
        companyName: typeof companyName === "string" ? companyName : null,
        pillar:
          typeof pillar === "string" &&
          Object.values(Pillar).includes(pillar as Pillar)
            ? (pillar as Pillar)
            : null,
        problem: normalizedProblem,
        source: "Contact Form",
        status: "NEW",
      },
    });

    void sendNewLeadAlert(
      normalizedName,
      normalizedEmail,
      normalizedProblem,
    );
    void sendContactFormConfirmation(normalizedEmail, normalizedName);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
