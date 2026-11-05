import { useState } from "preact/hooks";
import "./project-demo.css";
import RouteDemo from "./RouteDemo";
import TokenBudgetDemo from "./TokenBudgetDemo";
import FrameBugDemo from "./FrameBugDemo";
import { recordedChunks as snippets } from "./recordedChunks";

const palettes = {
  Summer: {
    grass: "#94b76b",
    roof: "#b96446",
    sky: "#c8ddbd",
    window: "#b5d9cb",
  },
  Autumn: {
    grass: "#b29a58",
    roof: "#925542",
    sky: "#ead3a0",
    window: "#f1cc83",
  },
  Night: {
    grass: "#435b55",
    roof: "#645c70",
    sky: "#303d52",
    window: "#f5d48b",
  },
};

function PaletteDemo() {
  const [palette, setPalette] = useState<keyof typeof palettes>("Summer");
  const colors = palettes[palette];
  return (
    <section
      class="project-demo demo-console"
      aria-label="Portfolio palette demo"
    >
      <div class="demo-frame-label">
        <span>WinterBot / palette workbench</span>
        <span aria-hidden="true">01</span>
      </div>
      <h4>Change the season</h4>
      <div
        class="demo-palette-scene"
        style={{ background: colors.sky }}
        aria-label={`${palette} house preview`}
        role="img"
      >
        <div class="demo-ground" style={{ background: colors.grass }} />
        <div class="demo-house">
          <i class="demo-roof" style={{ background: colors.roof }} />
          <i class="demo-window" style={{ background: colors.window }} />
          <i class="demo-door" />
        </div>
      </div>
      <div class="demo-swatches" aria-label={`${palette} colours`}>
        {Object.entries(colors).map(([name, color]) => (
          <span key={name}>
            <i style={{ background: color }} aria-hidden="true" />
            <span>
              {name}
              <code>{color}</code>
            </span>
          </span>
        ))}
      </div>
      <div class="demo-options" aria-label="Palette">
        {(Object.keys(palettes) as (keyof typeof palettes)[]).map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={palette === name}
            onClick={() => setPalette(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

function SearchDemo() {
  const [query, setQuery] = useState("budget");
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = snippets.filter((snippet) =>
    terms.every((term) =>
      `${snippet.path} ${snippet.terms} ${snippet.code}`
        .toLowerCase()
        .includes(term),
    ),
  );
  return (
    <section
      class="project-demo demo-source-browser"
      aria-label="Sample code search"
    >
      <div class="demo-frame-label">
        <span>brain-cache / source browser</span>
        <span aria-hidden="true">02</span>
      </div>
      <span class="demo-kicker">Recorded AST chunks · 34a4ebb</span>
      <h4>Inside brain-cache</h4>
      <p>Explore four recorded functions from brain-cache’s own source.</p>
      <TokenBudgetDemo />
      <h4>Explore the recorded source</h4>
      <div class="demo-options" aria-label="Example queries">
        {["budget", "offline", "stale"].map((example) => (
          <button
            type="button"
            key={example}
            aria-pressed={query === example}
            onClick={() => setQuery(example)}
          >
            {example}
          </button>
        ))}
      </div>
      <label class="demo-search-label" htmlFor="sample-code-query">
        Find code
      </label>
      <input
        id="sample-code-query"
        class="demo-search"
        type="search"
        value={query}
        placeholder="Try budget, offline, or stale"
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
      <p class="demo-result-count" role="status">
        {results.length} {results.length === 1 ? "match" : "matches"}
      </p>
      {results.length ? (
        <div class="demo-results">
          {results.map((result) => (
            <details key={result.name} open={terms.length > 0}>
              <summary>{result.path}</summary>
              <p class="demo-explanation">
                {result.why}{" "}
                <a
                  href={result.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source ↗
                </a>
              </p>
              <pre>
                <code>{result.code}</code>
              </pre>
            </details>
          ))}
        </div>
      ) : (
        <p class="demo-empty">
          No matching snippets. Try “budget” or clear the search.
        </p>
      )}
    </section>
  );
}

const workflows = {
  Bug: [
    {
      name: "Reproduce",
      detail:
        "Click-to-walk left the player at the starting point. Keyboard movement still worked. A frame trace showed 393.898 ms arriving after a click recorded at 400.900 ms.",
    },
    {
      name: "Test",
      detail:
        "Inject an earlier timestamp only after a walk route exists, then assert that the player reaches the target and the route marker disappears.",
    },
    {
      name: "Fix",
      detail:
        "Clamp elapsed time to zero before calculating movement. Reject non-finite coordinates in collision checks so NaN cannot enter the player state.",
    },
    {
      name: "Verify",
      detail:
        "Check automatic walking, held diagonal keys, blur cancellation, and idle frame scheduling. The regression lives in tests/town.spec.ts.",
    },
  ],
  Feature: [
    {
      name: "Scope",
      detail:
        "Define the user outcome and a concrete example that proves it works.",
    },
    {
      name: "Design",
      detail:
        "Trace the existing flow. Choose where the new behaviour belongs.",
    },
    {
      name: "Build",
      detail:
        "Implement one complete path through the feature before adding variations.",
    },
    {
      name: "Verify",
      detail:
        "Exercise the feature, its failure cases, and the affected existing behaviour.",
    },
  ],
  Review: [
    {
      name: "Read",
      detail:
        "Read the diff and its callers. Establish what behaviour is meant to change.",
    },
    {
      name: "Trace",
      detail:
        "Follow inputs, state changes, and cleanup. Look for concrete regressions.",
    },
    {
      name: "Check",
      detail:
        "Run a focused test or reproduce a suspected failure before reporting it.",
    },
    {
      name: "Report",
      detail:
        "Describe each actionable issue with its trigger, effect, and location.",
    },
  ],
};

function WorkflowDemo() {
  const [task, setTask] = useState<keyof typeof workflows>("Bug");
  const [stage, setStage] = useState(0);
  return (
    <section
      class="project-demo demo-workflow-board"
      aria-label="Workflow example"
    >
      <div class="demo-frame-label">
        <span>pancake-stack / task board</span>
        <span aria-hidden="true">03</span>
      </div>
      <span class="demo-kicker">A bug from this portfolio</span>
      <h4>From failure to regression test</h4>
      {task === "Bug" && <FrameBugDemo />}
      <div class="demo-options" aria-label="Task type">
        {(Object.keys(workflows) as (keyof typeof workflows)[]).map((name) => (
          <button
            type="button"
            key={name}
            aria-pressed={task === name}
            onClick={() => {
              setTask(name);
              setStage(0);
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <ol class="demo-workflow">
        {workflows[task].map((step, index) => (
          <li key={step.name}>
            <button
              type="button"
              aria-pressed={stage === index}
              onClick={() => setStage(index)}
            >
              <span>{index + 1}</span>
              {step.name}
            </button>
          </li>
        ))}
      </ol>
      <div class="demo-stage" aria-live="polite">
        <span class="demo-stage-index">
          {String(stage + 1).padStart(2, "0")} / 04
        </span>
        <h5>{workflows[task][stage].name}</h5>
        <p>{workflows[task][stage].detail}</p>
      </div>
    </section>
  );
}

export default function ProjectDemo({ project }: { project: 0 | 1 | 2 }) {
  return project === 0 ? (
    <>
      <RouteDemo />
      <details class="demo-secondary">
        <summary>Palette workbench</summary>
        <PaletteDemo />
      </details>
    </>
  ) : project === 1 ? (
    <SearchDemo />
  ) : (
    <WorkflowDemo />
  );
}
