import type { Content } from "./navigation";
import "./trainer-card.css";

export function TrainerPortrait() {
  return (
    <svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">
      <path fill="#dce3bc" d="M0 0h32v32H0z" />
      <path fill="#a84e39" d="M5 26h22v6H5z" />
      <path fill="#e8b681" d="M9 8h14v15h-3v4h-8v-4H9z" />
      <path fill="#49372c" d="M8 5h16v5h2v8h-4v-6H12v4H7V9h1z" />
      <path fill="#79583d" d="M10 6h9v3h-9z" />
      <path fill="#30312d" d="M12 17h2v3h-2zM20 17h2v3h-2z" />
      <path fill="#a9694a" d="M15 23h5v1h-5z" />
      <path fill="#e4bb73" d="M8 28h3v4H8zM22 28h3v4h-3z" />
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
          <p class="eyebrow">WINTER TOWN · TRAINER NO. 001</p>
          <h3>Jack Winter</h3>
          <p>Senior software engineer · London</p>
        </div>
      </div>
      <p>
        I build frontend systems at KTO and tools for developers in my spare
        time.
      </p>
      <dl class="trainer-facts">
        <div>
          <dt>Speciality</dt>
          <dd>Frontend architecture, performance, real-time interfaces</dd>
        </div>
        <div>
          <dt>Toolkit</dt>
          <dd>TypeScript · Angular · React · Node.js</dd>
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
        <a href="mailto:jackwinter.10@gmail.com">Email Jack ↗</a>
        <a href="/portfolio">Read the full portfolio ↗</a>
      </div>
    </section>
  );
}
