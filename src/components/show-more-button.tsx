"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShowMoreButton({
  expanded,
  onToggle,
  controls,
  label,
  className,
  buttonClassName,
}: {
  expanded: boolean;
  onToggle: () => void;
  controls: string;
  label?: string;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 print:hidden", className)}>
      <span className="h-px flex-1 bg-border/60" />
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={controls}
        aria-label={
          label
            ? `${expanded ? "Show fewer" : "Show more"} ${label}`
            : undefined
        }
        onClick={onToggle}
        className={cn(
          "group inline-flex items-center gap-1.5 rounded px-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          buttonClassName,
        )}
      >
        {expanded ? "Show fewer" : "Show more"}
        <ChevronDown
          aria-hidden="true"
          className={`size-3 transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <span className="h-px flex-1 bg-border/60" />
    </div>
  );
}
