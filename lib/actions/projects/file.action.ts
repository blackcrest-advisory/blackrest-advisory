"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { supabaseAdmin } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import type {
  FilesStats,
  ProjectFile,
} from "@/types/dashboard/client/filesType";

type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface ClientFilesResponse {
  files: ProjectFile[];
  stats: FilesStats;
}

//===== get files available to the current client =====//
export async function getClientFiles(): Promise<ClientFilesResponse> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
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

  const mappedFiles: ProjectFile[] = files.map((file) => ({
    id: file.id,
    name: file.name,
    extension: file.extension,
    category: file.category as ProjectFile["category"],
    sizeInBytes: file.sizeInBytes,
    projectId: file.projectId,
    projectName: file.project.title,
    uploadedBy: file.uploadedBy,
    uploadedByRole: file.uploadedByRole as ProjectFile["uploadedByRole"],
    uploadedAt: file.createdAt.toISOString(),
    downloadUrl: file.downloadUrl,
    previewUrl: file.previewUrl ?? undefined,
  }));

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return {
    files: mappedFiles,
    stats: {
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
    },
  };
}

//===== generate signed upload URL =====//
export async function getUploadUrl(
  projectId: string,
  fileName: string,
  fileType: string,
): Promise<ActionResult<{ uploadUrl: string; filePath: string }>> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Check user has access to project (admin or project owner)
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });
    if (!project) {
      return { success: false, error: "Project not found" };
    }
    const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
    if (!isAdmin && project.userId !== user.id) {
      return { success: false, error: "Access denied" };
    }

    // Generate unique file path
    const extension = fileName.split(".").pop() || "";
    const cleanName = fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueId = randomUUID();
    const filePath = `projects/${projectId}/${uniqueId}-${cleanName}.${extension}`;

    // Get signed URL for upload (valid for 60 seconds)
    const { data, error } = await supabaseAdmin.storage
      .from("projects")
      .createSignedUploadUrl(filePath);

    if (error) {
      console.error("Supabase signed URL error:", error);
      return { success: false, error: "Failed to generate upload URL" };
    }

    return {
      success: true,
      data: {
        uploadUrl: data.signedUrl,
        filePath,
      },
    };
  } catch (error: any) {
    console.error("getUploadUrl error:", error);
    return { success: false, error: error.message || "Upload failed" };
  }
}

//===== save file metadata after upload =====//
export async function saveFileMetadata({
  projectId,
  filePath,
  name,
  extension,
  category,
  sizeInBytes,
  downloadUrl,
  previewUrl,
}: {
  projectId: string;
  filePath: string;
  name: string;
  extension: string;
  category: string;
  sizeInBytes: number;
  downloadUrl: string;
  previewUrl?: string;
}): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    // Re-validate access
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });
    if (!project) {
      return { success: false, error: "Project not found" };
    }
    const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
    if (!isAdmin && project.userId !== user.id) {
      return { success: false, error: "Access denied" };
    }

    const file = await prisma.file.create({
      data: {
        projectId,
        userId: project.userId,
        name,
        extension,
        category,
        sizeInBytes,
        uploadedBy: user.id,
        uploadedByRole: isAdmin ? "admin" : "client",
        path: filePath,
        downloadUrl,
        previewUrl: previewUrl || null,
      },
    });

    revalidatePath(`/admin/dashboard/projects/${projectId}`);
    revalidatePath(`/client/dashboard/projects/${projectId}`);

    return { success: true, data: file };
  } catch (error: any) {
    console.error("saveFileMetadata error:", error);
    return {
      success: false,
      error: error.message || "Failed to save file metadata",
    };
  }
}

//===== delete file =====//
export async function deleteFile(fileId: string): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: { project: { select: { userId: true } } },
    });
    if (!file) {
      return { success: false, error: "File not found" };
    }
    const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
    if (!isAdmin && file.project.userId !== user.id) {
      return { success: false, error: "Access denied" };
    }

    // Delete from Supabase
    const { error } = await supabaseAdmin.storage
      .from("projects")
      .remove([file.path]);

    if (error) {
      console.error("Supabase delete error:", error);
      return { success: false, error: "Failed to delete file from storage" };
    }

    // Delete from DB
    await prisma.file.delete({
      where: { id: fileId },
    });

    revalidatePath(`/admin/dashboard/projects/${file.projectId}`);
    return { success: true, data: { message: "File deleted" } };
  } catch (error: any) {
    console.error("deleteFile error:", error);
    return { success: false, error: error.message || "Failed to delete file" };
  }
}
