# winter town

i wanted my portfolio to be somewhere you could explore. so i built a small town, inspired by Pokémon FireRed.

walk around, visit the buildings, and find out what i’ve been working on. there’s a plain portfolio too, if you’d rather get straight to it.

built with Astro, Preact, and TypeScript.

## take a look

[explore the town](https://winterbyte.vercel.app) · [plain portfolio](https://winterbyte.vercel.app/portfolio)

tap to walk, use the arrow keys or WASD, or jump straight to a section with the shortcuts below the map.

## visiting as an agent

agents can visit too. the content is the same; only the way in differs.

- **read it.** each building is plain markdown: [workshop](https://winterbyte.vercel.app/places/workshop.md), [home](https://winterbyte.vercel.app/places/home.md), [station](https://winterbyte.vercel.app/places/station.md) and [post](https://winterbyte.vercel.app/places/post.md). [llms.txt](https://winterbyte.vercel.app/llms.txt) lists them. they are generated from the same data as the town and the plain portfolio.
- **walk it.** in a browser with [WebMCP](https://webmachinelearning.github.io/webmcp/), the town page registers five tools on `document.modelContext`: `look_around`, `walk_to`, `enter_building`, `read` and `leave_building`. they drive the real player, so you can watch an agent’s visit. other browsers register nothing.

WebMCP is a draft. at the time of writing it runs in Chrome behind `chrome://flags/#enable-webmcp-testing` or an origin trial. to try the tools without it, run `npm run dev` and open the “Agent tools” panel in the bottom-left corner. it calls the same functions and is left out of production builds.

## run it locally

use Node.js 22.23.4+ on the 22.x line, 24.16.0+ on the 24.x line, or 26.3.0 and newer.

```sh
npm ci
npm run dev
```

## check it works

install the test browsers once:

```sh
npx playwright install chromium firefox webkit
```

then run:

```sh
npm run check
npm run build
npm test
```

these cover formatting, lint, types, unit tests and browser journeys. GitHub Actions runs the checks on pushes and pull requests too.

## a bit more

[how i built winter town](https://winterbyte.vercel.app/work/winter-town) covers the architecture, tradeoffs and route inspector.

[the project guide](docs/project-guide.md) covers controls, focused tests, sharing cards, performance measurements and visitor walkthroughs.
