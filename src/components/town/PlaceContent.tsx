import { useRef } from "preact/hooks";
import ProjectIcon from "./ProjectIcon";
import FeaturedWork from "./FeaturedWork";
import "./place-content.css";
import ProjectDemo from "./ProjectDemo";
import { ktoCaseStudy } from "../../data/ktoCaseStudy";

import {
  projects,
  getProject,
  DEFAULT_PROJECT,
  type ProjectId,
} from "./projects";
import { profile, skills, education, contacts, experience } from "./profile";

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

function Workshop({
  initialProject = DEFAULT_PROJECT,
  onProjectChange,
}: {
  initialProject?: ProjectId;
  onProjectChange?: (project: ProjectId) => void;
}) {
  const demoRef = useRef<HTMLDivElement>(null);
  const selected = initialProject;
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

export function About() {
  return (
    <>
      <div class="about-intro">
        <p>{profile.summary}</p>
      </div>
      <p class="about-approach">{profile.approach}</p>
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
            <ul aria-label={group.name}>
              {group.tools.split(" · ").map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div class="place-education">
        <h3>Education</h3>
        <p>
          <strong>{education.qualification}</strong>
          <br />
          {education.institution}
        </p>
        <span>{education.dates}</span>
      </div>
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
      <div class="place-contact">
        {contacts.map((contact) => {
          const [name, domain] = contact.text.split("@");
          return contact.href.startsWith("mailto:") ? (
            <a href={contact.href} key={contact.label}>
              <small>{contact.label}</small>
              <span>
                {name}@<wbr />
                {domain} ↗
              </span>
            </a>
          ) : (
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              key={contact.label}
            >
              <small>{contact.label}</small>
              <span>{contact.text} ↗</span>
            </a>
          );
        })}
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
  initialProject?: ProjectId;
  onProjectChange?: (project: ProjectId) => void;
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
