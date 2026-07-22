"use client";

import { useMemo, useState } from "react";
import {
  FilesSortOption,
  FileTypeFilter,
  ProjectFile,
} from "@/types/dashboard/client/filesType";

//===== Owns search/filter/sort state and derives the visible file list =====//
//===== Pure derivation via useMemo — no effects, no cascading setState =====//
export const useFilesFilter = (files: ProjectFile[]) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FileTypeFilter>("all");
  const [sortBy, setSortBy] = useState<FilesSortOption>("newest");

  const filteredFiles = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch = (file: ProjectFile) =>
      searchTerm.length === 0 ||
      file.name.toLowerCase().includes(searchTerm) ||
      file.projectName.toLowerCase().includes(searchTerm);

    const matchesType = (file: ProjectFile) =>
      typeFilter === "all" || file.category === typeFilter;

    const result = files.filter(
      (file) => matchesSearch(file) && matchesType(file),
    );

    switch (sortBy) {
      case "newest":
        return result.sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
        );
      case "oldest":
        return result.sort(
          (a, b) =>
            new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
        );
      case "name":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "size":
        return result.sort((a, b) => b.sizeInBytes - a.sizeInBytes);
      default:
        return result;
    }
  }, [files, search, typeFilter, sortBy]);

  return {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    filteredFiles,
  };
};
