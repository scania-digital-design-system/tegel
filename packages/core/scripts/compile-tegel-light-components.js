import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sass from 'sass';

// Define __dirname equivalent for ES modules
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Define paths for component styles and output directories
const componentsDir = path.resolve(dirName, '../src/tegel-light/components'); // Source SCSS directory
const outputCssDir = path.resolve(dirName, '../../tegel-light/dist/components'); // Output compiled CSS directory
// Define paths for global styles
const globalScss = path.resolve(dirName, '../src/global/core.scss'); // Source global SCSS
const globalCss = path.resolve(dirName, '../../tegel-light/dist/global.css'); // Output compiled global CSS

// Define paths for Scania specific vars
const scaniaVarsScss = path.resolve(dirName, '../src/global/scania-variables.scss'); // Source Scania vars SCSS
const scaniaVarsCss = path.resolve(dirName, '../../tegel-light/dist/scania-variables.css'); // Output compiled Scania vars CSS

// Define paths for Traton specific vars
const tratonVarsScss = path.resolve(dirName, '../src/global/traton-variables.scss'); // Source Traton vars SCSS
const tratonVarsCss = path.resolve(dirName, '../../tegel-light/dist/traton-variables.css'); // Output compiled Traton vars CSS

// Ensure output directories exist before compilation
if (!fs.existsSync(outputCssDir)) {
  fs.mkdirSync(outputCssDir, { recursive: true });
}

// Compile Global Styles
console.log(`Compiling global styles: ${globalScss} -> ${globalCss}`);
const globalResult = sass.compile(globalScss, { style: 'expanded' });
fs.writeFileSync(globalCss, globalResult.css);

// Compile Scania Variables
console.log(`Compiling Scania variables: ${scaniaVarsScss} -> ${scaniaVarsCss}`);
const scaniaVarsResult = sass.compile(scaniaVarsScss, { style: 'expanded' });
fs.writeFileSync(scaniaVarsCss, scaniaVarsResult.css);

// Compile Traton Variables
console.log(`Compiling Traton variables: ${tratonVarsScss} -> ${tratonVarsCss}`);
const tratonVarsResult = sass.compile(tratonVarsScss, { style: 'expanded' });
fs.writeFileSync(tratonVarsCss, tratonVarsResult.css);

// Compile Each Component's SCSS into CSS
fs.readdirSync(componentsDir).forEach((component) => {
  const componentDir = path.join(componentsDir, component);
  const files = fs.readdirSync(componentDir);

  files.forEach((file) => {
    // Ignore partials (_filename.scss)
    if (file.endsWith('.scss') && !file.startsWith('_')) {
      const scssFile = path.join(componentDir, file);
      const cssFileName = file.replace('.scss', '.css'); // Convert filename
      const cssFile = path.join(outputCssDir, cssFileName);

      console.log(`Compiling component styles: ${scssFile} -> ${cssFile}`);
      // Compile SCSS to CSS (style: 'expanded' for better readability) Could be 'compressed' for minimized output?
      const result = sass.compile(scssFile, { style: 'expanded' });
      fs.writeFileSync(cssFile, result.css);
    }
  });
});

console.log('SCSS compilation complete!');
