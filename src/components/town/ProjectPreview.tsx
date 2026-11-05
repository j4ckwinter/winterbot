import type { projects } from "./projects";
import { recordedChunks } from "./recordedChunks";
import "./project-preview.css";

export default function ProjectPreview({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const budgetChunk = recordedChunks.find(
    (chunk) => chunk.name === "assembleContext",
  )!;
  return (
    <a
      class={`project-preview project-preview--${project.kind}`}
      href={`/#projects/${project.slug}`}
      aria-label={`Try the ${project.name} demo`}
    >
      {project.kind === "console" ? (
        <img
          class="project-preview-image"
          src="/previews/winter-town.png"
          width="960"
          height="640"
          alt="Winter Town’s paths, buildings and gardens"
          loading="lazy"
        />
      ) : (
        <div class="project-preview-example">
          <div class="project-preview-heading">
            <small>
              {project.kind === "memory"
                ? "Recorded source · 34a4ebb"
                : "Walking regression replay"}
            </small>
            <strong>
              {project.kind === "memory"
                ? `${budgetChunk.name}()`
                : "A frame arrived before the click"}
            </strong>
          </div>
          <div class="project-preview-detail">
            {project.kind === "memory" ? (
              <>
                <span>Find code: “budget”</span>
                <code>{budgetChunk.path}</code>
              </>
            ) : (
              <>
                <span class="preview-before">
                  Negative elapsed time → NaN position
                </span>
                <span class="preview-after">
                  Clamp elapsed time → valid movement
                </span>
              </>
            )}
          </div>
          <span class="project-preview-caption">
            {project.kind === "memory"
              ? "Keep complete chunks within a token budget."
              : "Replay the failure and its fix."}
          </span>
        </div>
      )}
      <span class="project-preview-action">
        Try the demo <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
