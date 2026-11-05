import { useState } from "preact/hooks";
import TokenBudgetDemo from "./TokenBudgetDemo";
import { recordedChunks as snippets } from "./recordedChunks";

export default function SearchDemo() {
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
