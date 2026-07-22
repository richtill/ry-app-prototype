# figma-make-app

React + Vite + Tailwind CSS project exported from Figma Make.

## Development Server

Do not assume a local Vite development server is already running. Start it manually with `pnpm dev`.

- Default local URL: `http://localhost:8443`
- Hot reload: Changes to source files are reflected immediately after the dev server starts

## Key Files

- `src/App.tsx` - Main application component
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles and Tailwind CSS import
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `.nvmrc` - Recommended local Node.js version

## Styling

This project uses **Tailwind CSS v4** for styling. Use Tailwind utility classes directly in JSX. Tailwind is loaded via the Vite plugin — no PostCSS config needed.
