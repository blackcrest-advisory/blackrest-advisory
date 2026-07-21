//===== File category used for filtering, icons, and grouping =====//
export type FileCategory = "document" | "image" | "video" | "archive" | "other";

//===== Who uploaded the file =====//
export type FileUploaderRole = "client" | "admin";

//===== Represents a single file attached to a project =====//
export interface ProjectFile {
  id: string;
  name: string;
  extension: string;
  category: FileCategory;
  sizeInBytes: number;
  projectId: string;
  projectName: string;
  uploadedBy: string;
  uploadedByRole: FileUploaderRole;
  uploadedAt: string; // ISO date string
  previewUrl?: string;
  downloadUrl: string;
}

//===== Aggregated numbers shown in the top stat cards =====//
export interface FilesStats {
  totalFiles: number;
  storageUsedInBytes: number;
  storageLimitInBytes: number;
  activeProjectsCount: number;
  recentUploadsCount: number; // uploaded within the last 7 days
}

//===== Value used by the File Type filter dropdown =====//
export type FileTypeFilter = "all" | FileCategory;

//===== Value used by the Sort dropdown =====//
export type FilesSortOption = "newest" | "oldest" | "name" | "size";

//===== Shape returned by the filter + sort hook, consumed by the page =====//
export interface FilesQueryState {
  search: string;
  typeFilter: FileTypeFilter;
  sortBy: FilesSortOption;
}
