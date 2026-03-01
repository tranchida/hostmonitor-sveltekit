# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173
npm run build        # production build (output: build/)
node build           # run production build on port 3000
npm run check        # TypeScript + Svelte type checking (svelte-check)
npm run check:watch  # same, in watch mode
```

There are no lint or test scripts configured.

## Architecture

Single-process SvelteKit app using **Svelte 5**, **TailwindCSS v4**, and **TypeScript**. No separate backend — the API is implemented as a SvelteKit server route.

**Data flow:**
1. `src/routes/api/hostinfo/+server.ts` — `GET /api/hostinfo` endpoint. Calls `systeminformation` (npm) in parallel via `Promise.all`, formats results, and returns JSON. Runs server-side only.
2. `src/lib/hostinfo.svelte.ts` — module-level Svelte 5 `$state` rune store that polls `/api/hostinfo` every 10 seconds. Exports `startPolling`, `stopPolling`, and `getHostInfo`.
3. `src/routes/+page.svelte` — calls `startPolling`/`stopPolling` in `onMount`/`onDestroy`, reads reactive state via `getHostInfo()`, renders the dashboard grid.

**Key files:**
- `src/lib/types.ts` — `HostInfo` interface (the contract between server and client)
- `src/lib/hostinfo.svelte.ts` — shared reactive state using Svelte 5 runes (module-level `$state`); must have `.svelte.ts` extension
- `svelte.config.js` — uses `adapter-auto`; `@sveltejs/adapter-node` is in `dependencies` for the production Node.js build

**Environment variables (production):**

| Variable | Default    | Description                                   |
|----------|------------|-----------------------------------------------|
| `PORT`   | `3000`     | HTTP port                                     |
| `HOST`   | `0.0.0.0`  | Bind address                                  |
| `ORIGIN` | —          | Required behind a reverse proxy               |

## Svelte 5 patterns used

- Runes (`$state`, `$props`) instead of Svelte 4 stores/`export let`
- `{@render children()}` instead of `<slot>`
- `{@const}` for local template variables
- Module-level `$state` in `.svelte.ts` files for shared reactive state (replaces writable stores)
