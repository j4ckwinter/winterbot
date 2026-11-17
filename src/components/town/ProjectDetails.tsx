import type { projects } from "./projects";

export function ProjectSummary({
  project,
  showDescription = true,
}: {
  project: (typeof projects)[number];
  showDescription?: boolean;
}) {
  return (
    <div class="project-summary">
      {showDescription && <p>{project.description}</p>}
      {project.highlights ? (
        <ul class="project-highlights" aria-label="Project highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : (
        <dl>
          <dt>My contribution</dt>
          <dd>{project.story.approach}</dd>
          <dt>Evidence</dt>
          <dd>
            {project.story.evidence}{" "}
            <a
              href={project.story.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more ↗
            </a>
          </dd>
        </dl>
      )}
    </div>
  );
}

export function ProjectStory({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <details class="project-story">
      <summary>Behind the project</summary>
      <dl>
        <dt>Problem</dt>
        <dd>{project.story.problem}</dd>
        <dt>Tradeoff</dt>
        <dd>{project.story.tradeoff}</dd>
        {project.highlights && (
          <>
            <dt>Evaluation</dt>
            <dd>
              {project.story.evidence}{" "}
              <a
                href={project.story.evidenceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the evidence ↗
              </a>
            </dd>
          </>
        )}
      </dl>
    </details>
  );
}
