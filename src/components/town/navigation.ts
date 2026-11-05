import { projects } from "./projects";
import type { Place } from "./world";
export type Content = { place: Place | "profile"; project?: 0 | 1 | 2 };
const sectionHashes = {
  home: "#about",
  station: "#experience",
  post: "#contact",
} as const;
export function contentHash(content: Content | null): string {
  if (!content) return "";
  if (content.place === "profile") return "#profile";
  if (content.place === "workshop")
    return `#projects/${projects[content.project ?? 0].slug}`;
  return sectionHashes[content.place];
}
export function parseContentHash(hash: string): Content | null {
  if (hash === "#profile") return { place: "profile" };
  if (hash === "#projects") return { place: "workshop", project: 0 };
  const index = projects.findIndex((p) => `#projects/${p.slug}` === hash);
  if (index >= 0) return { place: "workshop", project: index as 0 | 1 | 2 };
  const section = Object.entries(sectionHashes).find(
    ([, value]) => value === hash,
  );
  return section ? { place: section[0] as Exclude<Place, "workshop"> } : null;
}
