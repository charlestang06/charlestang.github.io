import "./setup.mjs";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react";
import { FoodExplorer, FoodLink } from "../src/components/food-explorer";
import {
  calendarDays,
  dayStatus,
  type FoodSnapshot,
} from "../src/lib/food-calendar";

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});

// Synthetic fixtures exercise filtering; they are never bundled into the site.
const snapshot: FoodSnapshot = {
  version: 1,
  profile: { handle: "test", url: "https://beliapp.co/app/test" },
  syncedAt: "2026-11-20T12:00:00Z",
  source: "live",
  calendarSemantics: "Verified dining activity",
  calendarMonths: ["2026-10"],
  stats: { rankedPlaces: 2, rankedThisYear: null, weekStreak: null },
  restaurants: [
    {
      key: "a",
      name: "Fixture A",
      city: "Boston",
      country: "US",
      cuisines: ["Italian"],
      score: 9,
      rank: 1,
      dates: ["2026-11-12"],
      firstRankedAt: null,
    },
    {
      key: "b",
      name: "Fixture B",
      city: "New York",
      country: "US",
      cuisines: ["Japanese"],
      score: 8,
      rank: 2,
      dates: ["2026-11-13"],
      firstRankedAt: null,
    },
  ],
  days: [
    { date: "2026-11-12", count: 1, restaurants: ["a"] },
    { date: "2026-11-13", count: 1, restaurants: ["b"] },
  ],
};

function fixture(data = snapshot) {
  return render(
    <>
      <FoodLink>Beli</FoodLink>
      <FoodExplorer initialSnapshot={data} today="2026-11-25" />
    </>,
  );
}

test("calendar aligns Sunday rows and distinguishes unknown, complete-zero and future", () => {
  const days = calendarDays(2026);
  assert.equal(days[0], null); // Jan 1, 2026 is Thursday: four leading cells.
  assert.equal(days[4], "2026-01-01");
  assert.equal(days[5], "2026-01-02");
  assert.equal(dayStatus("2026-10-01", snapshot, "2026-11-25"), "zero");
  assert.equal(dayStatus("2026-09-01", snapshot, "2026-11-25"), "unknown");
  assert.equal(dayStatus("2026-11-12", snapshot, "2026-11-25"), "activity");
  assert.equal(dayStatus("2026-11-26", snapshot, "2026-11-25"), "future");
});

test("Beli reveals hidden explorer and closing returns focus to the icon", async () => {
  const view = fixture();
  assert.equal(view.queryByRole("heading", { name: "Food" }), null);
  const link = view.getByRole("link", { name: "Beli" });
  assert.equal(link.getAttribute("href"), "#food");
  assert.equal(link.getAttribute("aria-expanded"), "false");
  fireEvent.click(link);
  assert.ok(view.getByRole("heading", { name: "Food" }));
  assert.equal(link.getAttribute("aria-expanded"), "true");
  fireEvent.click(view.getByRole("button", { name: "Close food section" }));
  assert.equal(view.queryByRole("heading", { name: "Food" }), null);
  await waitFor(() => assert.equal(document.activeElement, link));
});

test("direct food hash reveals the section", async () => {
  window.history.replaceState(null, "", "#food");
  const view = fixture();
  await waitFor(() => assert.ok(view.getByRole("heading", { name: "Food" })));
});

test("calendar selection and city/search intersect and selection clears", async () => {
  const view = fixture();
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  const calendar = within(
    view.getByRole("group", { name: "Year activity calendar" }),
  );
  fireEvent.click(
    calendar.getByRole("button", { name: /2026-11-12: 1 activity/ }),
  );
  const list = () => within(view.getByRole("list", { name: "Places" }));
  assert.ok(list().getByText("Fixture A"));
  assert.equal(list().queryByText("Fixture B"), null);
  fireEvent.click(view.getByRole("button", { name: "Clear date selection" }));
  fireEvent.change(view.getByRole("combobox", { name: "City" }), {
    target: { value: "New York" },
  });
  assert.ok(list().getByText("Fixture B"));
  assert.equal(list().queryByText("Fixture A"), null);
  fireEvent.change(view.getByRole("searchbox", { name: "Search places" }), {
    target: { value: "Fixture A" },
  });
  assert.equal(list().queryByText("Fixture B"), null);
  fireEvent.change(view.getByRole("searchbox", { name: "Search places" }), {
    target: { value: "" },
  });
  assert.ok(list().getByText("Fixture B"));
});

