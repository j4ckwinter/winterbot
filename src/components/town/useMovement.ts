import { useEffect, useRef, useState } from "preact/hooks";
import type { RefObject } from "preact";
import {
  canWalk,
  TOWN_START,
  type Action,
  type Direction,
  type Point,
  type Scene,
} from "./world";

export function useMovement(
  dialog: RefObject<HTMLDialogElement>,
  onArrival: RefObject<(action: Action) => void>,
) {
  const [scene, setScene] = useState<Scene>("town");
  const [position, setPosition] = useState<Point>({ ...TOWN_START });
  const engine = useRef({
    scene: "town" as Scene,
    position: { ...TOWN_START },
  });
  const [direction, setDirection] = useState<Direction>("up");
  const [walking, setWalking] = useState(false);
  const [walkTarget, setWalkTarget] = useState<Point | null>(null);
  const [walkPath, setWalkPath] = useState<Point[]>([]);
  const keys = useRef(new Set<string>());
  const route = useRef<Point[]>([]);
  const destination = useRef<Action | null>(null);
  const cancelRoute = () => {
    route.current = [];
    destination.current = null;
    setWalkTarget(null);
    setWalkPath([]);
  };
  const stop = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    keys.current.clear();
    cancelRoute();
    setWalking(false);
  };
  const stepDirection = (direction: Direction) => {
    stop();
    const offsets = {
      up: [0, -10],
      down: [0, 10],
      left: [-10, 0],
      right: [10, 0],
    };
    const [dx, dy] = offsets[direction];
    const next = {
      x: engine.current.position.x + dx,
      y: engine.current.position.y + dy,
    };
    setDirection(direction);
    if (canWalk(engine.current.scene, next.x, next.y)) {
      engine.current.position = next;
      setPosition(next);
    }
  };
  const frame = useRef<number | null>(null);
  const last = useRef(0);
  const wake = () => {
    if (frame.current === null) {
      last.current = performance.now();
      frame.current = requestAnimationFrame(tick);
    }
  };
  const tick = (time: number) => {
    frame.current = null;
    const step =
      Math.max(0, Math.min((time - last.current) / 1000, 0.035)) * 190;
    last.current = time;
    if (!dialog.current?.open) {
      const old = engine.current.position;
      let { x, y } = old;
      let dx = 0,
        dy = 0;
      const target = route.current[0];
      if (target) {
        const distance = Math.hypot(target.x - x, target.y - y);
        if (distance <= step) {
          x = target.x;
          y = target.y;
          route.current.shift();
        } else {
          dx = (target.x - x) / distance;
          dy = (target.y - y) / distance;
        }
      } else {
        dx =
          Number(keys.current.has("arrowright") || keys.current.has("d")) -
          Number(keys.current.has("arrowleft") || keys.current.has("a"));
        dy =
          Number(keys.current.has("arrowdown") || keys.current.has("s")) -
          Number(keys.current.has("arrowup") || keys.current.has("w"));
        const length = Math.hypot(dx, dy);
        if (length) {
          dx /= length;
          dy /= length;
        }
      }
      if (canWalk(engine.current.scene, x + dx * step, y)) x += dx * step;
      if (canWalk(engine.current.scene, x, y + dy * step)) y += dy * step;
      const moved = x !== old.x || y !== old.y;
      if (moved) {
        const mx = x - old.x,
          my = y - old.y;
        setDirection(
          Math.abs(mx) > Math.abs(my)
            ? mx > 0
              ? "right"
              : "left"
            : my > 0
              ? "down"
              : "up",
        );
        engine.current.position = { x, y };
        setPosition({ x, y });
      }
      setWalking(moved);
      if (!route.current.length && target) {
        setWalkTarget(null);
        setWalkPath([]);
      }
      if (!route.current.length && destination.current) {
        const action = destination.current;
        destination.current = null;
        onArrival.current?.(action);
      }
    }
    if (keys.current.size || route.current.length) {
      frame.current = requestAnimationFrame(tick);
    } else setWalking(false);
  };
  useEffect(() => {
    const clear = () => stop();
    const visibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", clear);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", clear);
    };
  }, []);
  return {
    scene,
    setScene,
    position,
    setPosition,
    engine,
    direction,
    setDirection,
    walking,
    keys,
    route,
    destination,
    walkTarget,
    setWalkTarget,
    walkPath,
    setWalkPath,
    cancelRoute,
    stop,
    stepDirection,
    wake,
  };
}
