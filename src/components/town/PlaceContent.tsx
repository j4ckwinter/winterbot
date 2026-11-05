import { useRef } from "preact/hooks";
import FeaturedWork from "./FeaturedWork";
import "./place-content.css";
import ProjectDemo from "./ProjectDemo";
import { ktoCaseStudy } from "../../data/ktoCaseStudy";

import { projects } from "./projects";
import { profile, skills, experience } from "./profile";

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
      </dl>
    </details>
  );
}

function Workshop({
  initialProject = 0,
  onProjectChange,
}: {
  initialProject?: 0 | 1 | 2;
  onProjectChange?: (project: 0 | 1 | 2) => void;
}) {
  const demoRef = useRef<HTMLDivElement>(null);
  const selected = initialProject;
  const project = projects[selected];
  return (
    <>
      <div class="project-machines" aria-label="Choose a project">
        {projects.map((item, index) => (
          <button
            type="button"
            key={item.name}
            class="project-machine"
            aria-pressed={selected === index}
            aria-controls="project-detail"
            onClick={(event) => {
              event.currentTarget.focus();
              onProjectChange?.(index as 0 | 1 | 2);
            }}
          >
            <span
              class={`project-object project-object--${item.kind}`}
              aria-hidden="true"
            >
              <i />
              <b />
              <em />
            </span>
            <small>NO. {item.number}</small>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <article id="project-detail" class="project-detail" aria-live="polite">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
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

export function About() {
  return (
    <>
      <p>{profile.summary}</p>
      <p>{profile.approach}</p>
    </>
  );
}

export function Skills() {
  return (
    <>
      <h3>Technical skills</h3>
      <div class="place-toolkit">
        {skills.map((group) => (
          <div key={group.name}>
            <h4>{group.name}</h4>
            <p>{group.tools}</p>
          </div>
        ))}
      </div>
      <h3>Education</h3>
      <p>
        <strong>BSc Computer Science · 2:1</strong>
        <br />
        University of the West of England
        <br />
        Sep 2013 — Apr 2017
      </p>
    </>
  );
}

export function Home() {
  return (
    <>
      <About />
      <Skills />
    </>
  );
}

export function Station({ featured = true }: { featured?: boolean }) {
  return (
    <>
      <div class="station-board">
        <span>WINTER TOWN RAILWAY</span>
        <small>2017 → PRESENT</small>
      </div>
      {featured && <FeaturedWork />}
      <ol class="place-career">
        {experience.map((job) => (
          <li key={job.company}>
            <span class="place-eyebrow">
              {job.dates} · {job.location}
            </span>
            <h3>{job.company}</h3>
            <h4>{job.role}</h4>
            <p>{job.context}</p>
            {job.company === "KTO Group" && (
              <p>
                <a href={ktoCaseStudy.href}>Read the KTO case study ↗</a>
              </p>
            )}
            <ul>
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}

export function PostOffice() {
  return (
    <>
      <div class="post-vignette" aria-hidden="true">
        <div class="post-envelope">
          <i />
        </div>
      </div>
      <div class="place-contact">
        <a href={`mailto:${profile.email}`}>
          <small>EMAIL</small>
          <span>{profile.email} ↗</span>
        </a>
        <a
          href="https://github.com/j4ckwinter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <small>GITHUB</small>
          <span>j4ckwinter ↗</span>
        </a>
        <a
          href="https://linkedin.com/in/jack-winter-409a09a4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <small>LINKEDIN</small>
          <span>Jack Winter ↗</span>
        </a>
      </div>
    </>
  );
}

export default function PlaceContent({
  place,
  initialProject,
  onProjectChange,
}: {
  place: "workshop" | "home" | "station" | "post";
  initialProject?: 0 | 1 | 2;
  onProjectChange?: (project: 0 | 1 | 2) => void;
}) {
  return (
    <div class="place-content">
      {place === "workshop" ? (
        <Workshop
          initialProject={initialProject}
          onProjectChange={onProjectChange}
        />
      ) : place === "home" ? (
        <Home />
      ) : place === "station" ? (
        <Station />
      ) : (
        <PostOffice />
      )}
    </div>
  );
}
