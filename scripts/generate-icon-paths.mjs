/**
 * Reads scaniaIconsArray.js and tratonIconsArray.js, emits two generated
 * stylesheets:
 *
 * 1. tokens/scss/component/icon.scss
 *    --tds-icon-<name>-d variables (CSS path() values) scoped to .scania
 *    and .traton, so the <tds-icon> path data is picked by the cascade
 *    instead of by JS brand detection. Both brand blocks define the
 *    union of icon names; names with no native definition for a brand
 *    fall back to that brand's placeholder path. A --tds-brand-name
 *    marker plus --tds-icon-<name>-exists: 1 (only on natively defined
 *    names) lets the component log a console warning when a name is
 *    rendered as a placeholder.
 *
 * 2. tokens/scss/component/icon-fallbacks.scss
 *    --icon-<name>-svg fallbacks for tegel-lite, which uses url()-based
 *    mask-image variables. Under .traton, every Scania-only name aliases
 *    to var(--traton-icon-placeholder-svg) so the cascade no longer
 *    leaks the Scania URL through. Symmetric .scania block (empty today
 *    since Traton is a strict subset, future-proof).
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

const allNames = [...new Set([...scaniaByName.keys(), ...tratonByName.keys()])].sort();

function buildPathBlock(selectors, brandName, byName, placeholder) {
  const lines = [`  --tds-brand-name: '${brandName}';`];
  for (const name of allNames) {
    const definition = byName.get(name) ?? placeholder;
    if (definition.includes('"')) {
      throw new Error(`Icon "${name}" path data contains a double quote; needs escaping logic.`);
    }
    lines.push(`  --tds-icon-${name}-d: path("${definition}");`);
    if (byName.has(name)) {
      lines.push(`  --tds-icon-${name}-exists: 1;`);
    }
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

const pathOutput =
  header +
  buildPathBlock([':root', '.scania'], 'scania', scaniaByName, scaniaPlaceholder) +
  '\n\n' +
  buildPathBlock(['.traton'], 'traton', tratonByName, tratonPlaceholder) +
  '\n';

const fallbackOutput =
  header +
  buildUrlFallbackBlock([':root', '.scania'], 'scania', scaniaByName) +
  '\n\n' +
  buildUrlFallbackBlock(['.traton'], 'traton', tratonByName) +
  '\n';

const pathPath = join(repoRoot, 'tokens/scss/component/icon.scss');
const fallbackPath = join(repoRoot, 'tokens/scss/component/icon-fallbacks.scss');
writeFileSync(pathPath, pathOutput, 'utf8');
writeFileSync(fallbackPath, fallbackOutput, 'utf8');

const tratonFallbacks = allNames.filter((n) => !tratonByName.has(n)).length;
const scaniaFallbacks = allNames.filter((n) => !scaniaByName.has(n)).length;
console.log(
  `Wrote ${pathPath} and ${fallbackPath} ` +
    `(${allNames.length} icon names; ${scaniaFallbacks} scania, ${tratonFallbacks} traton placeholders)`,
);
