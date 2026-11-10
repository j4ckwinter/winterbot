import { useEffect, useRef, useState } from "preact/hooks";
import type { Point } from "./world";

export type Print = Point & {
  id: number;
  age: number;
  sideways: boolean;
  left: boolean;
};

const SNOW_FILLS_IN_EVERY = 700;

const older = (prints: Print[], limit: number) =>
  prints
    .map((print) => ({ ...print, age: print.age + 1 }))
    .filter((print) => print.age < limit);

export function useTrail(point: Point, spacing: number, limit: number) {
  const [prints, setPrints] = useState<Print[]>([]);
  const last = useRef(point);
  const count = useRef(0);
  useEffect(() => {
    const dx = point.x - last.current.x;
    const dy = point.y - last.current.y;
    const distance = Math.hypot(dx, dy);
    if (distance < spacing) return;
    last.current = point;
    const jumped = distance > spacing * 3;
    if (jumped || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const id = ++count.current;
    setPrints((current) => [
      ...older(current, limit),
      {
        x: point.x,
        y: point.y,
        id,
        age: 0,
        sideways: Math.abs(dx) > Math.abs(dy),
        left: id % 2 === 0,
      },
    ]);
  }, [point.x, point.y]);
  const visible = prints.length > 0;
  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(
      () => setPrints((current) => older(current, limit)),
      SNOW_FILLS_IN_EVERY,
    );
    return () => window.clearInterval(timer);
  }, [visible, limit]);
  return prints;
}
