"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "start-ellipsis" | "end-ellipsis"> = [1];

  if (currentPage > 3) pages.push("start-ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) pages.push(page);

  if (currentPage < totalPages - 2) pages.push("end-ellipsis");

  pages.push(totalPages);
  return pages;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize = 10,
  itemLabel = "items",
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {startItem}–{endItem} of {totalItems} {itemLabel}
      </p>

      <nav
        aria-label="Lead pagination"
        className="flex items-center justify-end gap-1.5"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 !rounded-full !p-0"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageItems.map((item) =>
          typeof item === "number" ? (
            <Button
              key={item}
              variant={item === currentPage ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onPageChange(item)}
              className="h-9 w-9 !rounded-full !p-0"
              aria-label={`Go to page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </Button>
          ) : (
            <span
              key={item}
              className="flex h-9 w-5 items-center justify-center text-muted-foreground"
              aria-hidden="true"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ),
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 !rounded-full !p-0"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
