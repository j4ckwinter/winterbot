import { projects, DEFAULT_PROJECT, type ProjectId } from "./projects";
import type { Place } from "./world";
export type Content = { place: Place | "profile"; project?: ProjectId };
const sectionHashes = {
  home: "#about",
  station: "#experience",
  post: "#contact",
} as const;
export function contentHash(content: Content | null): string {
  if (!content) return "";
  if (content.place === "profile") return "#profile";
  if (content.place === "workshop")
    return `#projects/${content.project ?? DEFAULT_PROJECT}`;
  return sectionHashes[content.place];
}
export function parseContentHash(hash: string): Content | null {
  if (hash === "#profile") return { place: "profile" };
  if (hash === "#projects")
    return { place: "workshop", project: DEFAULT_PROJECT };
  const project = projects.find((p) => `#projects/${p.slug}` === hash);
  if (project) return { place: "workshop", project: project.slug };
  const section = Object.entries(sectionHashes).find(
    ([, value]) => value === hash,
  );
  return section ? { place: section[0] as Exclude<Place, "workshop"> } : null;
}
