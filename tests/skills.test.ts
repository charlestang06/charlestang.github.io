import assert from "node:assert/strict";
import { test } from "node:test";
import { getKeyboardRows, getKeysPerRow } from "../src/lib/keyboard-layout";
import { buildSkillPanels } from "../src/lib/skill-links";

const groups = [
  { name: "Languages", skills: ["C++", "Java", "JavaScript"] },
  { name: "Frameworks", skills: ["React", "Node.js", "Express.js", "SQL"] },
];

test("keyboard rows retain every skill in category order without mutating inputs", () => {
  const before = JSON.stringify(groups);
  for (const size of [4, 7, 9]) {
    const rows = getKeyboardRows(groups, size);
    assert.deepEqual(
      rows.flat().map((key) => key.skill),
      groups.flatMap((group) => group.skills),
    );
    assert.ok(rows.every((row) => row.length <= size && row.length > 0));
    assert.ok(
      rows.every((row) => row.every((key) => key.span >= key.skill.length + 3)),
    );
    assert.ok(
      Math.max(...rows.map((row) => row.length)) -
        Math.min(...rows.map((row) => row.length)) <=
        1,
    );
    assert.equal(rows.flat().find((key) => key.skill === "React")?.group, 1);
  }
  assert.equal(JSON.stringify(groups), before);
  assert.deepEqual(getKeyboardRows([], 4), []);
});

test("keyboard preserves the desktop/tablet/mobile breakpoints", () => {
  assert.equal(getKeysPerRow(560), 9);
  assert.equal(getKeysPerRow(559), 7);
  assert.equal(getKeysPerRow(400), 7);
  assert.equal(getKeysPerRow(399), 4);
});

test("skill aliases avoid false Java/JavaScript matches and link projects without external URLs", () => {
  const panels = buildSkillPanels(
    groups,
    [
      {
        title: "JS App",
        description: "",
        techStack: ["JavaScript", "ReactJS", "NodeJS", "ExpressJS", "MySQL"],
      },
      { title: "Java App", description: "", techStack: ["Java"] },
    ],
    [],
  );
  const titles = (skill: string) =>
    panels
      .find((panel) => panel.skill === skill)
      ?.connections.flatMap((group) => group.items.map((item) => item.title));
  assert.deepEqual(titles("Java"), ["Java App"]);
  for (const skill of ["JavaScript", "React", "Node.js", "Express.js", "SQL"])
    assert.deepEqual(titles(skill), ["JS App"]);
  assert.ok(
    panels
      .find((panel) => panel.skill === "C++")
      ?.connections.some((group) =>
        group.items.some((item) => item.href === "#education"),
      ),
  );
});