test("missing snapshot shows unknown coverage without invented stats", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("Snapshot missing");
  };
  try {
    const view = render(
      <>
        <FoodLink>Beli</FoodLink>
        <FoodExplorer today="2026-11-25" />
      </>,
    );
    fireEvent.click(view.getByRole("link", { name: "Beli" }));
    await waitFor(() =>
      assert.match(
        view.getByRole("status").textContent ?? "",
        /Dining data isn’t available yet/,
      ),
    );
    assert.ok(view.container.querySelector('[data-status="unknown"]'));
    assert.equal(
      view.container.querySelector('.food-day[data-status="zero"]'),
      null,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("clicking Beli again scrolls to the already open section", () => {
  const view = fixture();
  const link = view.getByRole("link", { name: "Beli" });
  fireEvent.click(link);
  const section = view.container.querySelector("#food")! as HTMLElement;
  let scrolls = 0;
  section.scrollIntoView = () => {
    scrolls += 1;
  };
  fireEvent.click(link);
  assert.equal(scrolls, 1);
});

test("public snapshots reject impossible dates and dangling restaurant references", async () => {
  const { validatePublicSnapshot } = await import("../src/lib/beli-public");
  assert.equal(validatePublicSnapshot(snapshot).restaurants.length, 2);
  assert.throws(() =>
    validatePublicSnapshot({
      ...snapshot,
      days: [{ date: "2026-02-30", count: 1, restaurants: ["a"] }],
    }),
  );
  assert.throws(() =>
    validatePublicSnapshot({
      ...snapshot,
      days: [{ date: "2026-11-12", count: 1, restaurants: ["missing"] }],
    }),
  );
  assert.throws(() =>
    validatePublicSnapshot({
      ...snapshot,
      days: [{ date: "2026-11-12", count: -1, restaurants: [] }],
    }),
  );
});

test("public snapshot validator rejects fields outside the publication contract", async () => {
  const { validatePublicSnapshot } = await import("../src/lib/beli-public");
  assert.throws(() =>
    validatePublicSnapshot({ ...snapshot, access: "not-a-real-token" }),
  );
  assert.throws(() =>
    validatePublicSnapshot({
      ...snapshot,
      restaurants: [{ ...snapshot.restaurants[0], companions: [] }],
    }),
  );
});

test("unverified image origins never render a place thumbnail", () => {
  const view = fixture({
    ...snapshot,
    restaurants: [
      {
        ...snapshot.restaurants[0],
        imageUrl: "https://unverified.example/fixture.jpg",
      },
    ],
  });
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  assert.equal(view.container.querySelectorAll(".food-place-image").length, 0);
});

test("place categories preserve multiple memberships when filtering", () => {
  const view = fixture({
    ...snapshot,
    restaurants: [
      { ...snapshot.restaurants[0], categories: ["Restaurant", "Cafe"] },
      { ...snapshot.restaurants[1], categories: ["Bar"] },
    ],
  });
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  fireEvent.click(view.getByRole("button", { name: "1 cafes" }));
  const list = within(view.getByRole("list", { name: "Places" }));
  assert.ok(list.getByText("Fixture A"));
  assert.equal(list.queryByText("Fixture B"), null);
});

test("leaving the food hash restores the collapsed state", () => {
  const view = fixture();
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  act(() => {
    window.history.replaceState(null, "", "/");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  assert.equal(view.queryByRole("heading", { name: "Food" }), null);
  assert.equal(
    view.getByRole("link", { name: "Beli" }).getAttribute("aria-expanded"),
    "false",
  );
});

test("a stale snapshot cannot turn days after its sync into zero activity", () => {
  const partial = { ...snapshot, calendarMonths: ["2026-11"] };
  assert.equal(dayStatus("2026-11-19", partial, "2026-11-25"), "zero");
  assert.equal(dayStatus("2026-11-21", partial, "2026-11-25"), "unknown");
});

test("food keeps coverage in its legend without source paragraphs, sync labels or cuisine controls", () => {
  const view = fixture();
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  assert.ok(!view.queryByRole("combobox", { name: "Cuisine" }));
  assert.equal(view.queryByText("About this data"), null);
  assert.equal(view.queryByText(/Synced /), null);
  assert.equal(view.queryByText(snapshot.calendarSemantics), null);
});

test("local cover images and safe business websites appear on place rows", () => {
  const view = fixture({
    ...snapshot,
    restaurants: [
      {
        ...snapshot.restaurants[0],
        imageUrl: "/images/food/a.jpg",
        websiteUrl: "https://example.com/dining",
      },
    ],
  });
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  assert.equal(
    view.container.querySelector(".food-place-image")?.getAttribute("src"),
    "/images/food/a.jpg",
  );
  assert.equal(
    view.getByRole("link", { name: "Fixture A" }).getAttribute("href"),
    "https://example.com/dining",
  );
});

test("list and map share city and date filters", async () => {
  const view = fixture({
    ...snapshot,
    restaurants: snapshot.restaurants.map((place, index) => ({
      ...place,
      coordinates: { lat: 41 + index, lng: -71 },
    })),
  });
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  fireEvent.click(view.getByRole("button", { name: "Map" }));
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 2),
  );
  fireEvent.change(view.getByRole("combobox", { name: "City" }), {
    target: { value: "New York" },
  });
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 1),
  );
  assert.ok(view.container.querySelector('[title="Fixture B"]'));
  const calendar = within(
    view.getByRole("group", { name: "Year activity calendar" }),
  );
  fireEvent.click(
    calendar.getByRole("button", { name: /2026-11-12: 1 activity/ }),
  );
  await waitFor(() =>
    assert.equal(view.container.querySelectorAll(".food-map-marker").length, 0),
  );
  fireEvent.click(view.getByRole("button", { name: "List" }));
  assert.equal(
    within(view.getByRole("list", { name: "Places" })).queryAllByRole(
      "listitem",
    ).length,
    0,
  );
});

