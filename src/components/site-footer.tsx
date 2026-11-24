"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const currentYear = () => new Date().getFullYear();
const serverYear = () => null;

export function SiteFooter() {
  // Read the visitor's year after hydration, including on static exports.
  const year = useSyncExternalStore(subscribe, currentYear, serverYear);

  return (
    <footer className="!mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pb-2 pt-2 font-mono text-[11px] text-neutral-500 print:hidden">
      <span>© {year ? `${year} ` : ""}Charles Tang</span>
      <span aria-hidden="true">·</span>
      <a
        className="hover:text-neutral-900 focus-visible:outline focus-visible:outline-offset-4"
        href="https://github.com/charlestang06"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <span aria-hidden="true">·</span>
      <a
        className="hover:text-neutral-900 focus-visible:outline focus-visible:outline-offset-4"
        href="#top"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
        }}
      >
        Back to top ↑
      </a>
    </footer>
  );
}
