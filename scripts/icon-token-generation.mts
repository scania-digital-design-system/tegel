/**
 * This script re-generates the stylesheets used with Tegel Lite when new icons
 * are added to the Tegel Design System.
 * 
 * It takes the as input folder the ICONS_SVG_DIR and the brand subfolder is 
 * handled during the script execution.
 * 
 * Outputs:
 * 
 * - tokens/scss/component/icon.scss
 * - tokens/scss/component/icon-fallbacks.scss 
 * - tokens/scss/<brand>/<brand>-icons-primitive.scss
 * - tokens/scss/<brand>/<brand>-icons.scss
 * 
 * - packages/core/src/tegel-lite/components/tl-icon/_icon-list.scss
*/

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_SVG_DIR = path.join(ROOT, 'assets', 'icons');

// Note: The default brand should always be the first one. 
//       It will be used to generate the stylesheets and append to :root
const BRANDS = ['scania', 'traton'] as const;
type Brand = (typeof BRANDS)[number];
const DEFAULT_BRAND = BRANDS[0];

//=======================================
// Types:

interface IconDefinition {
  name: string;          // name of the icon
  definition: string;    // with the path definition
  placeholder?: boolean; // if the icon will be replaced with a placeholder because it doesn't exist in the brand yet
}

type IconGallery = Map<string, IconDefinition>

type BrandIcons = Map<Brand, IconGallery>;

const BASE_HEADER = [
  '/**',
  ' * Do not edit directly, this file was auto-generated with ./scripts/icon-token-generation.mts',
  ' */',
  ''
]

//=============================================================================
//
// Main section of the script: Stylesheet generation!
//
//=============================================================================

async function iconTokenGeneration() {

  console.log("")
  console.log("   👷‍♀️ Create the scss files for new Tegel icons...")
  console.log("")

  const brandIcons = getBrandIcons()


  writeFile(
    path.join(ROOT, 'tokens/scss/component/icon.scss'),
    generateIconTokens(brandIcons).iconStylesheet);

  writeFile(
    path.join(ROOT, 'tokens/scss/component/icon-fallbacks.scss'),
    generateIconTokens(brandIcons).fallbacksStylesheet);


  for (const brand of brandIcons.keys()) {

    writeFile(
      path.join(ROOT, 'tokens/scss', brand, `${brand}-icons-primitive.scss`),
      generatePrimitiveScss(brand, brandIcons.get(brand)!),
    );

    writeFile(
      path.join(ROOT, 'tokens/scss', brand, `${brand}-icons.scss`),
      generateIconsScss(brand, brandIcons.get(brand)!),
    );

  }

  writeFile(
    path.join(ROOT, 'packages/core/src/tegel-lite/components/tl-icon', '_icon-list.scss',),
    generateIconListScss(brandIcons),
  );

  console.log("")
  console.log("   ✅ All done!")
  console.log("")
}

iconTokenGeneration().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


//-----------------------------------------------------------------------------
// Auxiliary function to write a file. 
//-----------------------------------------------------------------------------
function writeFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, `${content.trim()}\n`);
  console.log(" ");
  console.log(`   ... generated ${path.relative(ROOT, filePath)}`);
}


//-----------------------------------------------------------------------------
// Utility that merges SVGs into a single path.
// 
// output: SVG with a single path
//-----------------------------------------------------------------------------
function mergePathData(svgContent: string): string {
  return [...svgContent.matchAll(/<path\b[^>]*\bd="([^"]+)"/gi)]
    .map((match) => match[1])
    .join(' ')
    .replace(/\s+/g, ' ') // avoid line breaks from svgs created with Illustrator
    .trim();

}


//-----------------------------------------------------------------------------
// Gets the icons definition (name and path) per brand. 
//
// output: Map<Brand, IconGallery>
//-----------------------------------------------------------------------------
function getBrandIcons(): BrandIcons {

  const brandIcons: BrandIcons = new Map<Brand, IconGallery>

  for (const brand of BRANDS) {

    const iconGallery: IconGallery = new Map<string, IconDefinition>

    const iconDir = path.join(ICONS_SVG_DIR, brand);

    fs.readdirSync(iconDir)
      .filter((file) => file.endsWith('.svg'))
      .map((file) => {

        const iconSvg = fs.readFileSync(path.join(iconDir, file), 'utf8')
        const iconPath = mergePathData(iconSvg)

        const iconName = path.basename(file, '.svg')

        iconGallery.set(iconName, {
          name: iconName,
          definition: iconPath
        })
      })

    brandIcons.set(brand, iconGallery);
  }

  return brandIcons
}

//-----------------------------------------------------------------------------
// Builds the block path with all the for all icons in the galleries to be used
// in the icon-fallback.scss stylesheet.
//
// output: string
//-----------------------------------------------------------------------------
function buildFallbackBlock(
  brandName: Brand,
  iconGallery: IconGallery,
  allIconNames: string[],
): string {


  const missingIcons = allIconNames.filter(
    (iconName) => !iconGallery.has(iconName),
  );

  const lines = [
    '',
    `.${brandName} {`,
  ];

  if (missingIcons.length === 0) {
    lines.push("   /* No fallbacks needed: this brand defines every icon name. */")
  } else {
    for (const iconName of missingIcons) {
      lines.push(`  --icon-${iconName}-svg: var(--${brandName}-icon-placeholder-svg);`)
    }
  }

  return `${lines.join('\n')}\n}\n`;
}

