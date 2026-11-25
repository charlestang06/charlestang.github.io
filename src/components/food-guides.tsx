"use client";

import Image from "next/image";
import { useState } from "react";
import type { FoodRestaurant } from "@/lib/food-calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export type FoodGuide = {
  title: string;
  city: string;
  description: string;
  places: {
    name: string;
    description: string;
    notes?: string;
    dishes: string[];
    image?: string;
    website?: string;
  }[];
};

type Place = FoodGuide["places"][number];

function PlaceDetails({ place, score }: { place: Place; score?: number }) {
  return (
    <div className="flex items-start gap-4">
      {place.image && (
        <Image
          src={place.image}
          width={384}
          height={384}
          alt=""
          unoptimized
          className="size-24 shrink-0 rounded object-cover sm:size-32"
        />
      )}
      <div className="min-w-0">
        <h4 className="text-sm font-semibold">
          {place.website ? (
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {place.name} ↗
            </a>
          ) : (
            place.name
          )}
        </h4>
        {score !== undefined && (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Beli rating ·{" "}
            <strong className="text-foreground">{score.toFixed(1)}</strong>
          </p>
        )}
        {place.notes && (
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
            {place.notes}
          </p>
        )}
        {!place.notes && place.description && (
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
            {place.description}
          </p>
        )}
        {place.dishes.length > 0 && (
          <p className="mt-2 font-mono text-xs">
            <span className="text-muted-foreground">Favorite dishes · </span>
            {place.dishes.join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

export function FoodGuides({
  guides,
  restaurants,
}: {
  guides: FoodGuide[];
  restaurants: FoodRestaurant[];
}) {
  const [guideIndex, setGuideIndex] = useState(0);
  const [placeIndex, setPlaceIndex] = useState(0);
  const guide = guides[guideIndex];
  if (!guide) return null;
  const places = guide.places.filter(
    (entry): entry is Place & { image: string } => Boolean(entry.image),
  );
  const place = places[placeIndex];
  const scoreFor = (entry: Place) => {
    const matches = restaurants.filter(
      ({ name, city, score }) =>
        name === entry.name && city === guide.city && score !== null,
    );
    const scores = new Set(matches.map(({ score }) => score));
    return scores.size === 1 ? (matches[0].score ?? undefined) : undefined;
  };

  return (
    <section className="my-6" aria-labelledby="food-guides-heading">
      <h3 id="food-guides-heading" className="font-semibold">
        Where I’d eat
      </h3>
      <div
        className="skill-keyboard-labels"
        role="group"
        aria-label="Restaurant guides"
      >
        {guides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={index === guideIndex}
            className="skill-group-label font-mono"
            onClick={() => {
              setGuideIndex(index);
              setPlaceIndex(0);
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="pt-3">
        {guide.description && (
          <p className="mb-3 whitespace-pre-line text-sm text-muted-foreground">
            {guide.description}
          </p>
        )}
        {places.length > 0 && (
          <div
            key={guide.title}
            role="group"
            aria-label={`${guide.title} places`}
            className="mb-4 flex gap-2 overflow-x-auto overscroll-x-contain p-1 [scrollbar-width:none]"
          >
            {places.map((entry, index) => (
              <button
                key={index}
                type="button"
                aria-pressed={index === placeIndex}
                onClick={(event) => {
                  setPlaceIndex(index);
                  event.currentTarget.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                  });
                }}
                className="w-[72px] shrink-0 rounded text-left opacity-75 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 aria-pressed:opacity-100 sm:w-[84px]"
              >
                <Image
                  src={entry.image}
                  width={384}
                  height={384}
                  alt=""
                  unoptimized
                  className="aspect-square w-full rounded object-cover"
                />
                <span className="mt-1 block truncate font-mono text-[11px] [button[aria-pressed=true]_&]:font-bold">
                  {entry.name}
                </span>
              </button>
            ))}
          </div>
        )}
        <div aria-live="polite">
          {place ? (
            <div
              key={guideIndex + ":" + placeIndex}
              className="animate-[food-guide-in_240ms_ease-out] motion-reduce:animate-none"
            >
              <PlaceDetails place={place} score={scoreFor(place)} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No places with photos in this guide yet.
            </p>
          )}
        </div>
        <div className="mt-3 flex justify-end font-mono text-xs text-muted-foreground">
          {place && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="min-h-9 underline underline-offset-4 hover:text-foreground"
                >
                  See all places
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
                <DialogHeader>
                  <DialogTitle>{guide.title}</DialogTitle>
                  <DialogDescription>
                    {guide.city} · {places.length} places
                  </DialogDescription>
                </DialogHeader>
                <ul className="divide-y">
                  {places.map((entry, index) => (
                    <li key={index} className="py-3">
                      <PlaceDetails place={entry} score={scoreFor(entry)} />
                    </li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  );
}
