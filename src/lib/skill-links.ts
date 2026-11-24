import type { Experience, Project, SkillGroup } from "./portfolio-types";

export const entryId = (
  kind: "project" | "experience" | "certificate",
  name: string,
) =>
  `${kind}-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

// Explicit connections from the resume and project sources; keep these
// separate from visible technology tags so labels can stay concise.
export const allExperienceSkills = ["Git", "GitHub", "REST APIs"] as const;
export const experienceSkills: Record<string, readonly string[]> = {
  "Palantir Technologies": ["Java", "SQL", "Trino", "Spark", "AWS", "Docker"],
  Stripe: ["TypeScript", "JavaScript", "Playwright", "Go", "Git", "Bazel"],
  "Cisco Meraki": ["Python", "Docker", "Jenkins", "LangGraph", "Linux"],
  "BJ's Wholesale Club": ["Python", "SQL", "REST APIs"],
  "IOMICS Corporation": [
    "Python",
    "LangChain",
    "FastAPI",
    "PostgreSQL",
    "Docker",
  ],
  "Iridium Tutoring": ["Django", "MySQL"],
};

export const projectSkills: Record<string, readonly string[]> = {
  "MAMS SISO": ["Postman"],
  // fullstackatbrown/project-necysc README and models/views/templates.
  "NECYSC Camp App": ["Python", "JavaScript", "HTML/CSS"],
  // charlestang06/finsight: finance-rag-server/main.py and web-app/src.
  "Finsight (FinnAI)": ["Python", "JavaScript", "HTML/CSS", "REST APIs"],
  // charlestang06/iridisite README and .github/workflows/django.yml.
  "Iridium Tutoring Portal": [
    "Python",
    "JavaScript",
    "HTML/CSS",
    "Git",
    "GitHub",
  ],
  // WPI-Roadmap/client-side/src and server-side/index.js.
  "WPI Roadmap": ["JavaScript", "HTML/CSS", "REST APIs"],
  // Pantry-Access-AFG/react-app/src.
  "Pantry Access": ["JavaScript"],
  // charlestang06/buzz-board: app/ui, globals.css and api/scores/route.ts.
  "Buzz Board": [
    "TypeScript",
    "React",
    "Tailwind CSS",
    "HTML/CSS",
    "REST APIs",
  ],
  // suegrg/cafe-providence: app/components TSX and styles/globals.css.
  "Cafe Providence": ["TypeScript", "React", "Tailwind CSS", "HTML/CSS"],
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");
const aliases: Record<string, readonly string[]> = {
  nodejs: ["node", "nodejs"],
  react: ["react", "reactjs"],
  sql: ["sql", "mysql", "postgres", "postgresql"],
  postgresql: ["postgres", "postgresql"],
  tailwindcss: ["tailwind", "tailwindcss"],
  expressjs: ["express", "expressjs"],
};
const sectionConnections: Record<
  string,
  { label: string; items: { title: string; href: string }[] }
> = {
  LaTeX: { label: "Writing", items: [{ title: "Papers", href: "#papers" }] },
  "C++": {
    label: "Education",
    items: [{ title: "Coursework", href: "#education" }],
  },
  MATLAB: {
    label: "Certificates",
    items: [
      {
        title: "MatLab Image Processing",
        href: `#${entryId("certificate", "MatLab Image Processing")}`,
      },
    ],
  },
};

export function buildSkillPanels(
  groups: readonly SkillGroup[],
  projects: readonly Project[],
  experiences: readonly Pick<Experience, "company">[],
) {
  return groups
    .flatMap((group) => group.skills)
    .map((skill) => {
      const terms = aliases[normalize(skill)] ?? [normalize(skill)];
      const matches = (tags: readonly string[]) =>
        tags.some((tag) => terms.includes(normalize(tag)));
      return {
        skill,
        connections: [
          {
            label: "Experience",
            items: experiences
              .filter((experience) =>
                matches([
                  ...allExperienceSkills,
                  ...(experienceSkills[experience.company] ?? []),
                ]),
              )
              .map((experience) => ({
                title: experience.company,
                href: `#${entryId("experience", experience.company)}`,
              })),
          },
          {
            label: "Projects",
            items: projects
              .filter((project) =>
                matches([
                  ...project.techStack,
                  ...(projectSkills[project.title] ?? []),
                ]),
              )
              .map((project) => ({
                title: project.title,
                href: `#${entryId("project", project.title)}`,
              })),
          },
          ...(sectionConnections[skill] ? [sectionConnections[skill]] : []),
        ].filter((group) => group.items.length > 0),
      };
    })
    .filter((panel) => panel.connections.length > 0);
}
