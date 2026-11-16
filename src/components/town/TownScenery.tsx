import TownObject from "./TownObject";
import { DOOR_OPEN_REACH, fences, isWithin, trees, type Point } from "./world";

export default function TownScenery({ player }: { player?: Point }) {
  const near = (x: number, y: number, distance: number) =>
    player !== undefined && isWithin(player, { x, y }, distance);
  return (
    <>
      {[
        { x: 193, y: 216, w: 34, h: 60, footX: 210, footY: 300 },
        { x: 646, y: 205, w: 28, h: 51, footX: 660, footY: 280 },
        { x: 197, y: 513, w: 36, h: 53, footX: 215, footY: 595 },
        { x: 630, y: 516, w: 30, h: 50, footX: 645, footY: 595 },
      ].map(
        ({ x, y, w, h, footX, footY }) =>
          near(footX, footY, DOOR_OPEN_REACH) && (
            <TownObject
              key={x}
              name="door"
              depth={footY - (footY > 500 ? 20 : 15)}
            >
              <g class="town-open-door">
                <rect
                  x={x + 3}
                  y={y + 4}
                  width={w - 6}
                  height={h - 4}
                  fill="var(--door-dark)"
                />
                <path
                  d={`M${x + 3} ${y + 4}l8 5v${h - 12}l-8 3z`}
                  fill="var(--wood-lit)"
                />
                <rect
                  x={x + 11}
                  y={y + h - 3}
                  width={w - 14}
                  height="3"
                  fill="var(--glow)"
                />
              </g>
            </TownObject>
          ),
      )}
      {fences.map(([x, y]) => (
        <TownObject key={`fence-${x}-${y}`} name="fence" depth={y + 36}>
          <use href="#town-fence" x={x} y={y} />
        </TownObject>
      ))}
      {[
        [186, 340],
        [242, 340],
        [645, 324],
        [682, 324],
      ].map(([x, y]) => (
        <TownObject key={`lamp-${x}`} name="lamp" depth={y + 1}>
          <path
            class="town-glow"
            d={`M${x - 16} ${y - 8}h32v4h8v8h-8v4h-32v-4h-8v-8h8z`}
            fill="var(--glow)"
          />
          <path
            class={`town-glow town-flicker ${x % 2 ? "town-flicker-late" : ""}`}
            d={`M${x - 9} ${y - 57}h18v5h6v18h-6v5h-18v-5h-6v-18h6z`}
            fill="var(--glow)"
          />
          <path
            d={`M${x - 2} ${y - 36}h4v34h-4z M${x - 4} ${y - 3}h8v3h-8z M${x - 5} ${y - 50}h10v14h-10z M${x - 6} ${y - 52}h12v3h-12z`}
            fill="var(--iron)"
          />
          <path d={`M${x - 3} ${y - 48}h6v10h-6z`} fill="var(--lamp)" />
          <path d={`M${x - 6} ${y - 55}h12v3h-12z`} fill="var(--cap)" />
        </TownObject>
      ))}
      <TownObject name="noticeboard" depth={479}>
        <g>
          <rect x="93" y="429" width="8" height="50" fill="var(--wood-dark)" />
          <rect x="72" y="428" width="50" height="25" fill="var(--wood)" />
          <rect x="76" y="432" width="42" height="17" fill="var(--wall-lit)" />
          <path d="M84 439h26v3H84z" fill="var(--ink)" />
          <path d="M70 424h54v5H70z" fill="var(--cap)" />
        </g>
      </TownObject>
      <TownObject name="trellis" depth={222}>
        <g fill="var(--wood)">
          <path d="M551 195h20v5h-20z M551 209h20v5h-20z" />
          <path d="M554 194h4v28h-4z M565 194h4v28h-4z" />
        </g>
        <path d="M550 192h22v3h-22z M558 207h7v2h-7z" fill="var(--cap)" />
      </TownObject>
      <TownObject name="snowman" depth={307}>
        <ellipse
          cx="321"
          cy="305"
          rx="12"
          ry="4"
          fill="var(--shadow)"
          opacity=".22"
        />
        <path d="M313 291h16v3h2v9h-2v3h-16v-3h-2v-9h2z" fill="var(--cap)" />
        <path d="M325 294h4v9h-4z M315 303h10v3h-10z" fill="var(--cap-dim)" />
        <path d="M316 279h10v2h2v9h-2v2h-10v-2h-2v-9h2z" fill="var(--cap)" />
        <path d="M324 282h2v8h-2z" fill="var(--cap-dim)" />
        <path
          d="M317 284h2v2h-2z M322 284h2v2h-2z M320 295h2v2h-2z M320 299h2v2h-2z"
          fill="var(--iron)"
        />
        <path d="M319 287h5v2h-5z" fill="var(--brass)" />
        <path d="M314 290h14v3h-14z M325 293h3v5h-3z" fill="var(--berry)" />
        <path d="M307 292h6v2h-6z M329 290h6v2h-6z" fill="var(--trunk)" />
      </TownObject>
      {trees.map(([x, y]) => (
        <TownObject key={`tree-${x}-${y}`} name="tree" depth={y + 63}>
          <use href="#town-tree" x={x} y={y} />
        </TownObject>
      ))}
      {[
        [108, 238],
        [98, 252],
        [108, 268],
        [304, 304],
        [315, 318],
        [304, 330],
        [552, 267],
        [563, 279],
        [551, 291],
        [750, 475],
        [765, 486],
        [748, 503],
        [393, 85],
        [405, 101],
        [390, 113],
        [325, 427],
        [336, 439],
        [323, 451],
        [542, 554],
        [554, 565],
      ].map(([x, y], i) => (
        <TownObject key={`shrub-${i}`} name="shrub" depth={y + 15}>
          <use href="#town-shrub" x={x} y={y} />
        </TownObject>
      ))}
    </>
  );
}
