# project guide

## getting around

tap the ground to walk or a building to enter. arrow keys, WASD and direction buttons work too. press Enter near an object to interact. Escape cancels a walk or leaves an interior. Map switches to an overview; shortcuts open portfolio details directly.

Menu holds sound and season controls. season and explored places are saved on your device; reset discoveries from the travel log. project and section URLs are shareable. the [plain portfolio](https://winterbyte.vercel.app/portfolio) works without JavaScript.

for the optional station trip, inspect a project and collect a ticket at Winter Station. tickets last while you remain in the station. the ride can be skipped and is instant with reduced motion. at the lookout, walk to the railing or board the return train.

## working on it

run commands from the repository root after `npm ci`.

```sh
npm run format
npm run lint:fix
npm run test:unit
npm run test:browser -- --project=chromium
```

unit tests cover pathfinding, collisions, room destinations, recorded context selection, project identity, URL parsing and saved-progress validation. browser tests run against a production build on port 4323 and cover navigation, movement, demos, mobile layouts, keyboard access and saved progress.

CI runs all three browser projects: Chromium, Firefox and WebKit. failed runs retain traces for seven days. configuration follows the [Astro ESLint guide](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) and [Astro Prettier plugin](https://github.com/withastro/prettier-plugin-astro).

portfolio copy lives in [`profile.ts`](../src/components/town/profile.ts) and [`projects.ts`](../src/components/town/projects.ts), shared by the town and plain portfolio. [`WinterTown.tsx`](../src/components/town/WinterTown.tsx) coordinates the town; [`world.ts`](../src/components/town/world.ts) defines terrain, destinations and pathfinding.

## sharing cards

```sh
npm run social:render
```

this regenerates `public/portfolio-social.png` and `public/kto-social.png` from [`render-social-cards.mjs`](../scripts/render-social-cards.mjs). set `PLAYWRIGHT_CHANNEL=chrome` to use installed Google Chrome instead of Playwright’s bundled Chromium. the town screenshot used by the template is `public/previews/winter-town.png`.

## measuring performance

build and start a local production preview:

```sh
npm run build
npm run preview -- --port 4325
```

in another terminal:

```sh
npm run audit:performance
```

the script measures three cold loads per page at a 390px viewport, with 4× CPU slowdown and network throttling. results go to `/tmp/winter-performance.json`. `AUDIT_URL` and `AUDIT_OUTPUT` override the server and output path; `PLAYWRIGHT_CHANNEL=chrome` selects installed Chrome.

see the [recorded baseline](../reports/portfolio-baseline.json) for conditions and limitations. these are local observations, not real-user metrics or Lighthouse scores.

## watching someone try it

give three to five people who haven’t seen the site these tasks, starting on the homepage:

1. find a project and explain what it does.
2. find out what Jack does professionally.
3. find a way to contact him.

watch without explaining the controls. note hesitation, wrong turns and any help needed, then invite them to explore freely. use those observations to choose the next change. automated checks don’t replace this; no visitor sessions have been conducted as part of this implementation.
