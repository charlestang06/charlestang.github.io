export type SkillGroup = { name: string; skills: readonly string[] };
export type Project = {
  title: string;
  description: string;
  techStack: readonly string[];
  link?: { href: string; label?: string };
  production?: boolean;
};
export type Experience = {
  company: string;
  logo: string;
  link: string;
  badges: readonly string[];
  title: string;
  start: string;
  end: string;
  description?: string;
};
export type Paper = {
  title: string;
  description: string;
  awards: readonly string[];
  awarded?: boolean;
  link: { href: string };
};
export type Certificate = {
  title: string;
  description: string;
  awardee: readonly string[];
  link: { href: string };
};
