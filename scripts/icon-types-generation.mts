/**
 * This script re-generates the icon type files used within Tegel when new icons
 * are added to the Tegel Design System.
 * 
 * It takes the as input folder the ICONS_SVG_DIR and the brand subfolder is 
 * handled during the script execution.
 * 
 * Outputs:
 * 
 * - packages/core/src/types/Icons.ts
 * - packages/core/src/types/scaniaIcons.ts
 * - packages/core/src/types/tratonIcons.ts
 */


import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_SVG_DIR = path.join(ROOT, 'assets', 'icons');

// Note: The default brand should always be the first one. 
//       It will be used to generate the stylesheets and append to :root
const BRANDS = ['scania', 'traton'] as const;
type Brand = (typeof BRANDS)[number];

//=======================================
// Types:

type IconGallery = Set<string>

type BrandIcons = Map<Brand, IconGallery>;

const BASE_HEADER =  [
    '/**',
    ' * Do not edit directly, this file was auto-generated with ./scripts/icon-types-generation.mts',
    ' */',
    ''
  ]

async function iconTypesGeneration () {
  console.log("")
  console.log("   👷‍♀️ Create the types files for new Tegel icons...")
  console.log("")


  const brandIcons = getBrandIcons();

    writeFile(
      path.join(      ROOT,      'packages/core/src/types/Icons.ts' ),
      generateGlobalIconType())

  for (const brand of BRANDS) {
    writeFile(
      path.join(      ROOT,      'packages/core/src/types', `${brand}Icons.ts` ),
      generateBrandIconType(brand, brandIcons.get(brand)!));
  }

  console.log("")
  console.log("   ✅ All done!")
  console.log("")
}

iconTypesGeneration().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


//-----------------------------------------------------------------------------
// Gets the icons names per brand. 
//
// output: Map<Brand, IconGallery>
//-----------------------------------------------------------------------------
function getBrandIcons(): BrandIcons {
  
  const brandIcons: BrandIcons = new Map<Brand, IconGallery>
  
  for (const brand of BRANDS) {
    
    const iconGallery: IconGallery = new Set<string>
    
    const iconDir = path.join(ICONS_SVG_DIR, brand);

    fs.readdirSync(iconDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => {
        const iconName =  path.basename(file, '.svg')
        iconGallery.add(iconName)       
      })

    brandIcons.set(brand, iconGallery);
  }

  return brandIcons
}


//-----------------------------------------------------------------------------
// Auxiliary function to write a file. 
//-----------------------------------------------------------------------------
function writeFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, `${content.trim()}\n`);
  console.log(" ");
  console.log(`   ... generated ${path.relative(ROOT, filePath)}`);
}


//----------------------------------------------------------------------------- 
// Generates the content to write the packages/core/src/types/<brand>Icons.ts
// 
// outputs: string 
//-----------------------------------------------------------------------------
function generateBrandIconType(brand: Brand, iconGallery: IconGallery): string {
  const typeName = `${brand.charAt(0).toUpperCase() + brand.slice(1)}IconNames`;
  const constName = typeName.charAt(0).toLowerCase() + typeName.slice(1)
  
  const lines = [...BASE_HEADER, `export const ${constName} = [`, 
    [...iconGallery].map((icon) => `  '${icon}'`).join(',\n'),
    "]", 
    " ",
    `export type ${typeName} = typeof ${constName}[number];`
  ]

 return `${lines.join('\n')}\n\n`;
}

//----------------------------------------------------------------------------- 
// Generates the types for the Icons.
// 
// output: 'packages/core/src/types/Icons.ts'
//-----------------------------------------------------------------------------
function generateGlobalIconType(): string {

  const imports = BRANDS
    // NOTE: Consider changing to import type {BrandIconNames}
    .map(
      (brand) => {

        const brandName = brand.toUpperCase()[0] + brand.slice(1)
        
        return  `import { ${brandName}IconNames } from './${brandName}Icons';`
      }
    )
    .join('\n');

  const unions = BRANDS
    .map((brand) => {
      const brandName = brand.toUpperCase()[0] + brand.slice(1)

      return `${brandName}IconNames`})
    .join(' | ');


  return [...BASE_HEADER, 
    " ", `${imports}`, " ", `export type IconNames = ${unions};`
  ].join('\n')
}



