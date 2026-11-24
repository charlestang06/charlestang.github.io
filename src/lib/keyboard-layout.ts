import type { SkillGroup } from "./portfolio-types";

export type SkillKey = { skill: string; group: number; span: number };

export function getKeysPerRow(width: number) {
  return width >= 560 ? 9 : width >= 400 ? 7 : 4;
}

export function getKeyboardRows(
  groups: readonly SkillGroup[],
  keysPerRow: number,
): SkillKey[][] {
  const keys = groups.flatMap((group, index) =>
    group.skills.map((skill) => ({
      skill,
      group: index,
      span: Math.max(7, skill.length + 3),
    })),
  );
  const rowCount = Math.ceil(keys.length / keysPerRow);
  const rows: SkillKey[][] = [];
  let offset = 0;
  for (let row = 0; row < rowCount; row++) {
    const count = Math.ceil((keys.length - offset) / (rowCount - row));
    rows.push(keys.slice(offset, offset + count));
    offset += count;
  }
  return rows;
}
