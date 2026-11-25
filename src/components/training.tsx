"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { calendarDays } from "@/lib/food-calendar";

import { ShowMoreButton } from "./show-more-button";

type Total = { day: string; sport: string; count: number; meters?: number };
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

export function Training({ profileUrl }: { profileUrl?: string }) {
  const [showDetails, setShowDetails] = useState(false);
  const section = useRef<HTMLElement>(null);
  const [data, setData] = useState<Total[]>([]);
  const [failed, setFailed] = useState(false);
  const [year, setYear] = useState("");
  const [sport, setSport] = useState("");
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/strava-workouts.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Workout snapshot unavailable");
        return response.json() as Promise<Total[]>;
      })
      .then(setData)
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let frame = 0;
    const jump = () => {
      cancelAnimationFrame(frame);
      if (location.hash !== "#activity") return;
      frame = requestAnimationFrame(() => {
        section.current?.scrollIntoView({
          block: "start",
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
        section.current?.focus({ preventScroll: true });
      });
    };
    window.addEventListener("hashchange", jump);
    jump();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", jump);
    };
  }, []);

  const years = Array.from(new Set(data.map((row) => row.day.slice(0, 4))))
    .sort()
    .reverse();
  const activeYear = year || years[0];
  const annual = data.filter((row) => row.day.startsWith(activeYear ?? ""));
  const monthIndex = month || Number(annual.at(-1)?.day.slice(5, 7) ?? 1);
  const runningMiles =
    annual.reduce(
      (sum, row) =>
        row.sport === "Run" ||
        row.sport === "Trail Run" ||
        row.sport === "Virtual Run"
          ? sum + (row.meters ?? 0)
          : sum,
      0,
    ) / 1609.344;
  let breakdownTotal = 0;
  const sportTotals = new Map<string, number>();
  const days = new Map<string, number>();
  const monthly = months.map(() => 0);
  for (const row of annual) {
    if (Number(row.day.slice(5, 7)) === monthIndex) {
      sportTotals.set(row.sport, (sportTotals.get(row.sport) ?? 0) + row.count);
      breakdownTotal += row.count;
    }
    if (sport && row.sport !== sport) continue;
    days.set(row.day, (days.get(row.day) ?? 0) + row.count);
    monthly[Number(row.day.slice(5, 7)) - 1] += row.count;
  }
  const total = monthly.reduce((sum, count) => sum + count, 0);
  const peak = Math.max(1, ...monthly);
  const selectMonth = (value: number) => {
    setMonth(value);
    setSport("");
    setDay("");
  };

  function calendar() {
    const cells = calendarDays(Number(activeYear));
    return (
      <div role="group" aria-label="Yearly workouts calendar">
        <div className="food-year-grid">
          <div className="food-day-labels" aria-hidden="true">
            {["S", "M", "T", "W", "T", "F", "S"].map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
          <div
            className="food-cells"
            style={{ "--weeks": cells.length / 7 } as CSSProperties}
          >
            {cells.map((date, index) => {
              const count = date ? (days.get(date) ?? 0) : 0;
              const label = `${date} · ${count} ${count === 1 ? "workout" : "workouts"}`;
              return date && count ? (
                <button
                  key={date}
                  type="button"
                  aria-label={label}
                  title={label}
                  aria-pressed={day === date}
                  className="food-day"
                  data-status="activity"
                  data-level={Math.min(4, count)}
                  onClick={() => setDay(day === date ? "" : date)}
                ></button>
              ) : (
                <span
                  key={date ?? index}
                  className={
                    date ? "food-day training-empty-day" : "food-day-blank"
                  }
                  aria-hidden="true"
                ></span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="activity"
      ref={section}
      tabIndex={-1}
      aria-labelledby="training-title"
      className="training scroll-mt-8 space-y-4 outline-none"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="training-title" className="text-xl font-bold">
          Training
        </h2>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:underline"
          >
            View on Strava ↗
          </a>
        )}
      </div>
      {!activeYear ? (
        <p role="status" className="text-sm text-muted-foreground">
          {failed
            ? "Workout history is unavailable."
            : "Loading workout history…"}
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <p>
              <strong>{total}</strong> recorded workouts
              {annual.some((row) => row.meters !== undefined) && (
                <>
                  {" "}
                  ·{" "}
                  <strong>
                    {runningMiles.toLocaleString("en-US", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    mi
                  </strong>{" "}
                  run in {activeYear}
                </>
              )}
            </p>
            <div className="flex gap-3">
              <select
                aria-label="Training year"
                value={activeYear}
                onChange={(event) => {
                  setYear(event.target.value);
                  setSport("");
                  selectMonth(0);
                }}
              >
                {years.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="activity-calendar-scroll">
              <div className="activity-calendar-year">
                <div className="food-month-labels" aria-hidden="true">
                  {months.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
                {calendar()}
              </div>
            </div>
            {day && (
              <p
                aria-live="polite"
                className="mt-2 font-mono text-[11px] text-muted-foreground"
              >
                {day} · {days.get(day)} recorded{" "}
                {days.get(day) === 1 ? "workout" : "workouts"}
              </p>
            )}
          </div>
          <div id="training-details" hidden={!showDetails}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="min-w-0 border-t pt-3">
                <h3 className="text-sm font-semibold">Monthly workouts</h3>
                <div className="mt-2 grid grid-cols-12 gap-1">
                  {monthly.map((count, index) => (
                    <button
                      key={months[index]}
                      type="button"
                      className="training-month-bar"
                      aria-label={`${months[index]} · ${count} workouts`}
                      title={`${months[index]} · ${count} workouts`}
                      aria-pressed={monthIndex === index + 1}
                      onClick={() => selectMonth(index + 1)}
                    >
                      <span style={{ height: `${(count / peak) * 52}px` }} />
                      <small>{months[index][0]}</small>
                    </button>
                  ))}
                </div>
                <p
                  className="mt-2 font-mono text-[11px] text-muted-foreground"
                  aria-live="polite"
                >
                  {months[monthIndex - 1]} · {monthly[monthIndex - 1]} recorded
                  workouts
                </p>
              </div>
              <div className="min-w-0 border-t pt-3">
                <div className="flex justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    Sport breakdown · {months[monthIndex - 1]}
                  </h3>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline"
                    hidden={!sport}
                    onClick={() => {
                      setSport("");
                      setDay("");
                    }}
                  >
                    All sports
                  </button>
                </div>
                {!breakdownTotal && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    No recorded workouts this month.
                  </p>
                )}
                <ul className="mt-2 space-y-1">
                  {Array.from(sportTotals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, count]) => (
                      <li key={name}>
                        <button
                          type="button"
                          className="training-sport"
                          aria-pressed={sport === name}
                          onClick={() => {
                            setSport(sport === name ? "" : name);
                            setDay("");
                          }}
                        >
                          <span>{name}</span>
                          <span>{count}</span>
                          <span
                            className="training-sport-track"
                            aria-hidden="true"
                          >
                            <span
                              style={{
                                width: `${(100 * count) / breakdownTotal}%`,
                              }}
                            />
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <ShowMoreButton
            expanded={showDetails}
            onToggle={() => setShowDetails(!showDetails)}
            controls="training-details"
            label="training details"
            buttonClassName="min-h-11"
          />
        </>
      )}
    </section>
  );
}
