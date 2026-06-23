# Memory Regression Benchmark

This benchmark reproduces the Tegel 1.54.0 payload-driven memory regression by
packing Tegel, installing it into a small Angular/Vitest fixture, and measuring
the process tree while Vitest loads Tegel CSS and the Stencil loader.

Run the default comparison:

```sh
NODE_OPTIONS=--max-old-space-size=2048 node scripts/memory-regression-benchmark.mjs --node-options=--max-old-space-size=2048
```

The default refs are:

- `@scania/tegel@1.53.0`
- `@scania/tegel@1.54.0`
- `working-tree`

The script writes `memory-regression-results.json` and
`memory-regression-results.md` under `.tmp/memory-regression-benchmark/<timestamp>/`.
It also uses an output-local npm cache by default; pass `--npm-cache=<path>` to
override it.
Each row includes:

- test exit code
- peak process-tree RSS
- largest single process RSS
- packed `dist/tegel/tegel.css` size
- packed loader index JS sizes
- generated icon CSS sizes

Useful local-only run after building the current branch:

```sh
NODE_OPTIONS=--max-old-space-size=2048 node scripts/memory-regression-benchmark.mjs --refs=working-tree --no-build --no-install-source-deps --node-options=--max-old-space-size=2048
```

## Loader And CSS Payload Notes

The Stencil loader entrypoints are intentionally small re-export stubs and do
not import the global stylesheet. Test environments that only need custom
element registration can call `defineCustomElements()` from `@scania/tegel/loader`
without importing `@scania/tegel/dist/tegel/tegel.css`.

The default `tegel.css` bundle must not include generated `--tds-icon-*` path
variables. The heavy icon CSS cascade is available only through explicit opt-in
entrypoints:

- `@scania/tegel/dist/tegel/tegel-icons.css`
- `@scania/tegel/dist/tegel/tegel-icons-scania.css`
- `@scania/tegel/dist/tegel/tegel-icons-traton.css`
