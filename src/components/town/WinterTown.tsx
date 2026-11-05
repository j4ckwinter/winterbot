import { useEffect, useRef, useState } from "preact/hooks";
import { memo } from "preact/compat";
import TownMap from "./TownMap";
import InteriorMap from "./InteriorMap";
import PlaceContent from "./PlaceContent";
import Player from "./Player";
import TrainerCard, { TrainerPortrait } from "./TrainerCard";
import { profile } from "./profile";
import type { Content } from "./navigation";
import { useContentNavigation } from "./useContentNavigation";
import {
  findRoute,
  destinationAt,
  landmarks,
  places,
  trees,
  type Action,
  type Landmark,
  type Place,
  type Point,
  type Scene,
} from "./world";
import { useProgress } from "./useProgress";
import { useSound } from "./useSound";
import { useMovement } from "./useMovement";
import StationAttendant from "./StationAttendant";
import RoomNote from "./RoomNote";
import StationTrip from "./StationTrip";
import "./town.css";
import "./journey.css";
import "./interaction-feedback.css";

const Scenery = memo(TownMap);
const Interior = memo(InteriorMap);
const exit: Landmark = {
  id: "exit",
  name: "Return to town",
  x: 480,
  y: 590,
  labelY: 590,
  action: { kind: "exit" },
};
const movementKeys = [
  "arrowup",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "w",
  "a",
  "s",
  "d",
];
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function WinterTown() {
  const sound = useSound();
  const [ready, setReady] = useState(false);
  const {
    season,
    setSeason,
    visited,
    markVisited,
    resetExploration,
    storageAvailable,
  } = useProgress();
  const [inspectedProjects, setInspectedProjects] = useState<number[]>([]);
  const recordInspection = (value: Content | null) => {
    if (value?.place !== "workshop") return;
    const project = value.project ?? 0;
    setInspectedProjects((current) =>
      current.includes(project) ? current : [...current, project],
    );
  };
  const [logOpen, setLogOpen] = useState(false);
  const [overview, setOverview] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [notice, setNotice] = useState("");
  const [size, setSize] = useState({ width: 960, height: 640 });
  const world = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const onArrival = useRef<(action: Action) => void>(() => {});
  const {
    scene,
    setScene,
    position,
    setPosition,
    engine,
    direction,
    setDirection,
    walking,
    keys,
    route,
    destination,
    walkTarget,
    setWalkTarget,
    walkPath,
    setWalkPath,
    cancelRoute,
    stop,
    stepDirection,
    wake,
  } = useMovement(dialog, onArrival);
  const {
    content,
    copyState,
    openContent,
    closeContent,
    selectContent,
    copyLink,
    permalink,
  } = useContentNavigation(dialog, stop, (value) => {
    recordInspection(value);
    if (value.place !== "profile") markVisited(value.place);
  });
  const changeScene = (next: Scene) => {
    stop();
    const from = engine.current.scene;
    const door = places.find((p) => p.id === from);
    const point =
      next === "town"
        ? { x: door?.x ?? 480, y: door?.y ?? 390 }
        : { x: 480, y: 550 };
    engine.current = { scene: next, position: point };
    setScene(next);
    setPosition(point);
    setDirection(next === "town" ? "down" : "up");
    setOverview(false);
    setNotice("");
    if (next !== "town") markVisited(next);
    world.current?.focus({ preventScroll: true });
  };
  const act = (action: Action) => {
    sound.play(action.kind === "inspect" ? "inspect" : "door");
    if (action.kind === "enter") changeScene(action.place);
    else if (action.kind === "exit") changeScene("town");
    else {
      setDirection("up");
      openContent({ place: action.place, project: action.project });
    }
  };
  onArrival.current = act;
  useEffect(() => {
    setReady(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    if (world.current) observer.observe(world.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  const travel = (landmark: Landmark) => {
    stop();
    setNotice("");
    if (reduced) {
      act(landmark.action);
      return;
    }
    const path = findRoute(scene, engine.current.position, landmark);
    if (!path.length) {
      setNotice("No path from here. Move back to the path and try again.");
      return;
    }
    route.current = path;
    setWalkTarget(landmark);
    setWalkPath(path);
    destination.current = landmark.action;
    wake();
    setOverview(false);
    world.current?.focus({ preventScroll: true });
  };
  const walkTo = (point: Point) => {
    const landmark = destinationAt(scene, point);
    if (landmark) {
      travel(landmark);
      return;
    }
    stop();
    const path = findRoute(scene, engine.current.position, point);
    if (!path.length) {
      setNotice("That spot is blocked.");
      return;
    }
    setNotice("");
    if (reduced) {
      engine.current.position = point;
      setPosition(point);
    } else {
      route.current = path;
      setWalkPath(path);
      setWalkTarget(point);
      wake();
    }
    world.current?.focus({ preventScroll: true });
  };
  const destinations = landmarks(scene);
  const near = [...destinations, ...(scene === "town" ? [] : [exit])].find(
    (p) => Math.hypot(position.x - p.x, position.y - p.y) < 48,
  );
  const scale =
    overview || reduced
      ? Math.min(size.width / 960, size.height / 640)
      : Math.max(1, Math.min(size.width / 960, size.height / 640));
  const camera = (length: number, view: number, point: number) =>
    length * scale <= view
      ? (view - length * scale) / 2
      : clamp(view / 2 - point * scale, view - length * scale, 0);
  const left = camera(960, size.width, position.x),
    top = camera(640, size.height, position.y);
  const sceneName =
    scene === "town" ? "Winter Town" : places.find((p) => p.id === scene)!.name;
  return (
    <div
      class={`town-app season-${season} ${overview || reduced ? "is-overview" : ""}`}
    >
      <header class="identity-bar">
        <div>
          <h1>
            Jack Winter<span class="identity-dot">.</span>
          </h1>
          <span class="identity-role">
            Frontend engineer · {profile.location}
          </span>
        </div>
        <div class="identity-links">
          <a href="/portfolio">Plain portfolio</a>
          <a href={`mailto:${profile.email}`}>Get in touch ↗</a>
        </div>
      </header>
      <main id="main">
        <section class="world-shell" aria-label="Explore Winter Town">
          <div class="world-toolbar">
            <div class="scene-heading">
              <button
                class="trainer-button"
                disabled={!ready}
                aria-label="Open trainer card"
                title="Jack’s trainer card"
                onClick={(event) => {
                  event.currentTarget.focus();
                  openContent({ place: "profile" });
                }}
              >
                <TrainerPortrait />
              </button>
              <span class="status-dot" />
              <h2 aria-live="polite">{sceneName}</h2>
              {scene !== "town" && (
                <button
                  onClick={() => changeScene("town")}
                  aria-label="Leave room"
                >
                  ← Town
                </button>
              )}
            </div>
            <div class="toolbar-actions">
              <button
                disabled={!ready}
                onClick={() => setOverview((v) => !v)}
                aria-pressed={overview}
              >
                {overview ? "Follow player" : "Map"}
              </button>
              <details class="world-menu">
                <summary>Menu</summary>
                <div class="view-options">
                  <button
                    disabled={!ready}
                    aria-pressed={sound.enabled}
                    onClick={sound.toggle}
                    aria-label="Sound"
                  >
                    Sound {sound.enabled ? "on" : "off"}
                  </button>
                  <button
                    disabled={!ready}
                    class="season-toggle"
                    onClick={() =>
                      setSeason((s) => (s === "leaf" ? "fire" : "leaf"))
                    }
                    aria-label={`Switch to ${season === "leaf" ? "autumn" : "summer"}`}
                  >
                    {season === "leaf" ? "Summer" : "Autumn"} ⇄
                  </button>
                </div>
              </details>
            </div>
          </div>
          <div
            class="world"
            ref={world}
            tabIndex={0}
            role="group"
            aria-label={`${scene === "town" ? "Town map" : sceneName + " room"}. Arrow keys or WASD to walk. Enter to interact.`}
            onClick={(e) => {
              if (!ready || (e.target as Element).closest("button")) return;
              const layer = world.current
                ?.querySelector(".camera-layer")
                ?.getBoundingClientRect();
              if (!layer) return;
              walkTo({
                x:
                  Math.round(
                    (e.clientX - layer.left) / (layer.width / 960) / 10,
                  ) * 10,
                y:
                  Math.round(
                    (e.clientY - layer.top) / (layer.height / 640) / 10,
                  ) * 10,
              });
            }}
            onBlur={() => keys.current.clear()}
            onKeyDown={(e) => {
              if (e.target !== world.current) return;
              const key = e.key.toLowerCase();
              if (movementKeys.includes(key)) {
                e.preventDefault();
                cancelRoute();
                keys.current.add(key);
                wake();
                setOverview(false);
              }
              if (key === "enter" && near) {
                e.preventDefault();
                act(near.action);
              }
              if (key === "escape") {
                e.preventDefault();
                if (route.current.length) stop();
                else if (scene !== "town") changeScene("town");
              }
            }}
            onKeyUp={(e) => keys.current.delete(e.key.toLowerCase())}
          >
            <div
              class="camera-layer"
              style={{
                transform: `translate(${left}px, ${top}px) scale(${scale})`,
              }}
            >
              <div class="scene-layer" key={scene} data-scene={scene}>
                {scene === "town" ? (
                  <Scenery player={position} />
                ) : (
                  <Interior
                    room={scene}
                    player={position}
                    inspectedProjects={inspectedProjects}
                  />
                )}
                {walkTarget && (
                  <svg
                    class="walk-route"
                    viewBox="0 0 960 640"
                    aria-hidden="true"
                  >
                    <polyline
                      points={walkPath.map((p) => `${p.x},${p.y}`).join(" ")}
                    />
                    <circle cx={walkTarget.x} cy={walkTarget.y} r="9" />
                  </svg>
                )}
                {destinations.map((p) => (
                  <button
                    disabled={!ready}
                    key={p.id}
                    class={`map-label ${scene === "town" ? "town-label" : ""} ${near?.id === p.id ? "is-actionable" : ""} ${Math.hypot(position.x - p.x, position.y - p.y) < 90 ? "is-near" : ""}`}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible"))
                        setOverview(true);
                    }}
                    style={{ left: p.x, top: p.labelY }}
                    onClick={() => travel(p)}
                    aria-label={`${scene === "town" ? "Walk to" : "Inspect"} ${p.name}`}
                  >
                    <span>{p.name}</span>
                    {scene === "town" && (
                      <small>
                        {places.find((v) => v.id === p.id)?.content}{" "}
                        {visited.includes(p.id as Place) ? "✓" : "↗"}
                      </small>
                    )}
                  </button>
                ))}
                <Player
                  position={position}
                  direction={direction}
                  walking={walking}
                />
                {scene === "town" && (
                  <svg
                    class="town-foreground"
                    viewBox="0 0 960 640"
                    aria-hidden="true"
                  >
                    {trees
                      .filter(
                        ([x, y]) =>
                          position.y < y + 60 &&
                          Math.abs(position.x - (x + 29)) < 55 &&
                          Math.abs(position.y - (y + 30)) < 70,
                      )
                      .map(([x, y]) => (
                        <use key={`${x}-${y}`} href="#town-tree" x={x} y={y} />
                      ))}
                  </svg>
                )}
                {scene !== "town" && (
                  <button
                    class="exit-door"
                    onFocus={(e) => {
                      if (e.currentTarget.matches(":focus-visible"))
                        setOverview(true);
                    }}
                    onClick={() => travel(exit)}
                    style={{ left: 480, top: 600 }}
                    aria-label="Walk to exit"
                  >
                    EXIT ↓
                  </button>
                )}
              </div>
            </div>
            <div class="scene-arrival" key={scene} aria-hidden="true">
              <span>{sceneName}</span>
            </div>
            <div class="location-badge" aria-hidden="true">
              {scene === "town"
                ? "01 / WINTER TOWN"
                : `INTERIOR / ${scene.toUpperCase()}`}
            </div>
          </div>
          <div class="world-bottom">
            <span class="keyboard-help">
              ↑ ↓ ← → / WASD <span>move · Enter interact</span>
            </span>
            <span class="touch-help">Tap to walk · signs to enter</span>
            {walkTarget ? (
              <button class="cancel-walk" onClick={stop}>
                Cancel walk <span>Esc</span>
              </button>
            ) : (
              <button
                class="progress-summary"
                disabled={!ready}
                onClick={() => setLogOpen((v) => !v)}
                aria-expanded={logOpen}
                aria-controls="travel-log"
                aria-label={`Travel log: ${visited.length} of 4 places explored`}
              >
                {visited.length} / 4 places explored{" "}
                <span aria-hidden="true">▤</span>
              </button>
            )}
          </div>
          <div class="play-controls">
            <div class="d-pad" aria-label="Movement controls">
              {(["up", "left", "down", "right"] as const).map((dir, i) => (
                <button
                  disabled={!ready}
                  class={`pad-${dir}`}
                  aria-label={`Move ${dir}`}
                  onClick={(e) => {
                    if (e.detail === 0) {
                      stepDirection(dir);
                      setOverview(false);
                    }
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    stop();
                    setOverview(false);
                    keys.current.add(`arrow${dir}`);
                    wake();
                    world.current?.focus({ preventScroll: true });
                  }}
                  onPointerUp={() => keys.current.clear()}
                  onPointerCancel={() => keys.current.clear()}
                  onLostPointerCapture={() => keys.current.clear()}
                >
                  {["↑", "←", "↓", "→"][i]}
                </button>
              ))}
            </div>
            <button
              class="interaction-button"
              disabled={!ready || !near}
              onClick={() => near && act(near.action)}
            >
              {near
                ? near.action.kind === "enter"
                  ? `Enter ${near.name}`
                  : near.name
                : "Walk up to a door or object"}
              <span>↵</span>
            </button>
          </div>
          {scene !== "town" && scene !== "station" && (
            <RoomNote place={scene} />
          )}
          {scene === "station" && <StationAttendant />}
          {scene === "station" && (
            <StationTrip
              unlocked={inspectedProjects.length > 0}
              reduced={reduced}
              onStart={stop}
            />
          )}
          {logOpen && (
            <section
              class="travel-log"
              id="travel-log"
              aria-labelledby="travel-log-title"
            >
              <div class="log-heading">
                <h3 id="travel-log-title">Travel log</h3>
                <button onClick={resetExploration} disabled={!visited.length}>
                  Reset exploration
                </button>
              </div>
              <ol aria-label="Explored places">
                {places.map((p) => (
                  <li
                    key={p.id}
                    class={visited.includes(p.id) ? "is-visited" : ""}
                  >
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
          )}
          {notice && (
            <p class="route-notice" role="status">
              {notice}
            </p>
          )}
        </section>
        <nav class="quick-nav" aria-label="Quick access">
          {places.map((p) => (
            <button
              disabled={!ready}
              onClick={(event) => {
                event.currentTarget.focus();
                openContent({ place: p.id });
              }}
              key={p.id}
            >
              {p.content}
              <span>↗</span>
            </button>
          ))}
        </nav>
      </main>
      <dialog
        ref={dialog}
        class="place-dialog"
        aria-labelledby="place-title"
        onCancel={(e) => {
          e.preventDefault();
          closeContent();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeContent();
        }}
      >
        <div class="dialog-body">
          <header class="dialog-header">
            <div>
              <p class="eyebrow">
                {places.find((p) => p.id === content?.place)?.content}
              </p>
              <h2 id="place-title" tabIndex={-1}>
                {content?.place === "profile"
                  ? "Trainer card"
                  : places.find((p) => p.id === content?.place)?.name}
              </h2>
            </div>
            <button onClick={closeContent} aria-label="Close details">
              ✕
            </button>
          </header>
          {content?.place === "profile" ? (
            <TrainerCard onNavigate={selectContent} />
          ) : (
            content && (
              <PlaceContent
                key={content.place}
                place={content.place}
                initialProject={content.project}
                onProjectChange={(project) =>
                  selectContent({ place: "workshop", project })
                }
              />
            )
          )}
          <div class="share-content">
            <button onClick={copyLink}>Copy link</button>
            <a href={permalink}>Permalink ↗</a>
            <span role="status">{copyState}</span>
          </div>
          <button class="back-to-town" onClick={closeContent}>
            ← Back to {scene === "town" ? "town" : "room"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
