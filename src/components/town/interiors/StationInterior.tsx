import { Sconce } from "./InteriorFurniture";

const trackFlakes = Array.from({ length: 44 }, (_, i) => {
  const x = 84 + ((i * 7919) % 787);
  const y = (i * 4513) % 74;
  return `M${x} ${y}h2v2h-2z`;
}).join("");

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

export default function StationInterior() {
  return (
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
      <path
        d="M80 200h800v6h-90v4h-70v-4h-180v5h-80v-5h-200v4h-90v-4H80z"
        fill="var(--cap)"
      />
      <path
        d="M80 219h800v2H80z M80 276h800v2H80z M130 244h12v3h-12z M290 262h10v3h-10z M452 240h14v3h-14z M610 258h10v3h-10z M770 246h12v3h-12z"
        fill="var(--cap)"
      />
      <svg class="interior-snow" x="0" y="200" width="960" height="103">
        <g fill="#fff">
          <path d={trackFlakes} />
          <path d={trackFlakes} transform="translate(0 -74)" />
          <path d={trackFlakes} transform="translate(0 74)" />
        </g>
      </svg>
      <path d="M80 303h800v14H80z" fill="#d4b970" />
      {Array.from({ length: 25 }, (_, i) => (
        <path key={i} d={`M${88 + i * 31} 307h14v4h-14z`} fill="#f0d793" />
      ))}
      <path d="M80 317h800v4H80z" fill="#687b64" />
      <g transform="translate(-96 1.2) scale(1.2)">
        <Board x={480} />
      </g>
      <Sconce x={170} poolY={326} />
      <Sconce x={790} poolY={326} />
      <path d="M390 412h180v22H390z" fill="#789184" opacity=".5" />
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
  );
}
