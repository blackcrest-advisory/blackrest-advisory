import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
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
        {
          error:
            "Project ID, user ID, name, path, and download URL are required",
        },
        { status: 400 },
      );
    }

    const {
      projectId,
      userId,
      name,
      extension,
      category,
      sizeInBytes,
      path,
      downloadUrl,
      previewUrl,
    } = body as Record<string, unknown>;

    if (
      typeof projectId !== "string" ||
      !projectId ||
      typeof userId !== "string" ||
      !userId ||
      typeof name !== "string" ||
      !name ||
      typeof path !== "string" ||
      !path ||
      typeof downloadUrl !== "string" ||
      !downloadUrl
    ) {
      return NextResponse.json(
        {
          error:
            "Project ID, user ID, name, path, and download URL are required",
        },
        { status: 400 },
      );
    }

    const adminUser = await prisma.user.findUnique({
      where: {
        id: admin.id,
      },
      select: {
        name: true,
      },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const file = await prisma.file.create({
      data: {
        projectId,
        userId,
        name,
        extension: typeof extension === "string" ? extension : "",
        category: typeof category === "string" ? category : undefined,
        sizeInBytes: typeof sizeInBytes === "number" ? sizeInBytes : undefined,
        path,
        downloadUrl,
        previewUrl:
          typeof previewUrl === "string" || previewUrl === null
            ? previewUrl
            : undefined,
        uploadedBy: adminUser.name,
        uploadedByRole: "admin",
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
