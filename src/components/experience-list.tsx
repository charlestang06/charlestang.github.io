"use client";

import { Children, useId, type ReactNode } from "react";
import { ShowMoreButton } from "./show-more-button";
import { useLinkedEntry } from "./use-linked-entry";

export function ExperienceList({
  children,
  entryIds,
}: {
  children: ReactNode;
  entryIds: readonly string[];
}) {
  const original = Children.toArray(children);
  const entries = original.map((child, index) => (
    <div
      key={entryIds[index]}
      id={entryIds[index]}
      tabIndex={-1}
      className="scroll-mt-8 rounded-lg focus:outline-none"
    >
      {child}
    </div>
  ));
  const { container, expanded, setExpanded } = useLinkedEntry();
  const panelId = useId();
  const remaining = entries.slice(3);

  return (
    <div ref={container} className="experience-list">
      <div className="flex flex-col gap-3">{entries.slice(0, 3)}</div>
      {remaining.length > 0 && (
        <>
          <div
            id={panelId}
            className="more-projects"
            data-expanded={expanded}
            inert={!expanded}
          >
            <div className="more-projects-content">
              <div className="flex flex-col gap-3 pt-3">{remaining}</div>
            </div>
          </div>
          <ShowMoreButton
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            controls={panelId}
            className="my-4"
            buttonClassName="min-h-9"
            label="experience entries"
          />
          <div className="hidden flex-col gap-3 pt-3 print:flex">
            {original.slice(3)}
          </div>
        </>
      )}
    </div>
  );
}
