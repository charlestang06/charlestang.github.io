import { Section } from "./ui/section";

const liveMusic = [
  {
    year: "2026",
    events: [
      "Niteharts",
      "Experts Only",
      "Beyond Wonderland SoCal",
      "Breakaway Mass",
      "INZO · San Francisco",
      "Martin Garrix · San Francisco",
      "ARMNHMR · San Francisco",
      "Project GLOW",
      "Chris Lake · NYC",
      "Martin Garrix · NYC",
      "Galantis · NYC",
      "Zulan · NYC",
      "Sammy Virji · NYC",
      "Zedd in the Park",
      "San Holo · DC",
    ],
  },
  {
    year: "2025",
    events: [
      "Zeds Dead · Boston",
      "Wobbleland Fest",
      "Breakaway Mass",
      "Henry Fong · Providence",
      "it's murph · Boston",
      "Sammy Virji · Boston",
      "Tape B · Boston",
      "Dabin · Boston",
    ],
  },
  { year: "2024", events: ["Zedd · Boston"] },
];

export function Listening({ profileUrl }: { profileUrl?: string }) {
  return (
    <Section className="print:hidden" aria-labelledby="listening-title">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="listening-title" className="text-xl font-bold">
          Listening
        </h2>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground underline underline-offset-4"
          >
            Spotify profile ↗
          </a>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Live music</h3>
        <ul className="mt-2 divide-y border-y font-mono text-xs">
          <li className="flex justify-between gap-3 py-2">
            <span>EDCLV 2026</span>
            <span className="text-muted-foreground">Upcoming</span>
          </li>
        </ul>
        {liveMusic.map(({ year, events }) => (
          <div key={year} className="mt-4">
            <h4 className="font-mono text-xs text-muted-foreground">{year}</h4>
            <ul className="mt-1 divide-y border-y font-mono text-xs">
              {events.map((event) => (
                <li key={event} className="py-2">
                  {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
