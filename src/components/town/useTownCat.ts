import { useEffect, useState } from "preact/hooks";
import { canWalk, type Point } from "./world";

const rests: Point[] = [
  { x: 548, y: 233 },
  { x: 548, y: 273 },
  { x: 513, y: 273 },
  { x: 548, y: 273 },
];

export function useTownCat() {
  const [position, setPosition] = useState(rests[0]);
  const [walking, setWalking] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let point = rests[0];
    let target = 1;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (delay: number) => {
      if (!document.hidden && !media.matches) timer = setTimeout(step, delay);
    };
    const step = () => {
      const goal = rests[target];
      const dx = goal.x - point.x,
        dy = goal.y - point.y;
      const distance = Math.hypot(dx, dy);
      if (distance <= 2) {
        point = goal;
        setPosition(point);
        setWalking(false);
        target = (target + 1) % rests.length;
        schedule(4500);
        return;
      }
      const next = {
        x: point.x + (dx / distance) * 2,
        y: point.y + (dy / distance) * 2,
      };
      if (!canWalk("town", next.x + 13, next.y + 26)) {
        setWalking(false);
        return;
      }
      point = next;
      setPosition(point);
      setWalking(true);
      schedule(100);
    };
    const sync = () => {
      clearTimeout(timer);
      setWalking(false);
      if (media.matches) {
        point = rests[0];
        target = 1;
        setPosition(point);
      }
      schedule(4500);
    };
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      clearTimeout(timer);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return { position, walking };
}
