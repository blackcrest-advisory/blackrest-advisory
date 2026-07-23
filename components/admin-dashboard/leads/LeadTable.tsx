"use client";

import { Lead, serviceLabels } from "@/types/dashboard/admin/leadTypes";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Avatar } from "@/components/ui/Avatar";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { LeadRowActions } from "./LeadRowActions";
import { format } from "date-fns";

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
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card-bg p-8 text-center text-body">
        No leads found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card-bg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Services</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.companyName}</TableCell>
              <TableCell>{lead.contactPerson}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {lead.services.map((service) => (
                    <span
                      key={service}
                      className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-body"
                    >
                      {serviceLabels[service]}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={lead.priority} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar name={lead.assignedTo} size="sm" />
                  <span className="text-sm">{lead.assignedTo}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-body">
                {format(lead.createdAt, "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
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
  );
};
