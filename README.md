# UNIQ Resume Builder

A browser-based resume builder: fill in a form on the left, see a live A4-paginated preview on the right, pick from 116 templates, and export to PDF or Word.

Built with Vite 7, React 19, TypeScript, Tailwind CSS 3.4, Zustand, and shadcn/ui.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The dev server runs on [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project layout

```
api/export-pdf.ts        Vercel serverless function that renders the PDF
src/App.tsx              Root component — header, form panel, preview panel
src/main.tsx             Entry point
src/index.css            Global styles, including print/@page rules
src/components/form/     One form per resume section
src/components/resume/   PagedResumePreview — splits content across A4 pages
src/components/ui/       shadcn/ui primitives
src/store/resumeStore.ts Zustand store, persisted to localStorage
src/templates/           The 116 resume templates
src/types/resume.ts      ResumeData shape and default content
src/lib/                 Section-title resolution, bold-text editing, cn()
```

## Templates

There are 116 templates, registered in [`src/templates/index.ts`](src/templates/index.ts) and resolved by number via `getTemplateComponent()`. They're organized three ways:

- **1–40** — one file each (`Template01.tsx` … `Template40.tsx`)
- **41–66** — all exported from `AdvancedTemplates.tsx`
- **67–116** — generated combinatorially in `ATSTemplates.tsx` from 10 accent colors × 5 heading styles

`templateCategories` in the same file groups them into Professional, Creative, Modern, Dark, Minimal, New, and ATS-Compliant for the gallery filter.

To add a template: create the component, import it in `src/templates/index.ts`, then add an entry to both `templateNames` and `templateComponents` under the next number.

## Export

**PDF** — the client POSTs the resume data and template number to `/api/export-pdf`. That function launches headless Chromium (`puppeteer-core` + `@sparticuz/chromium` on Vercel, a locally installed Chrome or Edge in development), navigates to `/pdf-render`, calls `window.renderResumeForPdf(payload)`, waits for `window.resumePdfReady`, and prints A4 with `preferCSSPageSize`.

`/pdf-render` is not a router route — `App.tsx` checks `window.location.pathname` directly and renders a bare preview. [`vercel.json`](vercel.json) rewrites that path to `/` so the SPA serves it.

**Word** — built entirely client-side in `App.tsx`. It clones the rendered preview, inlines every stylesheet, and downloads the result as a `.doc` blob.

## State

A single Zustand store, persisted to `localStorage` under `resume-builder-storage`. Resume data, the selected template, and expanded sections survive a reload; the mobile form/preview tab does not.
