import type { ProjectId } from "./projects";
import { memo } from "preact/compat";
import TownMap from "./TownMap";
import InteriorMap from "./InteriorMap";
import Player from "./Player";
import {
  places,
  type Direction,
  type Landmark,
  type Place,
  type Point,
  type Scene,
} from "./world";

const Scenery = memo(TownMap);
const Interior = memo(InteriorMap);

type Props = {
  scene: Scene;
  ready: boolean;
  position: Point;
  direction: Direction;
  walking: boolean;
  visited: Place[];
  inspectedProjects: ProjectId[];
  destinations: Landmark[];
  near?: Landmark;
  walkTarget: Point | null;
  walkPath: Point[];
  tap: (Point & { id: number }) | null;
  onTravel: (destination: Landmark) => void;
  onExit: () => void;
  onRevealMap: () => void;
};

export default function TownScene({
  scene,
  ready,
  position,
  direction,
  walking,
  visited,
  inspectedProjects,
  destinations,
  near,
  walkTarget,
  walkPath,
  tap,
  onTravel,
  onExit,
  onRevealMap,
}: Props) {
  const activeDestination = walkTarget
    ? destinations.find((p) => p.x === walkTarget.x && p.y === walkTarget.y)
    : undefined;
  return (
    <div class="scene-layer" key={scene} data-scene={scene}>
      {scene === "town" ? (
        <Scenery player={position} destination={activeDestination?.id} />
      ) : (
        <Interior
          room={scene}
          player={position}
          inspectedProjects={inspectedProjects}
        />
      )}
      {tap && (
        <svg
          key={tap.id}
          class="tap-feedback"
          viewBox="0 0 960 640"
          aria-hidden="true"
        >
          <circle cx={tap.x} cy={tap.y} r="12" />
        </svg>
      )}
      {walkTarget && (
        <svg class="walk-route" viewBox="0 0 960 640" aria-hidden="true">
          <polyline points={walkPath.map((p) => `${p.x},${p.y}`).join(" ")} />
          <circle cx={walkTarget.x} cy={walkTarget.y} r="9" />
        </svg>
      )}
      {destinations.map((p) => (
        <button
          disabled={!ready}
          key={p.id}
          class={`map-label ${scene === "town" ? "town-label" : "room-label"} ${activeDestination?.id === p.id ? "is-destination" : ""} ${near?.id === p.id ? "is-actionable" : ""} ${Math.hypot(position.x - p.x, position.y - p.y) < 90 ? "is-near" : ""}`}
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) onRevealMap();
          }}
          style={{ left: p.x, top: p.labelY }}
          onClick={() => onTravel(p)}
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
      <Player position={position} direction={direction} walking={walking} />
      {scene !== "town" && (
        <button
          class="exit-door"
          onFocus={(e) => {
            if (e.currentTarget.matches(":focus-visible")) onRevealMap();
          }}
          onClick={onExit}
          style={{ left: 480, top: 600 }}
          aria-label="Walk to exit"
        >
          EXIT ↓
        </button>
      )}
    </div>
  );
}
