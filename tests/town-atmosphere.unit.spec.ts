import { test, expect } from "@playwright/test";
import { townAtmosphere } from "../src/components/town/townAtmosphere";

test("light follows London daylight through the year, including either side of a clock change", () => {
  for (const [instant, light] of [
    ["2026-12-21T07:30:00Z", "night"],
    ["2026-12-21T12:00:00Z", "day"],
    ["2026-12-21T16:30:00Z", "night"],
    ["2026-06-21T03:30:00Z", "night"],
    ["2026-06-21T04:00:00Z", "day"],
    ["2026-06-21T19:30:00Z", "day"],
    ["2026-06-21T21:00:00Z", "night"],
    ["2026-10-20T16:30:00Z", "day"],
    ["2026-10-30T17:30:00Z", "night"],
    ["2026-03-31T05:00:00Z", "night"],
    ["2026-03-31T12:00:00Z", "day"],
  ]) {
    expect(townAtmosphere(new Date(instant)).light, instant).toBe(light);
  }
});

test("weather holds for a three-hour block and varies across blocks", () => {
  const at = (instant: string) => townAtmosphere(new Date(instant)).weather;
  expect(at("2026-01-10T09:00:00Z")).toBe(at("2026-01-10T11:59:00Z"));
  const month = Array.from({ length: 31 * 8 }, (_, block) =>
    at(new Date(Date.UTC(2026, 0, 1, block * 3)).toISOString()),
  );
  for (const weather of ["clear", "snow", "heavy"]) {
    expect(month.filter((value) => value === weather).length).toBeGreaterThan(
      20,
    );
  }
});

test("URL overrides win and unknown values are ignored", () => {
  const midnight = new Date("2026-01-01T00:00:00Z");
  expect(townAtmosphere(midnight, "?time=day&weather=heavy")).toEqual({
    light: "day",
    weather: "heavy",
  });
  expect(townAtmosphere(midnight, "?time=noon&weather=rain")).toEqual(
    townAtmosphere(midnight),
  );
});
