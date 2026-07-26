import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const files = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedFiles = files.map((file) => ({
      id: file.id,
      name: file.name,
      extension: file.extension,
      category: file.category,
      sizeInBytes: file.sizeInBytes,
      projectId: file.projectId,
      projectName: file.project.title,
      uploadedBy: file.uploadedBy,
      uploadedByRole: file.uploadedByRole,
      uploadedAt: file.createdAt.toISOString(),
      downloadUrl: file.downloadUrl,
      previewUrl: file.previewUrl ?? undefined,
    }));
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const stats = {
      totalFiles: files.length,
      storageUsedInBytes: files.reduce(
        (total, file) => total + file.sizeInBytes,
        0,
      ),
      storageLimitInBytes: 53687091200,
      activeProjectsCount: new Set(files.map((file) => file.projectId)).size,
      recentUploadsCount: files.filter(
        (file) => file.createdAt >= sevenDaysAgo,
      ).length,
    };

    return NextResponse.json({ files: mappedFiles, stats }, { status: 200 });
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
        { error: "Project ID, name, path, and download URL are required" },
        { status: 400 },
      );
    }

    const {
      projectId,
      name,
      extension,
      category,
      sizeInBytes,
      path,
      downloadUrl,
      previewUrl,
      uploadedByRole,
    } = body as Record<string, unknown>;

    if (
      typeof projectId !== "string" ||
      !projectId ||
      typeof name !== "string" ||
      !name ||
      typeof path !== "string" ||
      !path ||
      typeof downloadUrl !== "string" ||
      !downloadUrl
    ) {
      return NextResponse.json(
        { error: "Project ID, name, path, and download URL are required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
      select: {
        title: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const file = await prisma.file.create({
      data: {
        projectId,
        userId: user.id,
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
        uploadedBy: user.name,
        uploadedByRole:
          typeof uploadedByRole === "string" ? uploadedByRole : undefined,
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
