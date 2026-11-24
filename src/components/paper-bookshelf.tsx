"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Award, FileText, X } from "lucide-react";
import { bindings, topicIcons } from "./paper-book-design";
import { MobilePaperBookshelf } from "./mobile-paper-bookshelf";
import { Badge } from "./ui/badge";

import type { Paper } from "@/lib/portfolio-types";

export function PaperBookshelf({ papers }: { papers: readonly Paper[] }) {
  const initialIndex = Math.max(
    0,
    papers.findIndex((paper) => paper.title === "Dandelion Populations"),
  );
  const [position, setPosition] = useState(initialIndex);
  const selected = Math.round(position);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const spines = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const first = spines.current[0];
    const initial = spines.current[initialIndex];
    if (first && initial)
      rail.current?.scrollTo({
        left: initial.offsetLeft - first.offsetLeft,
        behavior: "instant",
      });
    const scroller = rail.current;
    if (!scroller) return;
    // Consume horizontal trackpad gestures here, including at either boundary,
    // so the browser cannot interpret leftover motion as history navigation.
    function handleWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY))
        return;
      event.preventDefault();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? scroller!.clientWidth
            : 1;
      scroller!.scrollLeft += event.deltaX * unit;
    }
    scroller.addEventListener("wheel", handleWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", handleWheel);
  }, [papers.length, initialIndex]);
  const paper = papers[selected];
  if (!paper) return null;

  function center(index: number) {
    const first = spines.current[0];
    const target = spines.current[index];
    if (first && target)
      rail.current?.scrollTo({
        left: target.offsetLeft - first.offsetLeft,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }

  function close() {
    setExpanded(false);
    spines.current[selected]?.focus({ preventScroll: true });
  }

  function settle() {
    const scroller = rail.current;
    const first = spines.current[0];
    const second = spines.current[1];
    if (!scroller || !first || !second) return;
    const step = second.offsetLeft - first.offsetLeft;
    if (step > 0)
      center(
        Math.max(
          0,
          Math.min(papers.length - 1, Math.round(scroller.scrollLeft / step)),
        ),
      );
  }

  return (
    <>
      <div
        className="paper-library hidden sm:block print:hidden"
        onKeyDown={(event) => {
          if (event.key === "Escape" && expanded) close();
        }}
      >
        <div className="mb-1 flex justify-end font-mono text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Award className="size-3.5 opacity-60" aria-hidden="true" /> Awarded
          </span>
        </div>
        <div
          ref={rail}
          className="paper-shelf-scroll"
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            suppressClick.current = false;
            drag.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              scrollLeft: event.currentTarget.scrollLeft,
              moved: false,
            };
            event.currentTarget.scrollTo({
              left: event.currentTarget.scrollLeft,
              behavior: "instant",
            });
          }}
          onPointerMove={(event) => {
            const gesture = drag.current;
            if (!gesture || gesture.pointerId !== event.pointerId) return;
            if ((event.buttons & 1) === 0) {
              drag.current = null;
              delete event.currentTarget.dataset.dragging;
              if (gesture.moved) settle();
              return;
            }
            const delta = event.clientX - gesture.startX;
            if (!gesture.moved && Math.abs(delta) < 6) return;
            if (!gesture.moved) {
              gesture.moved = true;
              suppressClick.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.dataset.dragging = "true";
            }
            event.preventDefault();
            event.currentTarget.scrollLeft = gesture.scrollLeft - delta;
          }}
          onPointerUp={(event) => {
            const gesture = drag.current;
            if (!gesture || gesture.pointerId !== event.pointerId) return;
            drag.current = null;
            delete event.currentTarget.dataset.dragging;
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
            if (gesture.moved) settle();
          }}
          onPointerCancel={(event) => {
            drag.current = null;
            suppressClick.current = false;
            delete event.currentTarget.dataset.dragging;
            settle();
          }}
          onLostPointerCapture={(event) => {
            if (!drag.current) return;
            drag.current = null;
            delete event.currentTarget.dataset.dragging;
            settle();
          }}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (!suppressClick.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }}
          onScroll={(event) => {
            const scroller = event.currentTarget;
            const first = spines.current[0];
            const second = spines.current[1];
            if (!first || !second) return;
            const step = second.offsetLeft - first.offsetLeft;
            if (step <= 0) return;
            setPosition(
              Math.max(
                0,
                Math.min(papers.length - 1, scroller.scrollLeft / step),
              ),
            );
          }}
          onScrollEnd={(event) => {
            if (drag.current) return;
            const scroller = event.currentTarget;
            const first = spines.current[0];
            const second = spines.current[1];
            if (!first || !second) return;
            const step = second.offsetLeft - first.offsetLeft;
            if (step <= 0) return;
            const nearest = Math.max(
              0,
              Math.min(
                papers.length - 1,
                Math.round(scroller.scrollLeft / step),
              ),
            );
            if (Math.abs(scroller.scrollLeft - nearest * step) > 1)
              center(nearest);
          }}
          role="group"
          aria-label="Paper bookshelf"
        >
          <div className="paper-shelf">
            {papers.map((item, index) => {
              const binding = bindings[index % bindings.length];
              const TopicIcon = topicIcons[item.title] ?? FileText;
              const active = selected === index;
              const distance = Math.abs(index - position);
              return (
                <button
                  key={item.title}
                  ref={(element) => {
                    spines.current[index] = element;
                  }}
                  type="button"
                  id={`${id}-spine-${index}`}
                  className="paper-spine"
                  style={
                    {
                      "--distance": Math.min(distance, 3),
                      "--tilt": Math.max(
                        -12,
                        Math.min(12, (position - index) * 8),
                      ),
                      zIndex: papers.length - Math.abs(index - selected),
                      "--binding": binding.background,
                      "--ink": binding.color,
                    } as CSSProperties
                  }
                  data-selected={active}
                  aria-label={`${item.title}${item.awarded ? ", awarded paper" : ""}`}
                  aria-expanded={active && expanded}
                  aria-controls={`${id}-details`}
                  title={
                    item.awarded
                      ? `${item.title} — ${item.awards.join(" · ")}`
                      : item.title
                  }
                  onClick={() => {
                    center(index);
                    setExpanded(!active || !expanded);
                  }}
                  onKeyDown={(event) => {
                    let next: number;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % papers.length;
                    else if (event.key === "ArrowLeft")
                      next = (index - 1 + papers.length) % papers.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = papers.length - 1;
                    else return;
                    event.preventDefault();
                    spines.current[next]?.focus({ preventScroll: true });
                    center(next);
                  }}
                >
                  <span className="paper-book">
                    <span className="paper-cover">
                      <span className="paper-spine-mark">
                        <TopicIcon
                          className="size-5 opacity-85"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {item.awarded && (
                          <Award
                            className="size-4 opacity-55"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="paper-spine-title">{item.title}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          id={`${id}-details`}
          className="paper-disclosure"
          data-expanded={expanded}
          inert={!expanded}
        >
          <div className="paper-disclosure-clip">
            <article
              className="paper-details"
              aria-labelledby={`${id}-spine-${selected}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{paper.title}</h3>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close paper details"
                  className="-mr-1 -mt-1 rounded p-2 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">
                {paper.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex flex-wrap gap-1">
                  {paper.awards.map((award) => (
                    <Badge
                      key={award}
                      variant="secondary"
                      className="px-1 py-0 font-mono text-[10px]"
                    >
                      {award}
                    </Badge>
                  ))}
                </div>
                <a
                  href={paper.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground underline decoration-gray-400 underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Read paper (PDF)
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
      <MobilePaperBookshelf papers={papers} id={id} />
      <div className="hidden space-y-3 print:block">
        {papers.map((item) => (
          <article key={item.title}>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="text-xs">{item.awards.join(" · ")}</p>
            <a
              href={item.link.href}
              className="text-xs underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.link.href}
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
