import { test, expect } from "@playwright/test";
import {
  advance,
  frameDistance,
  isMovementKey,
  MAX_FRAME_SECONDS,
  WALK_SPEED,
} from "../src/components/town/movement";
import { TOWN_START } from "../src/components/town/world";

test("a frame moves at walking speed, capped after a long pause and never backwards", () => {
  expect(frameDistance(10)).toBeCloseTo(0.01 * WALK_SPEED);
  expect(frameDistance(1000)).toBeCloseTo(MAX_FRAME_SECONDS * WALK_SPEED);
  expect(frameDistance(-5)).toBe(0);
});

test("arrows and WASD steer the same way, diagonals are not faster and opposites cancel", () => {
  const none = new Set<string>();
  expect(isMovementKey("w")).toBe(true);
  expect(isMovementKey("enter")).toBe(false);
  const arrows = advance(
    "town",
    TOWN_START,
    undefined,
    new Set(["arrowright", "arrowdown"]),
    10,
  );
  const letters = advance(
    "town",
    TOWN_START,
    undefined,
    new Set(["d", "s"]),
    10,
  );
  expect(letters).toEqual(arrows);
  expect(
    Math.hypot(
      arrows.position.x - TOWN_START.x,
      arrows.position.y - TOWN_START.y,
    ),
  ).toBeCloseTo(10);
  const cancelled = advance(
    "town",
    TOWN_START,
    undefined,
    new Set(["a", "d"]),
    10,
  );
  expect(cancelled).toEqual({
    position: TOWN_START,
    reachedTarget: false,
    facing: undefined,
  });
  expect(
    advance("town", TOWN_START, undefined, none, 10).facing,
  ).toBeUndefined();
});

test("a route target within reach is reached exactly, and a further one is walked towards", () => {
  const near = { x: TOWN_START.x + 5, y: TOWN_START.y };
  expect(advance("town", TOWN_START, near, new Set(), 10)).toEqual({
    position: near,
    reachedTarget: true,
    facing: "right",
  });
  const far = { x: TOWN_START.x, y: TOWN_START.y + 100 };
  const step = advance("town", TOWN_START, far, new Set(), 10);
  expect(step).toEqual({
    position: { x: TOWN_START.x, y: TOWN_START.y + 10 },
    reachedTarget: false,
    facing: "down",
  });
});

test("walking into the town edge slides along it instead of stopping", () => {
  const atEdge = { x: 62, y: 340 };
  const slid = advance(
    "town",
    atEdge,
    undefined,
    new Set(["arrowleft", "arrowdown"]),
    10,
  );
  expect(slid.position.x).toBe(atEdge.x);
  expect(slid.position.y).toBeGreaterThan(atEdge.y);
  expect(slid.facing).toBe("down");
});
