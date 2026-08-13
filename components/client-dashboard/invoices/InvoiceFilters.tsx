"use client";

//===== imports =====//
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, X } from "lucide-react";

interface InvoiceFiltersProps {
  search: string;
  status: string;
  totalCount: number;
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function InvoiceFilters({
  search,
  status,
  totalCount,
}: InvoiceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState(search);
  const [statusValue, setStatusValue] = useState(status);

  // Update URL when filters change
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    if (statusValue) params.set("status", statusValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchValue("");
    setStatusValue("");
    router.push(pathname);
  };

  // Auto-apply when status changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    if (statusValue) params.set("status", statusValue);
    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by invoice # or project..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="pl-9"
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="w-48">
        <select
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" onClick={applyFilters}>
          Apply
        </Button>
        {(searchValue || statusValue) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Count */}
      <span className="ml-auto text-sm text-muted-foreground">
        {totalCount} invoice{totalCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
