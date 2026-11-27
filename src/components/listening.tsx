import { LiveMusicTotems } from "./live-music-totems";
import { Section } from "./ui/section";

const liveMusic = [
  {
    year: "2026",
    events: [
      "niteharts",
      "Experts Only NYC",
      "Beyond Wonderland SoCal",
      "Breakaway Mass",
      "INZO · San Francisco",
      "Martin Garrix · San Francisco",
      "ARMNHMR · San Francisco",
      "Project GLOW",
      "Chris Lake · NYC",
      "Martin Garrix · NYC",
      "Galantis · NYC",
      "ZULAN · NYC",
      "Sammy Virji · NYC",
      "Zedd In The Park",
      "San Holo · DC",
    ],
  },
  {
    year: "2025",
    events: [
      "Zeds Dead · Boston",
      "Wobbleland",
      "Breakaway Mass",
      "Henry Fong · Providence",
      "it's murph · Boston",
      "Sammy Virji · Boston",
      "Tape B · Boston",
      "Dabin · Boston",
    ],
  },
  { year: "2024", events: ["Zedd · Boston"] },
] as const;

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
        <h3 className="font-semibold">Upcoming</h3>
        <ul className="mt-2 divide-y border-y font-mono text-xs">
          {["EDCLV 2027", "Ultra Miami 2027"].map((event) => (
            <li key={event} className="py-2">
              {event}
            </li>
          ))}
        </ul>
      </div>
      <LiveMusicTotems lineups={liveMusic} />
    </Section>
  );
}
