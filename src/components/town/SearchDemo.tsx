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
        <span>brain-cache / find relevant code</span>
        <span aria-hidden="true">02</span>
      </div>
      <h4>Find the code an agent needs</h4>
      <p>
        Instead of sending a whole repository to an AI agent, brain-cache
        retrieves relevant code. Try “budget” to find the function that limits
        how much code gets sent.
      </p>
      <p class="demo-scope-note">
        This small example searches four recorded functions by keyword. It does
        not run the full retrieval engine.
      </p>
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
            <article class="demo-search-result" key={result.name}>
              <h5>{result.name}</h5>
              <p>{result.why}</p>
              <details>
                <summary>{result.path}</summary>
                <p class="demo-explanation">
                  <a
                    href={result.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View original source ↗
                  </a>
                </p>
                <pre>
                  <code>{result.code}</code>
                </pre>
              </details>
            </article>
          ))}
        </div>
      ) : (
        <p class="demo-empty">
          No matching snippets. Try “budget” or clear the search.
        </p>
      )}
      <details class="demo-secondary">
        <summary>Try limiting how much code the agent receives</summary>
        <TokenBudgetDemo />
      </details>
    </section>
  );
}
