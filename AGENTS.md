# Working on Winter Town

Winter Town is Jack's portfolio site: an explorable pixel-art town and a plain portfolio built from the same data, with Astro, Preact and TypeScript. The [README](README.md) says what it does. The [project guide](docs/project-guide.md) covers controls, focused tests, sharing cards and performance measurements.

## Commands

Use a Node version the `engines` field in `package.json` accepts. Run these from the repository root after `npm ci`.

| Command                               | What it does                                                |
| ------------------------------------- | ----------------------------------------------------------- |
| `npm run dev`                         | Serves the site with the dev-only agent tools panel.        |
| `npm run check`                       | Formatting, lint and `astro check`.                         |
| `npm run build`                       | Builds the static site into `dist/`.                        |
| `npm run test:unit`                   | Unit tests, no browser.                                     |
| `npm run test:browser`                | Browser journeys against a production build on port 4323.   |
| `npm test`                            | Both test suites.                                           |
| `npm run format` / `npm run lint:fix` | Apply formatting and lint fixes.                            |
| `npm run social:render`               | Regenerates the sharing cards. The project guide says when. |
| `npm run audit:performance`           | Measures cold page loads. The project guide says how.       |

Run `npm run check`, `npm run build` and `npm test` before committing. Set `PLAYWRIGHT_CHANNEL=chrome` to run browser tests in installed Google Chrome when Playwright's own Chromium is not installed.

## Owners

Each decision has one owner. Put new code with the owner of the decision it makes, and update this table in the change that adds or moves one.

| Decision                                                      | Owner                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| Place ids, names, doors and where the town starts             | `src/components/town/world.ts`                         |
| Terrain, obstacles, room layouts, walkability and pathfinding | `src/components/town/world.ts`                         |
| Movement and keyboard input                                   | `src/components/town/useMovement.ts`                   |
| Camera scale, overview and screen-to-map mapping              | `src/components/town/useTownCamera.ts`                 |
| Light and weather for a moment and URL                        | `src/components/town/townAtmosphere.ts`                |
| Town colours for each light and weather                       | `src/components/town/town-winter.css`                  |
| Interior colours                                              | `src/components/town/InteriorMap.tsx` and `interiors/` |
| Character colours                                             | `src/components/town/characterPalette.ts`              |
| Town artwork                                                  | `src/components/town/TownMap.tsx`                      |
| Saved progress format and storage key                         | `src/components/town/useProgress.ts`                   |
| Content URLs                                                  | `src/components/town/navigation.ts`                    |
| Opening dialogs, focus and copied links                       | `src/components/town/useContentNavigation.ts`          |
| Profile, skills, experience and contacts                      | `src/components/town/profile.ts`                       |
| Projects                                                      | `src/components/town/projects.ts`                      |
| Case studies                                                  | `src/data/`                                            |
| Place markdown and its paths                                  | `src/components/town/placeMarkdown.ts`                 |
| `llms.txt`                                                    | `src/pages/llms.txt.ts`                                |
| Agent tool names, wording and behaviour                       | `src/components/town/agentTools.ts`                    |
| WebMCP registration                                           | `src/components/town/useAgentTools.ts`                 |
| Sound cues                                                    | `src/components/town/useSound.ts`                      |
| Scene changes and actions                                     | `src/components/town/WinterTown.tsx`                   |
| Place content in dialogs and the plain portfolio              | `src/components/town/PlaceContent.tsx`                 |
| Portfolio colours, type and spacing outside the town          | `src/styles/global.css`                                |
| Performance audit and sharing cards                           | `scripts/`                                             |

## Standards

- State each fact, threshold and rule once, give it a name, and refer to it from everywhere else. Do not merge code only because it looks alike; wait for a third case that would change with the others.
- Separate deciding from doing. Helpers that decide take values and return values. Pass time in, as `townAtmosphere` takes its date and URL.
- Name things for what they mean to the caller. Keep a function to one job. Give a number that tunes behaviour a name and one home.
- Make the simplest change that meets the outcome. Choose types that cannot hold an invalid state, and prefer exhaustive matches, such as `Record<Place, …>`, over a catch-all branch.
- Keep each file to one responsibility. Treat about 300 lines as a prompt to look.
- Delete code that nothing uses. Leave no commented-out code, debug switches or TODO notes.
- Handle a failure where something can be done about it. Do not swallow an error the caller needs.
- Leave comments out. A comment stays only when it stops a plausible wrong fix and nothing in the code can carry the reason.
- Add or update a test with every change to behaviour, and name it for the behaviour it checks. When a new test passes the first time, break the code briefly to confirm it can fail. Wait on observable state, not on timers.
- Make a file split or other refactor its own commit with no behaviour change. Prove it with the existing tests, unedited, and a screenshot comparison of the town when drawing code moves.

## Conventions

- The town is drawn on a 960×640 map with a 10px movement grid. Map coordinates are in those units.
- Light and weather are set on the root element as `data-light` and `data-weather` before first paint. They recolour only the town, its rooms and their signs, through the variables in `town-winter.css`. The page around the town keeps the portfolio's colours and type from `global.css`, and a browser test checks that night and heavy snow leave it unchanged.
- The town and the plain portfolio render the same copy from `profile.ts` and `projects.ts`. Agents read the same data as markdown.
- Browser tests run against a production build, so check behaviour in `npm run build` output, not only in `npm run dev`.

## Committing and releasing

- Use Conventional Commits: `type(scope): summary`, one logical change per commit. Do not add `Co-Authored-By` trailers or any line crediting an AI tool.
- Commit on a branch when the task asks for a change. Vercel deploys every push: `main` is the public site and other branches get previews.
- These need Jack's request: pushing, opening or merging a pull request, and regenerating the sharing cards.
