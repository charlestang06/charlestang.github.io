"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Award, FileText, X } from "lucide-react";
import { bindings, topicIcons } from "./paper-book-design";
import type { Paper } from "@/lib/portfolio-types";

export function MobilePaperBookshelf({
  papers,
  id,
}: {
  papers: readonly Paper[];
  id: string;
}) {
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const pileSize = Math.ceil(papers.length / 2);
  return (
    <div className="sm:hidden print:hidden">
      <div className="mobile-paper-stack" aria-label="Papers">
        {[0, 1].map((pile) => (
          <div key={pile} className="mobile-book-pile">
            {papers
              .slice(pile * pileSize, (pile + 1) * pileSize)
              .map((item, localIndex) => {
                const index = pile * pileSize + localIndex;
                const TopicIcon = topicIcons[item.title] ?? FileText;
                const active = mobileOpen === index;
                const binding = bindings[index % bindings.length];
                return (
                  <article
                    key={item.title}
                    className="mobile-paper"
                    data-open={active}
                    style={
                      {
                        "--binding": binding.background,
                        "--ink": binding.color,
                        "--book-offset": `${(index % 2) * 2}px`,
                      } as CSSProperties
                    }
                  >
                    <h3>
                      <button
                        type="button"
                        className="mobile-paper-title"
                        aria-pressed={active}
                        aria-controls={`${id}-mobile-details`}
                        onClick={() => setMobileOpen(active ? null : index)}
                      >
                        <span className="mobile-book-top" aria-hidden="true" />
                        <span
                          className="mobile-book-pages"
                          aria-hidden="true"
                        />
                        <span className="mobile-book-spine">
                          <TopicIcon
                            className="mobile-book-topic"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <span className="mobile-book-name">{item.title}</span>
                          {item.awarded && (
                            <>
                              <Award
                                className="mobile-book-award"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Awarded paper</span>
                            </>
                          )}
                        </span>
                      </button>
                    </h3>
                  </article>
                );
              })}
          </div>
        ))}
      </div>
      <div id={`${id}-mobile-details`} aria-live="polite" aria-atomic="true">
        {mobileOpen !== null && (
          <article className="mt-4 pt-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold">
                {papers[mobileOpen].title}
              </h3>
              <button
                type="button"
                aria-label="Close paper details"
                onClick={() => setMobileOpen(null)}
                className="-mr-1 -mt-1 rounded p-2 text-muted-foreground focus-visible:outline focus-visible:outline-2"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
              {papers[mobileOpen].description}
            </p>
            {papers[mobileOpen].awards.length > 0 && (
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {papers[mobileOpen].awards.join(" · ")}
              </p>
            )}
            <a
              href={papers[mobileOpen].link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-9 items-center gap-1 font-mono text-xs text-muted-foreground underline decoration-neutral-300 underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Read paper <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </article>
        )}
      </div>
    </div>
  );
}
