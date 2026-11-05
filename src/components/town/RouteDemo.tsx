import { useState } from "preact/hooks";
import { canWalk, findRoute, places, type Point } from "./world";

const start = { x: 480, y: 390 };
const blockedCells = Array.from({ length: 96 * 64 }, (_, index) => ({
  x: (index % 96) * 10,
  y: Math.floor(index / 96) * 10,
}))
  .filter(({ x, y }) => !canWalk("town", x, y))
  .map(({ x, y }) => `M${x - 5} ${y - 5}h10v10h-10z`)
  .join(" ");
const destinations = [
  { name: "Workshop", point: { x: 210, y: 300 } },
  { name: "Across the bridge", point: { x: 900, y: 390 } },
  { name: "Inside the pond", point: { x: 360, y: 320 } },
];

export default function RouteDemo() {
  const [target, setTarget] = useState<Point>(destinations[0].point);
  const [collisions, setCollisions] = useState(true);
  const route = findRoute("town", start, target);
  const distance = route.reduce(
    (total, point, index) =>
      index === 0
        ? total
        : total +
          Math.hypot(
            point.x - route[index - 1].x,
            point.y - route[index - 1].y,
          ),
    0,
  );
  return (
    <section
      class="project-demo demo-console"
      aria-label="Town route inspector"
    >
      <div class="demo-frame-label">
        <span>WinterBot / route inspector</span>
        <span aria-hidden="true">01</span>
      </div>
      <h4>How the town finds a path</h4>
      <p>
        This runs the same collision checks and pathfinder as the town. Pick a
        destination or tap the grid.
      </p>
      <svg
        class="demo-route-map"
        viewBox="0 0 960 640"
        role="img"
        aria-label="Town collision grid with the calculated walking route"
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setTarget({
            x:
              Math.round(((event.clientX - bounds.left) / bounds.width) * 96) *
              10,
            y:
              Math.round(((event.clientY - bounds.top) / bounds.height) * 64) *
              10,
          });
        }}
      >
        <rect width="960" height="640" fill="#d5dfb6" />
        <path d="M810 0h150v640H810z M312 292h95v60h-95z" fill="#79afb0" />
        <path
          d="M180 300h60v295h-60z M210 365h690v50H210z M630 280h40v315h-40z"
          fill="#ead9ad"
        />
        <path d="M800 375h145v30H800z" fill="#a98d5a" />
        {places.map((place) => (
          <g key={place.id}>
            <rect
              x={place.x - 55}
              y={place.y - 100}
              width="110"
              height="78"
              fill={
                place.id === "home" || place.id === "station"
                  ? "#638c90"
                  : "#af6d4c"
              }
            />
            <text
              x={place.x}
              y={place.y - 50}
              text-anchor="middle"
              fill="#fff9e9"
            >
              {place.content.split(" ")[0]}
            </text>
          </g>
        ))}
        {collisions && (
          <path
            class="demo-collision-cells"
            d={blockedCells}
            fill="#773e39"
            opacity=".4"
          />
        )}
        {route.length > 0 && (
          <polyline
            class="demo-calculated-route"
            points={route.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="#fffdf1"
            stroke-width="8"
          />
        )}
        <circle cx={start.x} cy={start.y} r="12" fill="#344c45" />
        <path
          d={`M${target.x - 10} ${target.y - 10}l20 20m0-20l-20 20`}
          stroke="#a13225"
          stroke-width="7"
        />
      </svg>
      <div class="demo-options" aria-label="Route destination">
        {destinations.map(({ name, point }) => (
          <button
            key={name}
            aria-pressed={target.x === point.x && target.y === point.y}
            onClick={() => setTarget(point)}
          >
            {name}
          </button>
        ))}
      </div>
      <label class="demo-checkbox">
        <input
          type="checkbox"
          checked={collisions}
          onChange={(event) => setCollisions(event.currentTarget.checked)}
        />
        Show collision cells
      </label>
      <p class="demo-route-result" role="status">
        {route.length
          ? `Route found · ${Math.round(distance)} world pixels`
          : "No route: the destination is blocked."}
      </p>
      <p>
        Four-direction search uses a 10-pixel grid and checks the space between
        steps. Red cells are blocked; the white line is the route. The drawing
        samples collisions at grid points.
      </p>
    </section>
  );
}
