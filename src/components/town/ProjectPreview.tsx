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
      ) : project.kind === "memory" ? (
        <div class="project-preview-example">
          <small>Recorded source · 34a4ebb</small>
          <span class="preview-query">Find code: “budget”</span>
          <strong>{budgetChunk.name}()</strong>
          <code>{budgetChunk.path}</code>
          <span>Keep complete chunks within a token budget.</span>
        </div>
      ) : (
        <div class="project-preview-example">
          <small>Walking regression replay</small>
          <strong>A frame arrived before the click</strong>
          <span class="preview-before">
            Negative elapsed time → NaN position
          </span>
          <span class="preview-after">Clamp elapsed time → valid movement</span>
          <span>Replay the failure and its fix.</span>
        </div>
      )}
      <span class="project-preview-action">
        Try the demo <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
