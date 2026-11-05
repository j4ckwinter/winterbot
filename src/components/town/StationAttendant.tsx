import "./town-life.css";

export default function StationAttendant() {
  return (
    <details class="station-attendant">
      <summary>
        <svg
          viewBox="0 0 32 40"
          aria-hidden="true"
          shape-rendering="crispEdges"
        >
          <path d="M7 35h18v3H7z" fill="#455d4733" />
          <path d="M9 26h6v10H9z M18 26h6v10h-6z" fill="#35494a" />
          <path
            d="M7 18h19v12H7z M4 21h4v10H4z M26 21h4v10h-4z"
            fill="#536e65"
          />
          <path d="M7 8h19v13H7z M10 21h13v3H10z" fill="#d8b281" />
          <path d="M7 3h19v7H7z M3 9h27v4H3z" fill="#344d41" />
          <path d="M9 5h15v3H9z M14 4h5v5h-5z" fill="#d4bd7e" />
          <path d="M10 15h3v3h-3z M21 15h3v3h-3z" fill="#493d31" />
          <path d="M14 20h7v2h-7z" fill="#a97553" />
          <path d="M15 24h3v6h-3z M21 24h3v3h-3z" fill="#d4bd7e" />
        </svg>
        <span>Talk to the station attendant</span>
      </summary>
      <p>
        “The workshop is west of the crossroads. Inspect a project there, then
        collect your ticket here. The lookout is the last stop.”
      </p>
    </details>
  );
}
