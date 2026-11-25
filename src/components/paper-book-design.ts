import {
  Bike,
  Bug,
  CarFront,
  createLucideIcon,
  Flower2,
  House,
  Map,
  Sprout,
  Footprints,
  type LucideIcon,
} from "lucide-react";

const Basketball = createLucideIcon("Basketball", [
  ["circle", { cx: "12", cy: "12", r: "9", key: "ball" }],
  [
    "path",
    {
      d: "M12 3v18M3 12h18M5.6 5.6a9 9 0 0 1 0 12.8M18.4 5.6a9 9 0 0 0 0 12.8",
      key: "seams",
    },
  ],
]);

export const topicIcons: Record<string, LucideIcon> = {
  "Food Web & Agriculture": Sprout,
  "March Madness": Basketball,
  "Dandelion Populations": Flower2,
  "Vehicle Trajectory on nuScenes": CarFront,
  "MA Mortgage Markets": House,
  "Land Use Analysis": Map,
  "Honeybee Populations": Bug,
  "E-Bike Demand": Bike,
  "A Simulated Study of Close Contacts in Pedestrian Models": Footprints,
};

export const bindings = [
  { background: "#d2d2d2", color: "#343434" },
  { background: "#373737", color: "#f5f5f5" },
  { background: "#a8a8a8", color: "#303030" },
  { background: "#e0e0e0", color: "#444444" },
  { background: "#595959", color: "#fafafa" },
  { background: "#bdbdbd", color: "#383838" },
  { background: "#292929", color: "#f0f0f0" },
  { background: "#939393", color: "#181818" },
];
