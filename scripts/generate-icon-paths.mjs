/**
 * Reads scaniaIconsArray.js and tratonIconsArray.js, emits
 * tokens/scss/component/icon.scss with --tds-icon-<name>-d variables
 * (CSS path() values) scoped to .scania and .traton, so the cascade
 * picks the right icon set without JS brand detection.
 *
 * Each brand block defines the union of icon names across both brands,
 * so e.g. an icon that only exists in Scania falls back to the
 * placeholder path under .traton instead of cascading through from
 * :root and silently rendering the Scania version.
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

function buildBlock(selectors, byName, placeholder) {
  const lines = allNames.map((name) => {
    const definition = byName.get(name) ?? placeholder;
    if (definition.includes('"')) {
      throw new Error(`Icon "${name}" path data contains a double quote; needs escaping logic.`);
    }
    return `  --tds-icon-${name}-d: path("${definition}");`;
  });
  return `${selectors.join(',\n')} {\n${lines.join('\n')}\n}`;
}

const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
const scaniaBlock = buildBlock([':root', '.scania'], scaniaByName, scaniaPlaceholder);
const tratonBlock = buildBlock(['.traton'], tratonByName, tratonPlaceholder);

const output = `${header}${scaniaBlock}\n\n${tratonBlock}\n`;
const outPath = join(repoRoot, 'tokens/scss/component/icon.scss');
writeFileSync(outPath, output, 'utf8');

const tratonFallbacks = allNames.filter((n) => !tratonByName.has(n)).length;
const scaniaFallbacks = allNames.filter((n) => !scaniaByName.has(n)).length;
console.log(
  `Wrote ${outPath} (${allNames.length} icon names; ` +
    `${scaniaFallbacks} scania placeholders, ${tratonFallbacks} traton placeholders)`,
);
