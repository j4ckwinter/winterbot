import { useEffect, useRef, useState } from "preact/hooks";
import LookoutScene from "./LookoutScene";

type Point = { x: number; y: number };
const start = { x: 490, y: 510 };
const railing = { x: 400, y: 448 };
const train = { x: 490, y: 520 };
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
const onPlatform = ({ x, y }: Point) =>
  x >= 80 && x <= 720 && y >= 444 && y <= 532;

export default function LookoutWalk({
  reduced,
  onReturn,
}: {
  reduced: boolean;
  onReturn: () => void;
}) {
  const [position, setPosition] = useState<Point>(start);
  const [message, setMessage] = useState(
    "Walk to the railing for a view of the town.",
  );
  const [viewed, setViewed] = useState(false);
  const point = useRef<Point>(start);
  const keys = useRef(new Set<string>());
  const target = useRef<{ point: Point; action?: "view" | "return" } | null>(
    null,
  );
  const frame = useRef<number | null>(null);
  const last = useRef(0);
  const platform = useRef<HTMLDivElement>(null);
  const returnAction = useRef(onReturn);
  returnAction.current = onReturn;
  const reducedMotion = useRef(reduced);
  reducedMotion.current = reduced;
  const stop = () => {
    keys.current.clear();
    target.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };
  const inspect = () => {
    setViewed(true);
    setMessage(
      "The workshop and house face the crossroads. Beyond the bridge, the river runs toward the hills.",
    );
  };
  const arrive = (action?: "view" | "return") => {
    if (action === "view") inspect();
    if (action === "return") {
      stop();
      returnAction.current();
    }
  };
  const tick = (time: number) => {
    frame.current = null;
    const step =
      Math.max(0, Math.min((time - last.current) / 1000, 0.035)) * 150;
    last.current = time;
    const previous = point.current;
    let next: Point;
    let arrived: "view" | "return" | undefined;
    if (target.current) {
      const destination = target.current;
      const distance = Math.hypot(
        destination.point.x - previous.x,
        destination.point.y - previous.y,
      );
      if (reducedMotion.current || distance <= step) {
        next = destination.point;
        arrived = destination.action;
        target.current = null;
      } else {
        next = {
          x:
            previous.x + ((destination.point.x - previous.x) / distance) * step,
          y:
            previous.y + ((destination.point.y - previous.y) / distance) * step,
        };
      }
    } else {
      const dx =
        Number(keys.current.has("arrowright") || keys.current.has("d")) -
        Number(keys.current.has("arrowleft") || keys.current.has("a"));
      const dy =
        Number(keys.current.has("arrowdown") || keys.current.has("s")) -
        Number(keys.current.has("arrowup") || keys.current.has("w"));
      const length = Math.hypot(dx, dy) || 1;
      next = {
        x: Math.max(80, Math.min(720, previous.x + (dx / length) * step)),
        y: Math.max(444, Math.min(532, previous.y + (dy / length) * step)),
      };
    }
    if (onPlatform(next) && (next.x !== previous.x || next.y !== previous.y)) {
      point.current = next;
      setPosition(next);
    }
    arrive(arrived);
    if (keys.current.size || target.current)
      frame.current = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (frame.current !== null) return;
    last.current = performance.now();
    frame.current = requestAnimationFrame(tick);
  };
  const walkTo = (destination: Point, action?: "view" | "return") => {
    stop();
    if (!onPlatform(destination)) {
      setMessage(
        "Stay on the platform. The railing and tracks are closed to walking.",
      );
      return;
    }
    setMessage("Arrow keys or WASD to walk. Enter at the railing or train.");
    if (reduced) {
      point.current = destination;
      setPosition(destination);
      arrive(action);
    } else {
      target.current = { point: destination, action };
      wake();
    }
    if (action !== "return") platform.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    platform.current?.focus({ preventScroll: true });
    const hidden = () => {
      if (document.hidden) stop();
    };
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      stop();
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  const nearRailing =
    Math.hypot(position.x - railing.x, position.y - railing.y) < 35;
  const nearTrain = Math.hypot(position.x - train.x, position.y - train.y) < 35;
  return (
    <div class="lookout-walk">
      <div
        class="lookout-platform"
        ref={platform}
        tabIndex={0}
        role="group"
        aria-label="Lookout platform. Arrow keys or WASD to walk. Enter to interact."
        onBlur={() => keys.current.clear()}
        onKeyDown={(event) => {
          const key = event.key.toLowerCase();
          if (movementKeys.includes(key)) {
            event.preventDefault();
            target.current = null;
            keys.current.add(key);
            wake();
          }
          if (key === "enter") {
            event.preventDefault();
            if (nearRailing) inspect();
            else if (nearTrain) {
              stop();
              onReturn();
            }
          }
        }}
        onKeyUp={(event) => keys.current.delete(event.key.toLowerCase())}
        onClick={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          walkTo({
            x: ((event.clientX - box.left) / box.width) * 800,
            y: ((event.clientY - box.top) / box.height) * 560,
          });
        }}
      >
        <LookoutScene platform />
        <svg
          class="lookout-walk-overlay"
          viewBox="0 0 800 560"
          aria-hidden="true"
          shape-rendering="crispEdges"
        >
          <path
            d="M390 438h20v3h-20z M395 441h10v3h-10z"
            fill={viewed ? "#e1bb66" : "#f6efd4"}
          />
          <g
            class="lookout-player"
            data-x={Math.round(position.x)}
            data-y={Math.round(position.y)}
            transform={`translate(${position.x - 12} ${position.y - 32})`}
          >
            <path d="M3 30h18v3H3z" fill="#334b4544" />
            <path d="M5 22h6v10H5z M14 22h6v10h-6z" fill="#34485a" />
            <path d="M4 16h16v12H4z" fill="#b65f43" />
            <path d="M6 3h12v16H6z M3 6h18v10H3z" fill="#e8b681" />
            <path d="M6 1h12v3h3v13H3V4h3z" fill="#49372c" />
            <path d="M7 20h10v8H7z" fill="#d3ab68" />
          </g>
        </svg>
      </div>
      <div class="lookout-walk-actions">
        <button onClick={() => walkTo(railing, "view")}>
          Walk to the railing
        </button>
        <button onClick={() => walkTo(train, "return")}>
          Board the return train
        </button>
      </div>
      <div class="lookout-pad" aria-label="Lookout movement controls">
        {(["up", "left", "down", "right"] as const).map((direction, index) => (
          <button
            key={direction}
            aria-label={`Lookout move ${direction}`}
            onClick={(event) => {
              if (event.detail === 0) {
                const offsets = [
                  [0, -10],
                  [-10, 0],
                  [0, 10],
                  [10, 0],
                ];
                const [dx, dy] = offsets[index];
                walkTo({
                  x: Math.max(80, Math.min(720, point.current.x + dx)),
                  y: Math.max(444, Math.min(532, point.current.y + dy)),
                });
              }
            }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              stop();
              keys.current.add(`arrow${direction}`);
              wake();
            }}
            onPointerUp={stop}
            onPointerCancel={stop}
            onLostPointerCapture={stop}
          >
            {["↑", "←", "↓", "→"][index]}
          </button>
        ))}
      </div>
      <p class="lookout-message" role="status">
        {message}
      </p>
    </div>
  );
}
