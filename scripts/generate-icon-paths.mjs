/**
 * Reads scaniaIconsArray.js and tratonIconsArray.js, emits
 * tokens/scss/component/icon.scss with --tds-icon-<name>-d variables
 * (CSS path() values) scoped to .scania and .traton, so the cascade
 * picks the right icon set without JS brand detection.
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

function buildBlock(selectors, icons) {
  const lines = icons.map(({ name, definition }) => {
    if (definition.includes('"')) {
      throw new Error(`Icon "${name}" path data contains a double quote; needs escaping logic.`);
    }
    return `  --tds-icon-${name}-d: path("${definition}");`;
  });
  return `${selectors.join(',\n')} {\n${lines.join('\n')}\n}`;
}

const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
const scaniaBlock = buildBlock([':root', '.scania'], scaniaIcons);
const tratonBlock = buildBlock(['.traton'], tratonIcons);

const output = `${header}${scaniaBlock}\n\n${tratonBlock}\n`;
const outPath = join(repoRoot, 'tokens/scss/component/icon.scss');
writeFileSync(outPath, output, 'utf8');

console.log(
  `Wrote ${outPath} (${scaniaIcons.length} scania + ${tratonIcons.length} traton icons)`,
);
