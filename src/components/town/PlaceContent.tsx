import type { ComponentChildren } from "preact";
import FeaturedWork from "./FeaturedWork";
import "./place-content.css";
import type { Place } from "./world";
import WorkshopContent from "./WorkshopContent";

import type { ProjectId } from "./projects";
import { profile, skills, education, contacts, experience } from "./profile";

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
            {job.caseStudy && (
              <p>
                <a href={job.caseStudy.href}>{job.caseStudy.label} ↗</a>
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
  project,
  onProjectChange,
}: {
  place: Place;
  project?: ProjectId;
  onProjectChange?: (project: ProjectId) => void;
}) {
  const content: Record<Place, ComponentChildren> = {
    workshop: (
      <WorkshopContent project={project} onProjectChange={onProjectChange} />
    ),
    home: <Home />,
    station: <Station />,
    post: <PostOffice />,
  };
  return <div class="place-content">{content[place]}</div>;
}
