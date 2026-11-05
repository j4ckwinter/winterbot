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
        "Built the town, movement and navigation in Preact, with an Astro portfolio sharing the same content.",
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
      "A local code retrieval engine that gives AI coding agents relevant source through MCP.",
    story: {
      problem:
        "Coding agents need relevant source without reading the whole repository for every question.",
      approach:
        "Designed and published the npm package, combining Ollama embeddings, LanceDB search and tree-sitter code chunking.",
      tradeoff:
        "Local embeddings require Ollama. An existing index can fall back to keyword retrieval when it is unavailable.",
      evidence:
        "Reduced retrieved context from approximately 18,600 to 1,200 tokens in a representative example by selecting and assembling relevant code.",
      evidenceUrl: "https://github.com/j4ckwinter/brain-cache#how-it-works",
    },
    tags: ["TypeScript", "Node.js", "MCP", "LanceDB", "Ollama", "tree-sitter"],
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
      "19 reusable skills for investigating, implementing, reviewing and verifying code with AI agents.",
    story: {
      problem:
        "Fast AI-generated changes can leave more cleanup than useful code.",
      approach:
        "Created the skills and evaluation framework for Codex and Claude Code, including scoped delegation and independent review.",
      tradeoff:
        "The library stays declarative: hosts provide execution tools, and verification lives in a separate evaluator.",
      evidence:
        "86 automated checks integrated into CI, with workflow comparisons for defect detection, false positives, execution time and token usage.",
      evidenceUrl: "https://github.com/j4ckwinter/pancake-stack",
    },
    tags: ["Codex", "Claude Code", "Agent Skills", "Python", "GitHub Actions"],
    github: "https://github.com/j4ckwinter/pancake-stack",
    live: "",
    action: "",
  },
];
