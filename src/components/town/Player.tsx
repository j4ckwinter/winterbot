import type { Direction, Point } from "./world";
import { characterPalette as ink } from "./characterPalette";

export default function Player({
  position,
  direction,
  walking,
}: {
  position: Point;
  direction: Direction;
  walking: boolean;
}) {
  const profile = direction === "left" || direction === "right";
  const back = direction === "up";
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
          <path d="M6 25h6v7H6z" fill={ink.denim} />
          <path d="M6 27h2v4H6z" fill={ink.denimLight} />
          <path d="M4 30h8v3H4z" fill={ink.boot} />
          <path d="M5 30h5v1H5z" fill={ink.bootLight} />
        </g>
        <g class="sprite-right-leg">
          <path d="M13 25h6v7h-6z" fill={ink.denim} />
          <path d="M16 27h2v4h-2z" fill={ink.denimLight} />
          <path d="M13 30h8v3h-8z" fill={ink.boot} />
          <path d="M15 30h5v1h-5z" fill={ink.bootLight} />
        </g>
        <g class="sprite-torso">
          <path d="M5 16h14v2h2v11H3V18h2z" fill={ink.jacketShadow} />
          <path d="M5 18h14v9H5z" fill={ink.jacket} />
          <path d="M5 18h3v8H5z M8 17h8v2H8z" fill={ink.jacketLight} />
          {!back && !profile && (
            <>
              <path d="M9 17h6v3h-2v7h-2v-7H9z" fill={ink.lining} />
              <path d="M5 22h4v3H5z M15 22h4v3h-4z" fill={ink.jacketShadow} />
              <path d="M5 22h4v1H5z M15 22h4v1h-4z" fill={ink.jacketLight} />
              <path d="M7 18h2v4H7z M15 18h2v4h-2z" fill={ink.packShadow} />
            </>
          )}
          <g class="sprite-left-arm">
            <path d="M1 19h4v8H1z" fill={ink.jacketShadow} />
            <path d="M2 19h3v5H2z" fill={ink.jacket} />
            <path d="M2 24h3v3H2z" fill={ink.skin} />
          </g>
          <g class="sprite-right-arm">
            <path d="M19 19h4v8h-4z" fill={ink.jacketShadow} />
            <path d="M19 19h3v5h-3z" fill={ink.jacketLight} />
            <path d="M19 24h3v3h-3z" fill={ink.skin} />
          </g>
          {profile ? (
            <g class="sprite-profile">
              <path
                d="M6 3h11v2h3v6h3v4h-3v3h-5v2H8v-3H5V6h1z"
                fill={ink.skinShadow}
              />
              <path d="M8 5h10v6h4v3h-4v3h-4v2H9v-3H7V7h1z" fill={ink.skin} />
              <path d="M7 1h10v2h3v5h-6v3h-4v6H5V5h2z" fill={ink.hair} />
              <path d="M8 3h8v2H8z M6 6h3v3H6z" fill={ink.hairLight} />
              <path d="M11 11h3v4h-3z" fill={ink.skinLight} />
              <g class="sprite-blink">
                <path
                  class="sprite-side-eye"
                  d="M17 10h2v3h-2z"
                  fill={ink.outline}
                />
              </g>
              <path d="M18 15h3v1h-3z" fill={ink.skinShadow} />
              <path d="M4 18h5v11H4z" fill={ink.packShadow} />
              <path d="M4 19h4v8H4z" fill={ink.pack} />
              <path d="M4 19h4v2H4z" fill={ink.packLight} />
            </g>
          ) : (
            <>
              <path d="M6 3h12v3h3v10h-3v3H6v-3H3V6h3z" fill={ink.skinShadow} />
              <path d="M6 5h12v2h2v8h-3v3H7v-3H4V7h2z" fill={ink.skin} />
              <path d="M7 8h3v4H7z" fill={ink.skinLight} />
              <path d="M6 1h12v2h3v7h-4V7h-4V6H8v5H3V4h3z" fill={ink.hair} />
              <path d="M7 3h8v2H7z M4 6h3v2H4z" fill={ink.hairLight} />
              <g class="sprite-blink">
                <path
                  class="sprite-eyes"
                  d="M8 11h2v3H8z M15 11h2v3h-2z"
                  fill={ink.outline}
                />
              </g>
              {!back && <path d="M11 16h4v1h-4z" fill={ink.skinShadow} />}
              <g class="sprite-back">
                <path d="M4 7h16v9h-3v2H7v-2H4z" fill={ink.hair} />
                <path d="M6 7h2v7H6z M8 14h8v2H8z" fill={ink.hairLight} />
              </g>
              <g class="sprite-pack">
                <path d="M8 18h8v2h3v9H5v-9h3z" fill={ink.packShadow} />
                <path d="M7 20h10v7H7z" fill={ink.pack} />
                <path d="M7 20h10v3H7z M9 27h6v1H9z" fill={ink.packLight} />
                <path d="M11 22h2v3h-2z M7 26h10v1H7z" fill={ink.packShadow} />
              </g>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
