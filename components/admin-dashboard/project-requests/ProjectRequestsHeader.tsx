import { Loader } from "@/components/ui/Loader";

interface ProjectRequestsHeaderProps {
  count: number;
  loading: boolean;
}

export const ProjectRequestsHeader = ({
  count,
  loading,
}: ProjectRequestsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Project Requests
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground">
          Request queue
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review incoming client requests and convert approved items into
          projects.
        </p>
      </div>

      <div className="rounded-3xl bg-secondary/5 px-4 py-3 text-sm font-semibold text-secondary">
        {loading ? <Loader size="sm" /> : `${count} pending requests`}
      </div>
    </div>
  );
};
