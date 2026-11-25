import {
  isSafeFoodImage,
  isSafeFoodWebsite,
  type FoodSnapshot,
} from "./food-calendar";

/** Reject malformed snapshots rather than turning partial responses into empty history. */
export function validatePublicSnapshot(value: unknown): FoodSnapshot {
  const fail = (): never => {
    throw new Error("Invalid public dining snapshot");
  };
  if (!value || typeof value !== "object") return fail();
  const data = value as FoodSnapshot;
  const onlyKeys = (value: object, allowed: string[]) =>
    !Array.isArray(value) &&
    Object.keys(value).every((key) => allowed.includes(key));
  if (
    !onlyKeys(data, [
      "version",
      "profile",
      "syncedAt",
      "source",
      "calendarSemantics",
      "calendarMonths",
      "stats",
      "restaurants",
      "days",
    ])
  )
    return fail();
  const date = (value: unknown): value is string =>
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
  const text = (value: unknown): value is string =>
    typeof value === "string" && value.length <= 500;
  const nullableNumber = (value: unknown) =>
    value === null ||
    (typeof value === "number" && Number.isFinite(value) && value >= 0);
  if (
    data.version !== 1 ||
    !["live", "capture"].includes(data.source) ||
    !Number.isFinite(Date.parse(data.syncedAt)) ||
    !text(data.calendarSemantics) ||
    !data.profile ||
    !onlyKeys(data.profile, ["handle", "url"]) ||
    !text(data.profile.handle) ||
    !/^https:\/\/beliapp\.co\/app\/[\w.-]+$/.test(data.profile.url) ||
    !Array.isArray(data.calendarMonths) ||
    !data.calendarMonths.every((value) =>
      /^\d{4}-(0[1-9]|1[0-2])$/.test(value),
    ) ||
    !data.stats ||
    !onlyKeys(data.stats, ["rankedPlaces", "rankedThisYear", "weekStreak"]) ||
    ![
      data.stats.rankedPlaces,
      data.stats.rankedThisYear,
      data.stats.weekStreak,
    ].every(nullableNumber) ||
    !Array.isArray(data.restaurants) ||
    !Array.isArray(data.days)
  )
    return fail();
  const keys = new Set<string>();
  for (const restaurant of data.restaurants) {
    if (
      !restaurant ||
      !onlyKeys(restaurant, [
        "key",
        "name",
        "city",
        "country",
        "cuisines",
        "score",
        "rank",
        "dates",
        "firstRankedAt",
        "categories",
        "imageUrl",
        "websiteUrl",
        "coordinates",
      ]) ||
      !text(restaurant.key) ||
      !/^[a-z0-9][a-z0-9-]*$/.test(restaurant.key) ||
      keys.has(restaurant.key) ||
      ![restaurant.name, restaurant.city, restaurant.country].every(text) ||
      !restaurant.name ||
      (restaurant.categories !== undefined &&
        (!Array.isArray(restaurant.categories) ||
          !restaurant.categories.every((category) =>
            ["Restaurant", "Cafe", "Bar", "Bakery", "Dessert"].includes(
              category,
            ),
          ))) ||
      (restaurant.imageUrl !== undefined &&
        restaurant.imageUrl !== null &&
        !isSafeFoodImage(restaurant.imageUrl)) ||
      (restaurant.websiteUrl !== undefined &&
        restaurant.websiteUrl !== null &&
        !isSafeFoodWebsite(restaurant.websiteUrl)) ||
      (restaurant.coordinates !== undefined &&
        restaurant.coordinates !== null &&
        (!onlyKeys(restaurant.coordinates, ["lat", "lng"]) ||
          !Number.isFinite(restaurant.coordinates.lat) ||
          Math.abs(restaurant.coordinates.lat) > 90 ||
          !Number.isFinite(restaurant.coordinates.lng) ||
          Math.abs(restaurant.coordinates.lng) > 180)) ||
      !Array.isArray(restaurant.cuisines) ||
      !restaurant.cuisines.every(text) ||
      !nullableNumber(restaurant.score) ||
      !nullableNumber(restaurant.rank) ||
      !Array.isArray(restaurant.dates) ||
      !restaurant.dates.every(date) ||
      !(
        restaurant.firstRankedAt === null ||
        Number.isFinite(Date.parse(restaurant.firstRankedAt))
      )
    )
      return fail();
    keys.add(restaurant.key);
  }
  const days = new Set<string>();
  for (const day of data.days) {
    if (
      !day ||
      !onlyKeys(day, ["date", "count", "restaurants"]) ||
      !date(day.date) ||
      days.has(day.date) ||
      !Number.isInteger(day.count) ||
      day.count < 0 ||
      !Array.isArray(day.restaurants) ||
      !day.restaurants.every((key) => keys.has(key))
    )
      return fail();
    days.add(day.date);
  }
  return data;
}
