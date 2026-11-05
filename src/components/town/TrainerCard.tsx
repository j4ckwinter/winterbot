import { profile } from "./profile";
import { ktoCaseStudy } from "../../data/ktoCaseStudy";
import type { Content } from "./navigation";
import "./trainer-card.css";

export function TrainerPortrait() {
  return (
    <img
      src="/profile.jpeg"
      width="319"
      height="319"
      alt=""
      class="trainer-portrait"
      decoding="async"
    />
  );
}

export default function TrainerCard({
  onNavigate,
}: {
  onNavigate: (content: Content) => void;
}) {
  return (
    <section class="trainer-card" aria-label="Jack’s trainer card">
      <div class="trainer-identity">
        <TrainerPortrait />
        <div>
          <p class="eyebrow">WINTER TOWN</p>
          <h3>Jack Winter</h3>
          <p>
            {profile.role} · {profile.location}
          </p>
        </div>
      </div>
      <p>{profile.summary}</p>
      <dl class="trainer-facts">
        <div>
          <dt>Speciality</dt>
          <dd>{profile.speciality}</dd>
        </div>
        <div>
          <dt>Toolkit</dt>
          <dd>{profile.toolkit}</dd>
        </div>
      </dl>
      <nav class="trainer-links" aria-label="Trainer card sections">
        <button onClick={() => onNavigate({ place: "workshop" })}>
          Projects ↗
        </button>
        <button onClick={() => onNavigate({ place: "home" })}>
          About & skills ↗
        </button>
        <button onClick={() => onNavigate({ place: "station" })}>
          Experience ↗
        </button>
        <button onClick={() => onNavigate({ place: "post" })}>Contact ↗</button>
      </nav>
      <p>
        <a href={ktoCaseStudy.href}>Read the KTO case study ↗</a>
      </p>
      <div class="trainer-actions">
        <a href={`mailto:${profile.email}`}>Email Jack ↗</a>
        <a href="/portfolio">Read the full portfolio ↗</a>
      </div>
    </section>
  );
}
