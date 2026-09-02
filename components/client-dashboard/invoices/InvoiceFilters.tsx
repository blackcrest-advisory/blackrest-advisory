"use client";

import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface InvoiceFiltersProps {
  search: string;
  status: string;
  totalCount: number;
}

export function InvoiceFilters({
  search,
  status,
  totalCount,
}: InvoiceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(search);
  const [isPending, startTransition] = useTransition();
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //===== Update params =====//
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete("page");

    const queryString = params.toString();

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  //===== Quick search =====//
  const handleSearchChange = (value: string) => {
    setQuery(value);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    searchTimerRef.current = setTimeout(() => {
      updateParams({
        search: value.trim(),
      });
    }, 350);
  };

  //===== Status change =====//
  const handleStatusChange = (value: string) => {
    updateParams({
      status: value,
    });
  };

  //===== Reset filters =====//
  const handleReset = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    setQuery("");

    startTransition(() => {
      router.replace(pathname, {
        scroll: false,
      });
    });
  };

  const hasFilters = Boolean(search || status);

  return (
    <div className="relative z-30 flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
      {/*===== Search =====*/}
      <div className="relative min-w-0 lg:w-[280px] xl:w-[320px]">
        <Input
          type="search"
          value={query}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search invoice or project..."
          icon={Search}
          className="w-full"
        />

        {isPending && (
          <span className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-pulse rounded-full bg-secondary" />
        )}
      </div>

      {/*===== Status filter =====*/}
      <div className="relative z-40 w-full lg:w-[170px]">
        <Select
          value={status}
          onChange={handleStatusChange}
          options={[
            {
              label: "All statuses",
              value: "",
            },
            {
              label: "Draft",
              value: "DRAFT",
            },
            {
              label: "Sent",
              value: "SENT",
            },
            {
              label: "Paid",
              value: "PAID",
            },
            {
              label: "Overdue",
              value: "OVERDUE",
            },
            {
              label: "Cancelled",
              value: "CANCELLED",
            },
          ]}
          className="w-full"
        />
      </div>

      {/*===== Filter status =====*/}
      <div className="flex items-center justify-between gap-3 lg:justify-start">
        <span className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35">
          {totalCount} result{totalCount === 1 ? "" : "s"}
        </span>

        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/25 hover:bg-secondary/[0.04] hover:text-secondary disabled:pointer-events-none disabled:opacity-50"
            aria-label="Clear invoice filters"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
