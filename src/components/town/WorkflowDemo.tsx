import { useState } from "preact/hooks";
import FrameBugDemo from "./FrameBugDemo";

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

export default function WorkflowDemo() {
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
