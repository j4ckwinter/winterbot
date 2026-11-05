import { landmarks, roomLayouts, type Point } from "./world";

type Room = "workshop" | "home" | "station" | "post";

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

function Window({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 88)`}>
      <path d="M-4-4h102v98H-4z" fill="#46563f" />
      <path d="M0 0h94v90H0z" fill="#73694e" />
      <path d="M0 0h94v4H0z M0 4h4v82H0z" fill="#c4b78c" />
      <path d="M7 7h80v74H7z" fill="#b7d5bc" />
      <path d="M7 45h80v36H7z" fill="#86a675" />
      <path d="M7 62h80v19H7z" fill="#64865b" />
      <path d="M13 12h32v28H13z" fill="#dfdfad" />
      <path d="M44 7h6v74h-6z M7 42h80v6H7z" fill="#f0ddaf" />
      <path d="M-8 81h110v12H-8z" fill="#a08a64" />
      <path d="M-8 81h110v4H-8z" fill="#d7c394" />
      <path d="M-4 93h102v4H-4z" fill="#655a43" />
    </g>
  );
}

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-24 27h48v9h-48z" fill="#584e3c" opacity=".2" />
      <path d="M-17 0h34v29h-34z" fill="#ae744e" />
      <path d="M-21-4h42v10h-42z" fill="#c48a5b" />
      <path d="M-3-42h7V0h-7z" fill="#4d6a45" />
      <path
        d="M-30-37h23v9h9v13h-19v-9h-13z M5-49h24v15H18v12H5z M-19-61H3v24h-12v-9h-10z"
        fill="#5e8753"
      />
      <path
        d="M-26-35h17v8h-17z M10-45h15v8H10z M-15-57h14v9h-14z"
        fill="#88a36a"
      />
    </g>
  );
}

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

function Shelf({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 66} 192)`}>
      <path d="M-6 132h146v10H-6z" fill="#584b38" opacity=".2" />
      <path d="M0 0h132v138H0z" fill="#745a3f" />
      <path d="M8 8h116v120H8z" fill="#9d805b" />
      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(12 ${12 + row * 40})`}>
          <path
            d="M0 4h13v28H0z M46 0h11v32H46z M88 7h15v25H88z"
            fill="#718a6c"
          />
          <path d="M17 0h12v32H17z M62 5h10v27H62z" fill="#b36d51" />
          <path d="M33 8h9v24h-9z M76 0h8v32h-8z" fill="#dfc690" />
          <path d="M-7 32h122v8H-7z" fill="#c39c68" />
          <path d="M28 32h53v8H28z" fill="#e3d3a7" />
          <text
            x="54"
            y="38"
            text-anchor="middle"
            fill="#4d594a"
            font-family="monospace"
            font-size="6"
          >
            {["INTERFACES", "TYPESCRIPT", "AGENT TOOLS"][row]}
          </text>
        </g>
      ))}
    </g>
  );
}

function Board({ x }: { x: number }) {
  return (
    <g transform={`translate(${x - 72} 194)`}>
      <path d="M0 0h144v110H0z" fill="#8f7853" />
      <path d="M7 7h130v96H7z" fill="#354f46" />
      <g font-family="monospace" font-size="8" fill="#e7d7ae">
        <text x="16" y="21" letter-spacing="1">
          CAREER DEPARTURES
        </text>
        {[
          ["KTO", "2025–NOW"],
          ["GEOGAMING", "2023–25"],
          ["SMARTSTREAM", "2017–22"],
        ].map(([company, years], i) => (
          <g key={company} transform={`translate(16 ${39 + i * 23})`}>
            <text fill={i === 0 ? "#f0cf80" : "#b8c7a7"}>{company}</text>
            <text x="110" text-anchor="end" y="9" font-size="7">
              {years}
            </text>
            <path d="M0 14h112" stroke="#557466" />
          </g>
        ))}
      </g>
      <path d="M10 110h12v25H10z M122 110h12v25h-12z" fill="#796444" />
    </g>
  );
}

export default function InteriorMap({
  room,
  player,
  inspectedProjects = [],
}: {
  room: Room;
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
        <>
          <Window x={126} />
          <Window x={741} />
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
            data-project-machine="0"
            data-inspected={inspectedProjects.includes(0)}
          >
            <Desk x={230} machine />
          </g>
          <g
            data-exhibit-preview="retrieval"
            transform="translate(409 178)"
            data-project-machine="1"
            data-inspected={inspectedProjects.includes(1)}
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
                <path
                  class="interior-cursor"
                  d="M91 4h6v5h-6z"
                  fill="#e1bc72"
                />
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
            data-project-machine="2"
            data-inspected={inspectedProjects.includes(2)}
          >
            <path d="M0 58h140v40H0z" fill="#806143" />
            <path d="M-5 53h150v14H-5z" fill="#c89960" />
            <path d="M4 0h132v49H4z" fill="#465b4b" />
            <path d="M8 4h124v41H8z" fill="#d4c49b" />
            {["FIND", "BUILD", "CHECK"].map((step, i) => (
              <g key={step} transform={`translate(${13 + i * 40} 10)`}>
                <path
                  d="M0 0h34v29H0z"
                  fill={i === 2 ? "#a8be86" : "#efe0b4"}
                />
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
          <g transform="translate(150 431)">
            <path d="M-4-4h188v78H-4z" fill="#514d38" />
            <path d="M0 0h180v22H0z" fill="#c39b66" />
            <path d="M0 0h180v4H0z" fill="#e0bc84" />
            <path d="M7 22h166v47H7z" fill="#806143" />
            <path d="M20 30h66v22H20z M94 30h66v22H94z" fill="#a58054" />
            <path
              d="M25 6h39v5H25z M105-8h9v25h-9z M96-6h27v7H96z"
              fill="#67746a"
            />
            <path d="M52 37h10v4H52z M121 37h10v4h-10z" fill="#d8c692" />
            <path d="M28-30h58v34H28z" fill="#455b48" />
            <path d="M32-26h50v25H32z" fill="#82966a" />
            <path
              d="M38-20h18v14H38z M65-22h9v7h-9z M63-10h14v4H63z"
              fill="#374f42"
            />
            <path d="M44-16h6v6h-6z M59-20h3v18h-3z" fill="#ceb77d" />
            <path d="M88-22h18v26H88z M90-20h14v4H90z" fill="#9b9d7d" />
            <path d="M125-14h29v17h-29z" fill="#dfd3a8" />
            <path d="M129-10h21v3h-21z M129-4h12v3h-12z" fill="#7f8b6a" />
          </g>
          {roomLayouts.workshop.objects.map(
            (object, index) =>
              inspectedProjects.includes(index) && (
                <g
                  key={index}
                  data-machine-inspected={index}
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
      )}
      {room === "home" && (
        <>
          <Window x={590} />
          <g transform="translate(395 91)">
            <path d="M0 0h110v64H0z" fill="#746c62" />
            <path d="M6 6h98v52H6z" fill="#e6d7ae" />
            <path
              d="M13 46h83v4H13z M20 29h9v17h-9z M35 19h10v27H35z M59 11h12v35H59z M55 18h20v5H55z M81 32h8v14h-8z"
              fill="#63847e"
            />
            <path d="M63 25h4v4h-4z" fill="#e6d7ae" />
          </g>
          <Shelf x={315} />
          <g transform="translate(0 -18)">
            <Desk x={480} />
          </g>
          <path d="M386 376h198v148H386z" fill="#495f52" opacity=".35" />
          <path d="M390 380h190v140H390z" fill="#63847e" />
          <path
            d="M390 385h-5v4h5z M390 399h-5v4h5z M390 413h-5v4h5z M580 385h5v4h-5z M580 399h5v4h-5z M580 413h5v4h-5z"
            fill="#b5b58f"
          />
          <path
            d="M401 391h168v118H401z"
            fill="none"
            stroke="#b5b58f"
            strokeWidth="4"
          />
          <g transform="translate(600 361)">
            <path d="M0 0h110v150H0z" fill="#826a4c" />
            <path d="M7 8h96v131H7z" fill="#dcd0a7" />
            <path d="M14 16h82v30H14z" fill="#efdfb8" />
            <path d="M7 55h96v84H7z" fill="#75908b" />
            <path d="M7 63h96v8H7z M7 118h96v8H7z" fill="#a5b49a" />
            <path d="M7 72h5v45H7z M98 72h5v45h-5z" fill="#516e68" />
            <path d="M18 20h74v3H18z" fill="#fff0ca" />
            <path d="M0 146h110v4H0z" fill="#514d38" />
          </g>
          <g transform="translate(250 392)">
            <path d="M0 0h120v98H0z" fill="#665f4b" />
            <path d="M8 6h104v39H8z" fill="#9c9f77" />
            <path d="M8 53h104v30H8z" fill="#b1af85" />
            <path d="M0 44h14v45H0z M106 44h14v45h-14z" fill="#838960" />
            <path d="M20 61h30v5H20z" fill="#d9cda4" />
          </g>
          <path d="M272 346h74v7h-74z M281 339h53v7h-53z" fill="#a18c69" />
          <g transform="translate(279 409)" data-exhibit-preview="notebook">
            <path d="M0 0h32l8 4 8-4h32v30H48l-8 4-8-4H0z" fill="#eee0b5" />
            <path
              d="M40 4v27 M5 8h24 M5 15h20 M49 8h25 M49 15h20 M49 22h23"
              fill="none"
              stroke="#8e9b79"
              strokeWidth="2"
            />
          </g>
        </>
      )}
      {room === "station" && (
        <>
          <g
            fill="#e7d7ae"
            font-family="monospace"
            font-size="14"
            text-anchor="middle"
          >
            {[
              ["SMARTSTREAM", 260],
              ["GEOGAMING", 480],
              ["KTO", 700],
            ].map(([name, x]) => (
              <g key={name}>
                <text x={x} y="112">
                  {name}
                </text>
                <text x={x} y="161" font-size="10" fill="#e3ca90">
                  {name === "KTO"
                    ? "2025 → NOW"
                    : name === "GEOGAMING"
                      ? "2023 → 2025"
                      : "2017 → 2022"}
                </text>
              </g>
            ))}
            <path d="M260 135h440" stroke="#e7d7ae" strokeWidth="3" />
            {[260, 480, 700].map((x) => (
              <rect key={x} x={x - 5} y="130" width="10" height="10" />
            ))}
          </g>
          <path
            d="M688 122h24v24h-24z"
            fill="none"
            stroke="#e3ca90"
            strokeWidth="2"
          />
          <path d="M80 200h800v108H80z" fill="#555b50" />
          {Array.from({ length: 20 }, (_, i) => (
            <path key={i} d={`M${92 + i * 40} 211h14v78h-14z`} fill="#7c7259" />
          ))}
          <path d="M80 221h800v7H80z M80 278h800v7H80z" fill="#aeb3a0" />
          <path d="M80 303h800v14H80z" fill="#d4b970" />
          {Array.from({ length: 25 }, (_, i) => (
            <path key={i} d={`M${88 + i * 31} 307h14v4h-14z`} fill="#f0d793" />
          ))}
          <path d="M80 317h800v4H80z" fill="#687b64" />
          <g transform="translate(0 40)">
            <Board x={480} />
          </g>
          <path d="M408 380h144v22H408z" fill="#789184" opacity=".5" />
          {[140, 640].map((x) => (
            <g key={x} transform={`translate(${x} 422)`}>
              <path d="M0 0h180v34H0z M0 39h180v22H0z" fill="#785e42" />
              <path
                d="M5 6h170v7H5z M5 20h170v7H5z M5 44h170v8H5z"
                fill="#b48b59"
              />
              <path d="M10 61h10v10h-10z M160 61h10v10h-10z" fill="#65513c" />
            </g>
          ))}
          <path d="M105 337h180v7H105z M105 351h122v5H105z" fill="#718375" />
          <text
            x="840"
            y="368"
            fill="#536c61"
            font-family="monospace"
            font-size="27"
            text-anchor="end"
          >
            01
          </text>
        </>
      )}
      {room === "post" && (
        <>
          <Window x={126} />
          <Window x={741} />
          <g transform="translate(310 83)">
            {Array.from({ length: 12 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${(i % 6) * 57} ${Math.floor(i / 6) * 42})`}
              >
                <path d="M0 0h48v34H0z" fill="#936f50" />
                <path d="M5 5h38v24H5z" fill="#c09a6c" />
                <path d="M14 12h21v4H14z" fill="#ebd8aa" />
              </g>
            ))}
          </g>
          <path d="M150 226h550v74H150z M650 300h110v150H650z" fill="#916546" />
          <path
            d="M150 213h550v22H150z M650 235h110v19H650z M650 254h22v196h-22z"
            fill="#d4b37b"
          />
          <path d="M165 249h465v35H165z M685 272h59v160h-59z" fill="#ad8359" />
          <path d="M150 213h550v4H150z M650 235h110v4H650z" fill="#ead09b" />
          <path d="M150 296h500v5H150z M756 254h4v196h-4z" fill="#624e39" />
          {[190, 280, 370, 550].map((x) => (
            <path key={x} d={`M${x} 252h3v29h-3z`} fill="#8a6747" />
          ))}
          <path d="M570 191h43v19h-43z M575 186h33v5h-33z" fill="#d3b17b" />
          <path d="M588 186h6v24h-6z" fill="#eee0b2" />
          <g
            font-family="monospace"
            font-size="10"
            fill="#f2deb0"
            text-anchor="middle"
          >
            {[
              ["EMAIL", 234],
              ["GITHUB", 386],
              ["LINKEDIN", 568],
            ].map(([channel, x]) => (
              <g key={channel}>
                <rect
                  x={Number(x) - 47}
                  y="258"
                  width="94"
                  height="18"
                  fill="#75563f"
                />
                <text x={x} y="271">
                  {channel}
                </text>
              </g>
            ))}
          </g>
          <g transform="translate(308 194)">
            <path d="M0 0h70v17H0z" fill="#eadbb1" />
            <path d="M6 4h42v2H6z M6 9h34v2H6z" fill="#8b9978" />
            <path d="M60-8h4v20h-4z" fill="#4f6658" />
          </g>
          <path d="M450 201h65v12h-65z M460 189h45v12h-45z" fill="#e9d9ad" />
          <path
            d="M460 189l23 13 22-13"
            fill="none"
            stroke="#a28660"
            strokeWidth="3"
          />
          <g transform="translate(100 422)">
            <path d="M0 0h150v78H0z" fill="#a8875f" />
            <path d="M7 8h136v60H7z" fill="#c4a67a" />
            <path d="M65 8h16v60H65z M7 30h136v13H7z" fill="#e0ca93" />
          </g>
          <Plant x={845} y={520} />
          <path d="M320 370h260v100H320z" fill="#ac7653" />
          <path
            d="M331 381h238v78H331z"
            fill="none"
            stroke="#d9bf89"
            strokeWidth="4"
          />
        </>
      )}
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
