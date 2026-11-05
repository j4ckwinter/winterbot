# winter town

i wanted my portfolio to be somewhere you could explore. so i built a small town, inspired by Pokémon FireRed.

walk around, visit the buildings, and find out what i’ve been working on. there’s a plain portfolio too, if you’d rather get straight to it.

built with Astro, Preact, and TypeScript.

## take a look

[explore the town](https://winterbyte.vercel.app) · [plain portfolio](https://winterbyte.vercel.app/portfolio)

tap to walk, use the arrow keys or WASD, or jump straight to a section with the shortcuts below the map.

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

[the project guide](docs/project-guide.md) covers controls, focused tests, sharing cards, performance measurements and visitor walkthroughs.
