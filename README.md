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
