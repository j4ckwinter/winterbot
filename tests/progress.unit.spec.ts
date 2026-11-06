import { test, expect } from "@playwright/test";
import { parseProgress } from "../src/components/town/useProgress";

const empty = { version: 1, season: "leaf", visited: [] };

test("missing or invalid saved progress falls back to a fresh visit", () => {
  for (const value of [
    null,
    "{broken json",
    "null",
    "[]",
    "42",
    '"text"',
    "{}",
    JSON.stringify({ version: 2, season: "leaf", visited: [] }),
    JSON.stringify({ version: 1, season: "winter", visited: [] }),
    JSON.stringify({ version: 1, season: "fire", visited: "workshop" }),
    JSON.stringify({ version: 1, visited: [] }),
    JSON.stringify({ season: "leaf", visited: [] }),
    JSON.stringify({ version: 1, season: "leaf" }),
  ]) {
    expect(parseProgress(value), `saved value: ${value}`).toEqual(empty);
  }
});

test("saved discoveries are validated and deduplicated while preserving season", () => {
  for (const season of ["leaf", "fire"]) {
    expect(
      parseProgress(
        JSON.stringify({
          version: 1,
          season,
          visited: [
            "workshop",
            "unknown",
            "workshop",
            "post",
            null,
            1,
            {},
            "home",
            "station",
          ],
        }),
      ),
    ).toEqual({
      version: 1,
      season,
      visited: ["workshop", "post", "home", "station"],
    });
  }
});

test("fresh visits do not share mutable discoveries", () => {
  const first = parseProgress(null);
  first.visited.push("home");
  expect(parseProgress(null)).toEqual(empty);
});
