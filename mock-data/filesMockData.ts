import { FilesStats, ProjectFile } from "@/types/dashboard/client/filesType";

//===== Fixed reference date for deriving "recent" and storage stats =====//
//===== Replace with the real current date once wired to a live API =====//
const STATS_REFERENCE_DATE = new Date("2026-07-21T00:00:00.000Z");

//===== Demo storage plan ceiling shown against total usage =====//
const STORAGE_LIMIT_IN_BYTES = 50 * 1024 * 1024 * 1024; // 50 GB

//===== Dummy files spanning all four Blackcrest service lines =====//
export const mockProjectFiles: ProjectFile[] = [
  {
    id: "file-001",
    name: "Website-Redesign-Proposal.pdf",
    extension: "pdf",
    category: "document",
    sizeInBytes: 2_516_582,
    projectId: "proj-web-001",
    projectName: "Corporate Website Redesign",
    uploadedBy: "Sarah Mitchell",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-19T10:15:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-002",
    name: "Homepage-Mockup-Final.png",
    extension: "png",
    category: "image",
    sizeInBytes: 876_544,
    projectId: "proj-web-001",
    projectName: "Corporate Website Redesign",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-07-18T16:42:00.000Z",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "file-003",
    name: "Logo-Assets-Final.svg",
    extension: "svg",
    category: "image",
    sizeInBytes: 46_080,
    projectId: "proj-web-001",
    projectName: "Corporate Website Redesign",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-07-10T09:05:00.000Z",
    previewUrl: "#",
    downloadUrl: "#",
  },
  {
    id: "file-004",
    name: "Website-Wireframes.fig",
    extension: "fig",
    category: "other",
    sizeInBytes: 28_450_816,
    projectId: "proj-web-001",
    projectName: "Corporate Website Redesign",
    uploadedBy: "Daniel Cho",
    uploadedByRole: "admin",
    uploadedAt: "2026-06-30T13:20:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-005",
    name: "Mobile-App-Demo-Walkthrough.mp4",
    extension: "mp4",
    category: "video",
    sizeInBytes: 152_043_520,
    projectId: "proj-mobile-001",
    projectName: "Client Portal Mobile App",
    uploadedBy: "Daniel Cho",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-15T11:00:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-006",
    name: "App-Icon-Asset-Pack.zip",
    extension: "zip",
    category: "archive",
    sizeInBytes: 64_225_280,
    projectId: "proj-mobile-001",
    projectName: "Client Portal Mobile App",
    uploadedBy: "Daniel Cho",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-12T08:30:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-007",
    name: "User-Testing-Session-Recording.mov",
    extension: "mov",
    category: "video",
    sizeInBytes: 214_958_080,
    projectId: "proj-mobile-001",
    projectName: "Client Portal Mobile App",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-06-25T15:50:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-008",
    name: "App-Backup-Build-v3.rar",
    extension: "rar",
    category: "archive",
    sizeInBytes: 98_566_144,
    projectId: "proj-mobile-001",
    projectName: "Client Portal Mobile App",
    uploadedBy: "Daniel Cho",
    uploadedByRole: "admin",
    uploadedAt: "2026-05-28T09:10:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-009",
    name: "Brand-Guidelines-2026.pdf",
    extension: "pdf",
    category: "document",
    sizeInBytes: 3_251_840,
    projectId: "proj-marketing-001",
    projectName: "Q3 Digital Marketing Campaign",
    uploadedBy: "Priya Nair",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-20T12:05:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-010",
    name: "Q3-Performance-Report.xlsx",
    extension: "xlsx",
    category: "document",
    sizeInBytes: 356_352,
    projectId: "proj-marketing-001",
    projectName: "Q3 Digital Marketing Campaign",
    uploadedBy: "Priya Nair",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-17T14:25:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-011",
    name: "Social-Media-Content-Calendar.xlsx",
    extension: "xlsx",
    category: "document",
    sizeInBytes: 289_792,
    projectId: "proj-marketing-001",
    projectName: "Q3 Digital Marketing Campaign",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-07-05T10:40:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-012",
    name: "Sales-Enablement-Deck.pptx",
    extension: "pptx",
    category: "document",
    sizeInBytes: 12_582_912,
    projectId: "proj-sales-001",
    projectName: "Sales & Business Support Retainer",
    uploadedBy: "Marcus Webb",
    uploadedByRole: "admin",
    uploadedAt: "2026-07-14T17:15:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-013",
    name: "Service-Agreement-Signed.pdf",
    extension: "pdf",
    category: "document",
    sizeInBytes: 1_048_576,
    projectId: "proj-sales-001",
    projectName: "Sales & Business Support Retainer",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-06-18T09:00:00.000Z",
    downloadUrl: "#",
  },
  {
    id: "file-014",
    name: "Client-Feedback-Notes.docx",
    extension: "docx",
    category: "document",
    sizeInBytes: 184_320,
    projectId: "proj-sales-001",
    projectName: "Sales & Business Support Retainer",
    uploadedBy: "You",
    uploadedByRole: "client",
    uploadedAt: "2026-07-21T08:20:00.000Z",
    downloadUrl: "#",
  },
];

//===== Derive stat card numbers from the file list instead of hand-typing =====//
//===== them twice, so the two never drift out of sync in this mock phase =====//
const computeFilesStats = (
  files: ProjectFile[],
  storageLimitInBytes: number,
  referenceDate: Date,
): FilesStats => {
  const totalFiles = files.length;

  const storageUsedInBytes = files.reduce(
    (sum, file) => sum + file.sizeInBytes,
    0,
  );

  const activeProjectsCount = new Set(files.map((file) => file.projectId)).size;

  const sevenDaysAgo = new Date(referenceDate);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentUploadsCount = files.filter(
    (file) => new Date(file.uploadedAt) >= sevenDaysAgo,
  ).length;

  return {
    totalFiles,
    storageUsedInBytes,
    storageLimitInBytes,
    activeProjectsCount,
    recentUploadsCount,
  };
};

export const mockFilesStats: FilesStats = computeFilesStats(
  mockProjectFiles,
  STORAGE_LIMIT_IN_BYTES,
  STATS_REFERENCE_DATE,
);
