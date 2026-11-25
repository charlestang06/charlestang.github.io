import "./setup.mjs";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { cleanup, render, waitFor } from "@testing-library/react";
import { FoodMap } from "../src/components/food-map";
import type { FoodRestaurant } from "../src/lib/food-calendar";

afterEach(cleanup);
const place = (
  key: string,
  coordinates: FoodRestaurant["coordinates"],
): FoodRestaurant => ({
  key,
  name: `Place ${key}`,
  city: "Fixture city",
  country: "US",
  cuisines: [],
  score: null,
  rank: null,
  dates: [],
  firstRankedAt: null,
  coordinates,
});

test("empty and invalid coordinates show an honest empty state", () => {
  const view = render(
    <FoodMap
      places={[
        place("invalid", { lat: 91, lng: 0 }),
        place("nan", { lat: NaN, lng: 0 }),
      ]}
    />,
  );
  assert.ok(view.getByText("No mapped locations for these filters."));
  assert.equal(view.container.querySelector(".leaflet-container"), null);
});

test("map accepts zero coordinates, updates filtered markers, and cleans up on unmount", async () => {
  const view = render(
    <FoodMap
      places={[
        place("zero", { lat: 0, lng: 0 }),
        place("other", { lat: 42, lng: -71 }),
        place("missing", null),
      ]}
    />,
  );
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 2),
  );
  assert.equal(
    view.container
      .querySelector('[title="Place zero"]')
      ?.getAttribute("tabindex"),
    "0",
  );
  assert.equal(view.container.querySelector('[title="Place missing"]'), null);
  assert.ok(view.container.querySelector('[title="Place other"]'));
  view.rerender(<FoodMap places={[place("other", { lat: 42, lng: -71 })]} />);
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 1),
  );
  assert.equal(view.container.querySelector('[title="Place zero"]'), null);
  view.unmount();
  assert.equal(document.querySelector(".leaflet-container"), null);
});

test("marker popups render untrusted names as text and only expose web links", async () => {
  const unsafe = {
    ...place("unsafe", { lat: 42, lng: -71 }),
    name: "<img src=x onerror=alert(1)>",
    websiteUrl: "javascript:alert(1)",
  };
  const safe = {
    ...place("safe", { lat: 43, lng: -72 }),
    websiteUrl: "https://restaurant.example/menu",
  };
  const view = render(<FoodMap places={[unsafe, safe]} />);
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 2),
  );
  const markers =
    view.container.querySelectorAll<HTMLElement>(".food-map-marker");
  const { fireEvent } = await import("@testing-library/react");
  fireEvent.click(markers[0]);
  assert.ok(view.getByText(unsafe.name));
  assert.equal(view.container.querySelector(".food-map-place img"), null);
  assert.equal(view.queryByRole("link", { name: "Visit website" }), null);
  fireEvent.click(markers[1]);
  const link = view.getByRole("link", { name: "Visit website" });
  assert.equal(link.getAttribute("href"), safe.websiteUrl);
  assert.equal(link.getAttribute("rel"), "noopener noreferrer");
});
