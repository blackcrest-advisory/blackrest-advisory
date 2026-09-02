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

  if (currentPage > 3) {
    pages.push("start-ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) {
    pages.push("end-ellipsis");
  }

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

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/*===== RESULT INFO =====*/}

      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />

        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-heading">
            {startItem}–{endItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-heading">
            {totalItems}
          </span>{" "}
          {itemLabel}
        </p>
      </div>

      {/*===== PAGE CONTROLS =====*/}

      <nav
        aria-label={`${itemLabel} pagination`}
        className="flex items-center gap-1 self-start sm:self-auto"
      >
        {/* previous */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 !rounded-none !p-0 border border-transparent hover:border-border hover:bg-background"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* pages */}
        {pageItems.map((item) =>
          typeof item === "number" ? (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(item)}
              className={`
                relative
                h-9
                min-w-9
                !rounded-none
                !px-2
                font-mono
                text-[10px]
                font-semibold
                transition-all
                duration-200

                ${
                  item === currentPage
                    ? `
                      border border-secondary/30
                      bg-secondary/[0.08]
                      text-secondary
                    `
                    : `
                      border border-transparent
                      text-muted-foreground
                      hover:border-border
                      hover:bg-background
                      hover:text-heading
                    `
                }
              `}
              aria-label={`Go to page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}

              {item === currentPage && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 bg-secondary"
                />
              )}
            </Button>
          ) : (
            <span
              key={item}
              className="flex h-9 w-7 items-center justify-center text-muted-foreground/50"
              aria-hidden="true"
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ),
        )}

        {/* next */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 !rounded-none !p-0 border border-transparent hover:border-border hover:bg-background"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
