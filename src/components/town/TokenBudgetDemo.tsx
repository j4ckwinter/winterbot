import { useState } from "preact/hooks";
import {
  assembleRecordedContext,
  contextTokenEstimates,
} from "./recordedChunks";

export default function TokenBudgetDemo() {
  const [budget, setBudget] = useState(400);
  const { decisions, tokens, content } = assembleRecordedContext(budget);
  const kept = decisions.filter((chunk) => chunk.kept).length;
  return (
    <section class="demo-budget" aria-label="Context token budget">
      <h4>Choose how much code to send</h4>
      <p>
        This separate example uses all four recorded functions, regardless of
        your search. A token is a small piece of text. Lower the budget to send
        less code; functions that do not fit are skipped rather than cut in
        half.
      </p>
      <label htmlFor="context-budget">
        Estimated token budget{" "}
        <output htmlFor="context-budget" aria-live="off">
          {budget}
        </output>
      </label>
      <input
        id="context-budget"
        type="range"
        min="0"
        max="750"
        step="10"
        value={budget}
        onInput={(event) => setBudget(Number(event.currentTarget.value))}
      />
      <div class="demo-options">
        <button onClick={() => setBudget(200)}>Tight budget</button>
        <button onClick={() => setBudget(750)}>Fit all functions</button>
      </div>
      <p
        class="demo-budget-status"
        role="status"
        aria-label="Context selection"
      >
        {kept} of 4 complete functions · {tokens} / {budget} estimated tokens
      </p>
      <meter
        min="0"
        max={Math.max(budget, 1)}
        value={tokens}
        aria-label="Estimated context tokens used"
      />
      <ol class="demo-budget-chunks">
        {decisions.map((chunk) => (
          <li key={chunk.name} data-kept={chunk.kept}>
            <span class="demo-budget-state">
              {chunk.kept ? "Kept" : "Skipped"}
            </span>
            <span>
              <code>{chunk.name}</code>
              <small>
                {chunk.estimate} estimated tokens alone ·{" "}
                {chunk.kept
                  ? "Fits the remaining budget"
                  : "Does not fit the remaining budget"}
              </small>
            </span>
          </li>
        ))}
      </ol>
      <details class="demo-context">
        <summary>See the code sent to the agent</summary>
        <pre>
          <code>{content || "No functions fit this budget."}</code>
        </pre>
      </details>
      <p class="demo-budget-note">
        Counts were recorded with brain-cache’s legacy Anthropic tokenizer,
        including file headers and separators ({contextTokenEstimates.at(-1)}{" "}
        for all four). These are budget estimates, not current model or billing
        counts. Selection runs here in your browser; retrieval and Ollama do
        not.
      </p>
    </section>
  );
}
