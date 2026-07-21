"use client";

import { RefObject, useEffect } from "react";

//===== Calls the handler when a click occurs outside the given ref =====//
//===== Used by Select to close its dropdown on outside interaction =====//
export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, isActive, onOutsideClick]);
};
