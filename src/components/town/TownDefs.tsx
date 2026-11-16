export default function TownDefs() {
  return (
    <defs>
      <pattern
        id="town-snow"
        width="48"
        height="48"
        patternUnits="userSpaceOnUse"
      >
        <rect width="48" height="48" fill="var(--snow)" />
        <path
          d="M7 12h7v2H7z M30 36h9v2h-9z M37 9h4v2h-4z M14 30h4v2h-4z"
          fill="var(--snow-dim)"
        />
        <path d="M22 21h2v2h-2z M42 26h2v2h-2z" fill="var(--snow-lit)" />
      </pattern>
      <pattern
        id="town-path"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <rect width="24" height="24" fill="var(--path)" />
        <path d="M4 8h3v2H4z M16 19h4v2h-4z" fill="var(--path-mark)" />
        <path d="M12 3h4v2h-4z M2 17h3v2H2z" fill="var(--snow)" />
      </pattern>
      <pattern
        id="town-paving"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <rect width="24" height="24" fill="var(--paving)" />
        <path d="M0 0h24v2H0z M0 0h2v24H0z" fill="var(--paving-line)" />
        <path d="M3 3h18v2H3z M3 5h2v16H3z" fill="var(--paving-lit)" />
      </pattern>
      <pattern
        id="town-water"
        width="64"
        height="32"
        patternUnits="userSpaceOnUse"
      >
        <rect width="64" height="32" fill="var(--water)" />
        <path d="M8 8h20v3H8z M40 23h18v3H40z" fill="var(--water-lit)" />
        <path d="M0 16h12v3H0z M34 4h12v2H34z" fill="var(--water-deep)" />
      </pattern>
      <pattern
        id="town-ice"
        width="32"
        height="32"
        patternUnits="userSpaceOnUse"
      >
        <rect width="32" height="32" fill="var(--ice)" />
        <path
          d="M4 7h6v2H4z M10 9h6v2h-6z M16 11h4v2h-4z"
          fill="var(--ice-lit)"
        />
        <path d="M20 23h8v2h-8z M3 26h4v2H3z" fill="var(--ice-mark)" />
      </pattern>
      <pattern
        id="town-roof"
        width="24"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <rect width="24" height="14" fill="var(--red)" />
        <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="var(--red-dark)" />
        <path d="M1 1h10v2H1z" fill="var(--red-lit)" />
      </pattern>
      <pattern
        id="town-blue-roof"
        width="24"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <rect width="24" height="14" fill="var(--blue)" />
        <path d="M0 12h24v2H0z M11 0h2v12h-2z" fill="var(--blue-dark)" />
        <path d="M1 1h10v2H1z" fill="var(--blue-lit)" />
      </pattern>
      <g id="town-tree">
        <ellipse
          cx="29"
          cy="60"
          rx="25"
          ry="6"
          fill="var(--shadow)"
          opacity=".22"
        />
        <path d="M24 50h10v13H24z" fill="var(--trunk)" />
        <path d="M27 51h3v11h-3z" fill="var(--trunk-lit)" />
        <path
          d="M1 56h56v-6h-4v-6h-5v-5h-5v-4H15v4h-5v5H5v6H1z"
          fill="var(--pine-dark)"
        />
        <path
          d="M4 53h50v-3h-4v-6h-5v-5h-5v-2H18v2h-5v5H8v6H4z"
          fill="var(--pine)"
        />
        <path
          d="M7 49h9v2H7z M21 51h7v2h-7z M12 44h5v2h-5z"
          fill="var(--pine-lit)"
        />
        <path
          d="M15 35h28v4h5v5h4v2h-7v-2h-6v3h-7v-3h-6v3h-7v-3h-5v2H6v-2h4v-5h5z"
          fill="var(--cap)"
        />
        <path d="M41 41h5v3h-5z M33 44h6v2h-6z" fill="var(--cap-dim)" />
        <path
          d="M6 40h46v-5h-5v-5h-5v-5h-4v-4H20v4h-4v5h-5v5H6z"
          fill="var(--pine-dark)"
        />
        <path
          d="M9 38h40v-3h-5v-5h-5v-5h-4v-2H23v2h-4v5h-5v5H9z"
          fill="var(--pine)"
        />
        <path d="M12 34h8v2h-8z M25 36h6v2h-6z" fill="var(--pine-lit)" />
        <path
          d="M20 21h18v4h4v5h4v2h-6v-2h-6v3h-6v-3h-6v3h-6v-2h-4v-1h4v-5h4z"
          fill="var(--cap)"
        />
        <path d="M37 27h4v3h-4z M30 30h5v2h-5z" fill="var(--cap-dim)" />
        <path
          d="M12 26h34v-5h-4v-5h-4v-5h-3V6h-3V1h-4v5h-3v5h-3v5h-4v5h-4z"
          fill="var(--pine-dark)"
        />
        <path
          d="M15 24h28v-3h-4v-5h-4v-5h-3V6h-6v5h-3v5h-4v5h-4z"
          fill="var(--pine)"
        />
        <path d="M18 20h7v2h-7z" fill="var(--pine-lit)" />
        <path
          d="M27 1h4v5h3v5h3v4h-4v-2h-4v3h-5v-2h-3v-3h3V6h3z"
          fill="var(--cap)"
        />
        <path d="M31 8h2v5h-2z" fill="var(--cap-dim)" />
      </g>
      <g id="town-shrub">
        <path d="M2 6h10v2h2v7H0V8h2z" fill="var(--pine-dark)" />
        <path d="M2 9h10v4H2z" fill="var(--pine)" />
        <path d="M3 3h8v2h2v5h-3v2H7v-2H4v2H1V5h2z" fill="var(--cap)" />
        <path d="M4 12h2v2H4z M9 12h2v2H9z" fill="var(--berry)" />
      </g>
      <g id="town-window">
        <rect width="29" height="32" fill="var(--wood-dark)" />
        <rect x="3" y="3" width="23" height="23" fill="var(--glass)" />
        <path d="M5 5h8v8H5z M16 5h8v8h-8z" fill="var(--glass-lit)" />
        <path d="M13 3h3v24h-3z M3 13h23v3H3z" fill="var(--sash)" />
        <rect x="-3" y="28" width="35" height="5" fill="var(--sill)" />
        <path
          d="M-3 26h35v3H-3z M3 23h7v3H3z M20 24h6v2h-6z"
          fill="var(--cap)"
        />
      </g>
      <g id="town-fence">
        <path d="M0 9h64v5H0z M0 23h64v5H0z" fill="var(--wood)" />
        <path
          d="M3 3h7v33H3z M28 3h7v33h-7z M53 3h7v33h-7z"
          fill="var(--wood-lit)"
        />
        <path
          d="M3 33h7v3H3z M28 33h7v3h-7z M53 33h7v3h-7z"
          fill="var(--wood-dark)"
        />
        <path
          d="M2 0h9v4H2z M27 0h9v4h-9z M52 0h9v4h-9z M11 7h16v2H11z M36 7h16v2H36z M11 21h16v2H11z M36 21h16v2H36z"
          fill="var(--cap)"
        />
      </g>
    </defs>
  );
}
