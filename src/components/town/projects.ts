export const projects = [
  {
    name: "WinterBot",
    slug: "winterbot" as const,
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
    slug: "brain-cache" as const,
    kind: "memory",
    number: "002",
    description:
      "Helps coding agents find relevant functions without reading entire files, using a local code index and MCP.",
    highlights: [
      "Splits code around functions and classes to preserve useful context.",
      "Reuses embeddings and indexes changed content instead of rebuilding after every edit.",
      "Owned architecture, search, CLI, assistant integration and npm release.",
    ],
    story: {
      problem:
        "Coding agents need relevant source without reading the whole repository for every question.",
      approach:
        "Designed and published the npm package, combining Ollama embeddings, LanceDB search and tree-sitter code chunking.",
      tradeoff:
        "Smaller results can omit important evidence. Local indexing needs model setup and machine resources; retrieved snippets may still go to the assistant’s cloud model.",
      evidence:
        "Tests cover indexing, retrieval, context assembly and packaging. Context-size estimates are not evidence of better task outcomes or whole-session cost savings.",
      evidenceUrl: "https://github.com/j4ckwinter/brain-cache#how-it-works",
    },
    tags: ["TypeScript", "Node.js", "MCP", "LanceDB", "Ollama", "tree-sitter"],
    github: "https://github.com/j4ckwinter/brain-cache",
    live: "https://www.npmjs.com/package/brain-cache",
    action: "View package",
  },
  {
    name: "pancake-stack",
    slug: "pancake-stack" as const,
    kind: "pancakes",
    number: "003",
    description:
      "Reusable workflows for coding agents, built to address rushed changes, unnecessary complexity and unverified claims of success.",
    highlights: [
      "Designed task-specific investigation, implementation, review and verification workflows.",
      "Built a separate evaluator using known defects and correct controls to check missed bugs and unsupported findings.",
      "Rejected extra guidance when existing instructions caught the same targeted defects.",
    ],
    story: {
      problem:
        "Fast AI-generated changes can leave more cleanup than useful code.",
      approach:
        "Created the skills and evaluation framework for Codex and Claude Code, including scoped delegation and independent review.",
      tradeoff:
        "The plugin supplies instructions, not an enforcement runtime. More process has a cost, and completed steps do not guarantee a correct result.",
      evidence:
        "Independent review found that combining two seeded defects could reward a test that caught only one. The evaluator was corrected to test each defect separately. These bounded trials do not establish general productivity or quality gains.",
      evidenceUrl:
        "https://github.com/j4ckwinter/pancake-stack-evals/blob/main/docs/validation-controls.md",
    },
    tags: ["Codex", "Claude Code", "Agent Skills", "Python", "GitHub Actions"],
    github: "https://github.com/j4ckwinter/pancake-stack",
    live: "",
    action: "",
  },
];

export type ProjectId = (typeof projects)[number]["slug"];
export const DEFAULT_PROJECT: ProjectId = "winterbot";

export function getProject(id: ProjectId) {
  return projects.find((project) => project.slug === id)!;
}
