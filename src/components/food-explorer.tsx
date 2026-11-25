"use client";

import { useContext } from "react";
import { PersonalView } from "./portfolio-category";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  calendarDays,
  isSafeFoodImage,
  isSafeFoodWebsite,
  dayStatus,
  type FoodSnapshot,
} from "../lib/food-calendar";

import { FoodMap } from "./food-map";

const PROFILE_URL = "https://beliapp.co/app/charlestang06";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function FoodLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const update = () =>
      setExpanded(document.getElementById("food")?.hidden === false);
    window.addEventListener("foodvisibility", update);
    return () => window.removeEventListener("foodvisibility", update);
  }, []);
  return (
    <a
      id="food-trigger"
      href="#food"
      className={className}
      aria-label="Beli"
      aria-controls="food"
      aria-expanded={expanded}
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        if (window.location.hash !== "#food")
          window.history.pushState(null, "", "#food");
        window.dispatchEvent(new Event("foodopen"));
      }}
    >
      {children}
    </a>
  );
}

export function FoodExplorer({
  initialSnapshot,
  today: suppliedToday,
}: {
  initialSnapshot?: FoodSnapshot;
  today?: string;
}) {
  const personal = useContext(PersonalView);
  const [open, setOpen] = useState(false);
  const [snapshot, setSnapshot] = useState<FoodSnapshot | null>(
    initialSnapshot ?? null,
  );
  const [state, setState] = useState<
    "idle" | "loading" | "ready" | "unavailable"
  >(initialSnapshot ? "ready" : "idle");
  const [today, setToday] = useState(suppliedToday ?? "");
  const [year, setYear] = useState(Number(suppliedToday?.slice(0, 4) ?? 2026));
  const [month, setMonth] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const initializedDate = useRef(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    // Resolve client time after hydration; date cells use UTC consistently.
    const reveal = () => {
      setOpen(true);
      if (section.current && !section.current.hidden) {
        section.current.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
        section.current.focus({ preventScroll: true });
      }
    };
    const hash = () => {
      if (window.location.hash === "#food") reveal();
      else setOpen(false);
    };
    window.addEventListener("foodopen", reveal);
    window.addEventListener("hashchange", hash);
    window.addEventListener("popstate", hash);
    const initialHash = window.setTimeout(hash, 0);
    return () => {
      window.clearTimeout(initialHash);
      window.removeEventListener("foodopen", reveal);
      window.removeEventListener("hashchange", hash);
      window.removeEventListener("popstate", hash);
    };
  }, [suppliedToday, initialSnapshot]);

  useEffect(() => {
    if (!open && !personal) return;
    const frame = window.requestAnimationFrame(() => {
        if (!suppliedToday && !initializedDate.current) {
          initializedDate.current = true;
          const date = new Date().toISOString().slice(0, 10);
          setToday(date);
          setYear(Number(date.slice(0, 4)));
        }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, personal, suppliedToday]);

  useEffect(() => {
    window.dispatchEvent(new Event("foodvisibility"));
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      if (window.location.hash !== "#food") return;
      section.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      section.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if ((!open && !personal) || initialSnapshot) return;
    const controller = new AbortController();
    fetch("/data/beli-public.json", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Snapshot unavailable");
        const data: unknown = await response.json();
        // Validate before accepting a snapshot into the explorer.
        const { validatePublicSnapshot } = await import("../lib/beli-public");
        const validated = validatePublicSnapshot(data);
        setSnapshot(validated);
        setState("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setState("unavailable");
      });
    return () => controller.abort();
  }, [open, personal, initialSnapshot]);

  const observedMonths = Array.from(
    new Set([
      ...(snapshot?.calendarMonths ?? []),
      ...(snapshot?.days.map((day) => day.date.slice(0, 7)) ?? []),
    ]),
  ).sort();
  const years = Array.from(
    new Set([
      Number(today.slice(0, 4)) || year,
      ...observedMonths.map((date) => Number(date.slice(0, 4))),
    ]),
  ).sort((a, b) => b - a);
  const availableMonths = observedMonths
    .filter((date) => date.startsWith(String(year)))
    .map((date) => Number(date.slice(5)));
  const mobileMonth =
    Number(month) ||
    availableMonths.at(-1) ||
    (year === Number(today.slice(0, 4)) ? Number(today.slice(5, 7)) : 1);
  const restaurants = snapshot?.restaurants ?? [];
  const selectedDay = snapshot?.days.find((day) => day.date === selected);
  const matchingPlaces = restaurants.filter(
    (restaurant) =>
      (!selected || selectedDay?.restaurants.includes(restaurant.key)) &&
      (!city || restaurant.city === city) &&
      `${restaurant.name} ${restaurant.city} ${restaurant.cuisines.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const filtered = matchingPlaces.filter(
    (place) => !category || place.categories?.includes(category),
  );
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const visiblePlaces = filtered.slice(pageStart, pageStart + pageSize);
  const categoryLabels: Record<string, string> = {
    Restaurant: "restaurants",
    Cafe: "cafes",
    Bar: "bars",
    Bakery: "bakeries",
    Dessert: "desserts",
  };
  const changePeriod = (nextYear: number, nextMonth: string) => {
    setYear(nextYear);
    setMonth(nextMonth);
    setSelected(null);
    setPage(1);
  };
  const close = () => {
    setOpen(false);
    if (window.location.hash === "#food")
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    document.getElementById("food-trigger")?.focus({ preventScroll: true });
    document
      .getElementById("food-trigger")
      ?.scrollIntoView({ behavior: "instant", block: "center" });
  };
  function grid(
    displayMonth: number | undefined,
    className: string,
    label: string,
  ) {
    const cells = calendarDays(year, displayMonth);
    return (
      <div
        className={`${className}${displayMonth ? " food-selected-month" : ""}`}
        role="group"
        aria-label={label}
      >
        <div className="food-day-labels" aria-hidden="true">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        <div
          className="food-cells"
          style={{ "--weeks": cells.length / 7 } as CSSProperties}
        >
          {cells.map((date, index) => {
            if (!date)
              return <span key={`blank-${index}`} className="food-day-blank" />;
            const status = dayStatus(date, snapshot, today);
            const count =
              snapshot?.days.find((day) => day.date === date)?.count ?? 0;
            const description = `${date}: ${status === "unknown" ? "no data" : status === "future" ? "future date" : `${count} ${count === 1 ? "activity" : "activities"}`}`;
            return (
              <button
                key={date}
                type="button"
                className="food-day"
                data-status={status}
                data-level={Math.min(count, 4)}
                style={
                  {
                    "--delay": `${Math.floor(index / 7) * 8 + (index % 7) * 12}ms`,
                  } as CSSProperties
                }
                disabled={status === "future" || status === "unknown"}
                title={description}
                aria-label={description}
                aria-pressed={selected === date}
                onClick={() => {
                  setSelected(selected === date ? null : date);
                  setPage(1);
                }}
              >
                <span aria-hidden="true" className="food-day-number">
                  {Number(date.slice(-2))}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section
      id="food"
      ref={section}
      tabIndex={-1}
      hidden={!open && !personal}
      aria-labelledby="food-title"
      className="food-explorer scroll-mt-8 print:hidden"
    >
      {(open || personal) && (
        <>
          <div className="food-heading">
            <div>
              <h2 id="food-title" className="text-xl font-bold">
                Food
              </h2>
            </div>
            {!personal && (
              <button
                className="food-close"
                onClick={close}
                aria-label="Close food section"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="food-meta">
            <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
              @charlestang06 on Beli{" "}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
          {snapshot && (
            <p className="food-stats">
              {[
                snapshot.stats.rankedPlaces === null
                  ? null
                  : `${snapshot.stats.rankedPlaces} ranked places`,
                snapshot.stats.rankedThisYear === null
                  ? null
                  : `${snapshot.stats.rankedThisYear} ranked this year`,
                snapshot.stats.weekStreak === null
                  ? null
                  : `${snapshot.stats.weekStreak} week streak`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <div className="food-period">
            <label>
              Year{" "}
              <select
                aria-label="Calendar year"
                value={year}
                onChange={(event) =>
                  changePeriod(Number(event.target.value), "")
                }
              >
                {years.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="food-desktop-period">
              View{" "}
              <select
                aria-label="Calendar month"
                value={month}
                onChange={(event) => changePeriod(year, event.target.value)}
              >
                <option value="">Full year</option>
                {availableMonths.map((value) => (
                  <option key={value} value={value}>
                    {months[value - 1]}
                  </option>
                ))}
              </select>
            </label>
            <div className="food-mobile-period">
              <button
                aria-label="Previous month"
                disabled={mobileMonth <= 1}
                onClick={() => changePeriod(year, String(mobileMonth - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <span>{months[mobileMonth - 1]}</span>
              <button
                aria-label="Next month"
                disabled={
                  mobileMonth >= 12 ||
                  `${year}-${String(mobileMonth + 1).padStart(2, "0")}` >
                    today.slice(0, 7)
                }
                onClick={() => changePeriod(year, String(mobileMonth + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="food-desktop-calendar">
            {!month && (
              <div className="food-month-labels" aria-hidden="true">
                {months.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            )}
            {grid(
              month ? Number(month) : undefined,
              "food-year-grid",
              "Year activity calendar",
            )}
          </div>
          <div className="food-mobile-calendar">
            {grid(mobileMonth, "food-month-grid", "Month activity calendar")}
          </div>
          <div className="food-legend">
            <span>
              <i data-status="unknown" /> No data
            </span>
            <span>
              <i data-status="zero" /> None recorded
            </span>
            <span>
              <i data-status="activity" /> More activity
            </span>
          </div>
          {!snapshot && (
            <div role="status" className="food-status">
              {state === "loading" || state === "idle"
                ? "Loading dining history…"
                : state === "unavailable"
                  ? "Dining data isn’t available yet. You can still view my profile on Beli."
                  : null}
            </div>
          )}
          {snapshot && (
            <>
              <div className="food-list-heading">
                <h3 className="font-semibold">
                  {selected ?? "Places"}{" "}
                  <span className="food-result-count">{filtered.length}</span>
                </h3>
                {selected && (
                  <button
                    onClick={() => {
                      setSelected(null);
                      setPage(1);
                    }}
                  >
                    Clear date selection
                  </button>
                )}
              </div>
              <div className="food-filters">
                <input
                  type="search"
                  aria-label="Search places"
                  placeholder="Search places"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />
                <select
                  aria-label="City"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All cities</option>
                  {Array.from(
                    new Set(
                      restaurants
                        .map((restaurant) => restaurant.city)
                        .filter(Boolean),
                    ),
                  )
                    .sort()
                    .map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                </select>
              </div>
              <div className="food-results-toolbar">
                <div
                  className="food-category-counts"
                  role="group"
                  aria-label="Place categories"
                >
                  <button
                    aria-pressed={!category}
                    onClick={() => {
                      setCategory("");
                      setPage(1);
                    }}
                  >
                    All {matchingPlaces.length}
                  </button>
                  {Object.entries(categoryLabels).map(([value, label]) => {
                    const count = matchingPlaces.filter((place) =>
                      place.categories?.includes(value),
                    ).length;
                    return count > 0 || category === value ? (
                      <button
                        key={value}
                        aria-pressed={category === value}
                        onClick={() => {
                          setCategory(category === value ? "" : value);
                          setPage(1);
                        }}
                      >
                        {count} {label}
                      </button>
                    ) : null;
                  })}
                </div>
                <div
                  className="food-view-toggle"
                  role="group"
                  aria-label="Place view"
                >
                  <button
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                  >
                    List
                  </button>
                  <button
                    aria-pressed={view === "map"}
                    onClick={() => setView("map")}
                  >
                    Map
                  </button>
                </div>
              </div>
              {view === "map" ? (
                <FoodMap places={filtered} />
              ) : (
                <>
                  <ul className="food-restaurants" aria-label="Places">
                    {visiblePlaces.map((restaurant) => (
                      <li key={restaurant.key}>
                        <span className="food-place-cover" aria-hidden="true">
                          {isSafeFoodImage(restaurant.imageUrl) && (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                key={restaurant.imageUrl}
                                className="food-place-image"
                                src={restaurant.imageUrl}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                width={48}
                                height={48}
                                onError={(event) => {
                                  event.currentTarget.hidden = true;
                                }}
                              />
                            </>
                          )}
                        </span>
                        <div className="food-place-copy">
                          <h4>
                            {isSafeFoodWebsite(restaurant.websiteUrl) ? (
                              <a
                                href={restaurant.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {restaurant.name}
                              </a>
                            ) : (
                              restaurant.name
                            )}
                          </h4>
                          <p>
                            {[
                              restaurant.city,
                              restaurant.categories?.join(" / "),
                              restaurant.cuisines.join(", "),
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        {restaurant.score !== null && (
                          <span
                            className="food-score"
                            aria-label={`Score ${restaurant.score}`}
                          >
                            {restaurant.score.toFixed(1)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <nav
                    className="food-pagination"
                    aria-label="Place pagination"
                  >
                    <button
                      aria-label="Previous places page"
                      disabled={currentPage <= 1}
                      onClick={() => setPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                    <span aria-live="polite">
                      {filtered.length
                        ? `${pageStart + 1}–${Math.min(pageStart + pageSize, filtered.length)} of ${filtered.length}`
                        : "0 of 0"}
                    </span>
                    <button
                      aria-label="Next places page"
                      disabled={currentPage >= pageCount}
                      onClick={() => setPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </nav>
                </>
              )}
              {view === "list" && filtered.length === 0 && (
                <p className="food-note">
                  {selected && !selectedDay?.restaurants.length
                    ? "No place details are available for this day."
                    : "No places match these filters."}
                </p>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
