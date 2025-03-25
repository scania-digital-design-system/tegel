import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Define __dirname equivalent for ES modules
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Define paths for component styles and output directories
const componentsDir = path.resolve(dirName, '../src/tegel-light/components'); // Source SCSS directory
const outputCssDir = path.resolve(dirName, '../../tegel-light/dist/components'); // Output compiled CSS directory

// Define paths for global styles
const globalScss = path.resolve(dirName, '../src/global/tegel-light-global.scss'); // Source global SCSS
const globalCss = path.resolve(dirName, '../../tegel-light/dist/global.css'); // Output compiled global CSS

// Ensure output directories exist before compilation
if (!fs.existsSync(outputCssDir)) {
  fs.mkdirSync(outputCssDir, { recursive: true });
}

// Compile Global Styles
console.log(`Compiling global styles: ${globalScss} -> ${globalCss}`);
execSync(`npx sass ${globalScss} ${globalCss} --no-source-map`);

// Compile Each Component's SCSS into CSS
fs.readdirSync(componentsDir).forEach((component) => {
  const componentDir = path.join(componentsDir, component);
  const files = fs.readdirSync(componentDir);

  files.forEach((file) => {
    if (file.endsWith('.scss') && !file.startsWith('_')) {
      // Ignore partials (_filename.scss)
      const scssFile = path.join(componentDir, file);
      const cssFileName = file.replace('.scss', '.css'); // Convert filename
      const cssFile = path.join(outputCssDir, cssFileName);

      console.log(`Compiling component styles: ${scssFile} -> ${cssFile}`);
      execSync(`npx sass ${scssFile} ${cssFile} --no-source-map`);
    }
  });
});

console.log('SCSS compilation complete!');
