"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

export const PersonalView = createContext(false);
type Category = "Portfolio" | "Personal";

const categoryKey = "portfolio-category";
const personalHash = /^#(?:food|activity)$/;

function savedCategory(): Category {
  try {
    return window.sessionStorage.getItem(categoryKey) === "Personal"
      ? "Personal"
      : "Portfolio";
  } catch {
    return "Portfolio";
  }
}

export function PortfolioCategory({
  professional,
  personal,
}: {
  professional: ReactNode;
  personal: ReactNode;
}) {
  const [category, setCategory] = useState<Category>("Portfolio");

  useEffect(() => {
    const sync = () => {
      setCategory(
        personalHash.test(window.location.hash) ? "Personal" : savedCategory(),
      );
    };
    const initial = setTimeout(sync, 0);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("foodopen", sync);
    return () => {
      clearTimeout(initial);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("foodopen", sync);
    };
  }, []);

  return (
    <div className="space-y-8 print:space-y-6">
      <div
        role="group"
        aria-label="Portfolio category"
        data-personal={category === "Personal"}
        className="portfolio-category-selector print:hidden"
      >
        {(["Portfolio", "Personal"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={category === option}
            className="skill-group-label font-mono"
            onClick={() => {
              if (personalHash.test(window.location.hash))
                window.history.replaceState(
                  null,
                  "",
                  window.location.pathname + window.location.search,
                );
              setCategory(option);
              try {
                window.sessionStorage.setItem(categoryKey, option);
              } catch {
                // The tab remains usable when browser storage is unavailable.
              }
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={category === "Personal" ? "hidden print:block" : undefined}
      >
        <div className="space-y-8 print:space-y-6">{professional}</div>
      </div>
      <div hidden={category !== "Personal"} className="space-y-8 print:hidden">
        <PersonalView.Provider value={category === "Personal"}>
          {personal}
        </PersonalView.Provider>
      </div>
    </div>
  );
}
