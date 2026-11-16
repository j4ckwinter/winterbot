import type { RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";
import { MAP_HEIGHT, MAP_WIDTH, type Point } from "./world";

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function useTownCamera(
  world: RefObject<HTMLDivElement>,
  position: Point,
) {
  const [ready, setReady] = useState(false);
  const [overview, setOverview] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState({ width: MAP_WIDTH, height: MAP_HEIGHT });
  useEffect(() => {
    setReady(true);
    if (window.matchMedia("(max-width: 760px)").matches) setOverview(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    if (world.current) observer.observe(world.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  const scale =
    overview || reduced
      ? Math.min(size.width / MAP_WIDTH, size.height / MAP_HEIGHT)
      : Math.max(1, Math.min(size.width / MAP_WIDTH, size.height / MAP_HEIGHT));
  const camera = (length: number, view: number, point: number) =>
    length * scale <= view
      ? (view - length * scale) / 2
      : clamp(view / 2 - point * scale, view - length * scale, 0);
  const left = camera(MAP_WIDTH, size.width, position.x),
    top = camera(MAP_HEIGHT, size.height, position.y);
  return {
    ready,
    reduced,
    overview,
    setOverview,
    size,
    cameraStyle: {
      transform: `translate(${left}px, ${top}px) scale(${scale})`,
      "--map-label-scale": size.width <= 760 && scale < 1 ? 1 / scale : 1,
    },
  };
}
