const { series, src, dest } = require('gulp');
const { parse } = require('svgson'); // to parse SVG to JSON
const { optimize, extendDefaultPlugins } = require('svgo'); // to clean SVG files
const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const del = require('del');
const iconfont = require('gulp-iconfont'); // to convert SVG to webfont files
const iconfontCss = require('gulp-iconfont-css'); // to create css from webfont

// Configuration for output and source paths
const outputFolder = 'dist';
const brands = ['scania', 'traton']; // Supported brands
const iconFolders = brands.map((brand) => `./src/svg/${brand}/*.svg`); // Paths to brand-specific SVG folders
const tempFolder = 'temp'; // Temporary folder for processing SVGs
const iconComponentFolder = '../packages/core/src/components/icon/'; // Output folder for icon components
const typesFolder = '../packages/core/src/types/'; // Output folder for TypeScript types
const tegelLightIconFolder = '../packages/core/src/tegel-light/components/tl-icon/'; // Output folder for Tegel Light icons

const runTimestamp = Math.round(Date.now() / 1000);
// Brand-specific font names
const fontNames = {
  scania: 'tds-scania-icons',
  traton: 'tds-traton-icons',
};

// Use SVGO plugins to clean SVG from unused attributes,
// Doctype, and unnecessary clipPath
// See all available plugins here https://github.com/svg/svgo/tree/master/plugins
// extendDefaultPlugins will set all plugins to active
// See documentation here https://github.com/svg/svgo
const svgoConfig = {
  plugins: extendDefaultPlugins([
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke|clip-path)', // remove clipPath so it does not add blue background on webfont
      },
    },
    {
      name: 'mergePaths',
      params: {
        force: true, // important to set to true
      },
    },
    {
      name: 'removeElementsByAttr',
      params: {
        id: ['a', 'b', 'SVGID_1_', 'SVGID_2_'], // remove clipPath
      },
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ width: '700px' }, { height: '700px' }],
      },
    },
  ]),
};

// clean dist folder
function clean() {
  return del(outputFolder);
}

// Initialize required folders
function initFolders(cb) {
  // Create main folders
  [outputFolder, tempFolder].map((folder) => {
    fs.mkdirSync(folder, { recursive: true });
  });

  // Create brand-specific folders
  brands.forEach((brand) => {
    const brandTempFolder = `${tempFolder}/${brand}`;
    const brandFontFolder = `${outputFolder}/fonts/${brand}`;
    fs.mkdirSync(brandTempFolder, { recursive: true });
    fs.mkdirSync(brandFontFolder, { recursive: true });
  });

  cb();
}

// generate icons JS files
async function build(cb) {
  await generateIcons();
  cb();
}

