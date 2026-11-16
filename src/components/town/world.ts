import { getProject, type ProjectId } from "./projects";
export type Place = "workshop" | "home" | "station" | "post";
export type Scene = "town" | Place;
export type Point = { x: number; y: number };
export const MAP_WIDTH = 960;
export const MAP_HEIGHT = 640;
export const MAP_VIEW_BOX = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;
export const GRID_STEP = 10;
export const TOWN_START: Point = { x: 210, y: 330 };
export const TOWN_SQUARE: Point = { x: 480, y: 390 };
export const ROOM_ENTRY: Point = { x: 480, y: 550 };
export const INTERACTION_REACH = 48;
export const LABEL_HIGHLIGHT_REACH = 90;
export const OBJECT_GLOW_REACH = 75;
export const DOOR_OPEN_REACH = 68;
export const CAT_ALERT_REACH = 75;
export function snapToGrid({ x, y }: Point): Point {
  return {
    x: Math.round(x / GRID_STEP) * GRID_STEP,
    y: Math.round(y / GRID_STEP) * GRID_STEP,
  };
}
export function isWithin(a: Point, b: Point, distance: number) {
  return Math.hypot(a.x - b.x, a.y - b.y) < distance;
}
export type Direction = "up" | "down" | "left" | "right";
export type Action =
  | { kind: "enter"; place: Place }
  | { kind: "exit" }
  | { kind: "inspect"; place: Place; project?: ProjectId };
export type Landmark = Point & {
  id: string;
  name: string;
  labelY: number;
  action: Action;
};
export const roomExit: Landmark = {
  id: "exit",
  name: "Return to town",
  x: 480,
  y: 590,
  labelY: 590,
  action: { kind: "exit" },
};
export const places: {
  id: Place;
  name: string;
  content: string;
  x: number;
  y: number;
  labelY: number;
}[] = [
  {
    id: "workshop",
    name: "The Workshop",
    content: "Projects",
    x: 210,
    y: 300,
    labelY: 105,
  },
  {
    id: "home",
    name: "Jack’s House",
    content: "About & skills",
    x: 660,
    y: 280,
    labelY: 95,
  },
  {
    id: "station",
    name: "Winter Station",
    content: "Experience",
    x: 215,
    y: 595,
    labelY: 430,
  },
  {
    id: "post",
    name: "The Post Office",
    content: "Contact",
    x: 645,
    y: 595,
    labelY: 430,
  },
];
export const trees = [
  ...Array.from({ length: 13 }, (_, i) => [i * 65 + 5, 0]),
  ...[5, 70, 135, 720, 785].map((x) => [x, 585]),
  ...Array.from({ length: 8 }, (_, i) => [5, i * 72 + 40]),
  [340, 130],
  [370, 175],
  [750, 150],
  [740, 220],
  [335, 475],
  [370, 520],
  [60, 280],
  [95, 300],
  [700, 320],
  [740, 345],
  [570, 40],
];
export const fences = [
  [124, 304],
  [240, 304],
  [585, 288],
  [680, 288],
];
const buildings = [
  [113, 125, 307, 285],
  [583, 115, 737, 265],
  [113, 445, 317, 575],
  [563, 445, 727, 575],
];
type Rect = readonly [number, number, number, number];
export const roomLayouts: Record<
  Place,
  {
    bounds: Rect;
    furniture: Rect[];
    objects: {
      bounds: Rect;
      x: number;
      y: number;
      labelY: number;
      project?: ProjectId;
      name?: string;
    }[];
  }
