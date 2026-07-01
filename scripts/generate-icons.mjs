// scripts/generate-brand-icons.mjs

import fs from 'fs';
import path from 'path';

const BRANDS = ['Scania', 'Traton'];

console.log('Starting icon generation...');

const ROOT = process.cwd();

function pascalCase(value) {
  return value
    .split(/[_-]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getIconsForBrand(brand) {
  const iconDir = path.join(ROOT, 'assets', 'icons', brand);

  return fs
    .readdirSync(iconDir)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => path.basename(file, '.svg'))
    // NOTE: we have this very smart sorting just for comparison purposes....
    .sort((a, b) => {
    
 const aBase = a.replace(/_inactive$/, '');
  const bBase = b.replace(/_inactive$/, '');

  if (aBase === bBase) {
    const aInactive = a.endsWith('_inactive');
    const bInactive = b.endsWith('_inactive');

    if (aInactive && !bInactive) return -1;
    if (!aInactive && bInactive) return 1;

    return 0;
  }

  if (aBase.startsWith(bBase)) return -1;
  if (bBase.startsWith(aBase)) return 1;

  return aBase.localeCompare(bBase);

  });

}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, `${content.trim()}\n`);
  console.log(`✓ ${path.relative(ROOT, filePath)}`);
}

function generateIconsArray(brand, icons) {
  const collection = icons.map((icon) => {
    const svgPath = path.join(
      ROOT,
      'assets',
      'icons',
      brand.toLowerCase(),
      `${icon}.svg`,
    );

    const svgContent = fs.readFileSync(svgPath, 'utf8');

    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/i);
    const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"/i);

    return {
      name: icon,
      definition: pathMatch?.[1] ?? '',
      viewbox: viewBoxMatch?.[1] ?? '0 0 32 32',
    };
  });


  const collectionJson = `[
${collection
      .map((icon) => `  ${JSON.stringify(icon, null, 2)}`)
      .join(',\n')
  }\n]`;



  const iconsNames = `[
    ${icons.map((icon) => `    "${icon}"`).join(',\n')}
  ]`;



  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */  
export const iconsCollection = ${collectionJson};

export const iconsNames = ${iconsNames};
`;
}

function generateIconListScss(brand, icons) {
  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */

$${brand}-icons: (
${icons.map((icon) => `  '${icon}'`).join(',\n')}
);
`;
}

function generateBrandIconType(brand, icons) {
  const typeName = `${pascalCase(brand)}IconNames`;

  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */

export type ${typeName} =
${icons.map((icon) => `  | '${icon}'`).join('\n')};
`;
}

function generateGlobalIconType(brands) {
  const imports = brands
    // NOTE: Consider changing to import type {BrandIconNames}
    .map(
      (brand) =>
        `import { ${pascalCase(brand)}IconNames } from './${brand}Icons';`,
    )
    .join('\n');

  const unions = brands
    .map((brand) => `${pascalCase(brand)}IconNames`)
    .join(' | ');

  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */

${imports}

export type IconNames = ${unions};
`;
}

function generatePrimitiveScss(brand, icons) {
 
 const lowerBrand = brand.toLowerCase();

  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */
  
  $local-assets: null !default;

:root {
${icons
  .map(
    (icon) =>
      `  --${lowerBrand}-icon-${icon}-svg: url(#{$local-assets}/icons/${lowerBrand}/${icon}.svg);`,
  )
  .join('\n')}
}
`;

}

function generateIconsScss(brand, icons) {
  
const lowerBrand = brand.toLowerCase();

return `:root,
.${lowerBrand} {
${icons
  .map(
    (icon) =>
      `  --icon-${icon}-svg: var(--${lowerBrand}-icon-${icon}-svg);`,
  )
  .join('\n')}
}
`;

}

function generateBrandFiles(brand) {
  const icons = getIconsForBrand(brand);

  writeFile(
    path.join(
      ROOT,
      'packages/core/src/components/icon',
      `${brand}IconsArray.js`,
    ),
    generateIconsArray(brand, icons),
  );

  writeFile(
    path.join(
      ROOT,
      'packages/core/src/tegel-lite/components/tl-icon',
      '_icon-list.scss',
    ),
    generateIconListScss(brand, icons),
  );

  writeFile(
    path.join(
      ROOT,
      'packages/core/src/types',
      `${brand}Icons.ts`,
    ),
    generateBrandIconType(brand, icons),
  );

  writeFile(
    path.join(
      ROOT,
      'tokens/scss',
      brand,
      `${brand}-icons-primitive.scss`,
    ),
    generatePrimitiveScss(brand, icons),
  );

  writeFile(
    path.join(
      ROOT,
      'tokens/scss',
      brand,
      `${brand}-icons.scss`,
    ),
    generateIconsScss(brand, icons),
  );

  return icons;
}

const brandIcons = new Map();

for (const brand of BRANDS) {
  brandIcons.set(brand, generateBrandFiles(brand));
}

writeFile(
  path.join(ROOT, 'packages/core/src/types/Icons.ts'),
  generateGlobalIconType([...brandIcons.keys()]),
);

console.log('Done.');