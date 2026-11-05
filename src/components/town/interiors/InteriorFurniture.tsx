export function Window({ x }: { x: number }) {
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
