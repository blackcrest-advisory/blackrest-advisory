import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

const profileSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  companyName: true,
  phone: true,
  country: true,
  industry: true,
  jobTitle: true,
  avatarUrl: true,
  notificationPreferences: true,
  createdAt: true,
} as const;

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: profileSelect,
    });
    revalidatePath("/client/dashboard/settings");
    revalidatePath("/client/dashboard");

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      throw new Error("Invalid request body");
    }

    const { name, companyName, phone, country, jobTitle, avatarUrl } =
      body as Record<string, unknown>;
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: typeof name === "string" ? name : undefined,
        companyName:
          typeof companyName === "string" || companyName === null
            ? companyName
            : undefined,
        phone:
          typeof phone === "string" || phone === null ? phone : undefined,
        country:
          typeof country === "string" || country === null ? country : undefined,
        jobTitle:
          typeof jobTitle === "string" || jobTitle === null
            ? jobTitle
            : undefined,
        avatarUrl:
          typeof avatarUrl === "string" || avatarUrl === null
            ? avatarUrl
            : undefined,
      },
      select: profileSelect,
    });

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
