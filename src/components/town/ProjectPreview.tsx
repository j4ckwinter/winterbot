import type { projects } from "./projects";
import "./project-preview.css";

/** Static illustrations keep the plain portfolio usable without JavaScript. */
export default function ProjectPreview({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <a
      class={`project-preview project-preview--${project.kind}`}
      href={`/#projects/${project.slug}`}
      aria-label={`Try the ${project.name} demo`}
    >
      <svg viewBox="0 0 320 160" aria-hidden="true">
        {project.kind === "console" ? (
          <>
            <path d="M0 105H320M158 0V160" stroke="#dacfb0" stroke-width="28" />
            {[38, 208].map((x) => (
              <g transform={`translate(${x} 28)`}>
                <rect y="25" width="70" height="42" rx="3" fill="#f8eed6" />
                <path d="M-6 25L35 0L76 25Z" fill="#a85c45" />
                <rect
                  x="29"
                  y="43"
                  width="15"
                  height="24"
                  rx="2"
                  fill="#556a60"
                />
              </g>
            ))}
            <path
              d="M60 120H158V72H235"
              fill="none"
              stroke="#507e77"
              stroke-width="4"
              stroke-dasharray="6 6"
            />
            <circle cx="60" cy="120" r="8" fill="#507e77" />
            <circle cx="235" cy="72" r="7" fill="#b25738" />
          </>
        ) : project.kind === "memory" ? (
          <>
            {[32, 51, 70, 89, 108].map((y) => (
              <rect
                x="28"
                y={y}
                width={y === 70 ? 112 : 88}
                height="8"
                rx="4"
                fill={y === 70 ? "#4e827b" : "#b2c5bd"}
              />
            ))}
            <path
              d="M156 76H198M188 66L198 76L188 86"
              fill="none"
              stroke="#4e827b"
              stroke-width="3"
            />
            <rect x="218" y="51" width="74" height="54" rx="8" fill="#4e827b" />
            <path
              d="M233 69H278M233 83H263"
              stroke="#eef4e9"
              stroke-width="5"
              stroke-linecap="round"
            />
            <text x="28" y="144">
              Source code → relevant context
            </text>
          </>
        ) : (
          <>
            {["Scope", "Build", "Review"].map((label, index) => (
              <g transform={`translate(${26 + index * 96} 48)`}>
                <rect
                  width="76"
                  height="58"
                  rx="9"
                  fill={index === 2 ? "#506f62" : "#e0d2b9"}
                />
                <text
                  x="38"
                  y="34"
                  text-anchor="middle"
                  fill={index === 2 ? "#fff" : "#30372e"}
                >
                  {label}
                </text>
                {index < 2 && (
                  <path d="M80 29H92" stroke="#8c7656" stroke-width="2" />
                )}
              </g>
            ))}
            <text x="160" y="140" text-anchor="middle">
              A workflow you can inspect
            </text>
          </>
        )}
      </svg>
      <span>
        Try the demo <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
