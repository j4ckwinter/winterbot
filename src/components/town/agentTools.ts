import type { Content } from "./navigation";
import { placeContentMarkdown, placeMarkdownPath } from "./placeMarkdown";
import { profile } from "./profile";
import { getProject, projects, type ProjectId } from "./projects";
import {
  landmarks,
  places,
  type Landmark,
  type Place,
  type Point,
  type Scene,
} from "./world";

export type TownView = {
  scene: Scene;
  position: Point;
  near?: Landmark;
  reading: Content | null;
  walking: boolean;
};

export type TownDriver = {
  view: () => TownView;
  exit: Landmark;
  closeReading: () => void;
  walk: (point: Point) => boolean;
  travel: (landmark: Landmark) => boolean;
  settle: (arrived: (view: TownView) => boolean) => Promise<boolean>;
};

export type AgentTool = {
  name: string;
  description: string;
  inputSchema: object;
  readOnly: boolean;
  execute: (input?: Record<string, unknown>) => Promise<string>;
};

const placeIds = places.map((place) => place.id);
const projectIds = projects.map((project) => project.slug);
const placeNamed = (id: unknown) => places.find((place) => place.id === id);
const sceneName = (scene: Place) => placeNamed(scene)!.name;

const compass = [
  "east",
  "south-east",
  "south",
  "south-west",
  "west",
  "north-west",
  "north",
  "north-east",
];
function wayTo(from: Point, to: Point) {
  const steps = Math.round(Math.hypot(to.x - from.x, to.y - from.y) / 10);
  const direction =
    compass[
      (Math.round(Math.atan2(to.y - from.y, to.x - from.x) / (Math.PI / 4)) +
        8) %
        8
    ];
  return `${direction}, about ${steps} ${steps === 1 ? "step" : "steps"} away`;
}

export function describeSurroundings(view: TownView) {
  const { scene, position, near, reading } = view;
  if (scene === "town") {
    const door = near && placeNamed(near.id);
    return [
      `You are outside in Winter Town, a small pixel-art town that holds Jack Winter’s portfolio. ${
        door
          ? `You are standing at the door of ${door.name}.`
          : "You are standing on the path."
      }`,
      "Buildings:",
      ...places.map(
        (place) =>
          `- ${place.name} (place: ${place.id}). Inside: ${place.content}. ${
            door?.id === place.id
              ? "You are at its door."
              : `Its door is ${wayTo(position, place)}.`
          }`,
      ),
      "Next: enter_building to go inside, or walk_to another door.",
    ].join("\n");
  }
  const place = placeNamed(scene)!;
  return [
    `You are inside ${place.name}. This building holds: ${place.content}.`,
    "Here:",
    ...landmarks(scene).map((object) =>
      object.action.kind === "inspect" && object.action.project
        ? `- ${object.name} (project: ${object.action.project}), a machine you can read. It is ${wayTo(position, object)}.`
        : `- ${object.name}, the one thing to read here. It is ${wayTo(position, object)}.`,
    ),
    "- The exit, back to Winter Town.",
    ...(reading && reading.place === scene
      ? [
          `You are reading ${reading.project ? getProject(reading.project).name : place.content}.`,
        ]
      : []),
    "Next: read, or leave_building.",
  ].join("\n");
}

