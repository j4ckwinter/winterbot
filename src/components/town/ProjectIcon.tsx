export default function ProjectIcon({ kind }: { kind: string }) {
  return (
    <svg
      class="project-object"
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "console" ? (
        <>
          <rect
            x="8"
            y="5"
            width="32"
            height="38"
            rx="8"
            fill="#dde7cd"
            stroke="#52684b"
            stroke-width="2"
          />
          <rect x="14" y="11" width="20" height="16" rx="3" fill="#52684b" />
          <path
            d="M18 19h5v-4h6"
            stroke="#e7efda"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 35h8m-4-4v8"
            stroke="#52684b"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="31" cy="34" r="2.5" fill="#b2694c" />
        </>
      ) : kind === "memory" ? (
        <>
          <path
            d="M8 13v22c0 5 32 5 32 0V13"
            fill="#dce8e2"
            stroke="#456e62"
            stroke-width="2"
          />
          <ellipse
            cx="24"
            cy="13"
            rx="16"
            ry="6"
            fill="#f3f8f3"
            stroke="#456e62"
            stroke-width="2"
          />
          <path
            d="M8 23c0 8 32 8 32 0M8 33c0 8 32 8 32 0"
            stroke="#456e62"
            stroke-width="2"
          />
        </>
      ) : (
        <>
          {[29, 22, 15].map((y) => (
            <g key={y}>
              <rect
                x="7"
                y={y}
                width="34"
                height="8"
                rx="4"
                fill="#d5a266"
                stroke="#996741"
                stroke-width="1.5"
              />
              <ellipse
                cx="24"
                cy={y}
                rx="17"
                ry="5"
                fill="#efd19a"
                stroke="#996741"
                stroke-width="1.5"
              />
            </g>
          ))}
          <rect
            x="20"
            y="9"
            width="9"
            height="6"
            rx="2"
            fill="#fff2bf"
            stroke="#c59753"
          />
        </>
      )}
    </svg>
  );
}
