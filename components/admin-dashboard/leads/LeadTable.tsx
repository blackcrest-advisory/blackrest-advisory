"use client";

import { format } from "date-fns";
import { Building2, CalendarDays, UserRound } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

import { Avatar } from "@/components/ui/Avatar";
import { PriorityBadge } from "@/components/ui/PriorityBadge";

import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadRowActions } from "./LeadRowActions";

import { Lead, serviceLabels } from "@/types/dashboard/admin/leadTypes";

interface LeadTableProps {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadTable = ({
  leads,
  onView,
  onEdit,
  onConvert,
  onDelete,
}: LeadTableProps) => {
  //===== Empty State =====//
  if (leads.length === 0) {
    return (
      <div
        className="flex min-h-[220px] flex-col items-center justify-center px-6 py-12 text-center"
      >
        <div
          className="flex h-11 w-11 items-center justify-center border border-border bg-muted/20 text-muted-foreground"
        >
          <Building2 className="h-4 w-4" />
        </div>

        <h3
          className="mt-4 text-sm font-semibold text-heading"
        >
          No leads found
        </h3>

        <p
          className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground"
        >
          Try adjusting your search term or pipeline filters.
        </p>
      </div>
    );
  }

  return (
    <>
      {/*===== DESKTOP TABLE =====*/}

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow
              className="border-border bg-muted/15 hover:bg-muted/15"
            >
              <TableHead className="h-11 pl-5">Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="pr-5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="group/row border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
              >
                {/* Company */}
                <TableCell className="py-4 pl-5">
                  <div className="max-w-[220px]">
                    <p
                      className="truncate text-sm font-semibold text-heading"
                    >
                      {lead.companyName}
                    </p>
                  </div>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <span
                    className="whitespace-nowrap text-sm text-foreground"
                  >
                    {lead.contactPerson}
                  </span>
                </TableCell>

                {/* Services */}
                <TableCell>
                  <div
                    className="flex max-w-[240px] flex-wrap gap-1.5"
                  >
                    {lead.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center border border-border bg-muted/20 px-2 py-1 text-[10px] font-medium text-muted-foreground"
                      >
                        {serviceLabels[service]}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>

                {/* Priority */}
                <TableCell>
                  <PriorityBadge priority={lead.priority} />
                </TableCell>

                {/* Assigned */}
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={lead.assignedTo} size="sm" />

                    <span
                      className="whitespace-nowrap text-sm text-foreground"
                    >
                      {lead.assignedTo}
                    </span>
                  </div>
                </TableCell>

                {/* Created */}
                <TableCell>
                  <span
                    className="whitespace-nowrap text-sm text-muted-foreground"
                  >
                    {format(lead.createdAt, "MMM d, yyyy")}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="pr-5 text-right">
                  <LeadRowActions
                    onView={() => onView(lead)}
                    onEdit={() => onEdit(lead)}
                    onConvert={() => onConvert(lead)}
                    onDelete={() => onDelete(lead)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/*===== MOBILE + TABLET =====*/}

      <div className="divide-y divide-border lg:hidden">
        {leads.map((lead, index) => (
          <article
            key={lead.id}
            className="relative px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02]"
          >
            {/* Heading */}
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40"
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p
                      className="truncate text-sm font-semibold text-heading"
                    >
                      {lead.companyName}
                    </p>

                    <div
                      className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <UserRound className="h-3 w-3" />
                      <span className="truncate">{lead.contactPerson}</span>
                    </div>
                  </div>

                  <LeadStatusBadge status={lead.status} />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="mt-4">
              <p
                className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
              >
                Services
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {lead.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex border border-border bg-muted/20 px-2 py-1 text-[10px] text-muted-foreground"
                  >
                    {serviceLabels[service]}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div
              className="mt-4 grid grid-cols-2 gap-3"
            >
              <div
                className="border border-border bg-background/40 p-3"
              >
                <p
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Priority
                </p>

                <div className="mt-2">
                  <PriorityBadge priority={lead.priority} />
                </div>
              </div>

              <div
                className="border border-border bg-background/40 p-3"
              >
                <p
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Assigned
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Avatar name={lead.assignedTo} size="sm" />

                  <span
                    className="min-w-0 truncate text-xs font-medium text-foreground"
                  >
                    {lead.assignedTo}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
            >
              <div
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CalendarDays className="h-3.5 w-3.5 text-secondary" />

                {format(lead.createdAt, "MMM d, yyyy")}
              </div>

              <LeadRowActions
                onView={() => onView(lead)}
                onEdit={() => onEdit(lead)}
                onConvert={() => onConvert(lead)}
                onDelete={() => onDelete(lead)}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
};
