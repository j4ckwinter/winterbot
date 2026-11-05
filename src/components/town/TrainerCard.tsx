import { profile } from "./profile";
import type { Content } from "./navigation";
import { characterPalette as ink } from "./characterPalette";
import "./trainer-card.css";

export function TrainerPortrait() {
  return (
    <svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">
      <path fill={ink.portraitBackground} d="M0 0h32v32H0z" />
      <path fill="#b9c69d" d="M0 26h32v6H0z M3 20h3v6H3z M26 15h3v11h-3z" />
      <path fill={ink.jacketShadow} d="M9 25h14v2h5v5H4v-5h5z" />
      <path fill={ink.jacket} d="M6 28h20v4H6z M10 25h12v7H10z" />
      <path fill={ink.jacketLight} d="M6 28h5v4H6z M10 26h4v2h-4z" />
      <path fill={ink.skinShadow} d="M9 8h14v14h-3v5h-8v-5H9z" />
      <path fill={ink.skin} d="M10 9h12v13h-3v4h-6v-4h-3z" />
      <path fill={ink.skinLight} d="M11 12h3v6h-3z" />
      <path fill={ink.hair} d="M10 4h11v2h3v3h2v9h-4v-7h-5V9h-5v6H7V9h1V6h2z" />
      <path fill={ink.hairLight} d="M11 6h8v2h-8z M9 9h3v3H9z" />
      <path fill={ink.outline} d="M12 16h2v3h-2z M20 16h2v3h-2z" />
      <path fill={ink.skinShadow} d="M15 22h5v1h-5z" />
      <path fill={ink.lining} d="M12 26h3v3h2v-3h3v2h-2v4h-4v-4h-2z" />
      <path fill={ink.packShadow} d="M8 28h3v4H8z M22 28h3v4h-3z" />
      <path fill={ink.packLight} d="M9 28h1v4H9z M23 28h1v4h-1z" />
    </svg>
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
      <div class="trainer-actions">
        <a href={`mailto:${profile.email}`}>Email Jack ↗</a>
        <a href="/portfolio">Read the full portfolio ↗</a>
      </div>
    </section>
  );
}
