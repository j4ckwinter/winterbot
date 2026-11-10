const windowFlakes =
  "M6 12h2v2H6z M22 4h2v2h-2z M16 32h2v2h-2z M50 10h2v2h-2z M66 20h2v2h-2z M30 50h2v2h-2z M72 6h2v2h-2z M58 40h2v2h-2z M10 60h2v2h-2z M44 66h2v2h-2z";

export function Window({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 88)`}>
      <path
        class="interior-daylight"
        d="M4 116h38l14 62H18z M50 116h40l14 62H64z"
        fill="var(--pane-light)"
      />
      <path d="M-4-4h102v98H-4z" fill="#46563f" />
      <path d="M0 0h94v90H0z" fill="#73694e" />
      <path d="M0 0h94v4H0z M0 4h4v82H0z" fill="#c4b78c" />
      <path d="M7 7h80v74H7z" fill="var(--pane-sky)" />
      <path class="interior-moon" d="M16 14h8v8h-8z" fill="#fff3bf" />
      <path d="M7 52h14v-4h18v-4h16v4h14v4h18v29H7z" fill="var(--pane-far)" />
      <path d="M7 66h22v-3h26v3h32v15H7z" fill="var(--pane-near)" />
      <path
        d="M68 34h6v6h4v6h4v6h4v10H56V52h4v-6h4v-6h4z"
        fill="var(--pine-dark)"
      />
      <path
        d="M68 34h6v4h-6z M63 44h9v3h-9z M58 51h12v3H58z"
        fill="var(--cap)"
      />
      <svg class="interior-snow" x="7" y="7" width="80" height="74">
        <g fill="#fff">
          <path d={windowFlakes} />
          <path d={windowFlakes} transform="translate(0 -74)" />
        </g>
      </svg>
      <path
        d="M7 7h11v3h-7v6H7z M76 7h11v9h-4v-6h-7z M7 76h80v5H7z M12 73h18v3H12z M58 74h20v2H58z"
        fill="var(--cap)"
      />
      <path d="M44 7h6v74h-6z M7 42h80v6H7z" fill="#f0ddaf" />
      <path d="M-8 81h110v12H-8z" fill="#a08a64" />
      <path d="M-8 81h110v4H-8z" fill="#d7c394" />
      <path d="M-4 93h102v4H-4z" fill="#655a43" />
    </g>
  );
}

export function Sconce({ x, poolY = 204 }: { x: number; poolY?: number }) {
  return (
    <>
      <g transform={`translate(${x} 100)`}>
        <path
          class="interior-glow"
          d="M-14 2h28v6h8v24h-8v6h-28v-6h-8V8h8z"
          fill="#ffd98a"
          opacity=".28"
        />
        <path d="M-2 0h4v10h-4z M-9 8h18v3H-9z" fill="#5d4d3b" />
        <path d="M-7 11h14v17H-7z" fill="#3b4850" />
        <path d="M-4 14h8v11h-8z" fill="#ffd98a" />
        <path d="M-2 16h4v5h-4z" fill="#fff3c4" />
      </g>
      <path
        class="interior-glow"
        d={`M${x - 44} ${poolY}h88v6h12v20h-12v8h-88v-8h-12v-20h12z`}
        fill="#ffcf7a"
        opacity=".18"
      />
    </>
  );
}

export function Plant({ x, y }: { x: number; y: number }) {
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
