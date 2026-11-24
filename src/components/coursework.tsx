"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export function Coursework({
  selected,
  all,
}: {
  selected: readonly string[];
  all: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className="mt-3 font-mono text-xs text-muted-foreground">
      <p className="mb-1 text-[11px]">
        {expanded ? "Coursework" : "Selected coursework"}
      </p>
      <p id={id} className="text-pretty leading-relaxed print:hidden">
        {(expanded ? all.split(", ") : selected).join("\u00a0· ")}
      </p>
      <p className="hidden leading-relaxed print:block">
        {all.split(", ").join("\u00a0· ")}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded(!expanded)}
        className="mt-1 inline-flex min-h-7 items-center gap-1 rounded-sm text-[11px] underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 print:hidden"
      >
        {expanded ? "Selected coursework" : "All coursework"}
        <ChevronDown
          aria-hidden="true"
          className={`size-3 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
