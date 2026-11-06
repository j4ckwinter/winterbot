import { test, expect } from "@playwright/test";
import {
  contentHash,
  parseContentHash,
  type Content,
} from "../src/components/town/navigation";

test("section links round trip through their public hashes", () => {
  const sections: [string, Content][] = [
    ["#about", { place: "home" }],
    ["#experience", { place: "station" }],
    ["#contact", { place: "post" }],
    ["#profile", { place: "profile" }],
  ];
  for (const [hash, content] of sections) {
    expect(parseContentHash(hash)).toEqual(content);
    expect(contentHash(content)).toBe(hash);
  }
  expect(contentHash(null)).toBe("");
});

test("the projects shortcut opens the default project", () => {
  const content = parseContentHash("#projects");
  expect(content).toEqual({ place: "workshop", project: "winterbot" });
  expect(contentHash(content)).toBe("#projects/winterbot");
});

test("unknown or incomplete hashes do not select content", () => {
  for (const hash of [
    "",
    "#",
    "#unknown",
    "about",
    "#ABOUT",
    "#projects/",
    "#projects/unknown",
    "#projects/brain-cache/extra",
    "#projects/0",
  ]) {
    expect(parseContentHash(hash), hash).toBeNull();
  }
});
