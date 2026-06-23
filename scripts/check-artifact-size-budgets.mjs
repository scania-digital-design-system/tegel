import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

const budgets = [
  {
    label: 'dist/tegel/tegel.css',
    path: 'packages/core/dist/tegel/tegel.css',
    maxBytes: 430_000,
  },
  {
    label: 'loader/index.js',
    path: 'packages/core/loader/index.js',
    maxBytes: 10_000,
  },
  {
    label: 'loader/index.es2017.js',
    path: 'packages/core/loader/index.es2017.js',
    maxBytes: 10_000,
  },
  {
    label: 'loader/index.cjs.js',
    path: 'packages/core/loader/index.cjs.js',
    maxBytes: 10_000,
  },
  {
    label: 'generated icon CSS aggregator',
    path: 'tokens/scss/component/icon.scss',
    maxBytes: 1_000,
  },
  {
    label: 'generated Scania icon CSS',
    path: 'tokens/scss/component/icon-scania.scss',
    maxBytes: 140_000,
  },
  {
    label: 'generated Traton icon CSS',
    path: 'tokens/scss/component/icon-traton.scss',
    maxBytes: 35_000,
  },
  {
    label: 'generated Tegel Lite icon fallbacks',
    path: 'tokens/scss/component/icon-fallbacks.scss',
    maxBytes: 15_000,
  },
];

const failures = [];

for (const budget of budgets) {
  const absolutePath = join(repoRoot, budget.path);
  if (!existsSync(absolutePath)) {
    failures.push(`${budget.label}: missing ${budget.path}`);
    continue;
  }

  const bytes = statSync(absolutePath).size;
  const status = bytes <= budget.maxBytes ? 'OK' : 'OVER';
  console.log(`${status} ${budget.label}: ${bytes} bytes (budget ${budget.maxBytes})`);

  if (bytes > budget.maxBytes) {
    failures.push(`${budget.label}: ${bytes} bytes exceeds ${budget.maxBytes}`);
  }
}

const defaultCssPath = join(repoRoot, 'packages/core/dist/tegel/tegel.css');
if (existsSync(defaultCssPath)) {
  const defaultCss = readFileSync(defaultCssPath, 'utf8');
  if (defaultCss.includes('--tds-icon-')) {
    failures.push('dist/tegel/tegel.css includes generated --tds-icon-* path variables');
  }
}

if (failures.length > 0) {
  console.error('\nArtifact size budget failures:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
