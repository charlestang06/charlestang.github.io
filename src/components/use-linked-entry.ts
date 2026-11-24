"use client";

import { useCallback, useRef, useState } from "react";
import { useHashNavigation } from "./use-hash-navigation";

// Finish the experience disclosure's 280ms transition before centering it.
const REVEAL_DELAY = 320;

export function useLinkedEntry() {
  const container = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const reveal = useCallback((hash: string) => {
    const target = document.getElementById(hash.slice(1));
    if (!target || !container.current?.contains(target)) return;
    if (target.closest(".more-projects, [data-collapsible]")) setExpanded(true);
    const timer = setTimeout(() => {
      target.scrollIntoView({ block: "center", behavior: "instant" });
      target.focus({ preventScroll: true });
    }, REVEAL_DELAY);
    return () => clearTimeout(timer);
  }, []);
  useHashNavigation(reveal);
  return { container, expanded, setExpanded };
}
