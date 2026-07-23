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

## Netlify preview workflow

Use Netlify **Deploy Previews** for day-to-day prototype reviews, and only merge to `main` when you want a paid production deploy.

1. Create a working branch:

   ```bash
   git checkout -b feature/short-description
   ```

2. Make your changes, then run the required checks:

   ```bash
   pnpm exec tsc --noEmit
   pnpm build
   ```

3. Push the branch:

   ```bash
   git push -u origin feature/short-description
   ```

4. Open a pull request into `main`.

5. Netlify will generate a **Deploy Preview** URL for the PR. The PR template already includes `@netlify /`, so the preview comment points reviewers to the app root by default.

6. Keep updating the same branch and PR while iterating. Each push refreshes the same preview URL.

7. Merge to `main` only at milestone points when you want a new production deploy.

### One-time Netlify check

In Netlify, confirm **Deploy Previews** are enabled:

- `Project configuration`
- `Build & deploy`
- `Continuous Deployment`
- `Branches and deploy contexts`

If you want, you can also password-protect preview URLs before sharing them externally.

## Editing with Codex

Most UI code is in `src/App.tsx`. Global styles are in `src/index.css`, and bundled images are in `src/imports`. Vite hot reloads the browser whenever a source file changes.

## Useful commands

```bash
pnpm dev       # Start the local development server
pnpm build     # Create a production build in dist/
pnpm preview   # Preview the production build
pnpm format    # Format the source
```
