import {
  places,
  type Direction,
  type Landmark,
  type Place,
  type Scene,
} from "./world";

type Props = {
  ready: boolean;
  scene: Scene;
  walkTarget: boolean;
  visited: Place[];
  logOpen: boolean;
  manualControls: boolean;
  near?: Landmark;
  onCancelWalk: () => void;
  onToggleLog: () => void;
  onToggleManualControls: () => void;
  onStep: (direction: Direction) => void;
  onStartWalking: (direction: Direction) => void;
  onStopWalking: () => void;
  onInteract: () => void;
};

export default function TownControls({
  ready,
  scene,
  walkTarget,
  visited,
  logOpen,
  manualControls,
  near,
  onCancelWalk,
  onToggleLog,
  onToggleManualControls,
  onStep,
  onStartWalking,
  onStopWalking,
  onInteract,
}: Props) {
  return (
    <>
      <div class="world-bottom">
        <span class="keyboard-help">
          ↑ ↓ ← → / WASD <span>move · Enter interact</span>
        </span>
        <span class="touch-help">
          {scene === "town"
            ? "Tap a building to visit"
            : "Tap an exhibit to read"}
        </span>
        {walkTarget ? (
          <button class="cancel-walk" onClick={onCancelWalk}>
            Cancel walk <span>Esc</span>
          </button>
        ) : (
          <button
            class="progress-summary"
            disabled={!ready}
            onClick={onToggleLog}
            aria-expanded={logOpen}
            aria-controls="travel-log"
            aria-label={`Travel log: ${visited.length} of 4 places explored`}
          >
            {visited.length} / 4 places explored{" "}
            <span aria-hidden="true">▤</span>
          </button>
        )}
      </div>
      <div class={`play-controls ${manualControls ? "controls-expanded" : ""}`}>
        <button
          class="touch-controls-toggle"
          disabled={!ready}
          aria-expanded={manualControls}
          aria-controls="movement-controls"
          onClick={onToggleManualControls}
        >
          {manualControls ? "Hide controls" : "Walk controls"}
        </button>
        <div
          class="d-pad"
          id="movement-controls"
          aria-label="Movement controls"
        >
          {(["up", "left", "down", "right"] as const).map((dir, i) => (
            <button
              disabled={!ready}
              class={`pad-${dir}`}
              aria-label={`Move ${dir}`}
              onClick={(e) => {
                if (e.detail === 0) {
                  onStep(dir);
                }
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                onStartWalking(dir);
              }}
              onPointerUp={onStopWalking}
              onPointerCancel={onStopWalking}
              onLostPointerCapture={onStopWalking}
            >
              {["↑", "←", "↓", "→"][i]}
            </button>
          ))}
        </div>
        <button
          class="interaction-button"
          disabled={!ready || !near}
          onClick={onInteract}
        >
          {near
            ? near.action.kind === "enter"
              ? `Enter ${near.name}`
              : near.name
            : "Walk up to a door or object"}
          <span>↵</span>
        </button>
      </div>
    </>
  );
}

export function TravelLog({
  visited,
  storageAvailable,
  onReset,
}: {
  visited: Place[];
  storageAvailable: boolean;
  onReset: () => void;
}) {
  return (
    <section
      class="travel-log"
      id="travel-log"
      aria-labelledby="travel-log-title"
    >
      <div class="log-heading">
        <h3 id="travel-log-title">Travel log</h3>
        <button onClick={onReset} disabled={!visited.length}>
          Reset exploration
        </button>
      </div>
      <ol aria-label="Explored places">
        {places.map((p) => (
          <li key={p.id} class={visited.includes(p.id) ? "is-visited" : ""}>
            <span class={`log-stamp stamp-${p.id}`} aria-hidden="true">
              {visited.includes(p.id) ? "✓" : "·"}
            </span>
            <span>
              {p.name}
              <small>
                {visited.includes(p.id) ? "Visited" : "Not visited"}
              </small>
            </span>
          </li>
        ))}
      </ol>
      <p>
        {storageAvailable
          ? "Saved on this device."
          : "Progress lasts for this visit."}
      </p>
    </section>
  );
}
