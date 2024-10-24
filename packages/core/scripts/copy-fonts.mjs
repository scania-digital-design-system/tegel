#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

// Configuration options
const config = {
  defaultTargetDir: 'public/assets/fonts',
  dryRun: false, // Set to false to actually copy files
  verbose: false // Set to false to reduce console output
};

// Get custom path from command line argument, if provided
const targetDir = path.resolve(process.cwd(), process.argv[2] || config.defaultTargetDir);

console.log(`Using target directory: ${targetDir}`);

// Determine if we're running from the installed package or from the monorepo
const isInstalledPackage = currentDirPath.includes('node_modules');

// Define the source directory for fonts based on the environment
const sourceDir = isInstalledPackage
  ? path.join(currentDirPath, '..', 'dist', 'tegel', 'assets', 'fonts')
  : path.join(currentDirPath, '..', '..', '..', 'assets', 'fonts');

function copyFonts(src, dest) {
  if (config.verbose) console.log(`Checking directory: ${src}`);

  if (!fs.existsSync(src)) {
    console.error(`Source directory does not exist: ${src}`);
    return;
  }

  if (!config.dryRun && !fs.existsSync(dest)) {
    if (config.verbose) console.log(`Creating directory: ${dest}`);
    fs.mkdirSync(dest, { recursive: true });
  }

  try {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyFonts(srcPath, destPath);
      } else if (entry.isFile() && (path.extname(entry.name) === '.woff' || path.extname(entry.name) === '.woff2')) {
        if (config.dryRun) {
          console.log(`Would copy: ${srcPath} to ${destPath}`);
        } else {
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: ${destPath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error accessing directory ${src}:`, error.message);
  }
}

console.log('Font copying script started');

if (!fs.existsSync(sourceDir)) {
  console.error(`Error: Source directory does not exist: ${sourceDir}`);
  console.log('Please check if the fonts directory exists in the assets folder of the package.');
  process.exit(1);
}

console.log(`Source directory: ${sourceDir}`);
console.log(`Target directory: ${targetDir}`);
console.log(`Dry run: ${config.dryRun ? 'Yes' : 'No'}`);

// Copy fonts from both cyrillic and latin subdirectories
['cyrillic', 'latin'].forEach(subdir => {
  const subSourceDir = path.join(sourceDir, subdir);
  const subTargetDir = path.join(targetDir, subdir);
  
  if (fs.existsSync(subSourceDir)) {
    copyFonts(subSourceDir, subTargetDir);
  } else {
    console.warn(`Warning: ${subdir} subdirectory not found in source.`);
  }
});

console.log('Font copying process complete!');
if (config.dryRun) {
  console.log('This was a dry run. No files were actually copied.');
  console.log('To actually copy files, set dryRun to false in the config.');
}
console.log(`Target directory: ${targetDir}`);
console.log('Please ensure your application is configured to serve static files from this location.');