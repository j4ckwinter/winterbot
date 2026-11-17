import { useRef } from "preact/hooks";
import ProjectIcon from "./ProjectIcon";
import ProjectDemo from "./ProjectDemo";
import {
  projects,
  getProject,
  DEFAULT_PROJECT,
  type ProjectId,
} from "./projects";
import { ProjectStory, ProjectSummary } from "./ProjectDetails";

export default function WorkshopContent({
  project: selected = DEFAULT_PROJECT,
  onProjectChange,
}: {
  project?: ProjectId;
  onProjectChange?: (project: ProjectId) => void;
}) {
  const demoRef = useRef<HTMLDivElement>(null);
  const project = getProject(selected);
  return (
    <>
      <div class="project-machines" aria-label="Choose a project">
        {projects.map((item) => (
          <button
            type="button"
            key={item.name}
            class="project-machine"
            aria-pressed={selected === item.slug}
            aria-controls="project-detail"
            onClick={(event) => {
              event.currentTarget.focus();
              onProjectChange?.(item.slug);
            }}
          >
            <span class="project-icon-badge">
              <ProjectIcon kind={item.kind} />
            </span>
            <small>NO. {item.number}</small>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <article id="project-detail" class="project-detail">
        <h3 aria-live="polite" aria-atomic="true">
          {project.name}
        </h3>
        <p>{project.description}</p>
        {project.caseStudy && (
          <p>
            <a href={project.caseStudy.href}>{project.caseStudy.linkLabel} ↗</a>
          </p>
        )}
        <button
          class="project-demo-jump"
          onClick={() => {
            demoRef.current?.focus({ preventScroll: true });
            demoRef.current?.scrollIntoView({ block: "start" });
          }}
        >
          Try the demo ↓
        </button>
        <div
          ref={demoRef}
          tabIndex={-1}
          role="region"
          aria-label={`${project.name} demo`}
          class="project-demo-target"
        >
          <ProjectDemo key={selected} project={selected} />
        </div>
        <details class="project-story" key={selected}>
          <summary>My contribution & evidence</summary>
          <ProjectSummary project={project} showDescription={false} />
        </details>
        <ul class="place-tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div class="place-actions">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            View source ↗
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              {project.action} ↗
            </a>
          )}
        </div>
        <ProjectStory project={project} />
      </article>
    </>
  );
}