export function createTownTools(driver: TownDriver): AgentTool[] {
  const here = () => describeSurroundings(driver.view());
  const interrupted = (goal: string) =>
    `You did not reach ${goal}: the walk was interrupted, perhaps by the person at the keyboard.\n\n${here()}`;
  const noInput = { type: "object", properties: {} };
  const placeInput = (description: string) => ({
    type: "string",
    enum: placeIds,
    description,
  });

  return [
    {
      name: "look_around",
      description:
        "Look around Winter Town, Jack Winter’s explorable portfolio. Says where you are standing, which buildings or objects are nearby and how far away, and what you can do next. Start here.",
      inputSchema: noInput,
      readOnly: true,
      execute: async () => here(),
    },
    {
      name: "walk_to",
      description:
        "Walk along the town paths to the door of a building without going in. Only works outside.",
      inputSchema: {
        type: "object",
        properties: { place: placeInput("The building to walk to.") },
        required: ["place"],
      },
      readOnly: false,
      execute: async (input) => {
        const place = placeNamed(input?.place);
        if (!place)
          return `Unknown place. Choose one of: ${placeIds.join(", ")}.`;
        const { scene } = driver.view();
        if (scene !== "town")
          return `You are inside ${sceneName(scene)}. Call leave_building before walking around town.`;
        driver.closeReading();
        if (!driver.walk(place))
          return `There is no path to ${place.name} from here.\n\n${here()}`;
        return (await driver.settle(
          (view) => !view.walking && view.near?.id === place.id,
        ))
          ? `You walk to ${place.name}.\n\n${here()}`
          : interrupted(place.name);
      },
    },
    {
      name: "enter_building",
      description:
        "Go inside a building. Without a place, enters the building whose door you are standing at. With a place, walks to that door first.",
      inputSchema: {
        type: "object",
        properties: { place: placeInput("The building to enter.") },
      },
      readOnly: false,
      execute: async (input) => {
        const { scene, near } = driver.view();
        if (input?.place !== undefined && !placeNamed(input.place))
          return `Unknown place. Choose one of: ${placeIds.join(", ")}.`;
        if (scene !== "town")
          return scene === input?.place
            ? `You are already inside ${sceneName(scene)}.\n\n${here()}`
            : `You are inside ${sceneName(scene)}. Call leave_building first.`;
        const door = landmarks("town").find(
          (landmark) => landmark.id === (input?.place ?? near?.id),
        );
        if (!door)
          return `You are not at a door. Pass a place: ${placeIds.join(", ")}.`;
        driver.closeReading();
        if (!driver.travel(door))
          return `There is no path to ${door.name} from here.\n\n${here()}`;
        return (await driver.settle((view) => view.scene === door.id))
          ? `You step inside ${door.name}.\n\n${here()}`
          : interrupted(door.name);
      },
    },
    {
      name: "read",
      description:
        "Inside a building, walk up to what is on display and read it. Returns the content as markdown. In The Workshop, pass the project to read.",
      inputSchema: {
        type: "object",
        properties: {
          project: {
            type: "string",
            enum: projectIds,
            description: "Which project machine to read. The Workshop only.",
          },
        },
      },
      readOnly: false,
      execute: async (input) => {
        const { scene, near } = driver.view();
        if (scene === "town")
          return "There is nothing to read out here. Call enter_building first.";
        const objects = landmarks(scene);
        const wanted = input?.project;
        const object =
          scene !== "workshop"
            ? objects[0]
            : wanted === undefined
              ? objects.find((candidate) => candidate.id === near?.id)
              : objects.find(
                  (candidate) =>
                    candidate.action.kind === "inspect" &&
                    candidate.action.project === wanted,
                );
        if (!object || object.action.kind !== "inspect")
          return `Choose a project to read: ${projectIds.join(", ")}.`;
        const project: ProjectId | undefined = object.action.project;
        driver.closeReading();
        if (!driver.travel(object))
          return `There is no path to ${object.name} from here.\n\n${here()}`;
        const arrived = await driver.settle(
          (view) =>
            view.reading?.place === scene && view.reading.project === project,
        );
        return arrived
          ? `${placeContentMarkdown(scene, project)}\n\nThe whole building as markdown: ${profile.siteUrl}${placeMarkdownPath(scene)}`
          : interrupted(object.name);
      },
    },
    {
      name: "leave_building",
      description:
        "Walk to the exit and step back outside into Winter Town, at the door of the building you were in.",
      inputSchema: noInput,
      readOnly: false,
      execute: async () => {
        const { scene } = driver.view();
        if (scene === "town") return `You are already outside.\n\n${here()}`;
        driver.closeReading();
        if (!driver.travel(driver.exit))
          return `There is no path to the exit from here.\n\n${here()}`;
        return (await driver.settle((view) => view.scene === "town"))
          ? `You step back outside.\n\n${here()}`
          : interrupted("the exit");
      },
    },
  ];
}
