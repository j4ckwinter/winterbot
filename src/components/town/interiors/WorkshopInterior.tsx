import type { ProjectId } from "../projects";
import { roomLayouts } from "../world";
import { Window, Plant } from "./InteriorFurniture";

function Desk({ x, machine = false }: { x: number; machine?: boolean }) {
  return (
    <g transform={`translate(${x - 70} 205)`}>
      <path d="M-8 109h156v14H-8z" fill="#4c4938" opacity=".2" />
      <path d="M0 66h140v20H0z" fill="#705339" />
      <path d="M0 59h140v14H0z" fill="#b38a57" />
      <path d="M8 83h12v34H8z M121 83h12v34h-12z" fill="#826342" />
      <path d="M20-3h89v64H20z" fill="#495644" />
      <path d="M24 1h81v59H24z" fill="#d4ceab" />
      <path d="M24 1h81v4H24z M24 5h4v51h-4z" fill="#eee4bf" />
      <path d="M101 5h4v51h-4z" fill="#a39d7c" />
      <path d="M31 8h67v43H31z" fill="#3c5a4b" />
      {machine ? (
        <g data-exhibit-preview="routing">
          <path d="M34 11h61v36H34z" fill="#89a36c" />
          <path d="M34 28h61v7H34z M63 11h7v36h-7z" fill="#dbc98d" />
          <path d="M39 15h14v10H39z M76 37h14v8H76z" fill="#536f54" />
          <path d="M39 14h14v4H39z M76 36h14v4H76z" fill="#b66f4f" />
          <path d="M81 13h10v10H81z" fill="#6a9fa2" />
          <path
            d="M42 31h24v10h12"
            fill="none"
            stroke="#f7e9ac"
            strokeWidth="2"
          />
          <rect
            class="exhibit-route-dot"
            x="40"
            y="29"
            width="4"
            height="4"
            fill="#a94f3e"
          />
        </g>
      ) : (
        <g data-exhibit-preview="interfaces">
          <path
            d="M37 15h26v4H37z M37 24h44v4H37z M37 33h20v4H37z"
            fill="#b4cf89"
          />
          <path class="interior-cursor" d="M62 33h6v5h-6z" fill="#e1dc9c" />
        </g>
      )}
      <path d="M53 54h24v8H53z M27 63h76v8H27z" fill="#e1d9b4" />
      <path
        d="M31 65h6v3h-6z M41 65h6v3h-6z M51 65h6v3h-6z M61 65h6v3h-6z M71 65h6v3h-6z M81 65h16v3H81z"
        fill="#9b9c7d"
      />
      <path d="M37 11h18v3H37z M90 36h4v9h-4z" fill="#d1e3a8" opacity=".45" />
      <path d="M114 43h15v17h-15z M128 46h6v9h-6z" fill="#eee1b9" />
      <g transform="translate(96 85)">
        <path d="M0 0h35v21H0z M3 26h29v7H3z" fill="#475441" />
        <path d="M4 3h27v12H4z M4 22h27v6H4z" fill="#8b9870" />
        <path d="M7 6h21v3H7z" fill="#b8be8d" />
      </g>
      {machine && (
        <>
          <path d="M-10 10h28v45h-28z" fill="#607867" />
          <path d="M-5 17h18v6H-5z M-5 29h18v6H-5z" fill="#a0b886" />
        </>
      )}
    </g>
  );
}

