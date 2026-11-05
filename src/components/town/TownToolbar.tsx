import { TrainerPortrait } from "./TrainerCard";
import type { Scene } from "./world";

type Props = {
  ready: boolean;
  scene: Scene;
  sceneName: string;
  overview: boolean;
  soundEnabled: boolean;
  season: "leaf" | "fire";
  onOpenProfile: () => void;
  onLeaveRoom: () => void;
  onToggleOverview: () => void;
  onToggleSound: () => void;
  onToggleSeason: () => void;
};

export default function TownToolbar({
  ready,
  scene,
  sceneName,
  overview,
  soundEnabled,
  season,
  onOpenProfile,
  onLeaveRoom,
  onToggleOverview,
  onToggleSound,
  onToggleSeason,
}: Props) {
  return (
    <div class={`world-toolbar ${scene !== "town" ? "room-toolbar" : ""}`}>
      <div class="scene-heading">
        <button
          class="trainer-button"
          disabled={!ready}
          aria-label="Open trainer card"
          title="Jack’s trainer card"
          onClick={(event) => {
            event.currentTarget.focus();
            onOpenProfile();
          }}
        >
          <TrainerPortrait />
        </button>
        <span class="status-dot" />
        <h2 aria-live="polite">{sceneName}</h2>
        {scene !== "town" && (
          <button
            onClick={onLeaveRoom}
            aria-label="Leave room"
            title="Back to town"
          >
            ←
          </button>
        )}
      </div>
      <div class="toolbar-actions">
        <button
          disabled={!ready}
          onClick={onToggleOverview}
          aria-pressed={overview}
        >
          {overview ? "Follow player" : "Map"}
        </button>
        <details class="world-menu">
          <summary>Menu</summary>
          <div class="view-options">
            <button
              disabled={!ready}
              aria-pressed={soundEnabled}
              onClick={onToggleSound}
              aria-label="Sound"
            >
              Sound {soundEnabled ? "on" : "off"}
            </button>
            <button
              disabled={!ready}
              class="season-toggle"
              onClick={onToggleSeason}
              aria-label={`Switch to ${season === "leaf" ? "autumn" : "summer"}`}
            >
              {season === "leaf" ? "Summer" : "Autumn"} ⇄
            </button>
          </div>
        </details>
      </div>
    </div>
  );
}
