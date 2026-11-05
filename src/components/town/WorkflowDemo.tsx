import { useState } from "preact/hooks";
import FrameBugDemo from "./FrameBugDemo";

const workflows = {
  Bug: [
    {
      name: "Reproduce",
      detail:
        "Clicking a destination left the player stuck, although keyboard movement worked. A timing trace revealed a frame timestamp earlier than the click.",
    },
    {
      name: "Test",
      detail:
        "Write a test that recreates the early frame, then checks that the player reaches the destination. It should fail before the fix.",
    },
    {
      name: "Fix",
      detail:
        "Treat negative elapsed time as zero. Reject invalid coordinates so a bad calculation cannot corrupt the player’s position.",
    },
    {
      name: "Verify",
      detail:
        "Run the regression test and check keyboard movement, leaving the window and stopping at the destination. The test protects against the bug returning.",
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
        <span>pancake-stack / guided example</span>
        <span aria-hidden="true">03</span>
      </div>
      <h4>How I guide an AI coding agent</h4>
      <p>
        Pick a task, then follow the steps. Each step gives the agent a specific
        job and something to check before moving on.
      </p>
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
      <p class="demo-task-context">
        {task === "Bug"
          ? "Example: clicking a destination stopped the player walking in this town."
          : task === "Feature"
            ? "General workflow: take a new feature from a defined outcome to a working change."
            : "General workflow: review a change and report issues backed by evidence."}
      </p>
      <ol class="demo-workflow" aria-label="Workflow steps">
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
      <div class="demo-options demo-step-controls" aria-label="Step navigation">
        <button disabled={stage === 0} onClick={() => setStage(stage - 1)}>
          Previous step
        </button>
        <button
          disabled={stage === workflows[task].length - 1}
          onClick={() => setStage(stage + 1)}
        >
          Next step
        </button>
      </div>
      {task === "Bug" && (
        <details class="demo-secondary">
          <summary>Try the bug and fix yourself</summary>
          <FrameBugDemo />
        </details>
      )}
      <p class="demo-scope-note">
        This is a walkthrough of the workflow, not a live AI agent.
      </p>
    </section>
  );
}
