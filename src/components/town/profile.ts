export const profile = {
  role: "Senior Software Engineer, Frontend",
  location: "London",
  email: "jackwinter.10@outlook.com",
  summary:
    "I’m a senior software engineer with 8+ years of experience building customer-facing products with React and TypeScript across sports betting, gaming, and fintech.",
  approach:
    "I’ve led greenfield builds and major frontend transformations, owning architecture and delivery from the initial problem through to production. I specialise in real-time interfaces and performance optimisation, and build open-source tools for AI coding agents using MCP, embeddings, and semantic code retrieval.",
  speciality:
    "Frontend architecture, real-time interfaces, performance optimisation",
  toolkit: "React · TypeScript · Node.js · Angular",
  description:
    "Jack Winter, senior software engineer specialising in frontend architecture, real-time interfaces, and performance. React, TypeScript, and open-source developer tools.",
};

export const skills = [
  {
    name: "Languages & frameworks",
    tools:
      "TypeScript · JavaScript · React · Node.js · Angular · Python · Java · HTML · CSS",
  },
  {
    name: "Real-time & data",
    tools:
      "WebSockets · Socket.IO · RxJS · Zustand · TanStack · REST APIs · SQL · Web Workers",
  },
  {
    name: "AI & developer tooling",
    tools:
      "LLMs · MCP · Embeddings · Vector search · Ollama · LanceDB · tree-sitter · Claude Code · Codex",
  },
  {
    name: "Testing",
    tools:
      "Jest · Cypress · Vitest · Unit, integration, and end-to-end testing",
  },
  {
    name: "Engineering & platform",
    tools: "pnpm · Turborepo · Storybook · Docker · AWS · CI/CD · Git",
  },
];

export const experience = [
  {
    company: "KTO Group",
    role: "Senior Front-End Developer",
    location: "Remote",
    dates: "Jun 2025 — Present",
    context:
      "Sportsbook and online casino operator serving the Brazilian market.",
    highlights: [
      "Led the transformation from a third-party hosted sportsbook to a custom React and TypeScript platform, owning architecture and core customer journeys within a business serving 1.4M active users and 5B bets placed.",
      "Delivered 40% faster FCP, 25% faster LCP, 20% lower blocking time, 9.3% less transferred data, and 11× faster return navigation in performance testing.",
      "Designed a pnpm/Turborepo monorepo spanning 27 packages and 22 modules, separating reusable UI, domain logic, data providers, and third-party integrations.",
      "Built a real-time sports data pipeline with Web Workers, Socket.IO, and Zustand, moving high-frequency events and odds processing off the main thread.",
    ],
  },
  {
    company: "GeoGaming Group",
    role: "Senior Front-End Developer",
    location: "London",
    dates: "Jun 2023 — Jun 2025",
    context:
      "Sportsbook and casino games provider developing a white-label solution.",
    highlights: [
      "Led frontend performance initiatives that reduced application load times by 30%.",
      "Modernised bundling, code splitting, and lazy loading to reduce unnecessary client-side overhead.",
      "Increased automated test coverage from 25% to 75%, strengthening unit, integration, and end-to-end testing with Jest and Cypress.",
      "Built real-time betting interfaces with RxJS, WebSockets, and REST APIs.",
      "Mentored junior engineers, led code reviews, and helped establish frontend engineering standards.",
    ],
  },
  {
    company: "SmartStream Technologies",
    role: "Senior Software Engineer",
    location: "Bristol",
    dates: "Jul 2017 — Aug 2022",
    context:
      "Fintech developing cash and liquidity management software for major banks.",
    highlights: [
      "Led a greenfield Angular frontend that replaced a legacy system and directly enabled two high-profile deals.",
      "Built internal tools with React and Node.js to streamline team workflows.",
      "Developed a machine-learning prototype for transaction forecasting, improving forecast accuracy on historical banking data.",
      "Interviewed candidates from junior to senior developer roles and worked with DevOps on critical system issues, including on-call support for 24/7 reliability.",
    ],
  },
];
