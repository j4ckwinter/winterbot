import "./place-content.css";
import ProjectDemo from "./ProjectDemo";

import { projects } from "./projects";

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
        <dt>Approach</dt>
        <dd>{project.story.approach}</dd>
        <dt>Tradeoff</dt>
        <dd>{project.story.tradeoff}</dd>
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
        <ProjectDemo key={selected} project={selected} />
        <p>{project.description}</p>
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

export function Home() {
  return (
    <>
      <p>
        I build frontend systems with Angular, React, and TypeScript. At KTO, I
        work on sportsbook architecture, performance, and real-time data. My
        side projects focus on tools for coding agents.
      </p>
      <h3>Tools</h3>
      <div class="place-toolkit">
        <div>
          <h4>Interfaces</h4>
          <p>
            TypeScript · JavaScript · React · Angular · Astro · Tailwind · CSS ·
            HTML
          </p>
        </div>
        <div>
          <h4>Backend</h4>
          <p>
            Node.js · Fastify · Express.js · Go · Java · Spring · PostgreSQL
          </p>
        </div>
        <div>
          <h4>Development & testing</h4>
          <p>
            Git · Docker · AWS · Vite · Storybook · Cypress · Playwright · Linux
            · Figma
          </p>
        </div>
      </div>
    </>
  );
}

export function Station() {
  return (
    <>
      <div class="station-board">
        <span>WINTER TOWN RAILWAY</span>
        <small>2017 → PRESENT</small>
      </div>
      <ol class="place-career">
        <li>
          <span class="place-eyebrow">2025 — PRESENT</span>
          <h3>KTO</h3>
          <h4>Senior Frontend Developer</h4>
          <p>
            Led the move from a hosted sportsbook to a custom frontend, owning
            architecture and core customer journeys in a business serving 1.4M
            active users.
          </p>
          <ul>
            <li>
              Delivered 40% faster FCP, 25% faster LCP, and 11× faster return
              navigation in performance testing.
            </li>
            <li>
              Designed a modular architecture spanning 27 packages and 22
              modules.
            </li>
            <li>
              Moved high-frequency event and odds processing off the main thread
              with Web Workers.
            </li>
          </ul>
        </li>
        <li>
          <span class="place-eyebrow">2023 — 2025</span>
          <h3>GeoGaming Group</h3>
          <h4>Senior Angular Developer</h4>
          <p>
            Modernised frontend architecture and built real-time interfaces with
            RxJS and WebSockets.
          </p>
          <ul>
            <li>Reduced load times by 30%.</li>
            <li>
              Raised unit test coverage from 25% to 75% using Jest and Cypress.
            </li>
            <li>Mentored junior developers and reviewed code.</li>
          </ul>
        </li>
        <li>
          <span class="place-eyebrow">2017 — 2022</span>
          <h3>Smartstream Technologies</h3>
          <h4>Senior Software Engineer</h4>
          <p>
            Led a new Angular frontend replacing a legacy system, enabling two
            high-profile deals.
          </p>
          <ul>
            <li>Built internal tools with React and Node.js.</li>
            <li>
              Prototyped a machine learning model for transaction forecasting.
            </li>
            <li>
              Supported production systems and interviewed engineers across
              seniority levels.
            </li>
          </ul>
        </li>
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
        <a href="mailto:jackwinter.10@gmail.com">
          <small>EMAIL</small>
          <span>jackwinter.10@gmail.com ↗</span>
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
