"use client";

import { useEffect } from "react";

// Cancel pending work when another hash is followed or the component unmounts.
export function useHashNavigation(
  onNavigate: (hash: string) => void | (() => void),
) {
  useEffect(() => {
    let cancel: void | (() => void);
    function navigate() {
      cancel?.();
      cancel = onNavigate(window.location.hash);
    }
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      // New hashes trigger hashchange; repeated links need notification here.
      if (link && link.hash === window.location.hash) navigate();
    }
    const initial = setTimeout(navigate, 0);
    window.addEventListener("hashchange", navigate);
    document.addEventListener("click", onClick);
    return () => {
      clearTimeout(initial);
      cancel?.();
      window.removeEventListener("hashchange", navigate);
      document.removeEventListener("click", onClick);
    };
  }, [onNavigate]);
}
