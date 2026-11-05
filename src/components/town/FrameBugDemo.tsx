import { useState } from "preact/hooks";

export default function FrameBugDemo() {
  const [fixed, setFixed] = useState<boolean | null>(null);
  const scheduled = 400.9;
  const frame = 393.898;
  const elapsed = (frame - scheduled) / 1000;
  const step =
    (fixed ? Math.max(0, Math.min(elapsed, 0.035)) : Math.min(elapsed, 0.035)) *
    190;
  const consumesOrigin = 0 <= step;
  return (
    <div
      class="demo-frame-bug"
      role="group"
      aria-label="Walking regression replay"
    >
      <h5>The first frame stopped walking</h5>
      <p>
        A timing bug found while building this town: the first animation-frame
        timestamp preceded the click’s recorded time. At the route’s starting
        point, a negative movement step led to a zero-distance division.
      </p>
      <dl>
        <div>
          <dt>Click recorded</dt>
          <dd>400.900 ms</dd>
        </div>
        <div>
          <dt>First frame</dt>
          <dd>393.898 ms</dd>
        </div>
      </dl>
      <div class="demo-options">
        <button aria-pressed={fixed === false} onClick={() => setFixed(false)}>
          Replay failing frame
        </button>
        <button aria-pressed={fixed === true} onClick={() => setFixed(true)}>
          Replay fixed frame
        </button>
      </div>
      {fixed !== null && (
        <div class="demo-frame-result" role="status">
          <strong>
            {consumesOrigin
              ? "Origin consumed; position stays valid."
              : "Direction becomes NaN; walking breaks."}
          </strong>
          <p>
            Movement step: {step.toFixed(3)} px.{" "}
            {consumesOrigin
              ? "Zero distance fits the zero step, so the path advances."
              : "Zero distance exceeds a negative step, so direction calculation divides 0 by 0."}
          </p>
          <pre>
            <code>
              {fixed
                ? "const step = Math.max(0, Math.min(elapsed, 0.035)) * 190;"
                : "const step = Math.min(elapsed, 0.035) * 190;"}
            </code>
          </pre>
        </div>
      )}
      <p>
        The fix clamps elapsed time and rejects non-finite collision
        coordinates. The regression check injects an earlier frame timestamp
        after a route starts, then checks arrival and route cleanup. This replay
        demonstrates the arithmetic; it does not run the browser test.
      </p>
    </div>
  );
}
