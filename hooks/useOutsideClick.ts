"use client";

import { RefObject, useEffect } from "react";

//===== Calls the handler when a click occurs outside all given refs =====//
//===== Used by Select/dropdowns to close on outside interaction =====//
export const useOutsideClick = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  isActive: boolean,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    if (!isActive) return;

    const refList = Array.isArray(refs) ? refs : [refs];

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInside = refList.some(
        (ref) => ref.current && ref.current.contains(target),
      );
      if (!isInside) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, isActive, onOutsideClick]);
};
