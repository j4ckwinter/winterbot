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
      <h4>Keep whole functions within a budget</h4>
      <p>
        Whole functions stay intact. Smaller chunks can fit after a larger one
        is skipped.
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
        <button onClick={() => setBudget(750)}>Fit all chunks</button>
      </div>
      <p
        class="demo-budget-status"
        role="status"
        aria-label="Context selection"
      >
        {kept} of 4 complete chunks · {tokens} / {budget} estimated tokens
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
              <small>{chunk.estimate} estimated tokens alone</small>
            </span>
          </li>
        ))}
      </ol>
      <details class="demo-context">
        <summary>Assembled context</summary>
        <pre>
          <code>{content || "No chunks fit this budget."}</code>
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
