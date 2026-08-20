"use client";

//===== imports =====//
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  Download,
  File,
  FileImage,
  FileText,
  FolderArchive,
  FolderOpen,
  HardDrive,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Pagination } from "@/components/shared/Pagination";

import type { AdminFile } from "@/types/dashboard/admin/assetTypes";

//===== constants =====//
const PAGE_SIZE = 10;

const fileTypes = [
  {
    value: "all",
    label: "All file types",
  },
  {
    value: "image",
    label: "Images",
  },
  {
    value: "document",
    label: "Documents",
  },
  {
    value: "other",
    label: "Other",
  },
];

//===== helpers =====//
function formatSize(bytes: number) {
  if (!bytes) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function getFileType(file: AdminFile) {
  if (
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
      file.extension.toLowerCase(),
    )
  ) {
    return "image";
  }

  if (
    ["pdf", "doc", "docx", "xls", "xlsx", "txt", "csv"].includes(
      file.extension.toLowerCase(),
    )
  ) {
    return "document";
  }

  return "other";
}

function getFileIcon(file: AdminFile) {
  const type = getFileType(file);

  if (type === "image") {
    return FileImage;
  }

  if (type === "document") {
    return FileText;
  }

  if (
    ["zip", "rar", "7z", "tar", "gz"].includes(file.extension.toLowerCase())
  ) {
    return Archive;
  }

  return File;
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function AdminFilesClient({
  initialFiles,
}: {
  initialFiles: AdminFile[];
}) {
  //===== state =====//
  const [search, setSearch] = useState("");

  const [type, setType] = useState("all");

  const [page, setPage] = useState(1);

  //===== filtered files =====//
  const files = useMemo(
    () =>
      initialFiles.filter(
        (file) =>
          (type === "all" || getFileType(file) === type) &&
          `${file.name} ${file.project.title} ${file.project.clientName}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [initialFiles, search, type],
  );

  //===== pagination =====//
  const totalPages = Math.max(1, Math.ceil(files.length / PAGE_SIZE));

  const activePage = Math.min(page, totalPages);

  const visibleFiles = files.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  //===== stats =====//
  const storageUsed = initialFiles.reduce(
    (total, file) => total + file.sizeInBytes,
    0,
  );

  const clientUploads = initialFiles.filter(
    (file) => file.uploadedByRole === "client",
  ).length;

  //===== handlers =====//
  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateType = (value: string) => {
    setType(value);
    setPage(1);
  };

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/* ====================================================== */}
      {/* ASSET REGISTRY HEADER                                 */}
      {/* ====================================================== */}

      <header
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/25 to-transparent"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-secondary/[0.055] blur-[100px]"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:px-8 lg:py-7 xl:grid-cols-[minmax(0,1fr)_280px]"
        >
          {/* ================================================== */}
          {/* TITLE                                              */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <FolderArchive className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Asset registry
              </span>

              <span className="h-px w-8 bg-secondary/30" />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                Admin archive
              </span>
            </div>

            <h1
              className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[38px]"
            >
              Files
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground"
            >
              Browse documents and assets shared across all client projects from
              one central workspace.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Registry available
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-heading">
                  {initialFiles.length}
                </span>{" "}
                total file
                {initialFiles.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* ================================================== */}
          {/* STORAGE INDEX                                      */}
          {/* ================================================== */}

          <div
            className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40"
            >
              Storage index
            </span>

            <div
              className="mt-4 flex items-end gap-3"
            >
              <HardDrive className="mb-1 h-5 w-5 text-secondary" />

              <span
                className="text-3xl font-semibold tracking-[-0.05em] text-heading"
              >
                {formatSize(storageUsed)}
              </span>
            </div>

            <p
              className="mt-2 text-xs text-muted-foreground"
            >
              Total project asset storage currently indexed.
            </p>

            <div
              className="mt-5 border-t border-border pt-4"
            >
              <div
                className="flex items-center justify-between gap-4"
              >
                <span
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Client uploads
                </span>

                <span
                  className="text-sm font-semibold text-heading"
                >
                  {clientUploads}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================== */}
      {/* METRICS                                               */}
      {/* ====================================================== */}

      <section
        className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="grid sm:grid-cols-3"
        >
          <Metric
            icon={FolderArchive}
            eyebrow="Registry"
            label="Total files"
            value={initialFiles.length}
          />

          <Metric
            icon={HardDrive}
            eyebrow="Storage"
            label="Storage used"
            value={formatSize(storageUsed)}
          />

          <Metric
            icon={UserRound}
            eyebrow="Contribution"
            label="Client uploads"
            value={clientUploads}
          />
        </div>
      </section>

      {/* ====================================================== */}
      {/* FILE DIRECTORY                                        */}
      {/* ====================================================== */}

      <section className="relative">
        {/* ==================================================== */}
        {/* CONTROLS                                            */}
        {/* ==================================================== */}

        <div
          className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
              >
                File directory
              </span>

              <p
                className="mt-1 text-xs text-muted-foreground"
              >
                Search the central project asset registry.
              </p>
            </div>

            <span
              className="text-xs text-muted-foreground"
            >
              <span
                className="font-semibold text-heading"
              >
                {files.length}
              </span>{" "}
              matching file
              {files.length === 1 ? "" : "s"}
            </span>
          </div>

          <div
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <Input
                icon={Search}
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search files, projects, or clients..."
                className="w-full"
              />
            </div>

            <Select
              options={fileTypes}
              value={type}
              onChange={updateType}
              className="w-full sm:w-48"
            />
          </div>

          <div
            className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-2.5 sm:px-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
              />

              <span
                className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                Asset records available
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TABLE / RECORDS                                     */}
        {/* ==================================================== */}

        <div className="relative z-10 mt-3">
          <div
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            {/* top line */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/10 to-transparent"
            />

            {/* ================================================= */}
            {/* DESKTOP TABLE                                    */}
            {/* ================================================= */}

            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow
                    className="bg-muted/15 hover:bg-muted/15"
                  >
                    <TableHead className="pl-5">File</TableHead>

                    <TableHead>Project</TableHead>

                    <TableHead>Uploaded by</TableHead>

                    <TableHead>Size</TableHead>

                    <TableHead>Uploaded</TableHead>

                    <TableHead className="pr-5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {visibleFiles.map((file) => {
                    const Icon = getFileIcon(file);

                    return (
                      <TableRow
                        key={file.id}
                        className="transition-colors hover:bg-secondary/[0.02]"
                      >
                        {/* file */}
                        <TableCell className="py-4 pl-5">
                          <div
                            className="flex min-w-0 items-center gap-3"
                          >
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0 max-w-[240px]">
                              <p
                                className="truncate text-sm font-semibold text-heading"
                                title={file.name}
                              >
                                {file.name}
                              </p>

                              <p
                                className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground/40"
                              >
                                {file.extension.toUpperCase()} · {file.category}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* project */}
                        <TableCell>
                          <Link
                            href={`/admin/dashboard/projects/${file.project.id}`}
                            className="group block max-w-[220px]"
                          >
                            <p
                              className="truncate text-sm font-medium text-heading transition-colors group-hover:text-secondary"
                            >
                              {file.project.title}
                            </p>

                            <p
                              className="mt-1 truncate text-[10px] text-muted-foreground"
                            >
                              {file.project.clientName}
                            </p>
                          </Link>
                        </TableCell>

                        {/* uploaded by */}
                        <TableCell>
                          <span
                            className="inline-flex rounded-md border border-border bg-muted/20 px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                          >
                            {file.uploadedByRole}
                          </span>
                        </TableCell>

                        {/* size */}
                        <TableCell>
                          <span
                            className="whitespace-nowrap text-sm font-medium text-heading"
                          >
                            {formatSize(file.sizeInBytes)}
                          </span>
                        </TableCell>

                        {/* uploaded */}
                        <TableCell>
                          <span
                            className="whitespace-nowrap text-xs text-muted-foreground"
                          >
                            {formatDate(file.createdAt)}
                          </span>
                        </TableCell>

                        {/* actions */}
                        <TableCell className="pr-5 text-right">
                          <a
                            href={file.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Download ${file.name}`}
                            title="Download file"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-secondary/20 hover:bg-secondary/[0.05] hover:text-secondary"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* ================================================= */}
            {/* MOBILE + TABLET                                  */}
            {/* ================================================= */}

            <div className="divide-y divide-border lg:hidden">
              {visibleFiles.map((file) => {
                const Icon = getFileIcon(file);

                return (
                  <article
                    key={file.id}
                    className="px-5 py-5 transition-colors hover:bg-secondary/[0.02] sm:px-6"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className="flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <h3
                              className="truncate text-sm font-semibold text-heading"
                            >
                              {file.name}
                            </h3>

                            <p
                              className="mt-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-foreground/40"
                            >
                              {file.extension.toUpperCase()} · {file.category}
                            </p>
                          </div>

                          <a
                            href={file.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Download ${file.name}`}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-secondary/20 hover:text-secondary"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </div>

                        <div
                          className="mt-4 grid gap-3 sm:grid-cols-2"
                        >
                          <RecordItem
                            label="Project"
                            value={file.project.title}
                          />

                          <RecordItem
                            label="Client"
                            value={file.project.clientName}
                          />

                          <RecordItem
                            label="Uploaded by"
                            value={file.uploadedByRole}
                            capitalize
                          />

                          <RecordItem
                            label="File size"
                            value={formatSize(file.sizeInBytes)}
                          />
                        </div>

                        <div
                          className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
                        >
                          <span
                            className="text-[10px] text-muted-foreground"
                          >
                            Uploaded {formatDate(file.createdAt)}
                          </span>

                          <Link
                            href={`/admin/dashboard/projects/${file.project.id}`}
                            className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-secondary"
                          >
                            Open project
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* EMPTY                                             */}
            {/* ================================================= */}

            {!visibleFiles.length && (
              <div
                className="flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/20 text-muted-foreground"
                >
                  <FolderOpen className="h-4 w-4" />
                </div>

                <span
                  className="mt-4 font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
                >
                  Asset registry
                </span>

                <p
                  className="mt-1.5 text-sm font-semibold text-heading"
                >
                  No matching files
                </p>

                <p
                  className="mt-1 text-xs text-muted-foreground"
                >
                  No files match your current filters.
                </p>
              </div>
            )}

            {/* footer */}
            {visibleFiles.length > 0 && (
              <div
                className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />

                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                  >
                    Asset records indexed
                  </span>
                </div>

                <span className="text-xs text-muted-foreground">
                  <span className="font-semibold text-heading">
                    {visibleFiles.length}
                  </span>{" "}
                  shown
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================== */}
        {/* PAGINATION                                          */}
        {/* ==================================================== */}

        {totalPages > 1 && (
          <div
            className="mt-3 border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:px-6"
          >
            <Pagination
              currentPage={activePage}
              totalItems={files.length}
              pageSize={PAGE_SIZE}
              itemLabel="files"
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}

//==============================================================//
// METRIC
//==============================================================//

function Metric({
  icon: Icon,
  eyebrow,
  label,
  value,
}: {
  icon: typeof FolderArchive;
  eyebrow: string;
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:border-b-0 sm:border-r sm:last:border-r-0"
    >
      <div>
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
        >
          {eyebrow}
        </span>

        <p
          className="mt-1 text-xs text-muted-foreground"
        >
          {label}
        </p>

        <p
          className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading"
        >
          {value}
        </p>
      </div>

      <div
        className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary"
      >
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

//==============================================================//
// MOBILE RECORD ITEM
//==============================================================//

function RecordItem({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div
      className="border border-border bg-background/30 p-3"
    >
      <span
        className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
      >
        {label}
      </span>

      <p
        className={`
          mt-1.5
          truncate
          text-xs
          font-medium
          text-heading

          ${capitalize ? "capitalize" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
}
