import assert from "node:assert/strict";
import { test } from "node:test";
import { RESUME_DATA } from "../src/data/resume-data";
import {
  buildSkillPanels,
  entryId,
  experienceSkills,
  projectSkills,
} from "../src/lib/skill-links";

test("every skill destination resolves to a real portfolio entry or section", () => {
  const targets = new Set([
    "#education",
    "#papers",
    ...RESUME_DATA.projects.map(
      (project) => `#${entryId("project", project.title)}`,
    ),
    ...RESUME_DATA.work.map(
      (work) => `#${entryId("experience", work.company)}`,
    ),
    ...RESUME_DATA.certificates.map(
      (certificate) => `#${entryId("certificate", certificate.title)}`,
    ),
  ]);
  for (const panel of buildSkillPanels(
    RESUME_DATA.skillGroups,
    RESUME_DATA.projects,
    RESUME_DATA.work,
  )) {
    for (const group of panel.connections)
      for (const item of group.items)
        assert.ok(
          targets.has(item.href),
          `${panel.skill}: ${item.href} has no destination`,
        );
  }
});

test("mapping overrides reference existing entries and skills", () => {
  const skills = new Set<string>(
    RESUME_DATA.skillGroups.flatMap((group) => group.skills),
  );
  const projects = new Set<string>(
    RESUME_DATA.projects.map((project) => project.title),
  );
  const companies = new Set<string>(
    RESUME_DATA.work.map((work) => work.company),
  );
  for (const [title, tags] of Object.entries(projectSkills)) {
    assert.ok(projects.has(title), `Unknown project: ${title}`);
    for (const skill of tags)
      assert.ok(skills.has(skill), `Unknown skill: ${skill}`);
  }
  for (const [company, tags] of Object.entries(experienceSkills)) {
    assert.ok(companies.has(company), `Unknown company: ${company}`);
    for (const skill of tags)
      assert.ok(skills.has(skill), `Unknown skill: ${skill}`);
  }
});
