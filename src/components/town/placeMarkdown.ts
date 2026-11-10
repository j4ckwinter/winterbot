import { ktoCaseStudy } from "../../data/ktoCaseStudy";
import { contacts, education, experience, profile, skills } from "./profile";
import { getProject, projects, type ProjectId } from "./projects";
import { places, type Place } from "./world";

const link = (text: string, href: string) =>
  `[${text}](${new URL(href, profile.siteUrl).href})`;
const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
const blocks = (parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join("\n\n");

export const placeMarkdownPath = (place: Place) => `/places/${place}.md`;

export function projectMarkdown(id: ProjectId) {
  const project = getProject(id);
  const { story } = project;
  const evidence = `${story.evidence} ${link("Read the evidence", story.evidenceUrl)}`;
  return blocks([
    `## ${project.name}`,
    project.description,
    project.caseStudy &&
      link(project.caseStudy.linkLabel, project.caseStudy.href),
    project.highlights
      ? list(project.highlights)
      : blocks([
          `**My contribution:** ${story.approach}`,
          `**Evidence:** ${evidence}`,
        ]),
    `**Problem:** ${story.problem}`,
    `**Tradeoff:** ${story.tradeoff}`,
    project.highlights && `**Evaluation:** ${evidence}`,
    `**Technologies:** ${project.tags.join(" · ")}`,
    [
      link("View source", project.github),
      project.live && link(project.action, project.live),
    ]
      .filter(Boolean)
      .join(" · "),
  ]);
}

const bodies: Record<Place, () => string> = {
  workshop: () =>
    blocks(projects.map((project) => projectMarkdown(project.slug))),
  home: () =>
    blocks([
      profile.summary,
      profile.approach,
      "## Technical skills",
      list(skills.map((group) => `**${group.name}:** ${group.tools}`)),
      "## Education",
      `**${education.qualification}**, ${education.institution}. ${education.dates}.`,
    ]),
  station: () =>
    blocks(
      experience.map((job) =>
        blocks([
          `## ${job.company}`,
          `**${job.role}** · ${job.dates} · ${job.location}`,
          job.context,
          job.company === "KTO Group" &&
            link("Read the KTO case study", ktoCaseStudy.href),
          list(job.highlights),
        ]),
      ),
    ),
  post: () =>
    list(
      contacts.map(
        (contact) => `${contact.label}: ${link(contact.text, contact.href)}`,
      ),
    ),
};

export function placeContentMarkdown(place: Place, project?: ProjectId) {
  return place === "workshop" && project
    ? projectMarkdown(project)
    : bodies[place]();
}

export function placeMarkdown(place: Place) {
  const { name, content } = places.find((p) => p.id === place)!;
  return `${blocks([
    `# ${name}`,
    `> ${content}. One of the four buildings in ${link("Winter Town", "/")}, Jack Winter’s portfolio.`,
    bodies[place](),
  ])}\n`;
}
