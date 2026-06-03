# Project AGENTS

## Project State
- `active`

## Scope
- Applies to `apps/knolquiz-turtle-defense-local/*`.
- This project is a standalone static Turtle Ship Defense web app for Knolquiz local play.
- It contains only turtle defense code plus the quiz and turtle defense visual assets needed by this app.

## Source Of Truth
- `index.html`
- `styles.css`
- `app.js`
- copied static assets under `assets/`
- `README.md`

## Run / Verify
- Local static server:
  - `python3 -m http.server 4272 --bind 127.0.0.1`
- Open:
  - `http://127.0.0.1:4272/`
- Syntax check:
  - `node --check app.js`
- Browser verification should cover setup, play, and result screens at 1920x1080, 1366x768, 1024x768, 820x1180, and 390x844.

## Change Safety Rules
- Keep changes inside this project directory unless the user explicitly expands scope.
- Do not reference `../knolquiz-runtime`, `../knolquiz-local-lite`, or any sibling app at runtime.
- Do not add Supabase, auth, classroom mode, ranking mode, or IndexedDB.
- Local learning records are allowed only for the explicit 1-player 구구단/나눗셈 record workflow:
  - use `localStorage` only for student-number keyed 구구단/나눗셈 practice aggregates
  - require user confirmation before writing/replacing local learning records
  - keep CSV backup/restore/merge compatible with `knolquiz-jumpmap-local`
  - do not store gameplay sessions, rankings, classes, auth, or unrelated data
- All sessions must end by the selected 1-10 minute timer.
- Result screens show only the current in-memory session.
- Do not add Jumpmap code, character assets, or Jumpmap platform assets to this project.

## Migration Note
- This project was split out from the combined Knolquiz local-lite reference.
- Static assets were copied from reference projects only where needed for standalone Turtle Ship Defense play.
