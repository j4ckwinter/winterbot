import { test, expect } from "@playwright/test";
import { projects } from "../src/components/town/projects";
import {
  contentHash,
  parseContentHash,
} from "../src/components/town/navigation";
import { landmarks } from "../src/components/town/world";

test("reordering project cards preserves links and workshop machine identities", () => {
  const machines = landmarks("workshop");
  projects.reverse();
  try {
    expect(landmarks("workshop")).toEqual(machines);
    expect(contentHash({ place: "workshop" })).toBe("#projects/winterbot");
    for (const project of projects) {
      const hash = `#projects/${project.slug}`;
      expect(parseContentHash(hash)).toEqual({
        place: "workshop",
        project: project.slug,
      });
      expect(contentHash({ place: "workshop", project: project.slug })).toBe(
        hash,
      );
    }
  } finally {
    projects.reverse();
  }
});
