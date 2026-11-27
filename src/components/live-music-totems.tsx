"use client";

import { useState } from "react";

type Lineup = { year: string; events: readonly string[] };

const animals = ["Giraffe", "Zebra", "Tiger"] as const;

export function LiveMusicTotems({ lineups }: { lineups: readonly Lineup[] }) {
  const [openYear, setOpenYear] = useState<string | null>(null);
  const selected = lineups.find(({ year }) => year === openYear);

  return (
    <section className="mt-6" aria-labelledby="live-music-archive-title">
      <h3 id="live-music-archive-title" className="font-semibold">
        Live music archive
      </h3>
      <div className="music-totem-tray">
        {lineups.map(({ year, events }, index) => {
          const open = year === openYear;
          const animal = animals[index % animals.length];

          return (
            <button
              key={year}
              type="button"
              aria-label={`${animal}, ${year}, ${events.length} ${events.length === 1 ? "event" : "events"}`}
              aria-expanded={open}
              aria-controls="live-music-archive-events"
              onClick={() => setOpenYear(open ? null : year)}
              className="music-totem"
            >
              <span
                aria-hidden="true"
                className="music-balloon"
                data-animal={animal.toLowerCase()}
              >
                <span className="music-balloon-pole" />
                <span className="music-balloon-crest" />
                <span className="music-balloon-head">
                  <span className="music-balloon-eyes" />
                  <span className="music-balloon-muzzle" />
                </span>
              </span>
              <span aria-hidden="true" className="music-totem-year">
                {year}
              </span>
            </button>
          );
        })}
      </div>
      <div id="live-music-archive-events" hidden={!selected}>
        {selected && (
          <ul
            key={selected.year}
            aria-label={`${selected.year} shows`}
            className="grid gap-x-5 gap-y-2 py-3 text-sm motion-safe:animate-[food-guide-in_240ms_ease-out] sm:grid-cols-2"
          >
            {selected.events.map((event) => {
              const [name, city] = event.split(" · ");
              return (
                <li key={event} className="min-w-0 leading-tight">
                  <span className="font-medium">{name}</span>
                  {city && (
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      {city}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
