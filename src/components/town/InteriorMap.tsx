import WorkshopInterior from "./interiors/WorkshopInterior";
import HomeInterior from "./interiors/HomeInterior";
import StationInterior from "./interiors/StationInterior";
import PostInterior from "./interiors/PostInterior";
import { landmarks, roomLayouts, type Place, type Point } from "./world";

const palettes = {
  workshop: {
    wall: "#bdba91",
    trim: "#667459",
    floor: "#bda279",
    rug: "#a95d45",
  },
  home: { wall: "#c4b398", trim: "#746c62", floor: "#baa17c", rug: "#63847e" },
  station: {
    wall: "#a4b5a8",
    trim: "#496b65",
    floor: "#b4b4a0",
    rug: "#658077",
  },
  post: { wall: "#d4bb94", trim: "#8b6453", floor: "#bba17b", rug: "#ac7653" },
};

export default function InteriorMap({
  room,
  player,
  inspectedProjects = [],
}: {
  room: Place;
  player?: Point;
  inspectedProjects?: number[];
}) {
  const palette = palettes[room];
  const [left, , right] = roomLayouts[room].bounds;
  const shellLeft = left - 10;
  const shellWidth = right - left + 20;
  return (
    <svg
      class="interior-map"
      viewBox="0 0 960 640"
      width="100%"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
    >
      <defs>
        <pattern
          id="interior-floor"
          width="80"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <rect width="80" height="32" fill={palette.floor} />
          <path d="M0 30h80v2H0z M38 0h2v30h-2z" fill="#66563d" opacity=".2" />
          <path d="M4 5h25v2H4z M47 20h28v2H47z" fill="#e1cc9b" opacity=".3" />
          <path d="M6 23h11v2H6z M52 10h15v2H52z" fill="#806b4c" opacity=".2" />
          <path
            d="M3 28h2v2H3z M73 28h2v2h-2z M41 1h2v2h-2z"
            fill="#6b6147"
            opacity=".35"
          />
        </pattern>
        <pattern
          id="interior-tile"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="48" height="48" fill={palette.floor} />
          <path d="M0 0h48v2H0z M0 0h2v48H0z" fill="#7b8878" opacity=".5" />
        </pattern>
      </defs>
      <rect width="960" height="640" fill="#303e35" />
      <rect
        x={shellLeft - 16}
        y="48"
        width={shellWidth + 32}
        height="560"
        fill="#232e28"
      />
      <rect
        x={shellLeft}
        y="56"
        width={shellWidth}
        height="144"
        fill={palette.wall}
      />
      <rect
        x={shellLeft}
        y="56"
        width={shellWidth}
        height="14"
        fill={palette.trim}
      />
      <rect
        x={shellLeft}
        y="170"
        width={shellWidth}
        height="30"
        fill={palette.trim}
      />
      <rect
        x={shellLeft}
        y="200"
        width={shellWidth}
        height="400"
        fill={`url(#${room === "station" ? "interior-tile" : "interior-floor"})`}
      />
      <rect
        x={shellLeft}
        y="200"
        width="12"
        height="400"
        fill="#4b4734"
        opacity=".25"
      />
      <rect
        x={right - 2}
        y="200"
        width="12"
        height="400"
        fill="#4b4734"
        opacity=".25"
      />
      <path
        d={`M${shellLeft} 200h${shellWidth}v10H${shellLeft}z`}
        fill="#3d4f3d"
        opacity=".22"
      />
      <path
        d={`M${shellLeft + 14} 174h${shellWidth - 28}v4H${shellLeft + 14}z`}
        fill="#d8d0a4"
        opacity=".5"
      />
      {room === "workshop" && (
        <WorkshopInterior inspectedProjects={inspectedProjects} />
      )}
      {room === "home" && <HomeInterior />}
      {room === "station" && <StationInterior />}
      {room === "post" && <PostInterior />}
      {landmarks(room).map(
        (object) =>
          player &&
          Math.hypot(player.x - object.x, player.y - object.y) < 75 && (
            <g key={object.id} class="interior-ready" fill="#f3dfa0">
              <path
                d={`M${object.x - 8} ${object.y - 25}h16v4h-16z M${object.x - 4} ${object.y - 19}h8v4h-8z`}
              />
            </g>
          ),
      )}
      <path d="M435 560h90v40h-90z" fill="#8b7955" />
      <path d="M443 566h74v34h-74z" fill="#c3ad79" />
      <path d="M460 583h40v5h-40z M467 591h26v5h-26z" fill="#ede0b5" />
      <path
        d={`M${shellLeft} 600h${435 - shellLeft}v8H${shellLeft}z M525 600h${right + 10 - 525}v8H525z`}
        fill={palette.trim}
      />
      <style>{`.interior-cursor{animation:interior-blink 1.8s steps(2,end) infinite}.exhibit-route-dot{animation:exhibit-route 5s steps(8,end) infinite}@keyframes exhibit-route{0%,10%{transform:translate(0,0)}50%{transform:translate(24px,0)}70%{transform:translate(24px,10px)}90%,100%{transform:translate(36px,10px)}}@keyframes interior-blink{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){.interior-cursor,.exhibit-route-dot{animation:none}}`}</style>
    </svg>
  );
}
