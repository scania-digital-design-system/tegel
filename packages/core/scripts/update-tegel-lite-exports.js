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

// Ensure the "exports" field exists in package.json
if (!packageJson.exports) packageJson.exports = {};

//  Add the global CSS export
packageJson.exports['./global.css'] = './dist/global.css';

// Add the Scania variables CSS export
packageJson.exports['./scania-variables.css'] = './dist/scania-variables.css';

// Add the Traton variables CSS export
packageJson.exports['./traton-variables.css'] = './dist/traton-variables.css';

// Iterate over the component CSS files and add them to exports
fs.readdirSync(componentsCssDir).forEach((file) => {
  if (file.endsWith('.css')) {
    const componentName = file; // Keep the filename unchanged
    packageJson.exports[`./${componentName}`] = `./dist/${file}`;
  }
});

// Write the updated package.json file back
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('Updated package.json exports with `.css` extensions');
