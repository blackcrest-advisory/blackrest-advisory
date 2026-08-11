import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

//===== skeleton helper =====//
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

export default function AdminRequestsLoading() {
  //===== render 5 skeleton rows =====//
  const rows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              All Project Requests
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage all client submissions and update their statuses.
            </p>
          </div>
        </div>

        {/* Skeleton Table */}
        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((i) => (
                <TableRow key={i}>
                  {/* Project */}
                  <TableCell>
                    <div className="max-w-[200px]">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-1 h-3 w-24" />
                    </div>
                  </TableCell>
                  {/* Service */}
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  {/* Budget */}
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  {/* Submitted */}
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  {/* Client */}
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  {/* Deadline */}
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  {/* Status */}
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  {/* Action */}
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </Section>
  );
}