test("public enrichment rejects external cover URLs, unsafe websites and invalid coordinates", async () => {
  const { validatePublicSnapshot } = await import("../src/lib/beli-public");
  const enriched = {
    ...snapshot,
    restaurants: [
      {
        ...snapshot.restaurants[0],
        imageUrl: "/images/food/a.jpg",
        websiteUrl: "https://example.com/menu",
        coordinates: { lat: 0, lng: 0 },
      },
      snapshot.restaurants[1],
    ],
  };
  assert.equal(
    validatePublicSnapshot(enriched).restaurants[0].imageUrl,
    "/images/food/a.jpg",
  );
  for (const extension of [
    { imageUrl: "https://unverified.example/a.jpg" },
    { imageUrl: "/images/food/../a.jpg" },
    { websiteUrl: "javascript:alert(1)" },
    { websiteUrl: "https://user:pass@example.com" },
    { coordinates: { lat: 90.1, lng: 0 } },
    { coordinates: { lat: 0, lng: -181 } },
  ]) {
    assert.throws(() =>
      validatePublicSnapshot({
        ...snapshot,
        restaurants: [
          { ...snapshot.restaurants[0], ...extension },
          snapshot.restaurants[1],
        ],
      }),
    );
  }
});

test("a replaced cover retries after an earlier image failed", async () => {
  const originalFetch = globalThis.fetch;
  let request = 0;
  globalThis.fetch = async () =>
    ({
      ok: true,
      json: async () => ({
        ...snapshot,
        restaurants: [
          {
            ...snapshot.restaurants[0],
            imageUrl:
              ++request === 1 ? "/images/food/a.jpg" : "/images/food/a.webp",
          },
          snapshot.restaurants[1],
        ],
      }),
    }) as Response;
  try {
    const view = render(
      <>
        <FoodLink>Beli</FoodLink>
        <FoodExplorer today="2026-11-25" />
      </>,
    );
    fireEvent.click(view.getByRole("link", { name: "Beli" }));
    await waitFor(() =>
      assert.equal(
        view.container.querySelector(".food-place-image")?.getAttribute("src"),
        "/images/food/a.jpg",
      ),
    );
    fireEvent.error(view.container.querySelector(".food-place-image")!);
    assert.equal(
      (view.container.querySelector(".food-place-image") as HTMLImageElement)
        .hidden,
      true,
    );
    fireEvent.click(view.getByRole("button", { name: "Close food section" }));
    fireEvent.click(view.getByRole("link", { name: "Beli" }));
    fireEvent.error(view.container.querySelector(".food-place-image")!);
    await waitFor(() =>
      assert.equal(
        view.container.querySelector(".food-place-image")?.getAttribute("src"),
        "/images/food/a.webp",
      ),
    );
    const image = view.container.querySelector(
      ".food-place-image",
    ) as HTMLImageElement;
    assert.equal(image.hidden, false);
    assert.equal(image.getAttribute("loading"), "lazy");
    assert.equal(image.getAttribute("decoding"), "async");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

const paginatedSnapshot: FoodSnapshot = {
  ...snapshot,
  restaurants: Array.from({ length: 12 }, (_, index) => ({
    ...snapshot.restaurants[0],
    key: `page-${index}`,
    name: `Page place ${index + 1}`,
    city: index < 9 ? "Boston" : "New York",
    categories: index < 9 ? ["Cafe"] : ["Bar"],
    coordinates: { lat: 40 + index / 10, lng: -71 },
  })),
  days: [
    {
      date: "2026-11-12",
      count: 9,
      restaurants: Array.from({ length: 9 }, (_, index) => `page-${index}`),
    },
  ],
};

test("place pagination only mounts eight rows and respects previous/next boundaries", () => {
  const view = fixture(paginatedSnapshot);
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  const rows = () =>
    within(view.getByRole("list", { name: "Places" })).getAllByRole("listitem");
  assert.equal(rows().length, 8);
  assert.equal(
    (
      view.getByRole("button", {
        name: "Previous places page",
      }) as HTMLButtonElement
    ).disabled,
    true,
  );
  fireEvent.click(view.getByRole("button", { name: "Next places page" }));
  assert.equal(rows().length, 4);
  assert.ok(view.getByText("9–12 of 12"));
  assert.equal(
    (
      view.getByRole("button", {
        name: "Next places page",
      }) as HTMLButtonElement
    ).disabled,
    true,
  );
  fireEvent.click(view.getByRole("button", { name: "Previous places page" }));
  assert.ok(view.getByText("Page place 1"));
  assert.ok(!view.queryByText("Page place 12"));
});

test("place filters and date selection reset pagination to the first page", () => {
  const view = fixture(paginatedSnapshot);
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  const next = () =>
    fireEvent.click(view.getByRole("button", { name: "Next places page" }));
  next();
  fireEvent.change(view.getByRole("combobox", { name: "City" }), {
    target: { value: "Boston" },
  });
  assert.ok(view.getByText("1–8 of 9"));
  next();
  fireEvent.click(view.getByRole("button", { name: "9 cafes" }));
  assert.ok(view.getByText("1–8 of 9"));
  next();
  const calendar = within(
    view.getByRole("group", { name: "Year activity calendar" }),
  );
  fireEvent.click(
    calendar.getByRole("button", { name: /2026-11-12: 9 activities/ }),
  );
  assert.ok(view.getByText("1–8 of 9"));
  next();
  fireEvent.change(view.getByRole("searchbox", { name: "Search places" }), {
    target: { value: "Page place 9" },
  });
  assert.ok(view.getByText("1–1 of 1"));
  assert.ok(view.getByText("Page place 9"));
});

test("map renders all filtered places while list pagination only renders one page", async () => {
  const view = fixture(paginatedSnapshot);
  fireEvent.click(view.getByRole("link", { name: "Beli" }));
  assert.equal(
    within(view.getByRole("list", { name: "Places" })).getAllByRole("listitem")
      .length,
    8,
  );
  fireEvent.click(view.getByRole("button", { name: "Map" }));
  await waitFor(() =>
    assert.equal(
      view.container.querySelectorAll(".food-map-marker").length,
      12,
    ),
  );
  assert.ok(!view.queryByRole("navigation", { name: "Place pagination" }));
});
