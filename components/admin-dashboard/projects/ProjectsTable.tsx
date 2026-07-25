"use client";

import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import type { AdminProject } from "@/types/dashboard/admin/projectsType";
import { ProjectHealthBadge } from "./ProjectHealthBadge";

export const ProjectsTable = ({ projects, onAdvanceStatus }: { projects: AdminProject[]; onAdvanceStatus: (id: string) => void }) => {
  if (!projects.length) return <div className="rounded-xl border border-dashed border-border py-14 text-center"><p className="font-medium text-heading">No projects found</p><p className="mt-1 text-sm text-body">Try another search or filter combination.</p></div>;

  return <div className="overflow-hidden rounded-xl border border-card-border bg-card-bg"><Table><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead><TableHead>Health</TableHead><TableHead>Progress</TableHead><TableHead>Budget</TableHead><TableHead>Deadline</TableHead><TableHead className="w-12"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader><TableBody>{projects.map((project) => <TableRow key={project.id}><TableCell><div><p className="font-medium text-heading">{project.name}</p><p className="mt-0.5 text-xs text-body">{project.clientName} · {project.service}</p></div></TableCell><TableCell><div className="flex items-center gap-2"><Avatar name={project.manager} size="sm" className="h-7 w-7 text-[10px]" /><span className="whitespace-nowrap text-sm">{project.manager}</span></div></TableCell><TableCell><div className="flex flex-col items-start gap-1.5"><StatusBadge status={project.status} /><PriorityBadge priority={project.priority} className="px-2 py-0.5" /></div></TableCell><TableCell><ProjectHealthBadge health={project.health} /></TableCell><TableCell><div className="min-w-28"><div className="flex justify-between text-xs"><span className="text-body">{project.progress}%</span><span className="text-body">{project.lastActivity}</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-secondary" style={{ width: `${project.progress}%` }} /></div></div></TableCell><TableCell><p className="whitespace-nowrap font-medium text-heading">€{project.budget.toLocaleString()}</p><p className="text-xs text-body">€{project.budgetSpent.toLocaleString()} spent</p></TableCell><TableCell><span className={project.health === "overdue" ? "whitespace-nowrap font-medium text-red-600" : "whitespace-nowrap text-body"}>{project.deadline}</span></TableCell><TableCell><Button variant="ghost" size="sm" className="!p-2" onClick={() => { onAdvanceStatus(project.id); toast.success(`${project.name} moved to the next workflow stage.`); }}><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Advance project status</span></Button></TableCell></TableRow>)}</TableBody></Table></div>;
};
