import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname equivalent for ES modules
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Define paths for the distribution folder and package.json
const distDir = path.resolve(dirName, '../../tegel-lite/dist'); // The main dist directory
const componentsCssDir = path.resolve(distDir); // Directory for component-specific CSS files
const packageJsonPath = path.resolve(dirName, '../../tegel-lite/package.json'); // Path to package.json

// Read and parse the existing package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Reset the exports map to a clean baseline so that any stale tl-* entries
// from previous builds (e.g. components that have since been removed from
// the shipped allowlist) are dropped.
packageJson.exports = {
  '.': './dist/global.css',
  './package.json': './package.json',
  './global.css': './dist/global.css',
  './scania-variables.css': './dist/scania-variables.css',
  './traton-variables.css': './dist/traton-variables.css',
};

// Iterate over the compiled CSS files in dist/ and re-add an export entry
// for each. compile-tegel-lite-components.js only emits CSS for shipped
// components, so this naturally produces the allowlisted set.
fs.readdirSync(componentsCssDir).forEach((file) => {
  if (file.endsWith('.css')) {
    packageJson.exports[`./${file}`] = `./dist/${file}`;
  }
});

// Write the updated package.json file back
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('Updated package.json exports with `.css` extensions');
