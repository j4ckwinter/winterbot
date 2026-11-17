function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M9 22h6v8H9z" fill="var(--trunk)" />
      <path
        d="M9 0h6v4h3v5h3v5h3v6h3v5H-3v-5h3v-6h3V9h3V4h3z"
        fill="var(--pine-dark)"
      />
      <path d="M5 11h14v3H5z M1 20h22v3H1z" fill="var(--pine)" />
      <path
        d="M9 0h6v4h3v3h-4V5h-4v2H6V4h3z M3 14h18v3h-5v-1h-4v2H8v-2H3z M0 20h6v-2h12v2h6v2h-7v-1h-5v2H7v-2H0z"
        fill="var(--cap)"
      />
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
  const roof = kind === "home" || kind === "station" ? "blue" : "red";
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M4 18h80v44H4z" fill="var(--shadow)" opacity=".2" />
      <path d="M4 16h68v38H4z" fill="var(--wall-base)" />
      <path d="M4 16h62v32H4z" fill="var(--wall)" />
      <path d="M-4 16V8h8V0h60v8h8v8h8v8H-4z" fill={`var(--${roof}-dark)`} />
      <path d="M0 15V9h8V4h52v5h8v6h7v5H0z" fill={`var(--${roof})`} />
      <path d="M4 12h61v3H4z" fill={`var(--${roof}-lit)`} />
      <path d="M21 4v16h2V4z M43 4v16h2V4z" fill={`var(--${roof}-dark)`} />
      {kind === "workshop" && (
        <path d="M54-8h9V5h-9z M52-10h13v4H52z" fill="var(--wood-dark)" />
      )}
      <path
        d="M4-2h60v9h8v6h-5v-2h-8v3h-8v-3h-9v3h-8v-3h-9v3h-8v-3H9v2H-4V8h8z"
        fill="var(--cap)"
      />
      <path d="M-4 22h84v2H-4z" fill="var(--cap)" />
      <path d="M11 29h12v13H11z M49 29h12v13H49z" fill="var(--wood-dark)" />
      <path d="M13 31h8v8h-8z M51 31h8v8h-8z" fill="var(--glass)" />
      <path d="M13 31h4v4h-4z M51 31h4v4h-4z" fill="var(--glass-lit)" />
      <path d="M30 29h13v25H30z" fill="var(--wood-dark)" />
      <path d="M33 32h7v22h-7z" fill="var(--wood)" />
      <path d="M28 54h17v4H28z" fill="var(--paving-lit)" />
      {kind === "workshop" && <path d="M52-12h13v3H52z" fill="var(--cap)" />}
      {kind === "home" && (
        <>
          <path d="M9 42h16v4H9z M47 42h16v4H47z" fill="var(--wood)" />
          <path d="M9 40h16v2H9z M47 40h16v2H47z" fill="var(--cap)" />
        </>
      )}
      {kind === "station" && (
        <>
          <path d="M28 6h16v17H28z" fill="var(--wall-lit)" />
          <path d="M35 9h2v6h5v2h-7z" fill="var(--ink)" />
          <path d="M27 3h18v3H27z" fill="var(--cap)" />
        </>
      )}
      {kind === "post" && (
        <>
          <path d="M27 8h18v12H27z" fill="var(--wall-lit)" />
          <path
            d="M29 10h3v2h3v2h3v-2h3v-2h2v3h-3v2h-8v-2h-3z"
            fill="var(--red)"
          />
          <path d="M75 35h10v13H75z M79 48h3v9h-3z" fill="var(--red)" />
          <path d="M26 5h20v3H26z M74 32h12v3H74z" fill="var(--cap)" />
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
      aria-label="A train overlooking Winter Town under snow: the workshop, house, station and post office beside the river and bridge"
      shape-rendering="crispEdges"
    >
      <rect width="800" height="420" fill="var(--look-sky)" />
      <path d="M0 88h800v70H0z" fill="var(--look-sky-low)" />
      <path
        class="lookout-stars"
        d="M40 20h3v3h-3z M130 70h2v2h-2z M210 16h3v3h-3z M300 52h2v2h-2z M380 14h2v2h-2z M470 76h3v3h-3z M540 24h2v2h-2z M700 60h2v2h-2z M760 22h3v3h-3z M96 44h2v2h-2z"
        fill="#fff"
      />
      <path
        d="M622 24h32v8h12v12h8v32h-8v12h-12v8h-32v-8h-12V76h-8V44h8V32h12z"
        fill="var(--look-sun)"
      />
      <path
        d="M70 44h76v8h32v8H50v-8h20z M430 32h64v8h24v8H410v-8h20z"
        fill="var(--look-cloud)"
      />
      <g class="distant-hills">
        <path
          d="M-40 136h40v-16h32v-16h40V88h48V72h48v16h32v16h48v16h40v16h48v-16h32V96h40V80h40V64h48v16h40v24h40v16h48v16h40v-16h40V96h48v16h40v16h80v292H-40z"
          fill="var(--look-hill-far)"
        />
        <path
          d="M0 156h48v-16h48v-16h48v-16h48v16h64v16h64v16h48v-16h48v-24h48v-16h48v16h48v24h64v16h64v-16h48v-16h48v16h48v280H0z"
          fill="var(--look-hill-mid)"
        />
        <path
          d="M0 178h80v-16h80v-16h80v16h80v16h80v-16h80v-16h80v16h80v16h80v-16h80v258H0z"
          fill="var(--look-hill-near)"
        />
        <path
          d="M24 170h6v-6h6v6h6v8H24z M56 166h6v-6h6v6h6v12H56z M200 150h6v-6h6v6h6v8h-18z M730 166h6v-6h6v6h6v12h-18z M700 172h6v-6h6v6h6v6h-18z"
          fill="var(--pine-dark)"
        />
      </g>
      <path d="M112 152h576v168H112z" fill="var(--snow-edge)" />
      <path d="M128 156h544v156H128z" fill="var(--snow)" />
      <path
        d="M150 180h10v2h-10z M250 300h12v2h-12z M400 180h10v2h-10z M500 244h12v2h-12z M150 244h10v2h-10z M380 290h10v2h-10z"
        fill="var(--snow-dim)"
      />
      <path
        d="M128 222h544v18H128z M348 156h20v156h-20z M218 202h16v26h-16z M458 202h16v26h-16z M218 234h16v66h-16z M458 234h16v66h-16z"
        fill="var(--path)"
      />
      <path d="M564 152h76v160h-76z" fill="var(--water-edge)" />
      <path d="M570 152h64v160h-64z" fill="var(--water)" />
      {[164, 190, 250, 280].map((y) => (
        <path
          key={y}
          d={`M588 ${y}h20v3h-20z M608 ${y + 10}h18v3h-18z`}
          fill="var(--water-lit)"
        />
      ))}
      <path
        d="M570 152h6v28h4v22h-4v18h-6z M570 242h8v24h-4v30h4v16h-8z M628 152h6v68h-4v-30h-2z M630 242h4v70h-6v-26h2z"
        fill="var(--ice)"
      />
      <path d="M558 220h88v22h-88z" fill="var(--wood-dark)" />
      <path d="M558 225h88v12h-88z" fill="var(--wood-lit)" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${562 + i * 9} 224h2v14h-2z`} fill="var(--wood)" />
      ))}
      <path d="M558 218h88v3h-88z M558 240h88v2h-88z" fill="var(--cap)" />
      <Building x={190} y={162} kind="workshop" />
      <Building x={430} y={160} kind="home" />
      <Building x={190} y={250} kind="station" />
      <Building x={430} y={250} kind="post" />
      <path d="M280 203h44v20h-44z" fill="var(--snow-edge)" />
      <path d="M285 206h34v13h-34z" fill="var(--ice)" />
      <path d="M289 209h16v3h-16z" fill="var(--ice-lit)" />
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
      <path
        d="M0 310h144v8h192v-8h192v8h144v-8h128v110H0z"
        fill="var(--snow-dim)"
      />
      <path
        d="M0 310h144v8h192v-8h192v8h144v-8h128v6H672v8H528v-8H336v8H144v-8H0z"
        fill="var(--snow-lit)"
      />
      <path d="M0 330h800v48H0z" fill="var(--snow)" />
      <path
        d="M40 344h14v2H40z M180 356h12v2h-12z M560 346h14v2h-14z M700 360h12v2h-12z"
        fill="var(--snow-dim)"
      />
      <path d="M0 378h800v42H0z" fill="var(--paving-edge)" />
      <path d="M0 378h800v6H0z M0 402h800v5H0z" fill="var(--iron)" />
      {Array.from({ length: 25 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 32 + 8} 380h8v28h-8z`}
          fill="var(--wood-dark)"
        />
      ))}
      <path
        d="M0 386h800v3H0z M24 410h40v4H24z M150 412h60v4h-60z M600 411h50v4h-50z M720 410h60v4h-60z"
        fill="var(--cap)"
        opacity=".85"
      />
      <g class="lookout-train">
        <path d="M274 382h252v12H274z" fill="var(--shadow)" opacity=".4" />
        <path d="M280 326h232v54H280z" fill="var(--wood-dark)" />
        <path d="M284 324h224v50H284z" fill="var(--wall)" />
        <path d="M284 353h224v17H284z" fill="var(--red)" />
        <path d="M284 353h224v4H284z" fill="var(--red-lit)" />
        <path d="M284 370h224v4H284z" fill="var(--red-dark)" />
        <path
          d="M278 322h236v8H278z M284 318h224v4H284z"
          fill="var(--blue-eave)"
        />
        <path
          d="M282 315h228v4H282z M290 312h60v3h-60z M400 312h90v3h-90z"
          fill="var(--cap)"
        />
        {[296, 340, 384, 428].map((x) => (
          <g key={x}>
            <path d={`M${x} 333h32v18h-32z`} fill="var(--blue-eave)" />
            <path d={`M${x + 3} 335h26v13h-26z`} fill="var(--glass)" />
            <path d={`M${x + 3} 335h12v4h-12z`} fill="var(--glass-lit)" />
            <path d={`M${x + 15} 335h2v13h-2z`} fill="var(--sash)" />
          </g>
        ))}
        <path d="M472 332h24v42h-24z" fill="var(--wood)" />
        <path d="M475 335h18v16h-18z" fill="var(--glass)" />
        <path d="M487 358h4v3h-4z" fill="var(--brass)" />
        <path d="M298 374h32v12h-32z M462 374h32v12h-32z" fill="var(--iron)" />
        <path d="M305 377h8v7h-8z M477 377h8v7h-8z" fill="var(--metal)" />
        <path d="M274 366h8v8h-8z M510 366h8v8h-8z" fill="var(--blue-eave)" />
      </g>
      {platform && (
        <g>
          <path d="M0 420h800v140H0z" fill="var(--snow-dim)" />
          <path d="M64 432h672v112H64z" fill="var(--paving)" />
          {[452, 484, 516].map((y) => (
            <path key={y} d={`M64 ${y}h672v2H64z`} fill="var(--paving-line)" />
          ))}
          <path
            d="M64 432h60v6h-20v6H64z M736 432h-70v5h30v8h40z M64 544v-14h30v8h50v6z M736 544v-12h-40v6h-60v6z"
            fill="var(--snow)"
          />
          <path d="M60 414h680v8H60z M60 430h680v6H60z" fill="var(--iron)" />
          {[64, 144, 224, 304, 384, 464, 544, 624, 704, 732].map((x) => (
            <path key={x} d={`M${x} 410h6v32h-6z`} fill="var(--wood-dark)" />
          ))}
          <path
            d="M70 411h74v3H70z M150 411h74v3h-74z M230 411h74v3h-74z M310 411h74v3h-74z M390 411h74v3h-74z M550 411h74v3h-74z M630 411h74v3h-74z"
            fill="var(--cap)"
          />
          <path d="M478 382h28v56h-28z" fill="var(--wood-lit)" />
          <path
            d="M478 390h28v3h-28z M478 404h28v3h-28z M478 418h28v3h-28z"
            fill="var(--wood-dark)"
          />
          <path d="M0 544h800v16H0z" fill="var(--snow-edge)" />
        </g>
      )}
    </svg>
  );
}