> = {
  workshop: {
    bounds: [90, 190, 870, 605],
    furniture: [
      [90, 490, 140, 550],
      [820, 490, 870, 550],
      [150, 190, 310, 330],
      [400, 190, 560, 260],
      [650, 290, 810, 390],
    ],
    objects: [
      {
        bounds: [150, 190, 310, 330],
        x: 230,
        y: 370,
        labelY: 170,
        project: "winterbot",
      },
      {
        bounds: [400, 190, 560, 260],
        x: 480,
        y: 300,
        labelY: 170,
        project: "brain-cache",
      },
      {
        bounds: [650, 290, 810, 390],
        x: 730,
        y: 430,
        labelY: 270,
        project: "pancake-stack",
      },
    ],
  },
  home: {
    bounds: [240, 190, 720, 605],
    furniture: [
      [410, 190, 550, 340],
      [600, 370, 710, 510],
      [250, 400, 370, 490],
    ],
    objects: [{ bounds: [410, 190, 550, 340], x: 480, y: 370, labelY: 170 }],
  },
  station: {
    bounds: [90, 310, 870, 605],
    furniture: [
      [390, 310, 570, 400],
      [140, 450, 320, 490],
      [640, 450, 820, 490],
    ],
    objects: [
      {
        bounds: [390, 230, 570, 400],
        x: 480,
        y: 430,
        labelY: 205,
        name: "Career history",
      },
    ],
  },
  post: {
    bounds: [90, 190, 870, 605],
    furniture: [
      [388, 190, 572, 330],
      [820, 490, 870, 550],
      [100, 430, 250, 500],
    ],
    objects: [{ bounds: [388, 190, 572, 330], x: 480, y: 370, labelY: 170 }],
  },
};
const TOWN_BOUNDS: Rect = [60, 75, 940, 615];
const POND: Rect = [312, 292, 407, 352];
const NOTICEBOARD: Rect = [72, 428, 122, 479];
const BRIDGE = { fromX: 800, top: 375, bottom: 405 };
const fenceFootprint = ([x, y]: number[]): Rect => [x - 4, y, x + 68, y + 38];
const treeFootprint = ([x, y]: number[]): Rect => [
  x + 6,
  y + 25,
  x + 52,
  y + 65,
];
const townObstacles = [
  ...buildings,
  POND,
  ...fences.map(fenceFootprint),
  ...trees.map(treeFootprint),
  NOTICEBOARD,
];
export function canWalk(scene: Scene, x: number, y: number) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  const bounds = scene === "town" ? TOWN_BOUNDS : roomLayouts[scene].bounds;
  if (x < bounds[0] || y < bounds[1] || x > bounds[2] || y > bounds[3])
    return false;
  if (
    scene === "town" &&
    x > BRIDGE.fromX &&
    (y < BRIDGE.top || y > BRIDGE.bottom)
  )
    return false;
  return !(
    scene === "town" ? townObstacles : roomLayouts[scene].furniture
  ).some(([l, t, r, b]) => x > l && x < r && y > t && y < b);
}
export function landmarks(scene: Scene): Landmark[] {
  if (scene === "town")
    return places.map((p) => ({
      ...p,
      action: { kind: "enter", place: p.id },
    }));
  const placeContent = places.find((place) => place.id === scene)!.content;
  return roomLayouts[scene].objects.map((object, i) => ({
    id: `${scene}-${object.project ?? i}`,
    name: object.project
      ? getProject(object.project).name
      : (object.name ?? placeContent),
    x: object.x,
    y: object.y,
    labelY: object.labelY,
    action: {
      kind: "inspect" as const,
      place: scene,
      project: object.project,
    },
  }));
}
export function landmarkInReach(
  scene: Scene,
  position: Point,
): Landmark | undefined {
  return [...landmarks(scene), ...(scene === "town" ? [] : [roomExit])].find(
    (landmark) => isWithin(position, landmark, INTERACTION_REACH),
  );
}
export function destinationAt(
  scene: Scene,
  point: Point,
): Landmark | undefined {
  const objects = landmarks(scene);
  const bounds =
    scene === "town"
      ? buildings
      : roomLayouts[scene].objects.map((object) => object.bounds);
  return objects.find((_, i) => {
    const [l, t, r, b] = bounds[i];
    return point.x >= l && point.x <= r && point.y >= t && point.y <= b;
  });
}
function canTraverse(scene: Scene, start: Point, end: Point) {
  const steps = Math.max(
    1,
    Math.ceil(Math.hypot(end.x - start.x, end.y - start.y) / 2),
  );
  return Array.from({ length: steps + 1 }, (_, i) => i / steps).every((t) =>
    canWalk(
      scene,
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t,
    ),
  );
}
export function findRoute(scene: Scene, start: Point, end: Point): Point[] {
  const nearbyGridPoints = (point: Point) => {
    const snapped = snapToGrid(point);
    const offsets = [-GRID_STEP, 0, GRID_STEP];
    return offsets
      .flatMap((dx) =>
        offsets.map((dy) => ({ x: snapped.x + dx, y: snapped.y + dy })),
      )
      .filter((candidate) => canTraverse(scene, point, candidate))
      .sort(
        (a, b) =>
          Math.hypot(a.x - point.x, a.y - point.y) -
          Math.hypot(b.x - point.x, b.y - point.y),
      );
  };
  const key = (p: Point) => `${p.x},${p.y}`;
  const origin = nearbyGridPoints(start)[0];
  const goals = new Set(nearbyGridPoints(end).map(key));
  if (!origin || goals.size === 0) return [];
  const queue = [origin];
  const previous = new Map<string, Point | null>([[key(origin), null]]);
  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    if (goals.has(key(current))) {
      const path: Point[] = [end];
      let node: Point | null = current;
      while (node) {
        path.unshift(node);
        node = previous.get(key(node)) ?? null;
      }
      return path;
    }
    for (const [dx, dy] of [
      [GRID_STEP, 0],
      [-GRID_STEP, 0],
      [0, GRID_STEP],
      [0, -GRID_STEP],
    ]) {
      const next = { x: current.x + dx, y: current.y + dy };
      if (canTraverse(scene, current, next) && !previous.has(key(next))) {
        previous.set(key(next), current);
        queue.push(next);
      }
    }
  }
  return [];
}
