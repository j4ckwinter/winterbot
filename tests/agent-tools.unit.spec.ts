import { test, expect } from "@playwright/test";
import {
  createTownTools,
  describeSurroundings,
  type TownDriver,
  type TownView,
} from "../src/components/town/agentTools";
import {
  landmarks,
  TOWN_START,
  type Landmark,
  type Scene,
} from "../src/components/town/world";

const exit: Landmark = {
  id: "exit",
  name: "Return to town",
  x: 480,
  y: 590,
  labelY: 590,
  action: { kind: "exit" },
};

function fakeTown(start: Partial<TownView> = {}) {
  let view: TownView = {
    scene: "town",
    position: { ...TOWN_START },
    reading: null,
    walking: false,
    ...start,
  };
  const calls: string[] = [];
  let blocked = false;
  const driver: TownDriver = {
    view: () => view,
    exit,
    closeReading: () => {
      view = { ...view, reading: null };
    },
    walk: (point) => {
      calls.push(`walk ${point.x},${point.y}`);
      const near = landmarks(view.scene).find(
        (landmark) => landmark.x === point.x && landmark.y === point.y,
      );
      view = { ...view, position: point, near };
      return true;
    },
    travel: (landmark) => {
      calls.push(`travel ${landmark.id}`);
      const { action } = landmark;
      if (action.kind === "inspect")
        view = {
          ...view,
          position: landmark,
          near: landmark,
          reading: { place: action.place, project: action.project },
        };
      else
        view = {
          scene: action.kind === "enter" ? action.place : "town",
          position: { x: 480, y: 550 },
          reading: null,
          walking: false,
        };
      return true;
    },
    settle: async (arrived) => !blocked && arrived(view),
  };
  const tools = createTownTools(driver);
  return {
    calls,
    scene: (): Scene => view.scene,
    interrupt: () => {
      blocked = true;
    },
    call: (name: string, input?: Record<string, unknown>) =>
      tools.find((tool) => tool.name === name)!.execute(input),
    tools,
  };
}

test("tools satisfy the WebMCP registration rules", () => {
  const { tools } = fakeTown();
  expect(tools.map((tool) => tool.name)).toEqual([
    "look_around",
    "walk_to",
    "enter_building",
    "read",
    "leave_building",
  ]);
  for (const tool of tools) {
    expect(tool.name).toMatch(/^[A-Za-z0-9_.-]{1,128}$/);
    expect(tool.description.length).toBeGreaterThan(20);
    expect(tool.inputSchema).toMatchObject({ type: "object" });
  }
  expect(tools.filter((tool) => tool.readOnly).map((t) => t.name)).toEqual([
    "look_around",
  ]);
});

test("looking around describes the town from where the player stands", () => {
  const start = describeSurroundings({
    scene: "town",
    position: { x: 210, y: 330 },
    reading: null,
    walking: false,
  });
  expect(start).toContain("You are standing on the path.");
  expect(start).toContain(
    "- The Workshop (place: workshop). Inside: Projects. Its door is north, about 3 steps away.",
  );
  expect(start).toContain(
    "- Winter Station (place: station). Inside: Experience. Its door is south, about 27 steps away.",
  );
  const atDoor = describeSurroundings({
    scene: "town",
    position: { x: 660, y: 280 },
    near: landmarks("town")[1],
    reading: null,
    walking: false,
  });
  expect(atDoor).toContain("You are standing at the door of Jack’s House.");
  expect(atDoor).toContain("Inside: About & skills. You are at its door.");
});

test("looking around a room lists what can be read and what is open", () => {
  const workshop = describeSurroundings({
    scene: "workshop",
    position: { x: 480, y: 550 },
    reading: { place: "workshop", project: "brain-cache" },
    walking: false,
  });
  expect(workshop).toContain("You are inside The Workshop.");
  for (const project of ["winterbot", "brain-cache", "pancake-stack"])
    expect(workshop).toContain(`(project: ${project})`);
  expect(workshop).toContain("You are reading brain-cache.");
  const station = describeSurroundings({
    scene: "station",
    position: { x: 480, y: 550 },
    reading: null,
    walking: false,
  });
  expect(station).toContain("- Career history, the one thing to read here.");
  expect(station).not.toContain("You are reading");
});

test("a visit walks, enters, reads and leaves through the driver", async () => {
  const town = fakeTown();
  expect(await town.call("walk_to", { place: "station" })).toContain(
    "You are standing at the door of Winter Station.",
  );
  expect(await town.call("enter_building")).toContain(
    "You step inside Winter Station.",
  );
  expect(await town.call("read")).toContain("## KTO Group");
  expect(await town.call("leave_building")).toContain("You step back outside.");
  expect(await town.call("enter_building", { place: "workshop" })).toContain(
    "You are inside The Workshop.",
  );
  const reading = await town.call("read", { project: "pancake-stack" });
  expect(reading).toMatch(/^## pancake-stack\n/);
  expect(reading).toContain("https://winterbyte.vercel.app/places/workshop.md");
  expect(town.calls).toEqual([
    "walk 215,595",
    "travel station",
    "travel station-0",
    "travel exit",
    "travel workshop",
    "travel workshop-pancake-stack",
  ]);
});

test("tools explain themselves instead of acting out of place", async () => {
  const outside = fakeTown();
  expect(await outside.call("read")).toContain("Call enter_building first.");
  expect(await outside.call("enter_building")).toContain(
    "You are not at a door.",
  );
  expect(await outside.call("leave_building")).toContain("already outside");
  expect(await outside.call("walk_to", { place: "moon" })).toContain(
    "Unknown place.",
  );
  expect(await outside.call("enter_building", { place: "moon" })).toContain(
    "Unknown place.",
  );
  expect(outside.calls).toEqual([]);

  const inside = fakeTown({ scene: "workshop", position: { x: 480, y: 550 } });
  expect(await inside.call("walk_to", { place: "post" })).toContain(
    "Call leave_building before walking around town.",
  );
  expect(await inside.call("enter_building", { place: "post" })).toContain(
    "Call leave_building first.",
  );
  expect(await inside.call("read")).toContain("Choose a project to read");
  expect(await inside.call("read", { project: "nope" })).toContain(
    "Choose a project to read",
  );
  expect(inside.calls).toEqual([]);
});

test("an interrupted walk is reported, not claimed", async () => {
  const town = fakeTown();
  town.interrupt();
  const result = await town.call("enter_building", { place: "home" });
  expect(result).toContain("You did not reach Jack’s House");
  expect(result).not.toContain("You step inside");
});
