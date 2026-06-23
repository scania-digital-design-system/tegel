/**
 * Reads scaniaIconsArray.js and tratonIconsArray.js, then emits generated
 * icon stylesheets:
 *
 * 1. tokens/scss/component/icon-scania.scss and icon-traton.scss
 *    Native --tds-icon-<name>-d variables (CSS path() values) for each brand.
 *    These files intentionally do not emit per-missing-icon placeholders or
 *    existence markers. The web component now resolves missing brand icons via
 *    JS lookup data, keeping this CSS payload opt-in only.
 *
 * 2. tokens/scss/component/icon.scss
 *    A combined opt-in stylesheet that forwards the brand-specific path files.
 *
 * 3. tokens/scss/component/icon-fallbacks.scss
 *    --icon-<name>-svg fallbacks for Tegel Lite, which uses url()-based
 *    mask-image variables. Under .traton, Scania-only names must still alias
 *    to var(--traton-icon-placeholder-svg), otherwise the inherited :root
 *    Scania URL would leak through in Traton contexts.
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

const scaniaModule = await import(
  join(repoRoot, 'packages/core/src/components/icon/scaniaIconsArray.js')
);
const tratonModule = await import(
  join(repoRoot, 'packages/core/src/components/icon/tratonIconsArray.js')
);

const scaniaIcons = JSON.parse(scaniaModule.iconsCollection);
const tratonIcons = JSON.parse(tratonModule.iconsCollection);

function indexByName(icons) {
  return new Map(icons.map((i) => [i.name, i.definition]));
}

const scaniaByName = indexByName(scaniaIcons);
const tratonByName = indexByName(tratonIcons);

const scaniaPlaceholder = scaniaByName.get('placeholder');
const tratonPlaceholder = tratonByName.get('placeholder');
if (!scaniaPlaceholder || !tratonPlaceholder) {
  throw new Error('Both brands must define a "placeholder" icon to use as fallback.');
}

// Explicit codepoint comparator (matches the default lexicographic sort but
// satisfies sonar's "always provide a compare function" rule).
const allNames = [...new Set([...scaniaByName.keys(), ...tratonByName.keys()])].sort((a, b) =>
  a < b ? -1 : a > b ? 1 : 0,
);

function buildPathBlock(selectors, brandName, byName) {
  const lines = [`  --tds-brand-name: '${brandName}';`];
  const nativeNames = [...byName.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  for (const name of nativeNames) {
    const definition = byName.get(name);
    if (definition.includes('"')) {
      throw new Error(`Icon "${name}" path data contains a double quote; needs escaping logic.`);
    }
    lines.push(`  --tds-icon-${name}-d: path("${definition}");`);
  }
  return `${selectors.join(',\n')} {\n${lines.join('\n')}\n}`;
}

function buildUrlFallbackBlock(selectors, brandName, byName) {
  const missing = allNames.filter((n) => !byName.has(n));
  if (missing.length === 0) {
    return `${selectors.join(',\n')} {\n  /* No fallbacks needed: this brand defines every icon name. */\n}`;
  }
  const lines = missing.map(
    (name) => `  --icon-${name}-svg: var(--${brandName}-icon-placeholder-svg);`,
  );
  return `${selectors.join(',\n')} {\n${lines.join('\n')}\n}`;
}

const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;

const scaniaPathOutput =
  header + buildPathBlock([':root', '.scania'], 'scania', scaniaByName) + '\n';

const tratonPathOutput = header + buildPathBlock(['.traton'], 'traton', tratonByName) + '\n';

const pathOutput = header + "@use 'icon-scania' as *;\n" + "@use 'icon-traton' as *;\n";

const fallbackOutput =
  header +
  buildUrlFallbackBlock([':root', '.scania'], 'scania', scaniaByName) +
  '\n\n' +
  buildUrlFallbackBlock(['.traton'], 'traton', tratonByName) +
  '\n';

const pathPath = join(repoRoot, 'tokens/scss/component/icon.scss');
const scaniaPathPath = join(repoRoot, 'tokens/scss/component/icon-scania.scss');
const tratonPathPath = join(repoRoot, 'tokens/scss/component/icon-traton.scss');
const fallbackPath = join(repoRoot, 'tokens/scss/component/icon-fallbacks.scss');
writeFileSync(pathPath, pathOutput, 'utf8');
writeFileSync(scaniaPathPath, scaniaPathOutput, 'utf8');
writeFileSync(tratonPathPath, tratonPathOutput, 'utf8');
writeFileSync(fallbackPath, fallbackOutput, 'utf8');

const tratonFallbacks = allNames.filter((n) => !tratonByName.has(n)).length;
const scaniaFallbacks = allNames.filter((n) => !scaniaByName.has(n)).length;
console.log(
  `Wrote ${pathPath}, ${scaniaPathPath}, ${tratonPathPath} and ${fallbackPath} ` +
    `(${allNames.length} icon names; ${scaniaFallbacks} scania, ${tratonFallbacks} traton placeholders)`,
);
