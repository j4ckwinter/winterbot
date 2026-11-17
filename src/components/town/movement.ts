import { canWalk, type Direction, type Point, type Scene } from "./world";

export const WALK_SPEED = 190;
export const MAX_FRAME_SECONDS = 0.035;

const keyDirections: Record<string, Direction> = {
  arrowup: "up",
  w: "up",
  arrowdown: "down",
  s: "down",
  arrowleft: "left",
  a: "left",
  arrowright: "right",
  d: "right",
};

export function isMovementKey(key: string) {
  return Object.hasOwn(keyDirections, key);
}

export function frameDistance(elapsedMs: number) {
  return (
    Math.max(0, Math.min(elapsedMs / 1000, MAX_FRAME_SECONDS)) * WALK_SPEED
  );
}

function heldHeading(keys: ReadonlySet<string>): Point {
  const held = new Set([...keys].map((key) => keyDirections[key]));
  const x = Number(held.has("right")) - Number(held.has("left"));
  const y = Number(held.has("down")) - Number(held.has("up"));
  const length = Math.hypot(x, y);
  return length ? { x: x / length, y: y / length } : { x: 0, y: 0 };
}

function facing(from: Point, to: Point): Direction {
  const mx = to.x - from.x;
  const my = to.y - from.y;
  if (Math.abs(mx) > Math.abs(my)) return mx > 0 ? "right" : "left";
  return my > 0 ? "down" : "up";
}

export function advance(
  scene: Scene,
  from: Point,
  target: Point | undefined,
  keys: ReadonlySet<string>,
  distance: number,
): { position: Point; reachedTarget: boolean; facing?: Direction } {
  let { x, y } = from;
  let heading = { x: 0, y: 0 };
  let reachedTarget = false;
  if (target) {
    const remaining = Math.hypot(target.x - x, target.y - y);
    if (remaining <= distance) {
      x = target.x;
      y = target.y;
      reachedTarget = true;
    } else
      heading = {
        x: (target.x - x) / remaining,
        y: (target.y - y) / remaining,
      };
  } else heading = heldHeading(keys);
  if (canWalk(scene, x + heading.x * distance, y)) x += heading.x * distance;
  if (canWalk(scene, x, y + heading.y * distance)) y += heading.y * distance;
  const position = { x, y };
  const moved = x !== from.x || y !== from.y;
  return {
    position,
    reachedTarget,
    facing: moved ? facing(from, position) : undefined,
  };
}
