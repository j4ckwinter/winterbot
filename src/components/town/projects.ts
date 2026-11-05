export const projects = [
  {
    name: "WinterBot",
    slug: "winterbot",
    kind: "console",
    number: "001",
    description: "This portfolio, built with Astro, Preact, and TypeScript.",
    story: {
      problem:
        "Make a portfolio worth exploring while keeping projects and contact details easy to reach.",
      approach:
        "A walkable Preact town inside an Astro site, with a static portfolio sharing the same content.",
      tradeoff:
        "Exploration is optional: direct links and keyboard shortcuts reach every section.",
      evidence:
        "Browser tests cover movement, navigation, saved progress, and the JavaScript-free portfolio.",
      evidenceUrl: "https://github.com/j4ckwinter/winterbot/tree/main/tests",
    },
    tags: ["Astro", "Preact", "TypeScript", "Playwright"],
    github: "https://github.com/j4ckwinter/winterbot",
    live: "https://winterbyte.vercel.app",
    action: "Visit site",
  },
  {
    name: "brain-cache",
    slug: "brain-cache",
    kind: "memory",
    number: "002",
    description:
      "A local context engine for Claude Code. Retrieves function-sized source chunks through MCP, with local embeddings and exact symbol matching.",
    story: {
      problem:
        "Coding agents need relevant source without reading the whole repository for every question.",
      approach:
        "Parse code at function and class boundaries, then combine local semantic retrieval with exact symbol matches.",
      tradeoff:
        "Local embeddings require Ollama. An existing index can fall back to keyword retrieval when it is unavailable.",
      evidence:
        "The repository documents retrieval limits, supported languages, and fallback behaviour.",
      evidenceUrl: "https://github.com/j4ckwinter/brain-cache#how-it-works",
    },
    tags: ["Node.js", "TypeScript", "LanceDB", "Ollama"],
    github: "https://github.com/j4ckwinter/brain-cache",
    live: "https://www.npmjs.com/package/brain-cache",
    action: "View package",
  },
  {
    name: "pancake-stack",
    slug: "pancake-stack",
    kind: "pancakes",
    number: "003",
    description:
      "The skills I use with Codex and Claude to investigate, build, and review code.",
    story: {
      problem:
        "Fast AI-generated changes can leave more cleanup than useful code.",
      approach:
        "Reusable skills guide investigation, implementation, and review in Codex and Claude Code.",
      tradeoff:
        "The library stays declarative: hosts provide execution tools, and verification lives in a separate evaluator.",
      evidence:
        "Installation records distinguish tested CLI discovery from host behaviours still awaiting verification.",
      evidenceUrl:
        "https://github.com/j4ckwinter/pancake-stack/blob/main/docs/installation-verification.md",
    },
    tags: ["Codex", "Claude", "Agent Skills"],
    github: "https://github.com/j4ckwinter/pancake-stack",
    live: "",
    action: "",
  },
];
