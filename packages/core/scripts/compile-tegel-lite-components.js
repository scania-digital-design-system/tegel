import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sass from 'sass';

// Define __dirname equivalent for ES modules
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Define paths for component styles and output directories
const componentsDir = path.resolve(dirName, '../src/tegel-lite/components'); // Source SCSS directory
const outputCssDir = path.resolve(dirName, '../../tegel-lite/dist'); // Output compiled CSS directory
// Define paths for global styles
const globalScss = path.resolve(dirName, '../src/global/core.scss'); // Source global SCSS
const globalCss = path.resolve(dirName, '../../tegel-lite/dist/global.css'); // Output compiled global CSS

// Define paths for Scania specific vars
const scaniaVarsScss = path.resolve(dirName, '../src/global/scania-variables.scss'); // Source Scania vars SCSS
const scaniaVarsCss = path.resolve(dirName, '../../tegel-lite/dist/scania-variables.css'); // Output compiled Scania vars CSS

// Define paths for Traton specific vars
const tratonVarsScss = path.resolve(dirName, '../src/global/traton-variables.scss'); // Source Traton vars SCSS
const tratonVarsCss = path.resolve(dirName, '../../tegel-lite/dist/traton-variables.css'); // Output compiled Traton vars CSS

// Define paths for all components bundle
const componentsScss = path.resolve(dirName, '../src/tegel-lite/components.scss'); // Source all components SCSS
const componentsCss = path.resolve(dirName, '../../tegel-lite/dist/components.css'); // Output compiled all components CSS

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

// Compile All Components Bundle
console.log(`Compiling all components: ${componentsScss} -> ${componentsCss}`);
const componentsResult = sass.compile(componentsScss, { style: 'expanded' });
fs.writeFileSync(componentsCss, componentsResult.css);

// Recursively compile each component's SCSS files into CSS
const componentEntries = fs.readdirSync(componentsDir, { withFileTypes: true });

componentEntries.forEach((entry) => {
  if (!entry.isDirectory()) return;

  const componentDir = path.join(componentsDir, entry.name);

  const compileScssInDirectory = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((e) => {
      const fullPath = path.join(dir, e.name);

      if (e.isDirectory()) {
        compileScssInDirectory(fullPath);
      } else if (e.isFile() && e.name.endsWith('.scss') && !e.name.startsWith('_')) {
        const scssFile = fullPath;
        const cssFileName = e.name.replace('.scss', '.css');
        const cssFile = path.join(outputCssDir, cssFileName);

        console.log(`Compiling component styles: ${scssFile} -> ${cssFile}`);
        const result = sass.compile(scssFile, { style: 'expanded' });
        fs.writeFileSync(cssFile, result.css);
      }
    });
  };

  compileScssInDirectory(componentDir);
});

console.log('SCSS compilation complete!');