//-----------------------------------------------------------------------------
// Builds the block path with all the for all icons in the galleries to be used
// in the icon.scss stylesheet.
//
// When the icons do not exist in one of the galleries, then we'll use the 
// placeholder icon to fill in the stylesheet. 
//
// output: string
//-----------------------------------------------------------------------------
function buildPathBlock(
  brandName: Brand,
  iconGallery: IconGallery,
  allIconNames: string[],
  placeholderPath: string
): string {

  const lines = [
    '',
    `.${brandName} {`,
    `  --tds-brand-name: '${brandName}';`,
  ];


  for (const iconName of allIconNames) {

    const path = iconGallery.get(iconName)?.definition ?? placeholderPath;

    if (path.includes('"')) {
      throw new Error(`Icon "${iconName}" path data contains a double quote; needs escaping logic.`);
    }
    // Note: the path() could be done with single quotes, but MDN uses double quotes 
    // as it is the conventional style.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/path
    lines.push(`  --tds-icon-${iconName}-d: path("${path}");`);

    // Pending information: Check if we really need this variable
    if (iconGallery.has(iconName)) {
      lines.push(`  --tds-icon-${iconName}-exists: 1;`);
    }
  }

  return `${lines.join('\n')}\n}\n`;
}

//-----------------------------------------------------------------------------
// Joins the IconGalleries and gets a list of all unique icon names.
// 
// output: uniqueIconNames: string[]
//-----------------------------------------------------------------------------
function getAllIconNames(brandIcons: BrandIcons): string[] {
  return [
    ...new Set(
      [...brandIcons.values()]
        .flatMap((gallery) => [...gallery.keys()])
    ),
  ].sort((a, b) => a.localeCompare(b));
}

//-----------------------------------------------------------------------------
// Generates the content for the tokens stylesheets - icon and their fallbacks.
// 
// output: {iconStylesheet, fallbackStylesheet}
//-----------------------------------------------------------------------------
function generateIconTokens(brandIcons: BrandIcons): { iconStylesheet: string, fallbacksStylesheet: string } {

  let icons: string = ''
  let fallbacks: string = ''

  // We are using an array here so that when we write the file there are no indentation problems.
  const header = [...BASE_HEADER, ':root,'].join('\n');

  icons += header;
  fallbacks += header;

  const allIconNames = getAllIconNames(brandIcons)

  for (const brand of brandIcons.keys()) {

    const placeholder = brandIcons.get(brand)?.get("placeholder")
    if (!placeholder) {
      throw new Error(`Placeholder icon not found for brand ${brand}`);
    }

    icons += buildPathBlock(brand, brandIcons.get(brand)!, allIconNames, placeholder.definition)
    fallbacks += buildFallbackBlock(brand, brandIcons.get(brand)!, allIconNames)
  }

  return {
    iconStylesheet: icons,
    fallbacksStylesheet: fallbacks
  }
};

//-----------------------------------------------------------------------------
// Generates the SCSS file for Tegel Lite containing the union of the icons 
// from the available brands.
//
// output: 'packages/core/src/tegel-lite/components/tl-icon/_icon-list.scss'
//-----------------------------------------------------------------------------
function generateIconListScss(brandIcons: BrandIcons) {

  const allIconNames = getAllIconNames(brandIcons)

  const iconLines = allIconNames.map(
    (icon, index) => `  ${icon}${index < allIconNames.length - 1 ? ',' : ''}`,
  );

  return [...BASE_HEADER, '$icons: (', ...iconLines, ');'].join('\n');
}




//-----------------------------------------------------------------------------
// Generates the SCSS files for the primitives.  
//
// outputs: 'tokens/scss/<brand>/<brand>-icons-primitive.scss'
//-----------------------------------------------------------------------------
function generatePrimitiveScss(brand: Brand, iconGallery: IconGallery) {

  const lines = [...BASE_HEADER, '$local-assets: null !default;', '', ':root {'];

  for (const icon of iconGallery.keys()) {
    lines.push(`  --${brand}-icon-${icon}-svg: url(#{$local-assets}/icons/${brand}/${icon}.svg);`)
  }

  lines.push('}')

  return lines.join('\n');
}

//-----------------------------------------------------------------------------
// Generates the brand specific SCSS files in for the tokens.
//
// outputs: 'tokens/scss/<brand>/<brand>-icons.scss'
//-----------------------------------------------------------------------------
function generateIconsScss(brand: Brand, iconGallery: IconGallery) {
 
  const lines = [...BASE_HEADER, brand === DEFAULT_BRAND ? ':root,' : "", `.${brand} {`];

  for (const icon of iconGallery.keys()) {
    lines.push(`  --icon-${icon}-svg: var(--${brand}-icon-${icon}-svg);`)
  }

  lines.push('}')

  return lines.join('\n');
}
