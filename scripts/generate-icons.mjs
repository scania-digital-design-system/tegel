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


//-----------------------------------------------------------------------------
// Gets a list of the SVG icons for each brand.
//
// output: [filenames]
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// Auxiliary function to write any file.
//-----------------------------------------------------------------------------
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, `${content.trim()}\n`);
  console.log(`✓ ${path.relative(ROOT, filePath)}`);
}


//-----------------------------------------------------------------------------
// TO CONFIRM IF WE STILL NEED IT
//-----------------------------------------------------------------------------
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
      definition:pathMatch?.[1] ?? '',
      viewbox: viewBoxMatch?.[1] ?? '0 0 32 32',
    };
  });


  const collectionJson = `[
    ${collection
      .map((icon) => `  ${JSON.stringify(icon, null, 2)}`)
      .join(',\n')
    }\n
  ]`;

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

 
//-----------------------------------------------------------------------------
// Generates the SCSS file for Tegel Lite containing the union of the icons 
// from the available brands.
//
// output: 'packages/core/src/tegel-lite/components/tl-icon/_icon-list.scss'
//-----------------------------------------------------------------------------
function generateIconListScss(brandIcons) {

  const allUniqueIcons =  Array.from(
    new Set([...brandIcons.values()].flat())
  ).sort()
  
  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */
$icons: (
${allUniqueIcons.map((icon) => `  ${icon}`).join(',\n')}
);
`;
}

//----------------------------------------------------------------------------- 
// Generates the types for the brands.
// 
// outputs: 'packages/core/src/types/<brand>Icons.ts' 
//-----------------------------------------------------------------------------
function generateBrandIconType(brand, icons) {
  const typeName = `${pascalCase(brand)}IconNames`;
  const constName = typeName.charAt(0).toLowerCase() + typeName.slice(1); 
  
  return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */

export const ${constName} = [
${icons.map((icon) => `   '${icon}'`).join(',\n')}
]

export type ${typeName} = typeof ${constName}[number];
`;
}

//----------------------------------------------------------------------------- 
// Generates the types for the Icons.
// 
// output: 'packages/core/src/types/Icons.ts'
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// Generates the SCSS files for the primitives.  
//
// outputs: 'tokens/scss/<brand>/<brand>-icons-primitive.scss'
//-----------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
// Generates the SCSS files in for the tokens.
//
// outputs: 'tokens/scss/<brand>/<brand>-icons.scss'
//-----------------------------------------------------------------------------
function generateIconsScss(brand, icons) {
  
const lowerBrand = brand.toLowerCase();

return `
/**
 * Do not edit directly, this file was auto-generated with ./scripts/generate-icons.mjs
 */
:root,
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


//-----------------------------------------------------------------------------
// Centralizes the generation of files that derive from the SVG icons.
//-----------------------------------------------------------------------------
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



//=============================================================================
//
// Main section of the script
//
//=============================================================================

const brandIcons = new Map();

for (const brand of BRANDS) {
  brandIcons.set(brand, generateBrandFiles(brand));
}


writeFile(
    path.join(
      ROOT,
      'packages/core/src/tegel-lite/components/tl-icon',
      '_icon-list.scss',
    ),
    generateIconListScss(brandIcons),
);

writeFile(
  path.join(ROOT, 'packages/core/src/types/Icons.ts'),
  generateGlobalIconType([...brandIcons.keys()]),
);

console.log('Done.');