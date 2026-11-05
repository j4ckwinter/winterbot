function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M8 18h6v12H8z" fill="#705c40" />
      <path d="M8 0h8v4h6v6h4v12h-4v4H2v-4h-4V10h4V4h6z" fill="#365e45" />
      <path d="M8 3h8v4h5v12h-4v4H4v-5H1v-7h5V7h2z" fill="#527e4e" />
      <path d="M8 5h7v5h4v4H6v4H3v-8h5z" fill="#88a762" />
    </g>
  );
}

function Building({
  x,
  y,
  kind,
}: {
  x: number;
  y: number;
  kind: "workshop" | "home" | "station" | "post";
}) {
  const blue = kind === "home" || kind === "station";
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M4 18h80v44H4z" fill="#455e4144" />
      <path d="M4 16h68v38H4z" fill="#b4a47a" />
      <path d="M4 16h62v32H4z" fill="#e3d4a7" />
      <path
        d="M-4 16V8h8V0h60v8h8v8h8v8H-4z"
        fill={blue ? "#466b73" : "#954b3b"}
      />
      <path
        d="M0 15V9h8V4h52v5h8v6h7v5H0z"
        fill={blue ? "#658c91" : "#b86347"}
      />
      <path
        d="M10 5h48v3H10z M4 12h61v3H4z"
        fill={blue ? "#80a6a2" : "#ce7c54"}
      />
      <path
        d="M21 4v16h2V4z M43 4v16h2V4z"
        fill={blue ? "#466b73" : "#954b3b"}
      />
      <path d="M11 29h12v13H11z M49 29h12v13H49z" fill="#716347" />
      <path d="M13 31h8v8h-8z M51 31h8v8h-8z" fill="#b1cebd" />
      <path d="M30 29h13v25H30z" fill="#796441" />
      <path d="M33 32h7v22h-7z" fill="#a18c5b" />
      <path d="M28 54h17v4H28z" fill="#d5c697" />
      {kind === "workshop" && (
        <path d="M54-8h9V5h-9z M52-10h13v4H52z" fill="#8c7054" />
      )}
      {kind === "home" && (
        <path d="M9 42h16v4H9z M47 42h16v4H47z" fill="#ad7050" />
      )}
      {kind === "station" && (
        <>
          <path d="M28 6h16v17H28z" fill="#e9dcb6" />
          <path d="M35 9h2v6h5v2h-7z" fill="#52644d" />
        </>
      )}
      {kind === "post" && (
        <>
          <path d="M27 8h18v12H27z" fill="#e9dcb6" />
          <path
            d="M29 10h3v2h3v2h3v-2h3v-2h2v3h-3v2h-8v-2h-3z"
            fill="#a85b43"
          />
          <path d="M75 35h10v13H75z M79 48h3v9h-3z" fill="#a85b43" />
        </>
      )}
    </g>
  );
}

