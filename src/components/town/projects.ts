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
      "An MCP-first context engine I designed, built, and published to help AI coding agents retrieve relevant code without loading unrelated codebase context.",
    story: {
      problem:
        "Coding agents need relevant source without reading the whole repository for every question.",
      approach:
        "Combine local embeddings and vector search with Ollama and LanceDB, using tree-sitter for AST-aware, multi-language code chunking. Published on npm with MCP integration.",
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
      "19 reusable skills I built and published for AI coding agents, covering investigation, implementation, review, and verification.",
    story: {
      problem:
        "Fast AI-generated changes can leave more cleanup than useful code.",
      approach:
        "Shared workflows for scoped delegation, independent review, and evidence-based verification across Codex and Claude Code.",
      tradeoff:
        "The library stays declarative: hosts provide execution tools, and verification lives in a separate evaluator.",
      evidence:
        "An evaluation framework with 86 automated checks integrated into CI. Workflow comparisons examine defect detection, false positives, unnecessary work, execution time, and token usage.",
      evidenceUrl: "https://github.com/j4ckwinter/pancake-stack",
    },
    tags: ["Codex", "Claude Code", "Agent Skills", "Python", "GitHub Actions"],
    github: "https://github.com/j4ckwinter/pancake-stack",
    live: "",
    action: "",
  },
];
