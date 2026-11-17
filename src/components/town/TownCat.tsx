import TownObject from "./TownObject";
import { useTownCat } from "./useTownCat";
import { useTrail } from "./useTrail";
import { CAT_ALERT_REACH, isWithin, MAP_VIEW_BOX, type Point } from "./world";

export default function TownCat({ player }: { player?: Point }) {
  const cat = useTownCat();
  const catAlert =
    player !== undefined &&
    isWithin(
      player,
      { x: cat.position.x + 13, y: cat.position.y + 26 },
      CAT_ALERT_REACH,
    );
  const pawprints = useTrail(
    { x: cat.position.x + 11, y: cat.position.y + 27 },
    6,
    9,
  );
  return (
    <>
      <svg
        class="town-prints"
        data-trail="cat"
        viewBox={MAP_VIEW_BOX}
        aria-hidden="true"
        shape-rendering="crispEdges"
      >
        {pawprints.map(({ id, x, y, age, left }) => (
          <rect
            key={id}
            x={Math.round(x)}
            y={Math.round(y + (left ? -2 : 1))}
            width="2"
            height="2"
            opacity={1 - age / 9}
          />
        ))}
      </svg>
      <TownObject name="cat" depth={cat.position.y + 26}>
        <g
          transform={`translate(${cat.position.x} ${cat.position.y})`}
          data-cat-alert={catAlert}
          data-cat-walking={cat.walking}
        >
          <ellipse
            cx="13"
            cy="26"
            rx="16"
            ry="5"
            fill="var(--shadow)"
            opacity=".3"
          />
          <path
            d="M4 8h15v15H4z M1 20h6v7H1z M16 20h6v7h-6z"
            fill="var(--cat)"
          />
          <path d="M2 0h5v5h9V0h5v15H2z" fill="var(--cat-head)" />
          <path
            d={
              catAlert || cat.walking
                ? "M5 7h3v4H5z M15 7h3v4h-3z"
                : "M4 9h5v2H4z M14 9h5v2h-5z"
            }
            fill="#574e3c"
          />
          {catAlert && <path d="M10-15h4v8h-4z M10-4h4v3h-4z" fill="#faf0c8" />}
          <path
            d="M20 18h7v-9h5v15H20z"
            fill="var(--cat-tail)"
            class="town-cat-tail"
          />
        </g>
      </TownObject>
    </>
  );
}
