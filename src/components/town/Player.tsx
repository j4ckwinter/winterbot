import type { Direction, Point } from "./world";
export default function Player({
  position,
  direction,
  walking,
}: {
  position: Point;
  direction: Direction;
  walking: boolean;
}) {
  return (
    <div
      class={`player facing-${direction} ${walking ? "walking" : ""}`}
      style={{ left: position.x, top: position.y }}
      data-direction={direction}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 34" shape-rendering="crispEdges">
        <path d="M5 30h14v1h3v2H2v-2h3z" fill="#263c3444" />
        <g class="sprite-left-leg">
          <path d="M5 25h6v7H5z" fill="#34485a" />
          <path d="M4 30h7v3H4z" fill="#29343e" />
        </g>
        <g class="sprite-right-leg">
          <path d="M14 25h6v7h-6z" fill="#34485a" />
          <path d="M14 30h7v3h-7z" fill="#29343e" />
        </g>
        <g class="sprite-torso">
          <path d="M4 16h16v13H4z" fill="#713e33" />
          <path d="M5 17h14v10H5z" fill="#b65f43" />
          <path d="M6 18h3v8H6z M9 17h8v2H9z" fill="#d48454" />
          <path d="M7 27h11v2H7z" fill="#343e48" />
          <g class="sprite-left-arm">
            <path d="M1 18h4v9H1z" fill="#6f4937" />
            <path d="M2 19h3v7H2z" fill="#e8b681" />
          </g>
          <g class="sprite-right-arm">
            <path d="M19 18h4v9h-4z" fill="#6f4937" />
            <path d="M19 19h3v7h-3z" fill="#e8b681" />
          </g>
          <path d="M6 3h12v3h3v11h-3v3H6v-3H3V6h3z" fill="#e8b681" />
          <path d="M6 1h12v3h3v6H3V4h3z M3 8h4v4H3z" fill="#49372c" />
          <g class="sprite-blink">
            <path
              class="sprite-eyes"
              d="M7 12h2v3H7z M15 12h2v3h-2z"
              fill="#30312d"
            />
          </g>
          <path d="M7 3h8v2H7z M4 6h3v2H4z" fill="#79583d" />
          <path class="sprite-back" d="M4 8h16v10H4z" fill="#49372c" />
          <g class="sprite-pack">
            <path d="M6 19h12v10H6z" fill="#72563a" />
            <path d="M7 20h10v7H7z" fill="#d3ab68" />
            <path d="M8 23h8v2H8z" fill="#9c7d49" />
          </g>
          <path class="sprite-profile" d="M18 10h5v6h-5z" fill="#e8b681" />
        </g>
      </svg>
    </div>
  );
}
