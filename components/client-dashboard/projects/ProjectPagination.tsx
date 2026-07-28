"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    //===== Pagination Controls =====//
    <div className="flex items-center justify-center gap-1 py-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onPageChange(page)}
          className="min-w-[2rem]"
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
