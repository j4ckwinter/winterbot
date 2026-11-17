import { profile } from "./profile";

export default function IdentityBar() {
  return (
    <header class="identity-bar">
      <div>
        <h1>
          Jack Winter<span class="identity-dot">.</span>
        </h1>
        <span class="identity-role">{profile.jobTitle}</span>
      </div>
      <div class="identity-links">
        <a href="/portfolio">Plain portfolio</a>
        <a href={`mailto:${profile.email}`}>Get in touch ↗</a>
      </div>
    </header>
  );
}
