import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  isSafeFoodImage,
  isSafeFoodWebsite,
  type FoodRestaurant,
} from "../lib/food-calendar";

const ratingDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function RecentFoodRatings({
  restaurants,
}: {
  restaurants: readonly FoodRestaurant[];
}) {
  const recent = restaurants
    .flatMap((restaurant) => {
      const visited = restaurant.dates.reduce(
        (latest, date) => (date > latest ? date : latest),
        "",
      );
      return restaurant.score !== null && restaurant.score > 8.5 && visited
        ? [{ ...restaurant, score: restaurant.score, visited }]
        : [];
    })
    .sort((a, b) => b.visited.localeCompare(a.visited) || b.score - a.score)
    .slice(0, 3);

  if (!recent.length) return null;

  return (
    <section className="mt-5" aria-labelledby="recent-food-ratings-title">
      <h3 id="recent-food-ratings-title" className="text-sm font-semibold">
        Recent favorites
      </h3>
      <ul className="mt-2 grid divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {recent.map(
          ({ key, score, name, city, visited, websiteUrl, imageUrl }) => {
            const displayScore = score.toFixed(1);
            return (
              <li
                key={key}
                className="flex min-w-0 items-start gap-3 py-2.5 sm:flex-col sm:px-3 sm:first:pl-0 sm:last:pr-0"
              >
                {imageUrl && isSafeFoodImage(imageUrl) && (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={96}
                    height={96}
                    unoptimized
                    className="size-16 shrink-0 rounded object-cover"
                  />
                )}
                <div className="min-w-0 flex-1 self-stretch">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-medium">
                      {websiteUrl && isSafeFoodWebsite(websiteUrl) ? (
                        <a
                          href={websiteUrl}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}{" "}
                          <ArrowUpRight
                            className="inline size-3 align-baseline"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        name
                      )}
                    </h4>
                    <span
                      aria-label={`Beli rating ${displayScore} out of 10`}
                      className="shrink-0 font-mono text-sm font-semibold tabular-nums"
                    >
                      {displayScore}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {city && `${city} · `}
                    <time dateTime={visited}>
                      Visited {ratingDate.format(new Date(visited))}
                    </time>
                  </p>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
}
