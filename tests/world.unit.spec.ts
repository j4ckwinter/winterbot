import { test, expect } from "@playwright/test";
import {
  canWalk,
  TOWN_START,
  destinationAt,
  roomLayouts,
  findRoute,
  landmarks,
  places,
  trees,
  fences,
  type Scene,
} from "../src/components/town/world";

test("scenery blocks walking while bridge and entrances remain open", () => {
  expect(canWalk("town", NaN, 390)).toBe(false);
  expect(canWalk("town", 435, 480)).toBe(true);
  expect(canWalk("town", 535, 345)).toBe(true);
  expect(canWalk("town", 480, Infinity)).toBe(false);
  expect(canWalk("town", 360, 320)).toBe(false);
  expect(canWalk("town", 860, 300)).toBe(false);
  expect(canWalk("town", 860, 390)).toBe(true);
  for (const [x, y] of fences)
    expect(canWalk("town", x + 30, y + 20)).toBe(false);
  for (const [x, y] of trees)
    expect(canWalk("town", x + 29, y + 45)).toBe(false);
  for (const p of places) expect(canWalk("town", p.x, p.y)).toBe(true);
  expect(canWalk("workshop", 480, 250)).toBe(false);
  expect(canWalk("workshop", 480, 550)).toBe(true);
  expect(canWalk("home", 115, 520)).toBe(false);
  expect(canWalk("post", 845, 520)).toBe(false);
  expect(canWalk("home", 200, 400)).toBe(false);
  expect(canWalk("home", 480, 420)).toBe(true);
  expect(canWalk("home", 650, 430)).toBe(false);
  expect(canWalk("station", 700, 250)).toBe(false);
  expect(canWalk("station", 700, 390)).toBe(true);
  expect(canWalk("post", 700, 400)).toBe(true);
  expect(canWalk("post", 480, 280)).toBe(false);
  expect(canWalk("workshop", 230, 470)).toBe(true);
});

test("routes reach all objects without crossing collision rectangles", () => {
  for (const scene of [
    "town",
    "workshop",
    "home",
    "station",
    "post",
  ] as Scene[]) {
    let start = scene === "town" ? { ...TOWN_START } : { x: 480, y: 550 };
    for (const destination of landmarks(scene)) {
      const route = findRoute(scene, start, destination);
      expect(route.length).toBeGreaterThan(0);
      for (const p of route) expect(canWalk(scene, p.x, p.y)).toBe(true);
      expect(route.at(-1)).toMatchObject({
        x: destination.x,
        y: destination.y,
      });
      if (scene !== "town") {
        const back = findRoute(scene, destination, { x: 480, y: 590 });
        expect(back.length).toBeGreaterThan(0);
        for (const point of back)
          expect(canWalk(scene, point.x, point.y)).toBe(true);
      }
      start = destination;
    }
  }
  expect(findRoute("town", { x: 480, y: 390 }, { x: 360, y: 320 })).toEqual([]);
});

test("room objects route clicks to the matching interaction", () => {
  for (const scene of ["workshop", "home", "station", "post"] as const) {
    roomLayouts[scene].objects.forEach((object, index) => {
      const [left, top, right, bottom] = object.bounds;
      expect(
        destinationAt(scene, { x: (left + right) / 2, y: (top + bottom) / 2 }),
      ).toEqual(landmarks(scene)[index]);
    });
  }
});

test("routes reach points beside furniture without clipping the final segment", () => {
  const [left, , , bottom] = roomLayouts.post.furniture[0];
  for (const destination of [
    { x: left - 2, y: bottom - 3 },
    { x: left - 2, y: bottom - 5 },
  ]) {
    const entrance = { x: 480, y: 550 };
    for (const [start, end] of [
      [entrance, destination],
      [destination, entrance],
    ]) {
      const route = findRoute("post", start, end);
      expect(route.length).toBeGreaterThan(0);
      expect(route.at(-1)).toEqual(end);
      let previous = start;
      for (const point of route) {
        const samples = Math.max(
          1,
          Math.ceil(Math.hypot(point.x - previous.x, point.y - previous.y) * 4),
        );
        for (let sample = 0; sample <= samples; sample++) {
          const fraction = sample / samples;
          expect(
            canWalk(
              "post",
              previous.x + (point.x - previous.x) * fraction,
              previous.y + (point.y - previous.y) * fraction,
            ),
          ).toBe(true);
        }
        previous = point;
      }
    }
  }
});
