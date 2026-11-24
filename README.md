# Charles Tang

Personal website: [charlestang.dev](https://charlestang.dev).

Use Node.js 24 LTS (`nvm use`) and npm. `package-lock.json` is the dependency lockfile.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

## Production

`npm run build` exports the static site to `dist/`. Deploy that directory to a static host, or run `npm start` to serve it locally on port 3000. `npm run export` is an alias for the same build.

To run the container:

```sh
docker compose up --build
```

Security overrides keep `compression` and `minimatch` on patched versions until their parent packages update their dependency ranges.

## Editing the portfolio

- `src/data/resume-data.tsx`: profile, education, experience, projects, papers, certificates, and skill categories.
- `src/lib/skill-links.ts`: additional skill connections, aliases, and links to other sections. Project technology tags also supply automatic connections.
- `src/lib/keyboard-layout.ts`: responsive keyboard packing, independent of rendering.
- `src/components/use-hash-navigation.ts`: shared fragment navigation, including repeated clicks and cancellation of pending reveals.
- `src/components/experience-card.tsx`: responsive experience layout. Projects and experience share the disclosure button but retain their different expansion layouts.

`npm test` uses Node's test runner, tsx, React Testing Library, and jsdom. Tests cover skill mappings and link destinations, keyboard packing, disclosure and coursework toggles, deep links and focus, certificate navigation, and paper interactions. Layout, real scrolling, and animations should also be checked in a browser at mobile and desktop widths; jsdom does not simulate them.
