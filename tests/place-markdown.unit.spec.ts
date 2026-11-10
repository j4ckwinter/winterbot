import { test, expect } from "@playwright/test";
import {
  placeContentMarkdown,
  placeMarkdown,
} from "../src/components/town/placeMarkdown";
import {
  contacts,
  education,
  experience,
  profile,
  skills,
} from "../src/components/town/profile";
import { projects } from "../src/components/town/projects";
import { places } from "../src/components/town/world";

test("each building's markdown carries its heading and shared content", () => {
  const workshop = placeMarkdown("workshop");
  expect(workshop).toMatch(/^# The Workshop\n\n> Projects\./);
  for (const project of projects) {
    expect(workshop).toContain(`## ${project.name}\n\n${project.description}`);
    expect(workshop).toContain(project.story.problem);
    expect(workshop).toContain(project.story.tradeoff);
    expect(workshop).toContain(`(${project.story.evidenceUrl})`);
    expect(workshop).toContain(`[View source](${project.github})`);
  }
  const home = placeMarkdown("home");
  expect(home).toContain(profile.summary);
  expect(home).toContain(profile.approach);
  for (const group of skills)
    expect(home).toContain(`- **${group.name}:** ${group.tools}`);
  expect(home).toContain(education.institution);
  const station = placeMarkdown("station");
  for (const job of experience) {
    expect(station).toContain(`## ${job.company}\n\n**${job.role}**`);
    for (const highlight of job.highlights)
      expect(station).toContain(`- ${highlight}`);
  }
  const post = placeMarkdown("post");
  for (const contact of contacts)
    expect(post).toContain(`[${contact.text}](${contact.href})`);
});

test("markdown is clean: absolute links, no HTML, no stray values", () => {
  for (const place of places) {
    const markdown = placeMarkdown(place.id);
    expect(markdown, place.id).not.toMatch(/<[a-z]|undefined|\[object/);
    expect(markdown, place.id).not.toMatch(/\n{3,}/);
    expect(markdown.endsWith("\n"), place.id).toBe(true);
    for (const [, href] of markdown.matchAll(/\]\(([^)]*)\)/g))
      expect(href, place.id).toMatch(/^(https:\/\/|mailto:)/);
  }
  expect(placeMarkdown("workshop")).toContain(
    "[How I built Winter Town](https://winterbyte.vercel.app/work/winter-town)",
  );
  expect(placeMarkdown("station")).toContain(
    "[Read the KTO case study](https://winterbyte.vercel.app/work/kto)",
  );
});

test("a single project reads as its own section", () => {
  const markdown = placeContentMarkdown("workshop", "brain-cache");
  expect(markdown).toMatch(/^## brain-cache\n/);
  expect(markdown).not.toContain("pancake-stack");
  expect(placeContentMarkdown("post")).not.toContain("# ");
});