// Generate icon files for each brand
async function generateIcons() {
  const allIcons = {};
  const allIconNames = {};

  // Process each brand's icons
  for (const brand of brands) {
    const iconsNamesArray = [];
    const iconsArray = [];
    const brandIconFolder = `./src/svg/${brand}/*.svg`;
    const brandTempFolder = `${tempFolder}/${brand}`;

    // Ensure brand temp folder exists
    if (!fs.existsSync(brandTempFolder)) {
      fs.mkdirSync(brandTempFolder, { recursive: true });
    }

    // Process each SVG file in the brand's folder
    for (const file of glob.sync(brandIconFolder)) {
      const icon = {};
      const props = path.parse(file);
      const content = fs.readFileSync(file);

      // Optimize SVG using SVGO
      const response = await optimize(content, { path: file, ...svgoConfig });
      const parsedSvg = await parse(response.data);

      // Extract icon properties
      icon.name = props.name;
      iconsNamesArray.push(icon.name);

      // Process SVG path data
      const svgPath = parsedSvg.children.find((item) => item.name === 'path' || item.name === 'g');
      const node = svgPath.children.length
        ? svgPath.children.find((item) => item.name === 'path')
        : svgPath;

      // Handle transform attributes if present
      const { transform } = node.attributes;
      if (transform !== undefined) {
        let transformObj = [];
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(transform);
        transformObj = matches[1].split(' ');
        icon.transform = transformObj;
      }

      // Store icon definition and viewbox
      icon.definition = node.attributes.d;
      icon.viewbox = parsedSvg.attributes.viewBox;

      iconsArray.push(icon);

      // Save optimized SVG to temp folder
      const tempFilePath = `${brandTempFolder}/${icon.name}.svg`;
      fs.writeFileSync(tempFilePath, response.data);
    }

    // Store brand-specific icon data
    allIcons[brand] = iconsArray;
    allIconNames[brand] = iconsNamesArray;

    // Generate JavaScript files for icon data
    const icons = `export const iconsCollection = '${JSON.stringify(iconsArray)}';
    export const iconsNames = ${JSON.stringify(iconsNamesArray)};`;

    // Generate TypeScript type definitions
    const iconNameType = `export type ${
      brand.charAt(0).toUpperCase() + brand.slice(1)
    }IconNames = ${iconsNamesArray.map((name) => `'${name}'`).join(' | ')};`;

    // Write output files
    fs.writeFileSync(`${outputFolder}/${brand}IconsArrays.js`, icons);
    fs.writeFileSync(`${iconComponentFolder}/${brand}IconsArray.js`, icons);
    fs.writeFileSync(
      `${typesFolder}/${brand.charAt(0).toUpperCase() + brand.slice(1)}Icons.ts`,
      iconNameType,
    );

    // Resolve correct output folder for brand SCSS files
    const tokensBrandFolder = path.resolve(__dirname, '../tokens/scss/', brand);
    fs.mkdirSync(tokensBrandFolder, { recursive: true });

    // Generate SCSS variable definitions (primitive)
    const scssVars = [
      `/**`,
      ` * Do not edit directly, this file was auto-generated.`,
      ` */`,
      '',
      ':root {',
      ...iconsNamesArray.map((icon) => {
        const safeName = icon.replace(/\s+/g, '-');
        const safeFile = icon.replace(/\s+/g, '%20');
        return `  --${brand}-icon-${safeName}-svg: url(#{$local-assets}/icons/${brand}/${safeFile}.svg);`;
      }),
      '}',
      '',
    ].join('\n');

    // Write primitive SCSS file
    fs.writeFileSync(`${tokensBrandFolder}/${brand}-icons-primitive.scss`, scssVars);

    // Generate agnostic SCSS file (aliasing root/brand vars)
    const isDefaultBrand = brand === 'scania';
    const selector = isDefaultBrand ? ':root,\n.' + brand : '.' + brand;

    const agnosticScss = [
      `/**`,
      ` * Do not edit directly, this file was auto-generated.`,
      ` */`,
      '',
      `${selector} {`,
      ...iconsNamesArray.map((icon) => {
        const safeName = icon.replace(/\s+/g, '-');
        return `  --icon-${safeName}-svg: var(--${brand}-icon-${safeName}-svg);`;
      }),
      '}',
      '',
    ].join('\n');

    // Write agnostic SCSS file
    fs.writeFileSync(`${tokensBrandFolder}/${brand}-icons.scss`, agnosticScss);

    // Collect all unique icon names from all brands
    const allUniqueIcons = Array.from(
      new Set(brands.flatMap((brand) => allIconNames[brand])),
    ).sort(); // Optional: sort for consistency

    // Generate SCSS variable list for Tegel Light
    const allIconsScss = [
      `/**`,
      ` * Do not edit directly, this file was auto-generated.`,
      ` */`,
      '',
      `$icons: (${allUniqueIcons.join(', ')});`,
      '',
    ].join('\n');

    // Ensure the folder exists
    fs.mkdirSync(tegelLightIconFolder, { recursive: true });

    // Write the SCSS list file
    fs.writeFileSync(`${tegelLightIconFolder}/_icon-list.scss`, allIconsScss);
  }

  // Create combined type definition for all brands
  const combinedType = `import { ScaniaIconNames } from './ScaniaIcons';
import { TratonIconNames } from './TratonIcons';
export type IconNames = ScaniaIconNames | TratonIconNames;`;
  fs.writeFileSync(`${typesFolder}/Icons.ts`, combinedType);
}

// Generate icon fonts for each brand
function createIconfont() {
  return Promise.all(
    brands.map((brand) => {
      const brandTempFolder = `${tempFolder}/${brand}`;
      const brandFontFolder = `${outputFolder}/fonts/${brand}`;

      // Ensure brand font folder exists
      if (!fs.existsSync(brandFontFolder)) {
        fs.mkdirSync(brandFontFolder, { recursive: true });
      }

      // Check if there are any SVG files to process
      const svgFiles = glob.sync(`${brandTempFolder}/*.svg`);
      if (svgFiles.length === 0) {
        console.log(`No SVG files found for brand ${brand}`);
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        src([`${brandTempFolder}/*.svg`])
          .on('error', (err) => {
            console.error(`Error processing SVG files for ${brand}:`, err);
            reject(err);
          })
          .pipe(
            iconfontCss({
              fontName: fontNames[brand],
              path: './src/_icons.css',
              targetPath: `css/${fontNames[brand]}.css`,
              fontPath: '../',
              cssClass: `tds-${brand}-icon`,
            }),
          )
          .pipe(
            iconfont({
              fontName: fontNames[brand],
              prependUnicode: true,
              formats: ['ttf', 'eot', 'woff', 'woff2'],
              timestamp: runTimestamp,
            }),
          )
          .pipe(dest(brandFontFolder))
          .on('end', () => {
            console.log(`Successfully generated font for ${brand}`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`Error generating font for ${brand}:`, err);
            reject(err);
          });
      });
    }),
  );
}

// Clean temporary files
function cleanTemp(cb) {
  del(tempFolder)
    .then(() => {
      console.log('Temporary files cleaned successfully');
      cb();
    })
    .catch((err) => {
      console.error('Error cleaning temporary files:', err);
      cb(err);
    });
}

// Export tasks
exports.build = build; // Build without iconfont
exports.iconfont = createIconfont; // Build without js

// Default task: clean, initialize folders, build icons, create fonts, and clean temp
exports.default = series(clean, initFolders, build, createIconfont, cleanTemp);
