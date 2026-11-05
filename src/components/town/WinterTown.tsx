import TownScene from "./TownScene";
import { useTownCamera } from "./useTownCamera";
import TownToolbar from "./TownToolbar";
import ContentDialog from "./ContentDialog";
import TownControls, { TravelLog } from "./TownControls";
import { useEffect, useRef, useState } from "preact/hooks";
import { profile } from "./profile";
import type { Content } from "./navigation";
import { useContentNavigation } from "./useContentNavigation";
import {
  findRoute,
  destinationAt,
  landmarks,
  places,
  type Action,
  type Landmark,
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
export default function WinterTown() {
  const sound = useSound();
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
  const [manualControls, setManualControls] = useState(false);
  const [notice, setNotice] = useState("");
  const [tap, setTap] = useState<(Point & { id: number }) | null>(null);
  useEffect(() => {
    if (!tap) return;
    const timer = window.setTimeout(() => setTap(null), 550);
    return () => window.clearTimeout(timer);
  }, [tap]);
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
  const { ready, reduced, overview, setOverview, size, cameraStyle } =
    useTownCamera(world, position);
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
    setTap(null);
    setScene(next);
    setPosition(point);
    setDirection(next === "town" ? "down" : "up");
    setOverview(size.width <= 760 && !manualControls);
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
    setTap({ ...point, id: performance.now() });
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
  const sceneName =
    scene === "town" ? "Winter Town" : places.find((p) => p.id === scene)!.name;
  return (
    <div
      class={`town-app season-${season} ${overview || reduced ? "is-overview" : ""}`}
      onPointerDownCapture={(event) => {
        event.currentTarget.dataset.inputMethod = "pointer";
      }}
      onKeyDownCapture={(event) => {
        event.currentTarget.dataset.inputMethod = "keyboard";
      }}
    >
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
      <main id="main">
        <section class="world-shell" aria-label="Explore Winter Town">
          <TownToolbar
            ready={ready}
            scene={scene}
            sceneName={sceneName}
            overview={overview}
            soundEnabled={sound.enabled}
            season={season}
            onOpenProfile={() => openContent({ place: "profile" })}
            onLeaveRoom={() => changeScene("town")}
            onToggleOverview={() => setOverview((value) => !value)}
            onToggleSound={sound.toggle}
            onToggleSeason={() =>
              setSeason((value) => (value === "leaf" ? "fire" : "leaf"))
            }
          />
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
            <div class="camera-layer" style={cameraStyle}>
              <TownScene
                key={scene}
                scene={scene}
                ready={ready}
                position={position}
                direction={direction}
                walking={walking}
                visited={visited}
                inspectedProjects={inspectedProjects}
                destinations={destinations}
                near={near}
                walkTarget={walkTarget}
                walkPath={walkPath}
                tap={tap}
                onTravel={travel}
                onExit={() => travel(exit)}
                onRevealMap={() => setOverview(true)}
              />
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
          <TownControls
            ready={ready}
            scene={scene}
            walkTarget={!!walkTarget}
            visited={visited}
            logOpen={logOpen}
            manualControls={manualControls}
            near={near}
            onCancelWalk={stop}
            onToggleLog={() => setLogOpen((value) => !value)}
            onToggleManualControls={() => {
              stop();
              setManualControls((value) => !value);
              setOverview(manualControls);
            }}
            onStep={(direction) => {
              stepDirection(direction);
              setOverview(false);
            }}
            onStartWalking={(direction) => {
              stop();
              setOverview(false);
              keys.current.add(`arrow${direction}`);
              wake();
              world.current?.focus({ preventScroll: true });
            }}
            onStopWalking={() => keys.current.clear()}
            onInteract={() => near && act(near.action)}
          />
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
            <TravelLog
              visited={visited}
              storageAvailable={storageAvailable}
              onReset={resetExploration}
            />
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
      <ContentDialog
        dialogRef={dialog}
        content={content}
        scene={scene}
        copyState={copyState}
        permalink={permalink}
        onClose={closeContent}
        onSelect={selectContent}
        onCopy={copyLink}
      />
    </div>
  );
}
