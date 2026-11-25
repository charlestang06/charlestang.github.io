export type FoodRestaurant = {
  key: string;
  name: string;
  city: string;
  country: string;
  cuisines: string[];
  categories?: string[];
  imageUrl?: string | null;
  websiteUrl?: string | null;
  coordinates?: { lat: number; lng: number } | null;
  score: number | null;
  rank: number | null;
  dates: string[];
  firstRankedAt: string | null;
};
export type FoodSnapshot = {
  version: 1;
  profile: { handle: string; url: string };
  syncedAt: string;
  source: "live" | "capture";
  calendarSemantics: string;
  calendarMonths: string[];
  stats: {
    rankedPlaces: number | null;
    rankedThisYear: number | null;
    weekStreak: number | null;
  };
  restaurants: FoodRestaurant[];
  days: { date: string; count: number; restaurants: string[] }[];
};

/** Sunday-first column-major cells: each consecutive seven cells is a week. */
export function calendarDays(year: number, month?: number): (string | null)[] {
  const start = new Date(
    Date.UTC(year, month === undefined ? 0 : month - 1, 1),
  );
  const end = new Date(Date.UTC(year, month === undefined ? 12 : month, 0));
  const result: (string | null)[] = Array.from(
    { length: start.getUTCDay() },
    () => null,
  );
  for (let time = start.getTime(); time <= end.getTime(); time += 86400000) {
    result.push(new Date(time).toISOString().slice(0, 10));
  }
  while (result.length % 7) result.push(null);
  return result;
}

export function dayStatus(
  date: string,
  snapshot: FoodSnapshot | null,
  today: string,
) {
  if (date > today) return "future";
  const day = snapshot?.days.find((day) => day.date === date);
  if (day && day.count > 0) return "activity";
  if (
    day ||
    (snapshot?.calendarMonths.includes(date.slice(0, 7)) &&
      date <= snapshot.syncedAt.slice(0, 10))
  )
    return "zero";
  return "unknown";
}

export function isSafeFoodImage(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\/images\/food\/[a-z0-9][a-z0-9-]*\.(?:jpg|jpeg|png|webp|avif)$/.test(
      value,
    )
  );
}

export function isSafeFoodWebsite(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2000) return false;
  try {
    const url = new URL(value);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
