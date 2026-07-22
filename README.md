# Ryman mobile prototype

An interactive mobile-first Ryman shopping prototype built with React, TypeScript, Vite, and Tailwind CSS.

## Local requirements

- Node.js 18+ is required. This project was validated with Node `22.13.0`.
- `pnpm` is required to run the package scripts.

## Open and run in VS Code

1. Extract the ZIP and open the extracted folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the prototype:

   ```bash
   pnpm dev
   ```

5. Open the local URL printed in the terminal, normally `http://localhost:8443`.

If `pnpm` is unavailable, use Node 18+ first, then enable it with `corepack enable`, and repeat the commands above.

## Preview as a phone

In Chrome or Edge, open Developer Tools, toggle the device toolbar, and choose a phone such as **iPhone 14 Pro**. The interface is designed for a viewport up to 430 px wide.

## Editing with Codex

Most UI code is in `src/App.tsx`. Global styles are in `src/index.css`, and bundled images are in `src/imports`. Vite hot reloads the browser whenever a source file changes.

## Useful commands

```bash
pnpm dev       # Start the local development server
pnpm build     # Create a production build in dist/
pnpm preview   # Preview the production build
pnpm format    # Format the source
```
