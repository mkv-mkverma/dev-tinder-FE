# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Frontend for "Dev Tinder". Currently a bare Vite + React 19 + TypeScript scaffold: [src/App.tsx](src/App.tsx) renders a single heading and there is no router, state library, or API layer yet. `README.md` is still the untouched Vite template and does not describe this project.

## Commands

```bash
npm run dev        # Vite dev server with HMR
npm run build      # tsc -b (project references) then vite build
npm run lint       # eslint over the repo
npm run preview    # serve the production build locally
```

No test runner is configured. `npm run build` type-checks as a separate step (`noEmit`), so Vite alone will not surface type errors — run the full `build` (or `npx tsc -b`) to check types.

## Deployment

GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds and publishes to GitHub Pages on every push to `main`. Two things about that build differ from local:

- The base path is injected at build time: `npm run build -- --base=/dev-tinder-FE/`. It is **not** in [vite.config.ts](vite.config.ts), so any hardcoded absolute asset path (e.g. `/favicon.svg` in [index.html](index.html)) works locally but must go through Vite's asset handling to survive the deployed base path.
- `dist/index.html` is copied to `dist/404.html` as an SPA fallback, so client-side routing deep links resolve on Pages.

`dist/` is gitignored; a stale local copy may exist on disk.

## TypeScript configuration

Solution-style project references: [tsconfig.json](tsconfig.json) points at `tsconfig.app.json` (`src/`, browser) and `tsconfig.node.json` (Vite config, node). Notable strictness that affects how code must be written:

- `verbatimModuleSyntax` — type-only imports must use `import type`.
- `erasableSyntaxOnly` — no enums, no parameter properties, no namespaces.
- `noUnusedLocals` / `noUnusedParameters` — unused bindings break the build, not just lint.
- `allowImportingTsExtensions` — local imports include the extension (`./App.tsx`).

## Styling

Sass (`.scss`), imported per-component from the component file ([src/App.tsx](src/App.tsx) imports `./App.scss`). Global styles live in [src/index.scss](src/index.scss), imported once from [src/main.tsx](src/main.tsx). No CSS framework or CSS Modules in use.

## Lint

Flat config in [eslint.config.js](eslint.config.js): `js.configs.recommended` + `typescript-eslint` recommended (not type-checked) + `react-hooks` + `react-refresh` (Vite preset). The react-refresh rule means a module exporting a component should not also export non-component values.