function Stove({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 110)`}>
      <path
        class="interior-glow"
        d="M-16 94h102v6h12v22H86v8H-16v-8h-12v-22h12z"
        fill="#ffb45e"
        opacity=".18"
      />
      <path d="M30 -40h10v56H30z" fill="#3c4347" />
      <path d="M30 -40h3v56h-3z" fill="#586267" />
      <path d="M10 16h50v62H10z" fill="#2f3538" />
      <path d="M6 12h58v6H6z" fill="#4a5357" />
      <path d="M10 18h4v60h-4z" fill="#465055" />
      <path d="M20 34h30v26H20z" fill="#1f2325" />
      <path d="M24 38h22v18H24z" fill="#f08a3c" />
      <path class="interior-flame" d="M28 44h14v12H28z" fill="#ffd46b" />
      <path d="M22 66h26v4H22z" fill="#465055" />
      <path d="M12 78h6v12h-6z M52 78h6v12h-6z" fill="#1f2325" />
      <path d="M42 2h14v10H42z M56 5h4v3h-4z M46 -2h6v4h-6z" fill="#8b9499" />
      <path d="M44 4h3v6h-3z" fill="#c3cacd" />
    </g>
  );
}

export default function WorkshopInterior({
  inspectedProjects,
}: {
  inspectedProjects: ProjectId[];
}) {
  return (
    <>
      <Window x={126} />
      <Window x={741} />
      <Stove x={642} />
      <g>
        <path d="M345 91h270v67H345z" fill="#776b4d" />
        <path d="M349 95h262v59H349z" fill="#a49c70" />
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M${358 + i * 18} 102h3v3h-3z M${358 + i * 18} 143h3v3h-3z`}
            fill="#776b4d"
          />
        ))}
        <path d="M355 110h250v5H355z" fill="#d0c294" />
        <path
          d="M374 118h7v25h-7z M365 116h25v7h-25z M414 118h7v20h-7z M410 136h15v7h-15z M455 116h7v30h-7z M450 116h17v8h-17z M514 118h7v18h-7z M509 134h17v9h-17z M563 117h7v26h-7z"
          fill="#4c6252"
        />
        <path
          d="M374 128h7v15h-7z M455 130h7v16h-7z M563 130h7v13h-7z"
          fill="#ad724e"
        />
      </g>
      <path d="M335 338h280v158H335z" fill="#7c8662" />
      <path d="M343 346h264v142H343z" fill="#909775" />
      <path
        d="M351 354h248v126H351z"
        fill="none"
        stroke="#bcc09a"
        strokeWidth="3"
      />
      <path d="M353 369h25v3h-25z M568 463h24v3h-24z" fill="#757f5d" />
      <path
        d="M230 360v45h250V285 M480 405h250"
        fill="none"
        stroke="#6d7558"
        strokeWidth="7"
      />
      <path
        d="M230 360v45h250V285 M480 405h250"
        fill="none"
        stroke="#d0c294"
        strokeWidth="2"
      />
      <g
        data-project-machine="winterbot"
        data-inspected={inspectedProjects.includes("winterbot")}
      >
        <Desk x={230} machine />
      </g>
      <g
        data-exhibit-preview="retrieval"
        transform="translate(409 178)"
        data-project-machine="brain-cache"
        data-inspected={inspectedProjects.includes("brain-cache")}
      >
        <path d="M-4-4h150v91H-4z" fill="#344d41" />
        <path d="M0 0h142v83H0z" fill="#506c62" />
        <path d="M0 0h142v4H0z M0 4h4v75H0z" fill="#9bab87" />
        <path d="M8 83h126v5H8z" fill="#344d41" opacity=".3" />
        <path d="M8 7h126v66H8z" fill="#71897b" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(16 ${14 + i * 19})`}>
            <path d="M0 0h110v13H0z" fill="#3b554c" />
            <path
              d="M7 3h9v3H7z M20 3h42v3H20z M20 8h27v2H20z"
              fill="#a7be87"
            />
            <path d="M7 8h9v2H7z" fill="#d3b881" />
            <path class="interior-cursor" d="M91 4h6v5h-6z" fill="#e1bc72" />
          </g>
        ))}
        <path d="M12 67h118v12H12z" fill="#d4ceab" />
        <text
          x="71"
          y="76"
          text-anchor="middle"
          font-family="monospace"
          font-size="8"
          fill="#354f46"
        >
          SOURCE INDEX
        </text>
      </g>
      <g
        data-exhibit-preview="review"
        transform="translate(660 292)"
        data-project-machine="pancake-stack"
        data-inspected={inspectedProjects.includes("pancake-stack")}
      >
        <path d="M0 58h140v40H0z" fill="#806143" />
        <path d="M-5 53h150v14H-5z" fill="#c89960" />
        <path d="M4 0h132v49H4z" fill="#465b4b" />
        <path d="M8 4h124v41H8z" fill="#d4c49b" />
        {["FIND", "BUILD", "CHECK"].map((step, i) => (
          <g key={step} transform={`translate(${13 + i * 40} 10)`}>
            <path d="M0 0h34v29H0z" fill={i === 2 ? "#a8be86" : "#efe0b4"} />
            <text
              x="17"
              y="9"
              text-anchor="middle"
              font-family="monospace"
              font-size="7"
              fill="#354f46"
            >
              {step}
            </text>
            <path d="M6 15h22v2H6z M6 20h15v2H6z" fill="#7c8b68" />
            {i === 2 && (
              <path
                d="M22 21l3 3 5-8"
                fill="none"
                stroke="#496b4a"
                strokeWidth="2"
              />
            )}
          </g>
        ))}
        <path d="M51 44h39v9H51z" fill="#6a6e51" />
        <path d="M8 64h31v4H8z M10 69h27v4H10z" fill="#e6b973" />
        <text
          x="49"
          y="74"
          font-family="monospace"
          font-size="8"
          fill="#f1d9a7"
        >
          REVIEW BENCH
        </text>
      </g>
      {roomLayouts.workshop.objects.map(
        (object) =>
          object.project &&
          inspectedProjects.includes(object.project) && (
            <g
              key={object.project}
              data-machine-inspected={object.project}
              transform={`translate(${object.x - 13} ${object.labelY - 30})`}
            >
              <path d="M0 0h26v20H0z" fill="#344d41" />
              <path d="M2 2h22v16H2z" fill="#a7be87" />
              <path d="M6 9h4v4h4V5h5v4h-3v7H9v-3H6z" fill="#344d41" />
            </g>
          ),
      )}
      <Plant x={115} y={520} />
      <Plant x={845} y={520} />
    </>
  );
}
