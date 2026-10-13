# winterbot

a personal portfolio with a bit of game boy advance nostalgia. my experience is a quest log, my projects are a dex, and my skills are an inventory. there's a pixel guide with something to say as you scroll. you can switch between fire and leaf themes, too.

[take a look](https://winterbyte.vercel.app/)

built with Astro, TypeScript, Tailwind CSS, and Preact.

## run it locally

you'll need Node.js 22.12.0 or later. run these commands from the repo.

```sh
npm ci
npm run dev
```

open `http://localhost:4321`.

## make changes

most of the content lives directly in [src/components/sections/](src/components/sections/). edit the section you want to change.

- [ProjectsSection.astro](src/components/sections/ProjectsSection.astro) holds the project list. add an entry to the `projects` array to add a card.
- [DialogueSystem.tsx](src/components/dialogue/DialogueSystem.tsx) holds the guide's messages and typewriter animation.
- [global.css](src/styles/global.css) holds the theme colors, fonts, and shared styles.
- [Layout.astro](src/layouts/Layout.astro) brings together the navigation, theme toggle, and dialogue guide.
- [index.astro](src/pages/index.astro) sets the section order.
- [public/](public/) holds the profile photo and favicons.

## check your work

run Astro's checks and build the site.

```sh
npm run astro -- check
npm run build
```

the browser tests cover page content, navigation, themes, dialogue, skill filters, and layout checks. install Chromium once, then run the suite.

```sh
npx playwright install chromium
npx playwright test
```

Playwright starts the dev server for you.

## preview the build

after `npm run build`, run this to preview the site locally.

```sh
npm run preview
```

the static build lands in `dist/`.
