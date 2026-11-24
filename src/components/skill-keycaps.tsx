"use client";

import {
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { buildSkillPanels } from "@/lib/skill-links";
import { getKeyboardRows, getKeysPerRow } from "@/lib/keyboard-layout";
import type { Experience, Project, SkillGroup } from "@/lib/portfolio-types";

const keyLogos: Record<string, string> = {
  Java: "java",
  MATLAB: "matlab",
  Playwright: "playwright",
  VSCode: "vscode",
  gRPC: "grpc",

  Python: "python",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Go: "go",
  "C++": "cplusplus",
  LaTeX: "latex",
  React: "react",
  Django: "django",
  FastAPI: "fastapi",
  "Express.js": "express",
  LangChain: "langchain",
  LangGraph: "langgraph",
  "Tailwind CSS": "tailwindcss",
  Docker: "docker",
  Trino: "trino",
  Spark: "apachespark",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  Git: "git",
  GitHub: "github",
  Bazel: "bazel",
  Jenkins: "jenkins",
  "Node.js": "nodedotjs",
  Bash: "gnubash",
  Linux: "linux",
  Postman: "postman",
};
const keyLabels: Record<string, string> = {
  "HTML/CSS": "</>",
  "REST APIs": "API",
  SQL: "SQL",
};
const categoryColors = ["#555555", "#666666", "#777777", "#444444"];
export function SkillKeycaps({
  groups,
  projects,
  experiences,
}: {
  groups: readonly SkillGroup[];
  projects: readonly Project[];
  experiences: readonly Pick<Experience, "company">[];
}) {
  const id = useId().replace(/:/g, "");
  const board = useRef<HTMLDivElement>(null);
  const [keysPerRow, setKeysPerRow] = useState(9);
  const [selected, setSelected] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const linkedSkills = useMemo(
    () => buildSkillPanels(groups, projects, experiences),
    [groups, projects, experiences],
  );
  const rows = getKeyboardRows(groups, keysPerRow);

  useLayoutEffect(() => {
    const element = board.current;
    if (!element) return;
    function measure() {
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      setKeysPerRow(getKeysPerRow(bounds.width));
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="skill-instrument"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setSelected(null);
          setHighlighted(0);
        }
      }}
    >
      <div
        className="skill-keyboard-labels"
        role="group"
        aria-label="Skill categories"
      >
        {groups.map((group, index) => (
          <button
            key={group.name}
            id={`${id}-group-${index}`}
            type="button"
            className="skill-group-label"
            aria-pressed={highlighted === index}
            style={
              {
                "--category-color":
                  categoryColors[index % categoryColors.length],
              } as CSSProperties
            }
            onClick={() => {
              setHighlighted(index);
              setSelected(null);
            }}
          >
            {group.name}
          </button>
        ))}
      </div>
      <div
        ref={board}
        className="skill-keyboard"
        role="group"
        aria-label="Skills keyboard"
      >
        {rows.map((row, index) => (
          <div
            key={index}
            className="skill-key-row"
            style={
              {
                "--key-units": row.reduce((sum, key) => sum + key.span, 0),
              } as CSSProperties
            }
          >
            {row.map((key) => (
              <button
                key={key.skill}
                type="button"
                className="skill-key"
                style={
                  {
                    gridColumn: `span ${key.span}`,
                    "--category-color":
                      categoryColors[key.group % categoryColors.length],
                  } as CSSProperties
                }
                data-group={key.group}
                data-dimmed={highlighted !== key.group}
                data-lit={highlighted === key.group}
                aria-describedby={`${id}-group-${key.group}`}
                aria-pressed={selected === key.skill}
                onClick={() => {
                  setHighlighted(key.group);
                  setSelected(selected === key.skill ? null : key.skill);
                }}
              >
                <span className="skill-key-face">
                  {keyLogos[key.skill] ? (
                    <span
                      className="skill-key-logo"
                      aria-hidden="true"
                      style={{
                        maskImage: `url(/skill-logos/${keyLogos[key.skill]}.svg)`,
                      }}
                    />
                  ) : (
                    <span className="skill-key-type" aria-hidden="true">
                      {keyLabels[key.skill] ?? key.skill}
                    </span>
                  )}
                  <span className="skill-key-name">{key.skill}</span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* Overlaid panels reserve the tallest link layout at every screen width.
          Inactive panels occupy space without exposing text or focusable links. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="grid pt-2 print:hidden"
      >
        {linkedSkills.map((panel) => (
          <div
            key={panel.skill}
            aria-hidden={selected !== panel.skill}
            inert={selected !== panel.skill}
            className={`skill-projects col-start-1 row-start-1 space-y-1 self-start font-mono text-[11px] leading-4 ${selected === panel.skill ? "visible" : "invisible"}`}
          >
            <p className="font-semibold">{panel.skill}</p>
            {panel.connections.map((group) => (
              <div
                key={group.label}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <span className="text-muted-foreground">{group.label}</span>
                {group.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-0.5 rounded-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {item.title}
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
