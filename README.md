# Design Inventory

A Vue 3 app that showcases design projects: a grid of project tiles, modal previews, and per-project documentation pages with markdown content and a sidebar.

**Stack:** Vue 3 (Composition API), TypeScript, Vite 5, Vue Router 4, [marked](https://marked.js.org/) for markdown. Built for GitHub Pages at base path `/design_inventory/`.

## Commands

- **`npm run dev`** – Start dev server
- **`npm run build`** – Type-check and build for production
- **`npm run preview`** – Preview production build locally
- **`npm run deploy`** – Deploy `dist/` to GitHub Pages from your machine (optional; see below)
- **`npm run generate-projects`** – Regenerate the project list from `public/projects`

## Deployment

The **`dist`** folder is build output and is in `.gitignore`—you don’t commit it. The repo uses a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) to build and deploy on every push to `main`: it runs `npm ci`, `npm run build`, and deploys the built site to GitHub Pages. No need to build or run `deploy` locally unless you want a one-off manual deploy.

**Setup:** In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**. If your default branch is not `main`, either change the workflow’s `on.push.branches` in `deploy.yml` or run the workflow manually from the Actions tab.

## Project list and content

The app reads projects from **`src/data/projects.ts`**. Each entry points to a folder under `public/projects/` (e.g. `project-documentation-dielerngruppe`) that contains:

- **`about.json`** – Title, short description, stats (weight, cost, keywords, etc.)
- **`readme/*.md`** – Documentation pages (e.g. README.md, construction.md, learnings.md)
- **`images/`** – Images used in the project and as previews

Running **`npm run generate-projects`** scans `public/projects` for `project-documentation-*` folders, reads each `about.json` and `readme/` markdown files, and **overwrites `src/data/projects.ts`**. The script also rewrites image paths and some links inside markdown files.

If you add or rename projects under `public/projects`, run `generate-projects` and then commit the updated `projects.ts` (and any changed markdown).
