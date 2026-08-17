"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, FileText, FolderOpen, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Pagination } from "@/components/shared/Pagination";
import type { AdminFile } from "@/types/dashboard/admin/assetTypes";

const PAGE_SIZE = 10;
const fileTypes = [{ value: "all", label: "All file types" }, { value: "image", label: "Images" }, { value: "document", label: "Documents" }, { value: "other", label: "Other" }];

function formatSize(bytes: number) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function getFileType(file: AdminFile) {
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(file.extension.toLowerCase())) return "image";
  if (["pdf", "doc", "docx", "xls", "xlsx", "txt", "csv"].includes(file.extension.toLowerCase())) return "document";
  return "other";
}

export function AdminFilesClient({ initialFiles }: { initialFiles: AdminFile[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const files = useMemo(() => initialFiles.filter((file) => (type === "all" || getFileType(file) === type) && `${file.name} ${file.project.title} ${file.project.clientName}`.toLowerCase().includes(search.toLowerCase())), [initialFiles, search, type]);
  const visibleFiles = files.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const storageUsed = initialFiles.reduce((total, file) => total + file.sizeInBytes, 0);

  const updateSearch = (value: string) => { setSearch(value); setPage(1); };
  const updateType = (value: string) => { setType(value); setPage(1); };

  return <PageWrapper><Section className="py-2 md:py-2 lg:py-2"><Container><div className="space-y-6">
    <div><h1 className="text-2xl font-semibold text-foreground">Files</h1><p className="mt-1 text-sm text-muted-foreground">Browse documents and assets shared across all client projects.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><Metric label="Total files" value={initialFiles.length} /><Metric label="Storage used" value={formatSize(storageUsed)} /><Metric label="Client uploads" value={initialFiles.filter((file) => file.uploadedByRole === "client").length} /></div>
    <Card className="flex flex-col gap-3 p-4 sm:flex-row"><Input icon={Search} value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search files, projects, or clients..." className="sm:max-w-md" /><Select options={fileTypes} value={type} onChange={updateType} className="sm:w-44" /></Card>
    <Card padding="none" className="overflow-hidden"><Table><TableHeader><TableRow><TableHead>File</TableHead><TableHead>Project</TableHead><TableHead>Uploaded by</TableHead><TableHead>Size</TableHead><TableHead>Uploaded</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{visibleFiles.map((file) => <TableRow key={file.id}><TableCell><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-secondary" /><div><p className="font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{file.extension.toUpperCase()} · {file.category}</p></div></div></TableCell><TableCell><Link href={`/admin/dashboard/projects/${file.project.id}`} className="font-medium text-secondary hover:underline">{file.project.title}<span className="block text-xs font-normal text-muted-foreground">{file.project.clientName}</span></Link></TableCell><TableCell className="capitalize">{file.uploadedByRole}</TableCell><TableCell>{formatSize(file.sizeInBytes)}</TableCell><TableCell>{new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(file.createdAt))}</TableCell><TableCell className="text-right"><a href={file.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={`Download ${file.name}`}><Download className="h-4 w-4" /></a></TableCell></TableRow>)}</TableBody></Table>{!visibleFiles.length && <div className="py-14 text-center text-sm text-muted-foreground"><FolderOpen className="mx-auto mb-3 h-8 w-8" />No files match your filters.</div>}</Card>
    <Pagination currentPage={page} totalItems={files.length} pageSize={PAGE_SIZE} itemLabel="files" onPageChange={setPage} />
  </div></Container></Section></PageWrapper>;
}

function Metric({ label, value }: { label: string; value: string | number }) { return <Card padding="base"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold text-foreground">{value}</p></Card>; }
