import type { APIRoute } from "astro";
import { createTownTools } from "../components/town/agentTools";
import { placeMarkdownPath } from "../components/town/placeMarkdown";
import { profile } from "../components/town/profile";
import { places } from "../components/town/world";
import { ktoCaseStudy } from "../data/ktoCaseStudy";
import { winterTownCaseStudy } from "../data/winterTownCaseStudy";

const url = (path: string) => new URL(path, profile.siteUrl).href;
const tools = createTownTools({} as Parameters<typeof createTownTools>[0]);

const body = `# Jack Winter — Winter Town

> ${profile.description}

Winter Town is a portfolio built as a small pixel-art town. Each of its four buildings holds one part of the portfolio. People walk between them; agents can read the same content as markdown, or walk the town through tools.

## Buildings as markdown

${places.map((place) => `- [${place.name}](${url(placeMarkdownPath(place.id))}): ${place.content}`).join("\n")}

## Pages

- [Plain portfolio](${url("/portfolio")}): everything on one HTML page, no JavaScript needed
- [${ktoCaseStudy.title}](${url(ktoCaseStudy.href)}): case study
- [${winterTownCaseStudy.title}](${url(winterTownCaseStudy.href)}): how the town was built

## Tools

The [town page](${url("/")}) registers these WebMCP tools through \`document.modelContext\` in browsers that support it. They move the visible player sprite, so a person watching sees your visit. Without WebMCP the tools are not available; use the markdown above.

${tools.map((tool) => `- \`${tool.name}\`: ${tool.description}`).join("\n")}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
