"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight, Award } from "lucide-react";
import { Badge } from "./ui/badge";
import { entryId } from "@/lib/skill-links";
import { useHashNavigation } from "./use-hash-navigation";
import type { Certificate } from "@/lib/portfolio-types";

export function CertificateStack({
  certificates,
}: {
  certificates: readonly Certificate[];
}) {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const wheel = useRef({ amount: 0, changed: 0, last: 0 });
  const count = certificates.length;

  const revealCertificate = useCallback(
    (hash: string) => {
      const index = certificates.findIndex(
        (certificate) =>
          hash === `#${entryId("certificate", certificate.title)}`,
      );
      if (index === -1) return;
      setActive(index);
      stage.current?.scrollIntoView({ block: "center", behavior: "instant" });
      stage.current?.focus({ preventScroll: true });
    },
    [certificates],
  );
  useHashNavigation(revealCertificate);

  useEffect(() => {
    const element = stage.current;
    if (!element || count < 2) return;
    function onWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY))
        return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheel.current.changed < 480) return;
      if (now - wheel.current.last > 180) wheel.current.amount = 0;
      wheel.current.last = now;
      wheel.current.amount +=
        event.deltaX *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element!.clientWidth
            : 1);
      if (Math.abs(wheel.current.amount) < 36) return;
      const direction = wheel.current.amount > 0 ? 1 : -1;
      setActive((index) => (index + direction + count) % count);
      wheel.current = { amount: 0, changed: now, last: now };
    }
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [count]);

  if (!count) return null;
  function move(direction: number) {
    setActive((index) => (index + direction + count) % count);
  }

  return (
    <>
      <div className="certificate-preview print:hidden">
        <div
          ref={stage}
          className="certificate-stage"
          role="group"
          aria-label="Certificate letter stack"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              [
                "ArrowRight",
                "ArrowDown",
                "ArrowLeft",
                "ArrowUp",
                "Home",
                "End",
              ].includes(event.key)
            )
              event.preventDefault();
            if (event.key === "ArrowRight" || event.key === "ArrowDown")
              move(1);
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(-1);
            if (event.key === "Home") setActive(0);
            if (event.key === "End") setActive(count - 1);
          }}
          onTouchStart={(event) => {
            touch.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={(event) => {
            if (!touch.current) return;
            const dx = event.changedTouches[0].clientX - touch.current.x;
            const dy = event.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
              move(dx < 0 ? 1 : -1);
          }}
          onTouchCancel={() => {
            touch.current = null;
          }}
        >
          {certificates.map((certificate, index) => {
            const depth = (index - active + count) % count;
            const front = depth === 0;
            return (
              <article
                key={certificate.title}
                id={entryId("certificate", certificate.title)}
                className="credential-sheet"
                data-front={front}
                style={
                  { "--depth": depth, zIndex: count - depth } as CSSProperties
                }
                aria-label={certificate.title}
              >
                {front ? (
                  <div className="credential-body">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1">
                        {certificate.awardee.map((issuer) => (
                          <Badge
                            key={issuer}
                            variant="secondary"
                            className="px-1 py-0 text-[10px]"
                          >
                            {issuer}
                          </Badge>
                        ))}
                      </div>
                      <Award
                        className="size-4 shrink-0 text-muted-foreground/60"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold leading-snug">
                      {certificate.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
                      {certificate.description}
                    </p>
                    <a
                      href={certificate.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-1 font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      View credential
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="credential-pick"
                    aria-label={`View ${certificate.title}`}
                    onClick={() => {
                      setActive(index);
                      stage.current?.focus({ preventScroll: true });
                    }}
                  >
                    <span>{certificate.title}</span>
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {certificates[active].title}
        </p>
      </div>
      <div className="hidden space-y-4 print:block">
        {certificates.map((certificate) => (
          <article key={certificate.title}>
            <h3 className="text-base font-semibold">{certificate.title}</h3>
            <p className="font-mono text-xs">{certificate.description}</p>
            <p className="font-mono text-xs">
              {certificate.awardee.join(", ")}
            </p>
            <a
              className="text-xs underline"
              href={certificate.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.link.href}
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
