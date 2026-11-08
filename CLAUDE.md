# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js version warning

This project runs **Next.js 16.4 / React 19.3**, which has breaking changes relative to older training data. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (`01-app/` covers the App Router) and heed deprecation notices. `next.config.ts` enables `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`, so check the docs for how those change data fetching, caching and prefetching before adding server-side logic. Typed route helpers such as `LayoutProps<"/">` are global types that Next generates; they are not imported.

## Commands

Use pnpm (pinned via `packageManager`):

- `pnpm dev`: dev server at http://localhost:3000
- `pnpm build`: production build (also type-checks)
- `pnpm start`: serve the production build
- `pnpm lint`: ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)

There is no test framework yet.

## Architecture

This is a single-page portfolio site ("PASAJERO STUDIO") built on the App Router in `app/`. Styling is plain CSS: global tokens in `app/globals.css`, plus CSS Modules per component in `app/_components/`. There is no Tailwind. The `@/*` path alias maps to the repo root.

### CSS conventions (`app/globals.css`)

- **`1rem = 10px`**: `html { font-size: 62.5% }`, so `1.6rem` is 16px.
- **Breakpoints use `em`**, because media queries ignore the html font-size: `48em` = 768px (tablet), `75em` = 1200px (desktop). Write them mobile-first with range syntax: `@media (width >= 48em)`.
- **Design tokens** are CSS custom properties on `:root` and are redefined at each breakpoint: grid (`--grid-columns` 4/8/12, `--grid-gutter`, `--grid-margin`, `--grid-max-width`), spacing (`--space-section`), type scale (`--fs-*`, `--lh-*`) and colors (`--color-*`). Use these tokens instead of hard-coding values.
- Modules use native CSS nesting, including `@media` nested inside a selector.

### Grid system

- `.container` is the page-level 4/8/12-column grid. Every page block (for example `Hero`) is a `.container` and combines it with its module class using `clsx`: `className={clsx("container", styles.hero)}`. Use `clsx` (not template strings) whenever an element has more than one class or conditional classes.
- `.subgrid` is a nested group that inherits the parent's column tracks (`grid-template-columns: subgrid`) and spans the full width by default.
- Both global classes are wrapped in `:where()`, which gives them zero specificity, so any CSS Module rule overrides them regardless of stylesheet order.
- Row subgrids (`grid-template-rows: subgrid`) are applied per component and need an explicit `grid-row: span N`. Without it, the children collapse onto a single row track and overlap.
- Children place themselves with `grid-column` per breakpoint. Column counts differ per breakpoint, so spans like `1 / span 6` only make sense inside the matching media query.

### Dev-only grid overlay

`app/_components/GridOverlay.tsx` is loaded in `app/layout.tsx` through `next/dynamic` only when `NODE_ENV === "development"`, so it is stripped from production bundles. Press **`g`** in the browser to toggle it. Its state is stored as a `data-grid-overlay` attribute on `<html>` and persisted in localStorage. The overlay renders a real `.container`, so it always matches the grid tokens. If the breakpoints or column counts change, update the `nth-child` rules and labels in `GridOverlay.module.css` too.

### Fonts

Neue Haas Display is self-hosted with `next/font/local` in `app/fonts/neue-haas-display.ts` and exposed as `--font-neue-haas-display` on `<html>`, which feeds `--font-sans`. The weights in the `.ttf` files are shifted, so they are remapped to standard CSS weights: Roman = 400, Medium = 500, and Thin sits at 250.
