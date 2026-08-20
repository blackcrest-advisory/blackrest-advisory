// components/client-dashboard/invoices/InvoicePagination.tsx
"use client";

import { Pagination } from "@/components/shared/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InvoicePaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
}

export function InvoicePagination({
  currentPage,
  totalItems,
  pageSize,
}: InvoicePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //===== Handle page change =====//
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      pageSize={pageSize}
      itemLabel="invoices"
      onPageChange={handlePageChange}
    />
  );
}