export default function LookoutScene({
  platform = false,
}: {
  platform?: boolean;
}) {
  return (
    <svg
      viewBox={platform ? "0 0 800 560" : "0 0 800 420"}
      role="img"
      aria-label="A train overlooking Winter Town at sunset: the workshop, house, station and post office beside the river and bridge"
      shape-rendering="crispEdges"
    >
      <rect width="800" height="420" fill="#e9c691" />
      <path d="M0 88h800v70H0z" fill="#ebd6a8" />
      <path
        d="M622 24h32v8h12v12h8v32h-8v12h-12v8h-32v-8h-12V76h-8V44h8V32h12z"
        fill="#fff1be"
      />
      <path
        d="M70 44h76v8h32v8H50v-8h20z M430 32h64v8h24v8H410v-8h20z"
        fill="#f6dfb0"
      />
      <g class="distant-hills">
        <path
          d="M-40 136h40v-16h32v-16h40V88h48V72h48v16h32v16h48v16h40v16h48v-16h32V96h40V80h40V64h48v16h40v24h40v16h48v16h40v-16h40V96h48v16h40v16h80v292H-40z"
          fill="#9ba589"
        />
        <path
          d="M0 156h48v-16h48v-16h48v-16h48v16h64v16h64v16h48v-16h48v-24h48v-16h48v16h48v24h64v16h64v-16h48v-16h48v16h48v280H0z"
          fill="#708b70"
        />
        <path
          d="M0 178h80v-16h80v-16h80v16h80v16h80v-16h80v-16h80v16h80v16h80v-16h80v258H0z"
          fill="#52745b"
        />
      </g>
      <path d="M112 152h576v168H112z" fill="#5d814f" />
      <path d="M128 156h544v156H128z" fill="#98bc6a" />
      <path
        d="M128 222h544v18H128z M348 156h20v156h-20z M218 202h16v26h-16z M458 202h16v26h-16z M218 234h16v66h-16z M458 234h16v66h-16z"
        fill="#e8d6a1"
      />
      <path d="M564 152h76v160h-76z" fill="#527e70" />
      <path d="M570 152h64v160h-64z" fill="#69acb3" />
      {[164, 190, 250, 280].map((y) => (
        <path
          key={y}
          d={`M578 ${y}h20v3h-20z M608 ${y + 10}h18v3h-18z`}
          fill="#a4d1c8"
        />
      ))}
      <path d="M558 220h88v22h-88z" fill="#796441" />
      <path d="M558 225h88v12h-88z" fill="#c6aa70" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${562 + i * 9} 224h2v14h-2z`} fill="#92764b" />
      ))}
      <Building x={190} y={162} kind="workshop" />
      <Building x={430} y={160} kind="home" />
      <Building x={190} y={250} kind="station" />
      <Building x={430} y={250} kind="post" />
      <path d="M280 203h44v20h-44z" fill="#81a05a" />
      <path d="M285 206h34v13h-34z" fill="#69acb3" />
      <path d="M289 209h16v3h-16z" fill="#a4d1c8" />
      {[
        [140, 158],
        [164, 158],
        [274, 157],
        [300, 164],
        [390, 160],
        [520, 166],
        [140, 260],
        [164, 280],
        [278, 276],
        [305, 285],
        [520, 270],
        [648, 170],
        [650, 265],
      ].map(([x, y]) => (
        <Tree key={`${x}-${y}`} x={x} y={y} />
      ))}
      <path d="M0 310h144v8h192v-8h192v8h144v-8h128v110H0z" fill="#365844" />
      <path d="M0 320h800v10H0z" fill="#55744d" />
      <path d="M0 378h800v42H0z" fill="#8a7654" />
      <path d="M0 378h800v6H0z M0 402h800v5H0z" fill="#303e36" />
      {Array.from({ length: 25 }, (_, i) => (
        <path key={i} d={`M${i * 32 + 8} 380h8v28h-8z`} fill="#5d503c" />
      ))}
      <g class="lookout-train">
        <path d="M274 382h252v12H274z" fill="#273b3288" />
        <path d="M280 326h232v54H280z" fill="#665c43" />
        <path d="M284 324h224v50H284z" fill="#e2cca0" />
        <path d="M284 353h224v17H284z" fill="#a2513d" />
        <path d="M284 353h224v4H284z" fill="#c67d54" />
        <path d="M284 370h224v4H284z" fill="#754939" />
        <path d="M278 322h236v8H278z M284 318h224v4H284z" fill="#344c40" />
        <path d="M286 320h220v3H286z" fill="#6d8267" />
        {[296, 340, 384, 428].map((x) => (
          <g key={x}>
            <path d={`M${x} 333h32v18h-32z`} fill="#344c40" />
            <path d={`M${x + 3} 335h26v13h-26z`} fill="#719b95" />
            <path d={`M${x + 3} 335h12v4h-12z`} fill="#b1cebd" />
            <path d={`M${x + 15} 335h2v13h-2z`} fill="#d5c697" />
          </g>
        ))}
        <path d="M472 332h24v42h-24z" fill="#8f7954" />
        <path d="M475 335h18v16h-18z" fill="#719b95" />
        <path d="M487 358h4v3h-4z" fill="#eddbb5" />
        <path d="M298 374h32v12h-32z M462 374h32v12h-32z" fill="#303e36" />
        <path d="M305 377h8v7h-8z M477 377h8v7h-8z" fill="#8d9078" />
        <path d="M274 366h8v8h-8z M510 366h8v8h-8z" fill="#344c40" />
      </g>
      {platform && (
        <g>
          <path d="M0 420h800v140H0z" fill="#8d7c58" />
          <path d="M64 432h672v112H64z" fill="#c4b58a" />
          {[452, 484, 516].map((y) => (
            <path key={y} d={`M64 ${y}h672v2H64z`} fill="#aa986f" />
          ))}
          <path d="M60 414h680v8H60z M60 430h680v6H60z" fill="#415c45" />
          {[64, 144, 224, 304, 384, 464, 544, 624, 704, 732].map((x) => (
            <path key={x} d={`M${x} 410h6v32h-6z`} fill="#6d7954" />
          ))}
          <path d="M478 382h28v56h-28z" fill="#b19b70" />
          <path
            d="M478 390h28v3h-28z M478 404h28v3h-28z M478 418h28v3h-28z"
            fill="#746548"
          />
          <path d="M0 544h800v16H0z" fill="#465d43" />
        </g>
      )}
    </svg>
  );
}
