# Winter Town

Jack Winter’s portfolio, inspired by Pokémon FireRed. Built with Astro, Preact, and TypeScript.

Tap the ground to walk or a building to enter. Arrow keys, WASD, and direction buttons also work. Press Enter near an object, use Map for an overview, or take a shortcut to portfolio details. Interaction markers reveal names when approached, hovered, or focused; Map shows every name. Escape cancels a walk; in an interior, it returns to town.

Menu contains sound and season controls. Inspect a project, then collect a ticket at Winter Station for an optional ride to the lookout. Tickets last while you remain in the station; the ride can be skipped and is instant with reduced motion. At the lookout, walk or tap along the platform, approach the railing, and board the return train.

Project and section URLs can be shared. `/portfolio` provides the same content without requiring JavaScript. The cat wanders while the page is visible, and workshop machines mark projects inspected during the current visit. Season and explored places are saved on your device; reset discoveries from the travel log.

## Development

Requires Node.js 22.23.4+, 24.16.0+, or 26.3.0+.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run format       # Format source, styles, and docs
npm run lint:fix     # Apply available lint fixes
npm run check        # Formatting, lint, and Astro/TypeScript checks
npm run build
npm run test:unit    # Pure logic; no build, server, or browser needed
npx playwright install chromium firefox webkit  # First run only
npm test             # Unit tests, then browser tests
```

Prettier handles formatting; ESLint checks JavaScript, TypeScript, TSX, and Astro files. Configuration follows the [Astro ESLint guide](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) and [Astro Prettier plugin](https://github.com/withastro/prettier-plugin-astro).

Unit tests cover collision rules, pathfinding, room destinations, and recorded chunk selection. Run them with `npm run test:unit`. Files named `*.unit.spec.ts` run once, without starting a browser or server.

Browser tests run in Chromium, Firefox, and WebKit against a production build on port 4323. Use `npm run test:browser` for all browsers or `npm run test:browser -- --project=chromium` for a single browser. They cover room entry/exit, movement, collisions, camera behaviour, project demos, keyboard access, mobile layouts, shareable links, the no-JavaScript portfolio, and saved progress.

GitHub Actions runs formatting, lint, type checks, unit tests, the production build, and all three browser projects on pushes and pull requests. Failed browser runs retain traces for seven days.

The town, plain portfolio and KTO case study have page-specific metadata and canonical URLs. Sharing cards are `public/portfolio-social.png` and `public/kto-social.png`. Regenerate them with `npm run social:render`; the template is `scripts/render-social-cards.mjs`. Set `PLAYWRIGHT_CHANNEL=chrome` to use installed Google Chrome instead of Playwright’s bundled Chromium.

For a repeatable local performance sample, run a production build and preview on port 4325, then run `npm run audit:performance`. It measures three cold loads per page at a 390px viewport, with 4× CPU slowdown and network throttling. Results go to `/tmp/winter-performance.json`; `AUDIT_URL` and `AUDIT_OUTPUT` override the server and output path. The recorded baseline and its limits are in `reports/portfolio-baseline.json`. These local observations are not real-user metrics or Lighthouse scores.

## Files

- `src/components/town/PlaceContent.tsx` and `projects.ts`: shared portfolio content.
- `src/pages/portfolio.astro`: plain portfolio view.
- `src/components/town/navigation.ts`: shareable content URLs.
- `src/components/town/useProgress.ts`: validated local preferences and discoveries.
- `src/components/town/TownMap.tsx` and `InteriorMap.tsx`: town and room artwork.
- `src/components/town/world.ts`: terrain, destinations, and pathfinding.
- `src/components/town/Player.tsx`: directional player sprite.
- `src/components/town/ProjectDemo.tsx`: palette, recorded AST chunks, and workflow demos.
- `src/components/town/WinterTown.tsx`: navigation, controls, and dialogs.
- `src/components/town/useMovement.ts`: movement and the on-demand animation loop.
- `src/components/town/useSound.ts`: opt-in interaction sounds.
- `src/components/town/StationTrip.tsx`: optional station ticket and lookout visit.
- `src/components/town/LookoutScene.tsx` and `LookoutWalk.tsx`: lookout artwork and platform controls.
- `src/components/town/RouteDemo.tsx`, `TokenBudgetDemo.tsx`, and `FrameBugDemo.tsx`: interactive engineering examples.
- `src/components/town/town.css` and `place-content.css`: page and interior styles.

## Visitor walkthrough

Use the same three tasks with three to five people who have not seen the site. Start them on the homepage without explaining the controls:

1. Find a project and explain what it does.
2. Find out what Jack does professionally.
3. Find a way to contact him.

Then invite them to explore freely. Observe whether they discover the workshop, understand the project demos, and find the station trip. Ask what they expected each interaction to do. Record task completion, first action, hesitation, wrong turns, and any help you gave; do not coach during a task. Use those observations to choose the next change. Automated browser checks do not replace these sessions; no visitor sessions have been conducted as part of this implementation.
