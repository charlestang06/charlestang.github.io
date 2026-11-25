"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FoodRestaurant } from "../lib/food-calendar";

function safeWebsite(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function popup(place: FoodRestaurant) {
  const content = document.createElement("div");
  content.className = "food-map-place";
  const name = document.createElement("strong");
  name.textContent = place.name;
  content.append(name);
  const city = document.createElement("span");
  city.textContent = [place.city, place.country].filter(Boolean).join(", ");
  content.append(city);
  const website = safeWebsite(place.websiteUrl);
  if (website) {
    const link = document.createElement("a");
    link.href = website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Visit website";
    content.append(link);
  }
  return content;
}

export function FoodMap({ places }: { places: FoodRestaurant[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [failedFor, setFailedFor] = useState<FoodRestaurant[] | null>(null);
  const mapped = useMemo(
    () =>
      places.filter((place) => {
        const point = place.coordinates;
        return (
          point &&
          Number.isFinite(point.lat) &&
          Number.isFinite(point.lng) &&
          Math.abs(point.lat) <= 90 &&
          Math.abs(point.lng) <= 180
        );
      }),
    [places],
  );

  useEffect(() => {
    if (!container.current || !mapped.length) return;
    const element = container.current;
    let disposed = false;
    let map: import("leaflet").Map | undefined;
    let observer: ResizeObserver | undefined;
    // Import only after mounting: Leaflet evaluates window at module scope.
    void import("leaflet")
      .then((L) => {
        if (disposed) return;
        map = L.map(element, {
          scrollWheelZoom: false,
          touchZoom: true,
          attributionControl: true,
        });
        map.attributionControl.setPrefix(false);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          referrerPolicy: "strict-origin-when-cross-origin",
          className: "food-map-tiles",
        }).addTo(map);
        const icon = L.divIcon({
          className: "food-map-marker",
          html: '<span aria-hidden="true"></span>',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
          popupAnchor: [0, -12],
        });
        const points: [number, number][] = [];
        for (const place of mapped) {
          const point: [number, number] = [
            place.coordinates!.lat,
            place.coordinates!.lng,
          ];
          points.push(point);
          L.marker(point, {
            icon,
            title: place.name,
            alt: place.name,
            keyboard: true,
          })
            .bindPopup(popup(place))
            .addTo(map);
        }
        const fit = () => {
          if (!map || disposed) return;
          map.invalidateSize();
          map.fitBounds(L.latLngBounds(points), {
            padding: [30, 30],
            maxZoom: 14,
            animate: false,
          });
        };
        fit();
        observer = new ResizeObserver(fit);
        observer.observe(element);
      })
      .catch(() => {
        if (!disposed) setFailedFor(places);
      });
    return () => {
      disposed = true;
      observer?.disconnect();
      map?.remove();
    };
  }, [mapped, places]);

  if (!mapped.length)
    return (
      <p className="food-map-empty">No mapped locations for these filters.</p>
    );
  return (
    <div className="food-map">
      <div
        className="food-map-canvas"
        ref={container}
        role="region"
        aria-label="Restaurant locations. Use arrow keys to pan, plus and minus to zoom, and Tab to select places."
      />
      {failedFor === places && (
        <p role="status">
          The map couldn’t load. Switch to List to explore these places.
        </p>
      )}
    </div>
  );
}
