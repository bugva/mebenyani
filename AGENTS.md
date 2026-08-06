<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single Next.js 16 (Turbopack) app — a Turkish personal portfolio site (no backend/DB). Standard scripts are in `package.json`; run commands are documented in `README.md`.

- Run the dev server with `npm run dev` (serves on `http://localhost:3000`). Use dev mode, not `npm run build`/`npm start`.
- `.env.local` is only needed to override contact info (see `.env.example`); the app runs fine without it using placeholder defaults. All contact vars are `NEXT_PUBLIC_*` and read at build/render time, so restart the dev server after changing them.
- `npm run lint` currently reports pre-existing `react-hooks/set-state-in-effect` errors in `lib/use-parallax.ts`, `components/CursorGlow.tsx`, etc. These are not caused by setup — do not "fix" them unless that is the task.
- There are no automated tests in this repo; verify changes by loading pages (`/`, `/yazilar`, `/projeler/fotograf`, `/projeler/kahve`) and exercising UI (gallery lightbox, copy-email button).
