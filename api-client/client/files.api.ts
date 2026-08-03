import client from "@/api-client/client";
import type {
  FilesStats,
  ProjectFile,
} from "@/types/dashboard/client/filesType";

export interface ClientFilesResponse {
  files: ProjectFile[];
  stats: FilesStats;
}

export async function fetchClientFiles(): Promise<ClientFilesResponse> {
  const response = await client.get<ClientFilesResponse>("/api/client/files");
  return response.data;
}
