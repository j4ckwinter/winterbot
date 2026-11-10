import { useTrail } from "./useTrail";
import type { Point } from "./world";

const STRIDE = 11;
const VISIBLE_PRINTS = 16;

export default function Footprints({ walker }: { walker: Point }) {
  const prints = useTrail(walker, STRIDE, VISIBLE_PRINTS);
  return (
    <svg
      class="town-prints"
      data-trail="player"
      viewBox="0 0 960 640"
      aria-hidden="true"
      shape-rendering="crispEdges"
    >
      {prints.map(({ id, x, y, age, sideways, left }) => (
        <rect
          key={id}
          x={Math.round(sideways ? x - 2 : x + (left ? -6 : 2))}
          y={Math.round(sideways ? y + (left ? -4 : 1) : y - 2)}
          width={sideways ? 5 : 3}
          height={sideways ? 3 : 5}
          opacity={1 - age / VISIBLE_PRINTS}
        />
      ))}
    </svg>
  );
}
