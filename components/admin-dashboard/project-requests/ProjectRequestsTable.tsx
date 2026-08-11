"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";
import type { AdminProjectRequest } from "@/types/dashboard/admin/projectRequestsType";

interface ProjectRequestsTableProps {
  requests: AdminProjectRequest[];
  loading: boolean;
}

export const ProjectRequestsTable = ({
  requests,
  loading,
}: ProjectRequestsTableProps) => {
  if (loading) {
    return (
      <Card
        padding="base"
        className="rounded-xl border border-border py-16 text-center"
      >
        Loading project requests...
      </Card>
    );
  }

  if (!requests.length) {
    return (
      <Card
        padding="base"
        className="rounded-xl border-dashed border-border py-14 text-center"
      >
        <p className="font-medium text-foreground">No project requests found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Once clients submit requests, they will appear here.
        </p>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="none" hoverEffect className="overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {request.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request.companyName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {request.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request.pillar}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={request.status.toLowerCase()} />
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {request.submittedAt}
                  </p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-2"
                    href={`/admin/dashboard/project-requests/${request.id}`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">View request details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};
